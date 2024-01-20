import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject, Input, OnInit } from '@angular/core';
import { CLASSES_MAP_PAIR } from './button.const';
import { injectButton } from './button.factory';
import { ButtonAppearance } from './button.type';
import { InputBoolean } from '../../utils';

@Component({
  selector: `
    button[xo-raised-button],
    button[xo-icon-button],
    button[xo-fab-icon],
    button[xo-outlined-button],
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class CoreButtonComponent implements OnInit {
  static ngAcceptInputType_disabled: boolean | string;
  static ngAcceptInputType_withShadow: boolean | string;

  private readonly el = inject(ElementRef<HTMLButtonElement>);
  private readonly buttonConfig = injectButton();

  @HostBinding('disabled')
  @Input() @InputBoolean() disabled = false;

  @HostBinding('attr.data-with-shadow')
  @Input() @InputBoolean() withShadow = this.buttonConfig.shadow || false;

  @HostBinding('attr.data-appearance')
  @Input() appearance: ButtonAppearance = 'default';

  @HostBinding('class') class = 'xo-button';

  ngOnInit() {
    for (const pair of CLASSES_MAP_PAIR) {
      if (this.hasAttr(pair.selector)) {
        this.el.nativeElement.classList.add(...pair.classes);
      }
    }
  }

  private hasAttr(selector: string) {
    return this.el.nativeElement.hasAttribute(selector);
  }
}

