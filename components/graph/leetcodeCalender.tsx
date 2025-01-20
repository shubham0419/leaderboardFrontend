"use client"
import { LeetcodeQuestionsSelector } from "@/recoil/leetcode.atom"
import { Chart } from "react-google-charts"
import { useRecoilValue } from "recoil"
import { useEffect, useState } from "react"
import { SelectedStudentSelector, StudentLeetCodeQuestionsSelector } from "@/recoil/student.recoil"
import { UseStudentManager } from "@/hooks/student.hook"

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

  const getYearQuestions = () => {
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
    console.log(formatedQuestions);
    console.log("object",newData);
    setQuestionData(newData);
  }

  useEffect(() => {
    getYearQuestions();
  }, [allQuestions]);

  console.log(questionData);

  return (
    <div className="w-full">
      <div className={("flex  items-stretch space-y-0 border-b p-0 md:flex-row md:justify-between px-6 py-5 sm:py-6")}>
        <div className="flex flex-1 flex-col justify-center gap-1  ">
          <div>Leetcode Questions Histograph</div>
          <div>
            Number of Questions Attepmted over the period of time
          </div>
        </div>
        {/* <select defaultValue={startYear.toString()} onValueChange={(e) => setSelectedYear(e)}>
          <SelectTrigger className="w-fit px-4">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="">
            {years.map(year => {
              return <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            })}
          </SelectContent>
        </select> */}
      </div>
      <div className="px-2 sm:p-6 w-full overflow-auto scrollbar-hide">
        <div className="w-full whitespace-nowrap rounded-md border py-5 ps-2">

          <div className="w-[230vw] md:w-[120vw] lg:w-[92vw] 2xl:w-full">
            <Chart
              chartType="Calendar"
              width="100%"
              height="100%"
              data={questionData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
