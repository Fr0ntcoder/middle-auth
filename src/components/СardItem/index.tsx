import { FC } from 'react'

import { TUser } from '@/utils/types'

import styles from './CardItem.module.scss'

type TCardItem = {
	item: TUser
}

const CardItem: FC<TCardItem> = ({ item }) => {
	return <div className={styles.root}>{item.name}</div>
}

export default CardItem
