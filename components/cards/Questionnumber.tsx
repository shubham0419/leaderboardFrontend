import { SelectedStudentSelector } from '@/recoil/student.recoil'
import React from 'react'
import { useRecoilValue } from 'recoil'

type Questionstype ={
    class:string,
    data:string,
    text:string,
    color:string
}

const QuestionNumberCard = () => {

  const selectedStudent = useRecoilValue(SelectedStudentSelector);

  const questions:Questionstype[] = [
    {
      class:"Total Solved",
      data:"",
      text:selectedStudent?.leetcode_all?.toFixed(0) || "0",
      color:"primary"
    },
    {
      class:"Easy Solved",
      data:"",
      text:selectedStudent?.leetcode_easy?.toFixed(0) || "0",
      color:"success"
    },
    {
      class:"Medium Solved",
      data:"",
      text:selectedStudent?.leetcode_medium?.toFixed(0) || "0",
      color:"warning"
    },
    {
      class:"Hard Solved",
      data:"",
      text:selectedStudent?.leetcode_hard?.toFixed(0) || "0",
      color:"danger"
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-x-5">
      {questions.map((idx) => (
        <div className="col-span-12 md:col-span-6 xxl:col-span-3" key={Math.random()}>
          <div className="box overflow-hidden">
            <div className="box-body">
              <div className="flex">
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <h6 className="text-lg font-medium text-gray-800 mb-2 dark:text-white my-auto">
                    {idx.class}
                  </h6>
                </div>
                <span className={`badge bg-${idx.color}/10 text-${idx.color} py-1 ltr:ml-auto rtl:mr-auto !my-auto`}>
                  {idx.data}
                </span>
              </div>
              <div className="mt-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{idx.text}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuestionNumberCard