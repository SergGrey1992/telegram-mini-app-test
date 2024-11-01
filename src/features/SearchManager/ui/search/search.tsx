import { ChangeEvent, PropsWithChildren, useState } from 'react'
import { Button, Input } from '@telegram-apps/telegram-ui'

import styles from './Search.module.css'
import { useAppDispatch, useAppSelector } from '@app/store'
import { searchManager } from '@features/SearchManager'
import { useNavigate } from 'react-router-dom'
import { onChangeManagerId } from '@features/team/model/team.slice'
import { CLOUD_KEY } from '@shared/config'

interface SearchPropsType {
  buttonText: string
}

export const Search = ({ buttonText }: PropsWithChildren<SearchPropsType>) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const managerId = useAppSelector((state) => state.common.primary.managerId)
  const instanceCloud = useAppSelector((state) => state.cloud.instance)
  const [error, setError] = useState(false)

  const searchAction = async () => {
    if (buttonText === 'Change') {
      instanceCloud?.delete(CLOUD_KEY.manager)
    }
    const resp = await dispatch(searchManager({ managerId }))
    if (!searchManager.fulfilled.match(resp)) {
      setError(true)
      return
    }
    if (searchManager.fulfilled.match(resp)) {
      instanceCloud?.set(
        CLOUD_KEY.manager,
        JSON.stringify(resp.meta.arg.managerId)
      )
      navigate('/main')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if (/^\d*$/.test(value)) {
      dispatch(onChangeManagerId(+value))
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <Input
          header="Input"
          placeholder={'Enter your team ID'}
          value={managerId}
          type={'text'}
          status={error ? 'error' : 'default'}
          onChange={handleInputChange}
        />
        <Button mode={'filled'} size={'l'} onClick={searchAction}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
