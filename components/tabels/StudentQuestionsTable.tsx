import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { StudentCodeforcesQuestionsSelector, StudentLeetCodeQuestionsSelector } from '@/recoil/student.atom'
import { formatReadableDate } from '@/libs/helper'

type problemDataType = {
  id:string,
  problem_date:string,
  problem_name:string,
  problem_status:boolean
}

const StudentQuestionsTable = () => {
  const [selectedSource, setSelectedSource] = useState("all")

  const leetcodeProblems = useRecoilValue(StudentLeetCodeQuestionsSelector);
  const codeforcesProblems = useRecoilValue(StudentCodeforcesQuestionsSelector);
  const allProblems:problemDataType[] = leetcodeProblems.map((lc)=>({
    id:lc.id,
    problem_name:lc.problem_name,
    problem_status:lc.problem_status,
    problem_date:lc.problem_date
  })).concat(codeforcesProblems.map(cf=>({
    id:cf.id,
    problem_name:cf.problem_name,
    problem_status:cf.problem_status,
    problem_date:cf.problem_date,
  }))).sort((a, b) => {
    const dateA = new Date(a.problem_date);
    const dateB = new Date(b.problem_date);
    return dateA.getTime() - dateB.getTime();
  });

  const [problemsToShow,setProblemsToShow] = useState<problemDataType[]>(allProblems);

  const [selectedStatus,setSelectedStatus] = useState("all");

  useEffect(()=>{
    let filteredProblems = allProblems

    if (selectedSource !== "all") {
      filteredProblems = selectedSource === "leetcode" ? leetcodeProblems : codeforcesProblems
    }

    if (selectedStatus !== "all") {
      filteredProblems = filteredProblems.filter(
        (problem) => problem.problem_status === (selectedStatus === "accepted"),
      )
    }

    setProblemsToShow(filteredProblems);
  },[selectedSource,selectedStatus]);

  const ref = useRef<HTMLTableElement>(null);
  
  useEffect(() => {
    //@ts-ignore
    ref.current?.parentNode?.setAttribute("style", `height:100%;`);
  }, []);

  
  
  return (
    <div className="grid grid-cols-12 gap-x-6 pt-2">
      <div className="col-span-12">
        <div className="box">
          <div className="box-header">
            <div className="flex">
              <h5 className="box-title my-auto">All Questions Details</h5>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-sm mr-2 p-1 px-2 pe-8 border border-gray-200 text-gray-600 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
              >
                <option value="all">All Statuses</option>
                <option value="accepted">Accepted</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="rounded-sm p-1 px-2 pe-8 border border-gray-200 text-gray-600 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
              >
                <option value="all">View All</option>
                <option value="leetcode">Leetcode</option>
                <option value="codeforces">Codeforces</option>
              </select>
            </div>
          </div>
          <div className="box-body">
            <div className="overflow-auto h-[60vh]" ref={ref}>
              <table className="ti-custom-table ti-custom-table-head whitespace-nowrap table-bordered rounded-sm ti-custom-table-head ">
                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 left-0">
                  <tr className="">
                    <th scope="col" className="text-black dark:text-white/80">Problem Name</th>
                    <th scope="col" className="text-black dark:text-white/80">Problem Status</th>
                    <th scope="col" className="text-black dark:text-white/80">Problem Date</th>
                  </tr>
                </thead>
                <tbody className="">
                  {problemsToShow?.map((data) => (
                    <tr className="text-gray-500 dark:text-white/50" key={data.id}>
                      <td className="text-gray-500 dark:text-white/50">{data?.problem_name}</td>
                      <td className={data?.problem_status?"text-green-500" : "text-red-500"}>
                        {data?.problem_status ? "Accepted" : "Failed"}
                      </td>
                      <td className="text-gray-500 font-semibold text-base dark:text-white/50">{formatReadableDate(data?.problem_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentQuestionsTable