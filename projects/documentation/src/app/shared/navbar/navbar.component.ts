import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectStyleManager, prebuiltThemes } from '../style-manager';

@Component({
  selector: 'myplugs-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  imports: [
    NgForOf,
  ],
})
export class NavbarComponent {
  private readonly styleManager = injectStyleManager();

  readonly prebuiltThemes = prebuiltThemes;

  onChange(theme: string) {
    this.styleManager.setStyle('theme', `${theme}.css`)
  }
}
