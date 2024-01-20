import { ButtonConfig } from './button.type';

export const defaultConfigLoader: ButtonConfig = {
  shadow: false,
  borderRadius: true,
};

  export const CLASSES_MAP_PAIR: {
  selector: `xo-${string}`,
  classes: string[],
}[] = [
  {
    selector: 'xo-raised-button',
    classes: ['xo-raised-button'],
  },
  {
    selector: 'xo-fab-icon',
    classes: ['xo-fab-icon'],
  },
  {
    selector: 'xo-outlined-button',
    classes: ['xo-outlined-button'],
  },
  {
    selector: 'xo-icon-button',
    classes: ['xo-icon-button'],
  },
];
