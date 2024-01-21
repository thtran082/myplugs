import {
  CdkDrag, CdkDragEnter,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  DragRef,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgForOf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { XoSafeAny } from '../../types';
import { InputBoolean, InputNumber } from '../../utils';
import { CoreButtonComponent } from '../button';
import { CoreReorderItemDirective } from './reorder-item.directive';

/**
 * Drag and drop with grid layout
 * source: https://stackblitz.com/edit/angular-cdk-mixed-orientation-drag-drop-wtnmvb
 */
@Component({
  selector: 'xo-reorder-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reorder-grid.component.html',
  styleUrls: ['./reorder-grid.component.scss'],
  imports: [
    NgForOf,
    NgTemplateOutlet,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CoreButtonComponent,
    CdkDragHandle,
  ],
})
export class CoreReorderGridComponent<T> implements AfterViewInit {
  static ngAcceptInputType_itemsPerRow: string | number;

  @ViewChild(CdkDropListGroup) listGroup!: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder!: CdkDropList;
  @ContentChild(CoreReorderItemDirective, { read: TemplateRef }) reorderItemTmpl!: TemplateRef<XoSafeAny>;

  @Input() items: T[] = [];

  @HostBinding('style.--rows')
  @InputNumber()
  @Input() itemsPerRow = 4;

  @Output() itemsChange = new EventEmitter<T[]>();

  target: CdkDropList | null = null;
  targetIndex: number | null = null;
  source: CdkDropList | null = null;
  sourceIndex: number | null = null;
  dragIndex: number | null = null;

  private dragRef: DragRef | null = null;

  ngAfterViewInit() {
    const phElement = this.placeholder.element.nativeElement;
    phElement.style.display = 'none';
    phElement.parentElement!.removeChild(phElement);
  }

  dropListDropped() {
    if (!this.target)
      return;

    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent!.removeChild(phElement);
    parent!.appendChild(phElement);
    parent!.insertBefore(this.source!.element.nativeElement, parent!.children[this.sourceIndex!]);

    if (this.placeholder._dropListRef.isDragging()) {
      this.placeholder._dropListRef.exit(this.dragRef!);
    }

    this.target = null;
    this.source = null;
    this.dragRef = null;

    if (this.sourceIndex != this.targetIndex) {
      moveItemInArray(this.items, this.sourceIndex!, this.targetIndex!);
    }
  }

  onDropListEntered({ item, container }: CdkDragEnter) {
    if (container == this.placeholder) {
      return;
    }

    const placeholderElement: HTMLElement =
      this.placeholder.element.nativeElement;
    const sourceElement: HTMLElement = item.dropContainer.element.nativeElement;
    const dropElement: HTMLElement = container.element.nativeElement;
    const dragIndex: number = Array.prototype.indexOf.call(
      dropElement.parentElement!.children,
      this.source ? placeholderElement : sourceElement,
    );
    const dropIndex: number = Array.prototype.indexOf.call(
      dropElement.parentElement!.children,
      dropElement,
    );

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = item.dropContainer;
      sourceElement.parentElement!.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = container;
    this.dragRef = item._dragRef;

    placeholderElement.style.display = '';

    dropElement.parentElement!.insertBefore(
      placeholderElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement,
    );

    this.placeholder._dropListRef.enter(
      item._dragRef,
      item.element.nativeElement.offsetLeft,
      item.element.nativeElement.offsetTop,
    );
  }

}
