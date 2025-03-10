import { PropsWithChildren, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@app/store'
import { Spinner } from '@telegram-apps/telegram-ui'
import { CLOUD_KEY } from '@shared/config'
import { useNavigate } from 'react-router-dom'
import { onChangeManagerId } from '@features/team/model/team.slice.ts'

interface PropsType {}

export const LoadData = ({ children }: PropsWithChildren<PropsType>) => {
  const isLoading = useAppSelector((state) => state.bootstrapStatic.loading)
  const instanceCloud = useAppSelector((state) => state.cloud.instance)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [id, setId] = useState<number>()
  useEffect(() => {
    instanceCloud?.get(CLOUD_KEY.manager).then((res) => {
      if (res) {
        setId(+res)
        dispatch(onChangeManagerId(+res))
      }
    })
  }, [instanceCloud])

  useEffect(() => {
    !isLoading && navigate('/main')
  }, [id, isLoading])

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          position: 'fixed',
          inset: 0,
        }}
      >
        <Spinner size={'l'} />
      </div>
    )
  }

  return <div>{children}</div>
}
