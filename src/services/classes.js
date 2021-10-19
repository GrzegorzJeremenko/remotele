const config = require('@/services/config.js')
const axios = require('axios')

const token = localStorage.getItem('token')

const getGroups = () => {
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

const createGroup = (name, subject, emoji) => {
	return new Promise((resolve, reject) => {
        let body = {
            name,
            emoji,
            subject
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

export { getGroups, createGroup }