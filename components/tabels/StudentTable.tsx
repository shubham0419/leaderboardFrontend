import Link from 'next/link'
import React from 'react'

const StudentTable = () => {
  return (
    <div className="grid grid-cols-12 gap-x-6">
				<div className="col-span-12">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Recent Order Details</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">View All <i className="ti ti-chevron-down"></i></button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" href="#!">Download</Link>
										<Link className="ti-dropdown-item" href="#!">Import</Link>
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
											<th scope="col" className="dark:text-white/80">S.no</th>
											<th scope="col" className="dark:text-white/80">Item Details</th>
											<th scope="col" className="dark:text-white/80">Customer ID</th>
											<th scope="col" className="dark:text-white/80 min-w-[300px]">Customer Details</th>
											<th scope="col" className="dark:text-white/80">Ordered Date</th>
											<th scope="col" className="dark:text-white/80">Status</th>
											<th scope="col" className="dark:text-white/80">Price</th>
											<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									{/* <tbody className="">
										{orderdetails.map((idx) => (
											<tr className="" key={Math.random()}>
												<td>{idx.id}</td>
												<td>
													<div className="flex space-x-3 rtl:space-x-reverse w-full">
														<img className="avatar rounded-sm bg-gray-100 dark:bg-black/20 p-2"
															src={idx.src} alt="Image Description" />
														<div className="block w-full my-auto">
															<span
																className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{idx.class}</span>
															<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">{idx.data}</span>
														</div>
													</div>
												</td>
												<td className="!text-success font-semibold text-base">{idx.user}</td>
												<td>
													<div className="flex space-x-3 rtl:space-x-reverse text-start">
														<img className="avatar avatar-sm rounded-sm" src={idx.src1}
															alt="Image Description" />
														<div className="block my-auto">
															<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{idx.class1}</p>
															<span
																className="block text-xs text-gray-400 dark:text-white/80 !font-normal my-auto">{idx.data1}</span>
														</div>
													</div>
												</td>
												<td>{idx.date}</td>
												<td><span
													className={`truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-${idx.color}/10 text-${idx.color}/80`}>{idx.text}</span>
												</td>
												<td>{idx.data2}</td>
												<td className="font-medium space-x-2 rtl:space-x-reverse">
													<div className="hs-tooltip ti-main-tooltip">
														<Link href="#!"
															className="!m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn !rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
															<i className="ti ti-eye"></i>
															<span
																className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																role="tooltip">
																View
															</span>
														</Link>
													</div>
													<div className="hs-tooltip ti-main-tooltip">
														<Link href="#!"
															className="customer-edit !m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn !rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary">
															<i className="ti ti-pencil"></i>
															<span
																className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																role="tooltip">
																Edit
															</span>
														</Link>
													</div>
													<div className="hs-tooltip ti-main-tooltip">
														<Link href="#!"
															className="!m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn !rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger">
															<i className="ti ti-trash"></i>
															<span
																className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																role="tooltip">
																Delete
															</span>
														</Link>
													</div>
												</td>
											</tr>
										))}
									</tbody> */}
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
  )
}

export default StudentTable