import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreButtonComponent } from '@myplugs/core/components';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CoreButtonComponent,
  ],
  selector: 'myplugs-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'documentation';
}
