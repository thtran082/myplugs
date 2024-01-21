import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[xoReorderItem]',
  standalone: true,
})
export class CoreReorderItemDirective<TItem> {
  static ngTemplateContextGuard<TContextItem>(
    _: CoreReorderItemDirective<TContextItem>,
    ctx: unknown,
  ): ctx is { $implicit: TContextItem; index: number } {
    return true;
  }
}

