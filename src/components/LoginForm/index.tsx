'use client'

import { useMutation } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthService, TFormData } from 'service/auth.service'

import styles from './LoginForm.module.scss'

type TLoginForm = {
	isLogin: boolean
}

const LoginForm: FC<TLoginForm> = ({ isLogin }) => {
	const { push } = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TFormData>({
		mode: 'onChange',
	})

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: TFormData) => AuthService.login(data),
		onSuccess(data) {
			localStorage.setItem('token', data.accessToken)
			reset()
			push('/')
		},
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: TFormData) => AuthService.register(data),
		onSuccess(data) {
			localStorage.setItem('token', data.accessToken)
			reset()
			push('/')
		},
	})

	const isPending = isLoginPending || isRegisterPending

	const onSubmit: SubmitHandler<TFormData> = (data) => {
		isLogin ? mutateLogin(data) : mutateRegister(data)
	}

	return (
		<div className={styles.wrap}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h3 className={styles.form__title}>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</h3>
				<label className={styles.form__label}>
					<span className={styles.form__text}>Email</span>
					<input
						type="text"
						placeholder="Введите email"
						{...register('email', { required: true, pattern: /^\S+@\S+$/i })}
						className={clsx(styles.input, {
							[styles.error]: errors.email,
						})}
					/>
				</label>
				<label className={styles.form__label}>
					<span className={styles.form__text}>Пароль</span>
					<input
						type="password"
						placeholder="Введите пароль"
						{...register('password', { required: true })}
						className={clsx(styles.input, {
							[styles.error]: errors.password,
						})}
					/>
				</label>
				<button type="submit" className={styles.form__btn}>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</form>
		</div>
	)
}

export default LoginForm
