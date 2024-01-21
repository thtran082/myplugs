import { inject, InjectionToken, InjectOptions, Provider } from '@angular/core';

function createCollapsibleMenuToken() {
  const token = new InjectionToken<number>('COLLAPSIBLE_MENU_DURATION_MS', {
    factory: () => 50,
  });

  const provideCollapsibleMenu = (useValue: number): Provider => ({ provide: token, useValue });
  const injectCollapsibleMenu = (config: InjectOptions = {}) => {
    return inject(token, config);
  };

  return { provideCollapsibleMenu, injectCollapsibleMenu };
}

export const { provideCollapsibleMenu, injectCollapsibleMenu } = createCollapsibleMenuToken();
