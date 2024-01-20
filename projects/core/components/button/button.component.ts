import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[xo-raised-button]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class CoreButtonComponent {

}
