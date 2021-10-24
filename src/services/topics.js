const config = require('@/services/config.js')
const axios = require('axios')

const getTopics = () => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
		axios({
			method: 'GET',
			url: `${ config.serverAdress }/api/v1/topics`,
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

const createTopic = (name, description) => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
        let body = {
            name,
            description,
            components: [
                {
                    type: 'text',
                    data: {
                        content: name,
                        font: {
                            size: '30',
                            color: '#000000',
                            bold: true,
                            italic: false,
                            underline: false,
                        },
                        align: 'justify'
                    }
                }
            ]
        }

		axios({
			method: 'POST',
			url: `${ config.serverAdress }/api/v1/topics`,
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

const getTopic = (_id) => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
		axios({
			method: 'GET',
			url: `${ config.serverAdress }/api/v1/topics/${ _id }`,
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

const updateTopic = (_id, topic) => {
	const token = localStorage.getItem('token')
    let body = {
        components: topic.components,
        name: topic.name,
        description: topic.description
    }

	return new Promise((resolve, reject) => {
		axios({
			method: 'PATCH',
			url: `${ config.serverAdress }/api/v1/topics/${ _id }`,
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

const deleteTopic = (topic) => {
	const token = localStorage.getItem('token')

	return new Promise((resolve, reject) => {
		axios({
			method: 'DELETE',
			url: `${ config.serverAdress }/api/v1/topics/${ topic._id }`,
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

export { getTopics, createTopic, getTopic, updateTopic, deleteTopic }