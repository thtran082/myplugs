// see the built-in configuration: https://shepherdjs.dev/docs/tutorial-02-usage.html
import Shepherd from 'shepherd.js';

export interface XoShepherdConfig {
  steps: Array<Omit<Shepherd.Step, 'relevantElements'> & { relevantElements?: string[] }>;
  scrollLock: boolean;
  doNotShowAgain?: boolean;
  attachTo: { element: string; on: string };
  classes: string;
  targetClasses: string;
}
