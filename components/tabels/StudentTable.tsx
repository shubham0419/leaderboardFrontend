import { UseStudentManager } from '@/hooks/student.hook'
import { formatReadableDate } from '@/libs/helper';
import { instituteIdSelector, mentorDataSelector } from '@/recoil/auth.atom';
import { SelectedStudentSelector, StudentDataPaginationSelector, StudentFilterSelector, StudentsDataSelector } from '@/recoil/student.atom';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Loader } from '../Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const StudentTable = () => {
	const studentManager = UseStudentManager();
	const [loading, setLoading] = useState(false);
	const [studentData, setStudentData] = useRecoilState(StudentsDataSelector);
	const [studentPagination, setStudentPagination] = useRecoilState(StudentDataPaginationSelector);
	const [mentor, setMentor] = useRecoilState(mentorDataSelector);
	const [studentLimit, setStudentLimit] = useRecoilState(StudentFilterSelector("limit"))
	const [studentPage, setStudentPage] = useRecoilState(StudentFilterSelector("page"))
	const [studentSortBy, setStudentSortBy] = useRecoilState(StudentFilterSelector("sortBy"))
	const [studentSortOrder, setStudentSortOrder] = useRecoilState(StudentFilterSelector("sortOrder"))
	const studentSearch = useRecoilValue(StudentFilterSelector("name"))
	const [studentBatch, setStudentBatch] = useRecoilState(StudentFilterSelector("batch"));
	const [studentSection, setStudentSection] = useRecoilState(StudentFilterSelector("section"));
	const institueId = Cookies.get("CBuser");
	const router = useRouter();

	// const getStudentDataByMentor = async () => {
	// 	try {
	// 		setLoading(true);
	// 		let filter: StudentsbyMentorParamsTye = {
	// 			params: {
	// 				limit: studentLimit as number,
	// 				page: studentPage as number,
	// 				sortBy: studentSortBy as sortByType,
	// 				sortOrder: studentSortOrder as sortOrderType,
	// 				name: studentSearch as string,
	// 			}
	// 		}
	// 		let res = await studentManager.getStudentByMentor(mentorId, filter);
	// 		if (res.status == 200) {
	// 			setStudentData(res.data?.data?.students);
	// 			setStudentPagination(res.data?.data?.pagination as StudentPagenationResType);
	// 			setLoading(false);
	// 		} else {
	// 			console.log("students not found for this mentor");
	// 		}
	// 	} catch (error: any) {
	// 		console.error(error);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	const getAllStudents = async () => {
		try {
			setLoading(true);
			let filter: StudentsbyMentorParamsTye = {
				params: {
					limit: studentLimit as number,
					page: studentPage as number,
					sortBy: studentSortBy as sortByType,
					sortOrder: studentSortOrder as sortOrderType,
					name: studentSearch as string | undefined,
					batch: studentBatch as string | undefined,
					section: studentSection as string | undefined,
					institute_id:institueId as string
				}
			}
			let res = await studentManager.getAllStudents(filter);
			if (res.status == 200) {
				setStudentData(res.data?.data?.students);
				setStudentPagination(res.data?.data?.pagination as StudentPagenationResType);
				setLoading(false);
			} else {
				console.log("students not found");
			}
		} catch (error: any) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const sortTbale = (sortBy: string) => {
		const newOrder = studentSortOrder === undefined ? 'asc' : studentSortOrder === "asc" ? "desc" : undefined;
		setStudentSortBy(sortBy)
		setStudentSortOrder(newOrder);
	};

	useEffect(() => {
		// getStudentDataByMentor();
		getAllStudents();
	}, [studentLimit, studentSearch, studentSortBy, studentSortOrder, studentPage]);


	const handleStudentClick = (studentId: string) => {
		router.push(`/student/${studentId}`);
	}

	const handlePageChange = (newPage: number) => {
		setStudentPage(newPage)
	}

	const ref = useRef<HTMLTableElement>(null);

  useEffect(() => {
    //@ts-ignore
    ref.current?.parentNode?.setAttribute("style", `height:100%;`);
  }, []);

	return (
		<div className="grid grid-cols-12 gap-x-6 gap-y-0 pt-2 w-full">
			{loading ? <div className='col-span-12 h-[80Vh] w-full bg-inherit'><Loader /></div> :
				<div className="col-span-12">
					<div className="box">
						{/* <div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Students Performance Report</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">View All <i className="ti ti-chevron-down"></i></button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" href="#!">Download</Link>
										<Link className="ti-dropdown-item" href="#!">Export</Link>
									</div>
								</div>
							</div>
						</div> */}
						<div className="box-body">
							<div className="overflow-auto h-[55vh]" ref={ref}>
								<table className="ti-custom-table ti-custom-table-head whitespace-nowrap table-bordered rounded-sm ti-custom-table-head ">
									<thead className="bg-gray-300 dark:bg-gray-800 sticky top-0 left-0">
										<tr className="">
											<th scope="col" className="text-black dark:text-white/80">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Rank</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("leetcode_ranking")} >
															<FontAwesomeIcon icon={(studentSortBy != "leetcode_ranking" || studentSortOrder == "") ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />
														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Name</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("name")} >
															<FontAwesomeIcon icon={(studentSortBy != "name" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />
														</button>
													</div>
												</div>
											</th>
											<th scope="col" className="text-black dark:text-white/80">University</th>
											<th scope="col" className="text-black dark:text-white/80">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Leetcode Contests</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("leetcode_contest")} >
															<FontAwesomeIcon icon={(studentSortBy != "leetcode_contest" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">	<div className="flex gap-1 items-center">
												<span className="cursor-pointer">Total LeetCode Questions</span>
												<div className="flex gap-0 items-center">
													<button className="p-2" onClick={() => sortTbale("leetcode_all")} >
														<FontAwesomeIcon icon={(studentSortBy != "leetcode_all" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

													</button>
												</div>
											</div></th>
											<th scope="col" className="text-black dark:text-white/80">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Leetcode Easy</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("leetcode_easy")} >
															<FontAwesomeIcon icon={(studentSortBy != "leetcode_easy" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">

												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Leetcode Medium</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("leetcode_medium")} >
															<FontAwesomeIcon icon={(studentSortBy != "leetcode_medium" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">

												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Leetcode Hard</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("leetcode_hard")} >
															<FontAwesomeIcon icon={(studentSortBy != "leetcode_hard" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">

												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Leetcode Last Seen</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("leetcode_lastSeen")} >
															<FontAwesomeIcon icon={(studentSortBy != "leetcode_lastSeen" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />
														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Codeforces Ranking</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("codeforces_ranking")} >
															<FontAwesomeIcon icon={(studentSortBy != "codeforces_ranking" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80 ">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Total Codeforces Questions</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("codeforces_all")} >
															<FontAwesomeIcon icon={(studentSortBy != "codeforces_all" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Codeforces Contests</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("codeforces_contest")} >
															<FontAwesomeIcon icon={(studentSortBy != "codeforces_contest" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />
														</button>
													</div>
												</div></th>
											<th scope="col" className="text-black dark:text-white/80">
												<div className="flex gap-1 items-center">
													<span className="cursor-pointer">Codeforces Last Seen</span>
													<div className="flex gap-0 items-center">
														<button className="p-2" onClick={() => sortTbale("codeforces_lastSeen")} >
															<FontAwesomeIcon icon={(studentSortBy != "codeforces_lastSeen" || studentSortOrder == undefined) ? faSort : (studentSortOrder == "desc") ? faSortUp : faSortDown} size={"lg"} />

														</button>
													</div>
												</div></th>
										</tr>
									</thead>
									<tbody className="">
										{studentData?.map((data) => (
											<tr className="cursor-pointer" key={data.id} onClick={() => handleStudentClick(data.id)}>
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
													{formatReadableDate(data?.leetcode_lastSeen)}
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
												<td>
													{formatReadableDate(data?.codeforces_lastSeen)}
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
			<div className="w-[350px] flex gap-2 items-center capitalize pb-2">
					<div className='w-full text-base'>
						Showing page {studentPage} of {studentPagination.totalPages}
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => handlePageChange(Math.max(1, (studentPage as number) - 1))}
							disabled={studentPage === 1}
							className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${studentPage === 1 && "bg-slate-300 text-gray-200"}`}
						>
							Previous
						</button>
						<button
							onClick={() => handlePageChange(Math.min(studentPagination.totalPages, (studentPage as number) + 1))}
							disabled={studentPage === studentPagination.totalPages}
							className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50  ${studentPage === studentPagination.totalPages && "bg-slate-300 text-gray-200"}`}
						>
							Next
						</button>
					</div>
			</div>
		</div>
	)
}

export default StudentTable