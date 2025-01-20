import { UseStudentManager } from '@/hooks/student.hook'
import { mentorDataSelector } from '@/recoil/auth.atom';
import { SelectedStudentSelector, StudentsDataSelector } from '@/recoil/student.recoil';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';


const StudentTable = ({mentorId}:{mentorId:string}) => {

  const studentManager = UseStudentManager();
  const [loading,setLoading] = useState(false);
  const [studentData,setStudentData] = useRecoilState(StudentsDataSelector);
  const [mentor,setMentor] = useRecoilState(mentorDataSelector);
  const setSelectedStudent = useSetRecoilState(SelectedStudentSelector);
  const router = useRouter();

  const getStudentDataByMentor = async ()=>{
    try {
      setLoading(true);
      let res = await studentManager.getStudentByMentor(mentorId);
      if(res.status==200){
        setStudentData(res.data?.data.students);
      }else{
        console.log("students not found for this mentor");
      }
    } catch (error:any) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getStudentDataByMentor();
  },[mentorId]);


	const handleStudentClick = (studentId: string) => {
		// setSelectedStudent(studentId);
		router.push(`/student/${studentId}`);
	}

  return (
    <div className="grid grid-cols-12 gap-x-6 pt-2">
      {loading? <div className='flex justify-center items-center bg-gray-400'>Loading...</div>:
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
											<th scope="col" className="dark:text-white/80">Rank</th>
											<th scope="col" className="dark:text-white/80">Name</th>
											<th scope="col" className="dark:text-white/80">University</th>
                      <th scope="col" className="dark:text-white/80">Leetcode Contests</th>
                      <th scope="col" className="dark:text-white/80 "> Total LeetCode Questions</th>
											<th scope="col" className="dark:text-white/80">Leetcode Easy</th>
											<th scope="col" className="dark:text-white/80">Leetcode Medium</th>
											<th scope="col" className="dark:text-white/80">Leetcode Hard</th>
											<th scope="col" className="dark:text-white/80 ">Total Codeforces Questions</th>
											<th scope="col" className="dark:text-white/80">Codeforces Ranking</th>
											<th scope="col" className="dark:text-white/80">Codeforces Contests</th>
										</tr>
									</thead>
									<tbody className="">
										{studentData?.map((data) => (
											<tr className="cursor-pointer" key={data.id} onClick={()=>handleStudentClick(data.id)}>
												<td>{data?.leetcode_ranking}</td>
												<td>
													{data?.name}
												</td>
												<td className="!text-success font-semibold text-base">{data?.institute}</td>
												<td>
													{data?.leetcode_contest.length || 0}
												</td>
												<td>{data?.leetcode_all}</td>
												<td>
                          {data?.leetcode_easy}
												</td>
												<td>{data?.leetcode_medium}</td>
												<td>
													{data?.leetcode_hard}
												</td>
												<td>
													{data?.codeforces_all}
												</td>
												<td>
													{data?.codeforces_ranking}
												</td>
												<td>
													{data?.codeforces_contest?.length || 0}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
        }
	</div>
  )
}

export default StudentTable