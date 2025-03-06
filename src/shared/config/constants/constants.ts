export enum CHIPS_LIST {
  bboost = ' Bench Boost',
  '3xc' = 'Triple Captain',
  wildcard = 'Wildcard',
  freehit = 'Free Hit',
  manager = 'Assistant Manager',
}

export type ChipListType = keyof typeof CHIPS_LIST

export enum CLOUD_KEY {
  manager = 'manager-id',
}

export const ShortPosition: { [key: number]: string } = {
  1: 'GKP',
  2: 'DEF',
  3: 'MID',
  4: 'FWD',
  5: 'MNG',
}
