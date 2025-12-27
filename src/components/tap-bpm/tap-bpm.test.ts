import { givenRootComponent } from '@softer-components/utils/test-utilities';
import { describe, it } from 'vitest';

import { addMilliseconds } from 'date-fns';
import { tapBpmComponentDef } from './tap-bpm.component';

/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

describe('tap-bpm', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    vi.setSystemTime(new Date(0));
  });

  function taps(test: { and: (arg: unknown) => void }, taps: number[]) {
    let now = 0;

    for (const tap of taps) {
      now += tap;
      vi.setSystemTime(addMilliseconds(new Date(0), now));
      test.and({ name: 'bpmTapped', componentPath: [], payload: undefined });
    }
  }

  it('initial state has no taps', () => {
    givenRootComponent(tapBpmComponentDef).thenExpect([]).bpm.toBeUndefined();
  });

  describe('bpm', () => {
    it('no bpm after a single tap', () => {
      givenRootComponent(tapBpmComponentDef)
        .when({
          name: 'bpmTapped',
          componentPath: [],
          payload: undefined,
        })
        .thenExpect([])
        .bpm.toBeUndefined();
    });

    it('bpm is 60 after two taps of 1000ms', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [1000, 1000]);

      test.thenExpect([]).bpm.toBe(60);
    });

    it('bpm is 100 after two taps of 600ms', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [600]);

      test.thenExpect([]).bpm.toBe(100);
    });

    it('bpm is rounded', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [601]);

      test.thenExpect([]).bpm.toBe(100);
    });

    it('bpm is 100 after taps of 3x610ms and 1x570ms', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [610, 610, 610, 570]);

      test.thenExpect([]).bpm.toBe(100);
    });
  });

  describe('confidence', () => {
    it('confidence is not defined when < 3 taps', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [600]);

      test.thenExpect([]).confidence.toBeUndefined();
    });

    it('confidence is low when error > 20%', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [100, 200, 300, 400]);

      test.thenExpect([]).confidence.toBe('low');
    });

    it('confidence is medium when < 5 taps', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [600, 600, 600]);

      test.thenExpect([]).confidence.toBe('medium');
    });

    it('confidence is medium when >= 5 taps and error >= 5%', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [100, 110, 120, 130]);

      test.thenExpect([]).confidence.toBe('medium');
    });

    it('confidence is high when >= 5 taps and error < 5%', () => {
      const test = givenRootComponent(tapBpmComponentDef).when({
        name: 'bpmTapped',
        componentPath: [],
        payload: undefined,
      });

      taps(test, [600, 601, 602, 603]);

      test.thenExpect([]).confidence.toBe('high');
    });
  });
});
