import { Question } from './Question'

export interface QuestionState extends Question {
  answers: string[]
}
