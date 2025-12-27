import { useSofter } from '@softer-components/redux-adapter';

import type { CounterContract } from './counter.component.ts';

export const Counter = ({ path = '/' }: { path?: string }) => {
  const [{ count }, { incrementRequested, decrementRequested }] = useSofter<CounterContract>(path);

  return (
    <div>
      <div style={{ fontSize: '4em' }}>{count}</div>
      <div className="horizontal">
        <button
          aria-label="Decrement value"
          onClick={() => {
            decrementRequested();
          }}
        >
          -
        </button>
        <button
          aria-label="Increment value"
          onClick={() => {
            incrementRequested();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
