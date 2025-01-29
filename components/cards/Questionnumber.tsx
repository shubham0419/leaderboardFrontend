import type React from "react"
import { useRecoilValue } from "recoil"
import { SelectedStudentSelector } from "@/recoil/student.atom"

type QuestionType = {
  title: string
  value: string | number
  icon: string
  color: string
}

const QuestionNumberCard: React.FC = () => {
  const selectedStudent = useRecoilValue(SelectedStudentSelector)

  const leetcodeQuestions: QuestionType[] = [
    {
      title: "LeetCode Total",
      value: selectedStudent?.leetcode_all?.toFixed(0) || "0",
      icon: "</>",
      color: "text-gray-600 dark:text-gray-300",
    },
    {
      title: "Easy",
      value: selectedStudent?.leetcode_easy?.toFixed(0) || "0",
      icon: "🟢",
      color: "text-green-500",
    },
    {
      title: "Medium",
      value: selectedStudent?.leetcode_medium?.toFixed(0) || "0",
      icon: "🟡",
      color: "text-yellow-500",
    },
    {
      title: "Hard",
      value: selectedStudent?.leetcode_hard?.toFixed(0) || "0",
      icon: "🔴",
      color: "text-red-500",
    },
  ]

  const codeforcesQuestions: QuestionType[] = []

  if (selectedStudent?.codeforces_all) {
    codeforcesQuestions.push({
      title: "CodeForces Total",
      value: selectedStudent.codeforces_all,
      icon: "📊",
      color: "text-violet-500",
    })
  }

  if (selectedStudent?.codeforces_ranking) {
    codeforcesQuestions.push({
      title: "CodeForces Rating",
      value: selectedStudent.codeforces_ranking,
      icon: "🌟",
      color: "text-blue-500",
    })
  }

  const renderQuestionCards = (questions: QuestionType[], heading: string) => (

    <div>
      <h1 className="p-3 text-black-700 text-xl">{heading}</h1>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
   
      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 transition-all duration-300 hover:shadow-md hover:scale-105"
        >
        
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2" role="img" aria-label={question.title}>
              {question.icon}
            </span>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">{question.title}</h3>
          </div>
          <p className={`text-2xl font-bold ${question.color}`}>{question.value}</p>
        </div>
      ))}
    </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {renderQuestionCards(leetcodeQuestions, "Leetcode Overview")}
      {codeforcesQuestions.length > 0 && <div className="mt-4">{renderQuestionCards(codeforcesQuestions, "Codeforces Overview")}</div>}
    </div>
  )
}

export default QuestionNumberCard