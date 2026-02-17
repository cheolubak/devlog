import type { Modal } from '@devlog/domain';

import { atom } from 'jotai';

export const modalStore = atom<Modal[]>([]);
