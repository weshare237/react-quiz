import axios from 'axios'
import { Question } from './models/Question'
import { QuestionState } from './models/QuestionState'
import { shuffleArray } from './utils'

export enum DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: DIFFICULTY
): Promise<QuestionState[]> => {
  const baseURL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`

  const data = await (await axios.get(baseURL)).data

  const finalData = data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }))

  return finalData
}
