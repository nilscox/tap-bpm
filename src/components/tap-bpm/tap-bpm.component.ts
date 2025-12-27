import type { ComponentDef } from '@softer-components/types';

type TapBpmEvents = {
  bpmTapped: { payload: undefined };
  resetRequested: { payload: undefined };
};

export type TapBpmContract = {
  state: { taps: number[] };
  events: TapBpmEvents;
  values: { bpm: number | undefined };
  children: Record<string, never>;
};

export const tapBpmComponentDef: ComponentDef<TapBpmContract> = {
  initialState: {
    taps: [],
  },
  selectors: {
    bpm: (state) => computeBpm(state.taps),
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
