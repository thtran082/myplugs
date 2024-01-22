import { inject, InjectionToken, InjectOptions, Provider } from '@angular/core';
import { XoShepherdConfig } from './shepherd';

function createInjectionToken() {
  const token = new InjectionToken<Partial<XoShepherdConfig>>(
    'SHEPHERD_CONFIG',
    { factory: () => ({ scrollLock: true }) },
  );
  const provideShepherd = (useValue: Partial<XoShepherdConfig>): Provider => ({ provide: token, useValue });
  const injectShepherd = (withConfig: InjectOptions = {}) => inject(token, withConfig);

  return { provideShepherd, injectShepherd };
}

export const { provideShepherd, injectShepherd } = createInjectionToken();
