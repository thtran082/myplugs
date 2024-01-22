import { inject, Injectable, InjectOptions } from '@angular/core';

function getLinkElement(key: string) {
  return getExistedElement(key) || createElement(key);
}

function getExistedElement(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassName(key)}`)
}

function createElement(key: string) {
  const ref = document.createElement('link');
  ref.setAttribute('rel', 'stylesheet');
  ref.classList.add(getClassName(key));
  document.head.appendChild(ref);
  return ref;
}

function getClassName(key: string) {
  return `style-manager-${key}`;
}

function createStyleManager() {
  @Injectable({ providedIn: 'root' })
  class StyleManagerService {
    setStyle(key: string, href: string) {
      getLinkElement(key).setAttribute('href', href);
    }

    /**
     * Remove the stylesheet with the specified key.
     */
    removeStyle(key: string) {
      const existingLinkElement = getExistedElement(key);
      if (existingLinkElement) {
        document.head.removeChild(existingLinkElement);
      }
    }
  }

  const injectStyleManager = (withConfig: InjectOptions = {}) => {
    const { removeStyle, setStyle } = inject(StyleManagerService, withConfig)!;
    return { removeStyle, setStyle };
  }

  return { injectStyleManager };
}

export const { injectStyleManager } = createStyleManager();
