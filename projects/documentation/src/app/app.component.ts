import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreButtonComponent } from '@myplugs/core/components/button';
import { CoreReorderGridComponent, CoreReorderItemDirective } from '@myplugs/core/components/reorder-grid';

@Component({
  selector: 'myplugs-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    CoreButtonComponent,
    CoreReorderGridComponent,
    CoreReorderItemDirective,
    JsonPipe,
  ],
})
export class AppComponent {
  title = 'documentation';

  items = [1,2,3,4,5,6,7,8];
}
