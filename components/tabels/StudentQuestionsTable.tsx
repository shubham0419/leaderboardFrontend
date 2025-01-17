import React from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { StudentLeetCodeQuestionsSelector } from '@/recoil/student.recoil'

const StudentQuestionsTable = () => {

  const problems = useRecoilValue(StudentLeetCodeQuestionsSelector);


  console.log(problems)

  function formatReadableDate(dateString: string): string {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return date.toLocaleDateString('en-US', options);
  }

  
  return (
    <div className="grid grid-cols-12 gap-x-6 pt-2">
      <div className="col-span-12">
        <div className="box">
          <div className="box-header">
            <div className="flex">
              <h5 className="box-title my-auto">Recent Order Details</h5>
              <div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
                <button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">View All <i className="ti ti-chevron-down"></i></button>
                <div className="hs-dropdown-menu ti-dropdown-menu">
                  <Link className="ti-dropdown-item" href="#!">Download</Link>
                  <Link className="ti-dropdown-item" href="#!">Export</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="box-body">
            <div className="overflow-auto">
              <table className="ti-custom-table ti-custom-table-head whitespace-nowrap table-bordered rounded-sm ti-custom-table-head ">
                <thead className="bg-gray-50 dark:bg-black/20">
                  <tr className="">
                    <th scope="col" className="dark:text-white/80">Problem Name</th>
                    <th scope="col" className="dark:text-white/80">Problem Status</th>
                    <th scope="col" className="dark:text-white/80">Problem Date</th>
                  </tr>
                </thead>
                <tbody className="">
                  {problems?.map((data) => (
                    <tr className="" key={data.id}>
                      <td>{data?.problem_name}</td>

                      <td className={data?.problem_status?"text-green-500" : "text-red-500"}>
                        {data?.problem_status ? "Accepted" : "Failed"}
                      </td>

                      <td className="font-semibold text-base">{formatReadableDate(data?.problem_date)}</td>
                      
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