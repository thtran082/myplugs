import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import Shepherd from 'shepherd.js';
import { XoShepherdConfig } from './shepherd';
import { injectShepherd } from './shepherd.factory';


@Injectable()
export class ShepherdService implements OnDestroy {
  private _shepherd: Shepherd = null;
  private _overlayPane: HTMLDivElement = null;
  private readonly shepherdConfig = injectShepherd();

  // see https://shepherdjs.dev/docs/Step.html
  private _defaultConfig: any = {};

  afterClosed$ = new Subject<unknown>();

  constructor() {
    this._defaultConfig = {
      classes: 'shepherd-cfa shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      showCancelLink: true,
      scrollTo: true,
      scrollToHandler: (e: HTMLElement) => e.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      buttons: [
        {
          action: this._closeShepherd,
          classes: 'btn-theplug w-50',
          text: 'ok',
        },
      ],
      ...this.shepherdConfig,
    };
  }

  /**
   * Setup shepherd
   * @param config - see https://shepherdjs.dev/docs/Step.html
   */
  addSteps(config?: Partial<XoShepherdConfig>): ShepherdService {
    this._defaultConfig = this._mergeDefaultConfig(this._defaultConfig, config);
    window['shepherd'] = this._shepherd = new Shepherd.Tour({
    });
    this._addSteps(config.steps);
    return this;
  }

  start() {
    this._registerEvent();
    this._shepherd.start();
    return this;
  }

  ngOnDestroy() {
    this._closeShepherd();
  }

  onDoNotShowAgain$() {
    const el = document.querySelector('.xo-shepherd-remember-choice #shepherd-checkbox') as HTMLInputElement;
    return fromEvent(el, 'change').pipe(map(() => el.checked));
  }

  private _addSteps(steps: ShepherdConfig['steps']) {
    steps.forEach((step) => {
      this._shepherd.addStep({
        text: this.commonService.resolveMessage(step.text),
        title: this.commonService.resolveMessage(step.title),
        attachTo: step.attachTo,
        relevantElements: step.relevantElements,
      });
    });
  }

  private _closeShepherd = () => {
    if (!this._shepherd) return;
    this._shepherd.next();
  };

  private _registerEvent() {
    const config = this._defaultConfig;
    this._shepherd.on('show', ({ tour }) => {
      // remove old currentStep before shepherdJs rendered the DOM
      if (tour.currentStep) this._releaseHighlightElements(tour.currentStep.options.relevantElements);
      // add new relevantElements after shepherdJs rendered the DOM
      setTimeout(() => this._markHighlight(tour.currentStep.options.relevantElements));
    });

    this._shepherd.on('inactive', ({ tour }) => {
      // remove relevantElements because the "show" event will not be called the last time
      this._releaseHighlightElements(tour.currentStep.options.relevantElements);
    });

    this._shepherd.on('start', () => {
      this._attachTourOverlay();
      if (config.scrollLock) ShepherdScrollDisabledHandler.lockScroll();
    });
    ['complete', 'cancel'].forEach((event) => {
      this._shepherd.on(event, () => {
        this._shepherd = undefined;
        document.body.removeChild(this._overlayPane);
        ShepherdScrollDisabledHandler.releaseScroll();
        this.afterClosed$.next();
      });
    });
  }

  private _mergeDefaultConfig<T extends ShepherdConfig>(original: T, extra: T): T {
    return {
      ...original,
      ...extra,
      classes: `${original.classes} ${extra.classes || ''}`,
    };
  }

  private _attachTourOverlay() {
    this._overlayPane = document.createElement('div');
    this._overlayPane.classList.add('tour-overlay');
    this._overlayPane.addEventListener('click', this._closeShepherd);
    document.body.appendChild(this._overlayPane);
  }

  private _markHighlight(elements: string[]) {
    (elements || []).forEach((element) => {
      const el = document.querySelector(element);
      if (!el) return;
      el.classList.add('shepherd-target', 'shepherd-enabled');
    });
  }

  private _releaseHighlightElements(elements: string[]) {
    (elements || []).forEach((element) => {
      const el = document.querySelector(element);
      if (!el) return;
      el.classList.remove('shepherd-target', 'shepherd-enabled');
    });
  }
}
