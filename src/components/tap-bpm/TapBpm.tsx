import { useSofter } from '@softer-components/redux-adapter';

import type { TapBpmContract } from './tap-bpm.component.ts';

export function TapBpm({ path = '/' }: { path?: string }) {
  const [{ bpm, confidence }, { bpmTapped, resetRequested }] = useSofter<TapBpmContract>(path);

  const handleTap: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    bpmTapped();

    const button = event.currentTarget;

    button.classList.add('tapped');
    requestAnimationFrame(() => button.classList.remove('tapped'));
  };

  return (
    <div className="tap-bpm">
      <button
        aria-label="Tap BPM button"
        aria-placeholder="Tap here"
        data-confidence={confidence}
        onClick={handleTap}
        className="tap-button"
      >
        {bpm}
      </button>

      <button onClick={() => resetRequested()} className="reset-button">
        Reset
      </button>
    </div>
  );
}
