import { PropsWithChildren, useMemo } from 'react'
import { TeamFieldType } from '@features/TeamField'
import { Player } from '@features/TeamField/ui/Player/ui/Player.tsx'
import { Card } from '@telegram-apps/telegram-ui'
import styles from './BenchField.module.css'

interface BenchFieldPropsType {
  data: TeamFieldType[]
}

export const BenchField = ({
  data,
}: PropsWithChildren<BenchFieldPropsType>) => {
  console.log('data', data)
  const trainer = useMemo(() => {
    return data.filter((i) => i.player.element_type === 5)
  }, [data])
  return (
    <Card className={styles.container}>
      {trainer.length > 0 && <Player {...trainer[0]} isBench />}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {data
          .filter((i) => i.player.element_type !== 5)
          .map((pl) => {
            return <Player key={`player-${pl.element}`} {...pl} isBench />
          })}
      </div>
    </Card>
  )
}
