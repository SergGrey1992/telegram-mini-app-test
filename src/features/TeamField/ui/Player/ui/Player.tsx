import type { FC } from 'react'
import styles from './Player.module.css'
import { Caption, Modal, Subheadline, Title } from '@telegram-apps/telegram-ui'

import { type TeamFieldType } from '@features/TeamField'
import { MatchScore } from '../../MatchScore/MatchScore'
import { ShortPosition } from '@shared/config/constants/constants.ts'

interface PlayerProps extends TeamFieldType {
  isBench?: boolean
}

//https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3-66.png игроки
//https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3_1-66.png вратарь

export const Player: FC<PlayerProps> = ({
  player,
  stats,
  is_captain,
  is_vice_captain,
  multiplier,
  isBench = false,
}) => {
  // Функция для замены нижних подчеркиваний на пробелы
  const formatText = (text: string) => {
    return text.replace(/_/g, ' ')
  }
  //https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_17-220.webp //обычный игрок
  //https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_14_1-220.webp // вратарь
  //https://resources.premierleague.com/premierleague/photos/players/110x140/man44410.png // тренер
  const formImageUrl = `https://fantasy-api-blond.vercel.app/img//shirts/standard/shirt_${player.team_code}${player.element_type === 1 ? '_1' : ''}-220.webp`
  const formImageUrlTrainer = `https://fantasy-api-blond.vercel.app/resources/premierleague/photos/players/110x140/${player?.opta_code}.png`

  return (
    <>
      <Modal
        header={
          <Modal.Header>
            <Title level={'3'} weight={'2'}>
              {player.first_name} {player.second_name}
            </Title>
          </Modal.Header>
        }
        snapPoints={[1]}
        className={styles.modal}
        trigger={
          <button className={styles['container']}>
            <div className={styles['inner']}>
              {is_captain && (
                <div className={styles.label}>
                  <Caption level="2" weight="2">
                    C
                  </Caption>
                </div>
              )}
              {is_vice_captain && (
                <div className={styles.label}>
                  <Caption level="2" weight="2">
                    V
                  </Caption>
                </div>
              )}
              {isBench && (
                <div
                  style={{
                    marginBottom: 6,
                    textDecoration: 'underline',
                    textDecorationStyle: 'dotted',
                    fontSize: 12,
                    color: 'white',
                  }}
                >
                  {ShortPosition[player.element_type]}
                </div>
              )}
              <div className={styles.kit}>
                <img
                  src={
                    player?.element_type === 5
                      ? formImageUrlTrainer
                      : formImageUrl
                  }
                  alt="kit"
                />
              </div>
              <Caption level="1" weight="2" className={styles['name']}>
                {player.web_name}
              </Caption>
              <Caption level="1" weight="2" className={styles['points']}>
                {isBench ? stats.total_points : multiplier * stats.total_points}
              </Caption>
            </div>
          </button>
        }
      >
        <div
          style={{
            height: 'calc(var(--tg-viewport-height) / 2)',
          }}
        >
          <div>
            {stats.explain.map((ex, index) => {
              return (
                <div key={`explain-${index}`}>
                  <MatchScore fixture={ex.fixture} />
                  <div>
                    <div className={styles.headerTable}>
                      <Subheadline
                        className={styles.headerValue}
                        level={'1'}
                        weight={'2'}
                      >
                        Statistic
                      </Subheadline>
                      <Subheadline
                        className={styles.headerValue}
                        level={'1'}
                        weight={'2'}
                      >
                        Value
                      </Subheadline>
                      <Subheadline
                        className={styles.headerValue}
                        level={'1'}
                        weight={'2'}
                      >
                        Points
                      </Subheadline>
                    </div>
                    {ex.stats.map((st) => {
                      return (
                        <div
                          className={styles.bodyTable}
                          key={`explain-${index}-${st.identifier}`}
                        >
                          <Caption
                            className={styles.identifier}
                            level="1"
                            weight="3"
                          >
                            {formatText(st.identifier)}
                          </Caption>
                          <Caption level="1" weight="3">
                            {st.points}
                          </Caption>
                          <Caption level="1" weight="3">
                            {st.value}
                          </Caption>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </>
  )
}
