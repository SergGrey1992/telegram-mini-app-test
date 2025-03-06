import { useAppSelector } from '@app/store'

import { Title, IconButton } from '@telegram-apps/telegram-ui'
import styles from './PickTotalPoints.module.css'
import { RefreshTeam } from '@features/RefreshTeam'

export const PickTotalPoints = ({ isPrimary }: { isPrimary: boolean }) => {
  const teamInfo = useAppSelector((state) => state.team.data) ?? []
  const stats = teamInfo.map((t) => ({
    multiplier: t.multiplier,
    points: t.stats.total_points,
  }))

  const total__ = stats.reduce((acc, item) => {
    const aa = item.multiplier * item.points
    acc += aa

    return acc
  }, 0)

  return (
    <div className={styles.container}>
      <Title weight={'2'} level={'1'}>
        Points: {total__}
      </Title>
      <RefreshTeam />
      {!isPrimary && <BackMyTeam />}
    </div>
  )
}

const BackMyTeam = () => {
  return <IconButton>Back to my team</IconButton>
}
