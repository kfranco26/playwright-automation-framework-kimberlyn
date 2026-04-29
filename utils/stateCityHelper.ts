import { getRandomItem } from './randomHelpers';

export const stateCityMap = {
  NCR: ['Delhi', 'Gurgaon', 'Noida'],
  'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
  Haryana: ['Karnal', 'Panipat'],
  Rajasthan: ['Jaipur', 'Jaiselmer'],
} as const;

export type State = keyof typeof stateCityMap;
export type City = (typeof stateCityMap)[State][number];

export function getRandomStateAndCity(): { state: State; city: City } {
  const state = getRandomItem(Object.keys(stateCityMap) as State[]);
  const city = getRandomItem(stateCityMap[state]);

  return { state, city };
}
