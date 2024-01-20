import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { XoSafeAny } from '../types';

function propDecoratorFactory<T, K>(name: string, fallback: (t: T) => K): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string | Symbol) {
    const privatePropName = `__xomad__prop-decorator__${propertyKey}`;
    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`${privatePropName} is already existed in ${target}, it will be overrided by ${name}`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
    });

    return {
      get(): string {
        return this[privatePropName];
      },
      set(value: T): void {
        (this as XoSafeAny)[privatePropName] = fallback(value);
      },
    };
  };
}

/**
 * Input decorator that handle getter/setter automatically, using angular/cdk coercion
 * @example
 * ```
 * // This is how we use it
 * @Input() @InputBoolean() loading: false = false;
 *
 * // This is how it works under the hood:
 * private __xomad__prop-decorator__loading = false;
 * @Input()
 * get loading() { return this.__xomad__prop-decorator__loading; }
 * set loading(value) { this.__xomad__prop-decorator__loading = value }
 * ```
 */
export function InputBoolean() {
  return propDecoratorFactory('InputBoolean', coerceBooleanProperty);
}

export function InputNumber() {
  return propDecoratorFactory('InputNumber', coerceNumberProperty);
}
