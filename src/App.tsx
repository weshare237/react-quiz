import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { QuestionState } from './models/QuestionState'
import { Answer } from './models/Answer'
import { fetchQuizQuestions, DIFFICULTY } from './API'
import { GlobalStyle, Wrapper } from './App.styles'

const TOTAL_QUESTIONS = 20

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)

  console.log(questions)

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      DIFFICULTY.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!gameOver) {
      // Get user's answer
      const answer = e.currentTarget.value
      // Check user answer with correct answer
      if (answer === questions[questionNumber].correct_answer) {
        const userAnswer = {
          question: questions[questionNumber].question,
          answer,
          correct: true,
          correctAnswer: questions[questionNumber].correct_answer,
        }
        setScore(score + 1)
        setUserAnswers([...userAnswers, userAnswer])
      } else {
        const userAnswer = {
          question: questions[questionNumber].question,
          answer,
          correct: false,
          correctAnswer: questions[questionNumber].correct_answer,
        }
        setUserAnswers([...userAnswers, userAnswer])
      }
    }
  }

  const nextQuestion = (): void => {
    // Move on to the next question if not the last
    if (questionNumber !== TOTAL_QUESTIONS - 1) {
      setQuestionNumber(questionNumber + 1)
    } else {
      setGameOver(true)
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className='start' onClick={startQuiz}>
            Start Quiz
          </button>
        )}
        {!gameOver && (
          <p className='score'>
            Score: {score} / {TOTAL_QUESTIONS}
          </p>
        )}
        {loading && <p>Loading Questions ...</p>}
        {!gameOver && !loading && (
          <QuestionCard
            questionNumber={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === questionNumber + 1 &&
          questionNumber + 1 !== TOTAL_QUESTIONS && (
            <button className='next' onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </React.Fragment>
  )
}

export default App
