import { inject, InjectionToken, InjectOptions, Provider } from '@angular/core';
import { defaultConfigLoader } from './button.const';
import { ButtonConfig } from './button.type';

function createButtonToken() {
  const BUTTON_CONFIG = new InjectionToken<ButtonConfig>('BUTTON_CONFIG', {
    factory: () => defaultConfigLoader,
  });

  const provideButton = (useValue: Partial<ButtonConfig>): Provider => ({
    provide: BUTTON_CONFIG,
    useValue,
  });

  const injectButton = (withConfig: InjectOptions = {}) => {
    const token = inject(BUTTON_CONFIG, withConfig)!;
    return token;
  }

  return { provideButton, injectButton };
}

export const { provideButton, injectButton } = createButtonToken();
