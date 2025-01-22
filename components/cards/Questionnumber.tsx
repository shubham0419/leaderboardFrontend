import { SelectedStudentSelector } from '@/recoil/student.atom'
import React from 'react'
import { useRecoilValue } from 'recoil'

type Questionstype = {
  class: string,
  data: string,
  text: string,
  color: string
}

const QuestionNumberCard = () => {

  const selectedStudent = useRecoilValue(SelectedStudentSelector);

  const questions: Questionstype[] = [
    {
      class: "Leetcode Total Solved",
      data: "",
      text: selectedStudent?.leetcode_all?.toFixed(0) || "0",
      color: "gray"
    },
    {
      class: "Leetcode Easy Solved",
      data: "",
      text: selectedStudent?.leetcode_easy?.toFixed(0) || "0",
      color: "green"
    },
    {
      class: "Leetcode Medium Solved",
      data: "",
      text: selectedStudent?.leetcode_medium?.toFixed(0) || "0",
      color: "yellow"
    },
    {
      class: "Leetcode Hard Solved",
      data: "",
      text: selectedStudent?.leetcode_hard?.toFixed(0) || "0",
      color: "red"
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-x-5">
      {questions.map((idx) => (
        <div className="col-span-12 md:col-span-6 xxl:col-span-3 " key={Math.random()}>
          <div className={`box overflow-hidden border-2 border-${idx.color}-500`}>
            <div className="box-body">
              <h6 className={`text-base font-medium text-${idx.color}-500 dark:text-white my-auto`}>
                {idx.class}
              </h6>
              <h2 className={`text-2xl font-semibold text-${idx.color}-500 dark:text-white`}>{idx.text}</h2>
            </div>
          </div>
        </div>
      ))}
      {selectedStudent?.codeforces_all && <div className="col-span-12 md:col-span-6 xxl:col-span-3 ">
        <div className={`box overflow-hidden border-2 border-violet-900`}>
          <div className="box-body">
            <h6 className={`text-base font-medium text-violet-500 dark:text-white my-auto`}>
              Codeforces All Questions
            </h6>
            <h2 className="text-2xl font-semibold text-violet-500 dark:text-white">{selectedStudent?.codeforces_all}</h2>
          </div>
        </div>
      </div>}
      {selectedStudent?.codeforces_ranking && <div className="col-span-12 md:col-span-6 xxl:col-span-3 ">
        <div className={`box overflow-hidden border-2 border-blue-500`}>
          <div className="box-body">
            <h6 className={`text-base font-medium text-blue-500 dark:text-white my-auto`}>
              Codeforces Rating
            </h6>
            <h2 className="text-2xl font-semibold text-blue-500 dark:text-white">{selectedStudent?.codeforces_ranking}</h2>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default QuestionNumberCard