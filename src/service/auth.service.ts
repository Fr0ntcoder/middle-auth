import { API_URL } from 'constants/api.constants'

import { TUser } from '@/utils/types'

type TAuthResponse = {
	accessToken: string
	user: TUser
}

export type TFormData = {
	email: string
	password: string
}

export const AuthService = {
	async login(data: TFormData): Promise<TAuthResponse> {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			throw new Error('Ошибка при выполнении запроса')
		}

		const responseData: TAuthResponse = await response.json()

		return responseData
	},

	async register(data: TFormData): Promise<TAuthResponse> {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			throw new Error('Ошибка при выполнении запроса')
		}

		const responseData: TAuthResponse = await response.json()

		return responseData
	},

	async users(): Promise<TUser[]> {
		const token = localStorage.getItem('token')

		const response = await fetch(`${API_URL}/auth/users`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Ошибка при выполнении запроса')
		}

		const responseData: TUser[] = await response.json()

		return responseData
	},
}
