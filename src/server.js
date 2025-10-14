/*
import http from 'http'

const server = http.createServer((req, res) => {
	res.end('Hello, World!')
})

server.listen(process.env.PORT || 3000, () => {
	console.log('Server is walking...')
})
*/

import express from 'express'
import questionRoutes from './routes/questionRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

/*
app.get('/questions', (req, res) => {
	res.status(200).send([{
		question: 'Quelle est la capitale de la France ?',
		answer: 'Paris',
	}])
})

app.post('/questions', (req, res) => {
	const { question, answer } = req.body

	if (!question || !answer) {
		res.status(400).send({ message: 'Question and answer are required' })
	}

	res.status(201).send({ message: 'Question created' })
})

app.delete('/questions/:id', (req, res) => {
	const { id } = req.params

	res.status(200).send({ message: `Question ${id} deleted` })
})
*/
app.use('/api/questions', questionRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
