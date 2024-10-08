import { ChipListType } from '@shared/config/constants/constants'

export interface Picks {
  active_chip: Nullable<ChipListType>
  automatic_subs: AutomaticSub[]
  entry_history: EntryHistory
  picks: Pick[]
}

interface AutomaticSub {
  entry: number
  element_in: number
  element_out: number
  event: number
}

interface EntryHistory {
  bank: number
  event: number
  event_transfers: number
  event_transfers_cost: number
  overall_rank: number
  percentile_rank: number
  points: number
  points_on_bench: number
  rank: number
  rank_sort: number
  total_points: number
  value: number
}

export interface Pick {
  element: number
  position: number
  multiplier: number
  is_captain: boolean
  is_vice_captain: boolean
}
