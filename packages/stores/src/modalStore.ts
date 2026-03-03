import type { Modal } from '@devlog/domains';

import { atom } from 'jotai';

export const modalStore = atom<Modal[]>([]);
