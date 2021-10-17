const config = require('@/services/config.js')
const axios = require('axios')

const login = (email, password) => {
	return new Promise((resolve, reject) => {
		let body = {
			email,
			password
		}

		axios({
			method: 'POST',
			url: `${ config.serverAdress }/api/v1/users/login`,
			data: body
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				case 400:
					reject(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

const register = (email, fullname, password) => {
	return new Promise((resolve, reject) => {
		let body = {
			email,
			password,
			fullname
		}

		axios({
			method: 'POST',
			url: `${ config.serverAdress }/api/v1/users`,
			data: body
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				case 400:
					reject(res.data.error)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

const recover = (email) => {
	return new Promise((resolve, reject) => {
		let body = {
			email
		}

		axios({
			method: 'POST',
			url: `${ config.serverAdress }/api/v1/users/recover`,
			data: body
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				case 400:
					reject(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

const reset = (password, token) => {
	return new Promise((resolve, reject) => {
		let body = {
			password,
			token
		}

		axios({
			method: 'POST',
			url: `${ config.serverAdress }/api/v1/users/reset`,
			data: body
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				case 400:
					reject(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

export { login, register, recover, reset }