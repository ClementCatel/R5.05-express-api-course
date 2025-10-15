import { Router } from 'express'
import {
	createQuestion,
	deleteQuestion,
	getQuestions,
} from '../controllers/questionController'

const router = Router()

/*
router.get('/', (req, res) => {
	res.status(200).send([
		{
			question: 'Quelle est la capitale de la France ?',
			answer: 'Paris',
		},
	])
})

router.post('/', (req, res) => {
	const { question, answer } = req.body

	if (!question || !answer) {
		res.status(400).send({ message: 'Question and answer are required' })
	}

	res.status(201).send({ message: 'Question created' })
})

router.delete('/:id', (req, res) => {
	const { id } = req.params

	res.status(200).send({ message: `Question ${id} deleted` })
})
*/

router.get('/', getQuestions)
router.post('/', createQuestion)
router.delete('/:id', deleteQuestion)

export default router
