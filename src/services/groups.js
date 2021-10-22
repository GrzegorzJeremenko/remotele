const config = require('@/services/config.js')
const axios = require('axios')

const getGroups = () => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
		axios({
			method: 'GET',
			url: `${ config.serverAdress }/api/v1/groups`,
			headers: {
                'Authorization': `Bearer ${ token }`
            }
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				case 404:
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

const getGroup = (_id) => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
		axios({
			method: 'GET',
			url: `${ config.serverAdress }/api/v1/groups/${_id}`,
			headers: {
                'Authorization': `Bearer ${ token }`
            }
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

const createGroup = (name, subject, emoji) => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
        let body = {
            name,
            emoji,
            subject,
			description: ''
        }

		axios({
			method: 'POST',
			url: `${ config.serverAdress }/api/v1/groups`,
			headers: {
                'Authorization': `Bearer ${ token }`
            },
            data: body
		})
		.then((res) => {
			switch(res.status) {
				case 201:
					resolve(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

const deleteTodo = (todo_id, group_id) => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {

		axios({
			method: 'DELETE',
			url: `${ config.serverAdress }/api/v1/groups/${ group_id }/todos/${ todo_id }`,
			headers: {
                'Authorization': `Bearer ${ token }`
            }
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

const addTodo = (text, group_id) => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
		let body = {
			text
		}

		axios({
			method: 'POST',
			url: `${ config.serverAdress }/api/v1/groups/${ group_id }/todos`,
			headers: {
                'Authorization': `Bearer ${ token }`
            },
            data: body
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

export { getGroups, createGroup, getGroup, deleteTodo, addTodo }