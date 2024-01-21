import { animate, AUTO_STYLE, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectCollapsibleMenu } from './collapsible-menu.factory';

@Component({
  selector: 'xo-collapsible-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'collapsible-menu.component.html',
  styleUrls: ['collapsible-menu.component.scss'],
  exportAs: 'xoCollapsibleMenu',
  imports: [

  ],
  animations: [
    trigger('openCloseMenu', [
      transition(':enter', [
        animate('{{ DEFAULT_DURATION_MS }}ms ease-in-out', style({ opacity: 1 , height: AUTO_STYLE })),
      ]),
      transition(':leave', [
        animate('{{ DEFAULT_DURATION_MS }}ms ease-in-out', style({ opacity: 0, height: 0 }))
      ])
    ])
  ],
})
export class CoreCollapsibleMenuComponent {
  static DEFAULT_DURATION_MS = injectCollapsibleMenu();
}
