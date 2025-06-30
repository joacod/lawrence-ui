import { Message } from '../models/chat'

interface QuestionsProps {
  questions: Message['questions']
  progress?: Message['progress']
}

export function Questions({ questions, progress }: QuestionsProps) {
  return (
    <div className="mt-4 pt-4 border-t border-base-300">
      <div className="font-semibold text-sm mb-2">Pending Questions:</div>
      <div className="mb-2 text-xs font-semibold">
        {progress
          ? `${progress.answered_questions}/${progress.total_questions} questions answered`
          : `${
              questions.filter(
                (q) => q.user_answer !== null && q.user_answer !== ''
              ).length
            }/${questions.length} questions answered`}
      </div>
      <ul className="list bg-base-200 rounded-box shadow-md p-2">
        {questions
          .filter((q) => q.status === 'pending')
          .map((questionObj, index) => (
            <li
              key={index}
              className="list-row text-base-content font-medium py-2 px-3"
            >
              <span>{questionObj.question}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
