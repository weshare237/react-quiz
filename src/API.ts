import axios from 'axios'
import { QuestionState } from './models/QuestionStats'
import { shuffleArray } from './utils'

export enum DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: DIFFICULTY
) => {
  const baseURL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`

  const data = await (await axios.get(baseURL)).data

  const finalData = data.results.map((question: QuestionState) => {
    return {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }
  })

  console.log(finalData)
}
