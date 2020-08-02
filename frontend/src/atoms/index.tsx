import { atom } from 'recoil';

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

export const selectedProviderState = atom<string[]>({
  key: 'selectedProviderState',
  default: [],
});

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: new Date(),
});

export const availabilityState = atom<AvailabilityItem[]>({
  key: 'availabilityState',
  default: [],
});

export const selectedHairHourState = atom({
  key: 'selectedHairHourState',
  default: '50',
});

export const selectedBeardHourState = atom({
  key: 'selectedBeardHourState',
  default: '50',
});
