import React from 'react'

interface Props {
  question: string
  answers: string[]
  callback: (e: React.FormEvent) => void
  userAnswer: string
  questionNumber: number
  totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div>
      <p className='number'>
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer, index) => {
          return (
            <div>
              <button disabled={userAnswer ? true : false} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionCard
