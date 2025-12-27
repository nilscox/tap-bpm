import type { ComponentDef } from '@softer-components/types';

type Confidence = 'low' | 'medium' | 'high';

type TapBpmEvents = {
  bpmTapped: { payload: undefined };
  resetRequested: { payload: undefined };
};

export type TapBpmContract = {
  state: { taps: number[] };
  events: TapBpmEvents;
  values: { bpm: number | undefined; confidence: Confidence | undefined };
  children: Record<string, never>;
};

export const tapBpmComponentDef: ComponentDef<TapBpmContract> = {
  initialState: {
    taps: [],
  },
  selectors: {
    bpm: (state) => computeBpm(state.taps),
    confidence: (state) => computeConfidence(state.taps),
  },
  uiEvents: ['bpmTapped', 'resetRequested'],
  updaters: {
    bpmTapped: ({ state }) => {
      state.taps.push(Date.now());
    },
    resetRequested: ({ state }) => {
      state.taps = [];
    },
  },
};

function computeBpm(taps: number[]) {
  const count = taps.length;
  const firstTap = taps[0] ?? 0;
  const lastTap = taps[taps.length - 1] ?? 0;

  if (taps.length < 2) {
    return;
  }

  return Math.round(60_000 / ((lastTap - firstTap) / (count - 1)));
}

function computeConfidence(taps: number[]): Confidence | undefined {
  const values = taps.slice(1).map((tap, index) => tap - (taps[index] ?? 0));
  const count = taps.length;

  if (count < 3) {
    return undefined;
  }

  if (count < 5) {
    return 'medium';
  }

  const average = values.reduce((a, b) => a + b, 0) / values.length;

  const standardDeviation = Math.sqrt(
    values
      .map((value) => Math.abs(average - value))
      .map((value) => value * value)
      .reduce((a, b) => a + b, 0) / values.length
  );

  const error = standardDeviation / average;

  if (error >= 20 / 100) {
    return 'low';
  }

  if (error >= 5 / 100) {
    return 'medium';
  }

  return 'high';
}
