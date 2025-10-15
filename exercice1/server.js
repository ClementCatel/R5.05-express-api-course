import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { randomUUID } from 'crypto'

const PORT = process.env.PORT || 3000
const DATA_FILE = process.env.DATA_FILE || 'todos.json'
const DATA_FILE_PATH = new URL(`./${DATA_FILE}`, import.meta.url).pathname

const app = express()
app.use(express.json())

async function readTodos() {
	try {
		const content = await readFile(DATA_FILE_PATH, 'utf-8')
		return JSON.parse(content)
	} catch (error) {
		if (error.code === 'ENOENT') {
			return []
		}
		throw new Error('Could not read todos')
	}
}

app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params

		const todos = await readTodos()

		const todo = todos.find((todo) => todo.id === id)
		if (!todo) {
			return res.status(404).send({
				error: 'Not found',
			})
		}

		res.send(todo)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/todos', async (req, res) => {
	try {
		const { text, completed = false } = req.body

		if (!text.trim() || typeof completed !== 'boolean') {
			return res.status(400).send({ error: 'Invalid body' })
		}

		const todos = await readTodos()

		const newTodo = {
			id: randomUUID(),
			text: text.trim(),
			completed,
		}

		todos.push(newTodo)
		await writeFile(DATA_FILE_PATH, JSON.stringify(todos, null, 2))
		res.status(201).send(newTodo)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.patch('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { completed } = req.body

		if (typeof completed !== 'boolean') {
			return res.status(400).send({ error: 'Invalid body' })
		}

		const todos = await readTodos()

		const todoIndex = todos.findIndex((todo) => todo.id === id)
		if (todoIndex === -1) {
			return res.status(404).send({ error: 'Not found' })
		}
		todos[todoIndex].completed = completed

		await writeFile(DATA_FILE_PATH, JSON.stringify(todos, null, 2))
		res.send(todos[todoIndex])
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/stats', async (req, res) => {
	const todos = await readTodos()
	res.send({
		todosCount: todos.length,
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
