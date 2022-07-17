import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { Question } from './models/Question'
import { fetchQuizQuestions, DIFFICULTY } from './API'

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)

  const startQuiz = (): void => {}

  const checkAnswer = (e: React.FormEvent): void => {}

  const nextQuestion = (): void => {}

  fetchQuizQuestions(20, DIFFICULTY.EASY)

  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      <button className='start' onClick={startQuiz}>
        Start Quiz
      </button>
      <p className='score'>Score:</p>
      <p>Loading Questions ...</p>
      {/* <QuestionCard
        questionNumber={questionNumber + 1}
        totalQuestions={questions.length}
        question={questions[questionNumber].question}
        answers={questions[questionNumber].answers}
        userAnswer={userAnswers ? userAnswers[questionNumber] : ''}
        callback={checkAnswer}
      /> */}
      <button className='next' onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  )
}

export default App
