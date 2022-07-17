import { DIFFICULTY } from '../API'

export interface Question {
  categorie: string
  correct_answer: string
  difficulty: DIFFICULTY
  incorrect_answers: string[]
  question: string
  type: string
}
