import { atom } from 'recoil';

interface AvailabilityItem {
  hour: number;
  fullHour: any;
  fullHourAvailable: boolean;
  halfHour: any;
  halfHourAvailable: boolean;
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

export const dateBeardState = atom({
  key: 'dateBeardState',
  default: new Date(),
});

export const dateHairState = atom({
  key: 'dateHairState',
  default: new Date(),
});

export const selectedBeardState = atom({
  key: 'SelectedBeardState',
  default: '',
});

export const selectedHairState = atom({
  key: 'SelectedHairState',
  default: '',
});
