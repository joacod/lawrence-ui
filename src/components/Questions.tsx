import { Message } from '../models/chat'
import { CheckmarkIcon } from '../icons/Checkmark'

interface QuestionsProps {
  questions: Message['questions']
  progress?: Message['progress']
}

export function Questions({ questions, progress }: QuestionsProps) {
  return (
    <div className="mt-4 pt-4 border-t border-base-300">
      <div className="font-semibold text-sm mb-2">Pending Questions:</div>
      <div className="mb-2 text-xs font-semibold">
        {`${progress.answered_questions}/${progress.total_questions} questions answered`}
      </div>
      <ul className="list bg-base-200 rounded-box shadow-md p-2">
        {questions.map((questionObj, index) => {
          const isAnswered = questionObj.status !== 'pending'
          return (
            <li
              key={index}
              className={`list-row text-base-content font-medium py-2 px-3 flex items-center justify-between ${
                isAnswered ? 'text-success' : ''
              }`}
            >
              <span>{questionObj.question}</span>
              {isAnswered && (
                <CheckmarkIcon className="ml-2 text-success text-3xl" />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
