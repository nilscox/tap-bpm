import { configureSofterStore } from '@softer-components/redux-adapter';

import { tapBpmComponentDef } from './components/tap-bpm/tap-bpm.component.ts';

export const store = configureSofterStore(tapBpmComponentDef);
