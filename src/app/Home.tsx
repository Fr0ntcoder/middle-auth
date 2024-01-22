'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthService } from 'service/auth.service'

import CardItem from '@/components/СardItem'

import styles from './Home.module.scss'

export function Home() {
	const { push } = useRouter()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) push('/login')
	}, [])

	const { data, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: () => AuthService.users(),
	})

	const list = data?.map((item) => <CardItem item={item} key={item.id} />)
	return (
		<div className={styles.wrap}>
			<h2 className={styles.title}>Главная</h2>
			{isLoading ? 'Идет загрузка' : <div className={styles.list}>{list}</div>}
		</div>
	)
}
