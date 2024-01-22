import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectStyleManager, prebuiltThemes } from '../style-manager';
import {CoreButtonComponent} from "@myplugs/core/components/button";

@Component({
  selector: 'myplugs-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  imports: [
    NgForOf,
    CoreButtonComponent,
  ],
})
export class NavbarComponent {
  private readonly styleManager = injectStyleManager();

  readonly prebuiltThemes = prebuiltThemes;

  constructor() {
    this.prebuiltThemes.forEach(theme => {
      if (theme.default) this.onChange(theme.name);
    })
  }

  onChange(theme: string) {
    this.styleManager.setStyle('theme', `${theme}.css`)
  }
}
