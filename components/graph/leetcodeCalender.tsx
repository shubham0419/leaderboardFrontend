"use client"
import { LeetcodeQuestionsSelector } from "@/recoil/leetcode.atom"
import { Chart } from "react-google-charts"
import { useRecoilValue } from "recoil"
import { useEffect, useState } from "react"
import { SelectedStudentSelector, StudentLeetCodeQuestionsSelector } from "@/recoil/student.atom"
import { Loader } from "../Loader"

const data = [
  [
    {
      type: "date",
      id: "Date",
    },
    {
      type: "number",
      id: "Won/Loss",
    },
  ],
];

export function LeetcodeHistograph() {
  const allQuestions = useRecoilValue(StudentLeetCodeQuestionsSelector);
  const [questionData, setQuestionData] = useState(data);
  const [loading,setLoading] = useState(false);

  const getYearQuestions = () => {
    setLoading(true);
    let newData = data;
    // @ts-ignore
    let formatedQuestions: [[Date, number]] = [];
    allQuestions?.forEach((prob) => {
      let isExist = formatedQuestions.find(pr => pr[0]?.getDate() == (new Date(prob.problem_date)).getDate());
      if (isExist && isExist[1]) {
        isExist[1]++;
      } else {
        formatedQuestions.push([new Date(prob.problem_date), 1]);
      }
    })
      formatedQuestions.forEach(ar=>{
      // @ts-ignore
        newData.push(ar);
      })
    setQuestionData(newData);
    setLoading(false);
  }

  useEffect(() => {
    getYearQuestions();
  }, [allQuestions]);

  return (
    <div className="w-full h-full pt-2">
      {loading?<div className='col-span-12 h-[80Vh] w-full bg-inherit'><Loader /></div>:<>
      <div className={("flex  items-stretch space-y-0 border-b p-0 md:flex-row md:justify-between px-6")}>
        <div className="flex flex-1 flex-col justify-center gap-1  ">
          <div className="text-lg">Leetcode Questions Calender</div>
        </div>
      </div>
      <div className="px-2 sm:p-6 w-full overflow-auto scrollbar-hide">
        <div className="w-full whitespace-nowrap rounded-md border py-5 ps-2">

          <div className="w-[230vw] md:w-[120vw] lg:w-[86vw] 2xl:w-[80%]">
            <Chart
              chartType="Calendar"
              width="100%"
              height="100%"
              data={questionData}
            />
          </div>
        </div>
      </div>
    </>}
    </div>
  )
}
