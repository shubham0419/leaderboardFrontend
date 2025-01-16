
import React, { Fragment } from "react";
import { SalesOverView, SocialVisitor, customerdata, orderdetails, products, sales, topselling } from "@/shared/data/dashboard/salesdata";
import PageHeader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import { SalesValue } from "../../../shared/data/charts/chartjsdata";

const Sales = () => {

	return (
		<div>
			<Seo title='Sales' />
			<PageHeader currentpage="Dashboard" activepage="Home" mainpage="Dashboard" />
			<div className="grid grid-cols-12 gap-x-5">
				{sales.map((idx) => (
					<div className="col-span-12 md:col-span-6 xxl:col-span-3" key={Math.random()}>
						<div className="box overflow-hidden">
							<div className="box-body">
								<div className="flex">
									<div className="flex space-x-3 rtl:space-x-reverse">
										<div className={`avatar p-2 rounded-sm bg-${idx.color}/10 dark:primary/10`}>
											{idx.icon}
										</div>
										<h6 className="text-lg font-medium text-gray-800 mb-2 dark:text-white my-auto">
											{idx.class}
										</h6>
									</div>
									<span className={`badge bg-${idx.color}/10 text-${idx.color} py-1 ltr:ml-auto rtl:mr-auto !my-auto`}>
										<i className="ti ti-trending-up"></i>
										{idx.data}
									</span>
								</div>
								<div className="mt-2">
									<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{idx.text}</h2>
									<p className="text-xs text-gray-400 ">in last week</p>
								</div>
							</div>

						</div>

					</div>
				))}
			</div>
			<div className="grid grid-cols-12 gap-x-5">
				<div className="col-span-12 lg:col-span-12 xxl:col-span-6">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Sales Over View</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" aria-label="button"
										className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-2 bg-white !border border-gray-200 text-gray-500 hover:bg-gray-100  focus:ring-gray-200 dark:bg-black/20 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
										<i className="text-sm leading-none ti ti-dots-vertical"></i> </button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" href="#!">Download</Link>
										<Link className="ti-dropdown-item" href="#!">Import</Link>
										<Link className="ti-dropdown-item" href="#!">Export</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="box-body">
							<ul className="flex flex-wrap space-x-6 rtl:space-x-reverse">
								<li>
									<p className="inline-flex items-center">
										<span
											className="block w-3 h-3 rounded-full ltr:mr-2 rtl:ml-2 border-4 border-primary pointer-events-none"></span>
										<span className="flex items-center">
											<span
												className="text-2xl text-gray-800 dark:text-white font-bold ltr:mr-2 rtl:ml-2 pointer-events-none">$9.65K</span>
											<span className="text-sm text-gray-400 dark:text-white/80">/ Income</span>
										</span>
									</p>
								</li>
								<li>
									<p className="inline-flex items-center">
										<span
											className="block w-3 h-3 rounded-full ltr:mr-2 rtl:ml-2 border-4 border-gray-200 pointer-events-none"></span>
										<span className="flex items-center">
											<span
												className="text-2xl text-gray-800 dark:text-white font-bold ltr:mr-2 rtl:ml-2 pointer-events-none">$3.75K</span>
											<span className="text-sm text-gray-400 dark:text-white/80">/ Expenses</span>
										</span>
									</p>
								</li>
							</ul>
							<SalesOverView />
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-6 xxl:col-span-3">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Top Customers</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" aria-label="button"
										className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-2 bg-white !border border-gray-200 text-gray-500 hover:bg-gray-100  focus:ring-gray-200 dark:bg-black/20 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
										<i className="text-sm leading-none ti ti-dots-vertical"></i> </button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" href="#!">Download</Link>
										<Link className="ti-dropdown-item" href="#!">Import</Link>
										<Link className="ti-dropdown-item" href="#!">Export</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="box-body">
							<ul className="flex flex-col customer-list">
								{customerdata.map((customer) => (
									<li className="px-0 ti-list-group border-0 text-gray-800 dark:text-white" key={Math.random()}>
										<Link href="#!" className="flex  justify-between items-center w-full">
											<div className="flex space-x-3 rtl:space-x-reverse w-full">
												<img className="avatar avatar-sm rounded-sm" src={customer.src}
													alt="Image Description" />
												<div className="flex w-full">
													<div className="block my-auto">
														<p
															className="block text-sm font-semibold text-gray-800 hover:text-gray-900 my-auto  dark:text-white dark:hover:text-gray-200">
															{customer.class}</p>
														<p
															className="text-xs text-gray-400 dark:text-white/80 truncate sm:max-w-max max-w-[100px] font-normal">
															{customer.data}</p>
													</div>
												</div>
											</div>
											<div className=""><span className="text-sm font-medium">{customer.text}</span></div>
										</Link>
									</li>
								))}

							</ul>
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-6 xxl:col-span-3">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Sale Value</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" aria-label="button"
										className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-2 bg-white !border border-gray-200 text-gray-500 hover:bg-gray-100  focus:ring-gray-200 dark:bg-black/20 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
										<i className="text-sm leading-none ti ti-dots-vertical"></i> </button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" href="#!">Download</Link>
										<Link className="ti-dropdown-item" href="#!">Import</Link>
										<Link className="ti-dropdown-item" href="#!">Export</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="box-body pb-0 px-0">
							<div className="sales-value relative border-b border-gray-200 dark:border-white/10 pb-5">
								<SalesValue />
								<div
									className="chart-circle-value circle-style absolute border-2 border-dashed border-primary -top-5 inset-0 flex justify-center items-center w-[150px] h-[150px] leading-[70px] rounded-full text-5xl mx-auto my-auto">
									<div className="text-xl font-bold">75%</div>
								</div>
							</div>
							<div className="grid grid-cols-2">
								<div className="p-5 ltr:border-r rtl:border-l border-gray-200 dark:border-white/10">
									<div className="text-sm text-gray-500 dark:text-white/80 text-center font-medium">
										Sale Items
									</div>
									<div className="text-center">
										<p className="text-gray-800 dark:text-white text-2xl font-medium">567</p>
										<span className="text-success font-semibold"><i
											className="ri-arrow-up-s-fill align-middle"></i>0.23%</span>
									</div>
								</div>
								<div className="p-5">
									<div className="text-sm text-gray-500 dark:text-white/80 text-center font-medium">
										Sale Revenue
									</div>
									<div className="text-center">
										<p className="text-gray-800 dark:text-white text-2xl font-medium">$11,197</p>
										<span className="text-danger font-semibold">
											<i className="ri-arrow-down-s-fill align-middle"></i>0.15%
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-x-5">
				<div className="col-span-12 lg:col-span-6 xxl:col-span-3">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Upcoming Products</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" aria-label="button"
										className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-2 bg-white !border border-gray-200 text-gray-500 hover:bg-gray-100  focus:ring-gray-200 dark:bg-black/20 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
										<i className="text-sm leading-none ti ti-dots-vertical"></i> </button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" href="#!">Download</Link>
										<Link className="ti-dropdown-item" href="#!">Import</Link>
										<Link className="ti-dropdown-item" href="#!">Export</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="box-body">
							<ul className="flex flex-col upcoming-list">
								{products.map((idx) => (
									<li className="p-0 mb-6 ti-list-group border-0 text-gray-800 dark:text-white" key={Math.random()}>
										<Link href="#!" className="w-full">
											<div className="flex items-center">
												<div className="leading-none">
													<img className="avatar avatar-sm rounded-full" src={idx.src}
														alt="image" />
												</div>
												<div className="flex-auto ltr:ml-2 rtl:mr-2">
													<p className="text-sm font-semibold mb-0">{idx.data}</p>
													<p className="text-xs text-gray-400 dark:text-white/80 mb-0 !font-normal">{idx.data1}</p>
												</div>
												<div className="block text-end">
													<span className="text-sm text-success font-semibold">{idx.text}</span>
													<p className="text-xs text-gray-400 dark:text-white/80 !font-normal"><i
														className="ti ti-clock-hour-2 ltr:mr-1 rtl:ml-1 inline-block"></i>01 Apr, 2023</p>
												</div>
											</div>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-6 xxl:col-span-4">
					<div className="box social-visitors">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Social Visitors</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
										This Week <i className="ti ti-chevron-down"></i></button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" href="#!">This Week</Link>
										<Link className="ti-dropdown-item" href="#!">This Month</Link>
										<Link className="ti-dropdown-item" href="#!">This Year</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="box-body p-1">
							<SocialVisitor />
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-12 xxl:col-span-5">
					<div className="box">
						<div className="box-header flex">
							<h5 className="box-title my-auto">Top Selling Products</h5>
							<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
								<button type="button" aria-label="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-2 bg-white !border border-gray-200 text-gray-500 hover:bg-gray-100  focus:ring-gray-200 dark:bg-black/20 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
									<i className="text-sm leading-none ti ti-dots-vertical"></i>
								</button>
								<div className="hs-dropdown-menu ti-dropdown-menu">
									<Link className="ti-dropdown-item" href="#!">Action</Link>
									<Link className="ti-dropdown-item" href="#!">Another Action</Link>
									<Link className="ti-dropdown-item" href="#!">Something else
										here</Link>
								</div>
							</div>
						</div>
						<div className="box-body p-0">
							<div className="overflow-auto">
								<table className="ti-custom-table ti-custom-table-head">
									<thead>
										<tr>
											<th scope="col" className="text-center !p-[0.65rem]">Product</th>
											<th scope="col" className="!p-[0.65rem]">Category</th>
											<th scope="col" className="!p-[0.65rem]">Stock</th>
											<th scope="col" className="!p-[0.65rem]">TotalSales</th>
										</tr>
									</thead>
									<tbody>
										{topselling.map((idx) => (
											<tr key={Math.random()}>
												<td className="leading-none !text-gray-800 dark:!text-white !p-[0.65rem]">
													<img src={idx.src}
														className="avatar avatar-sm p-2 rounded-full bg-gray-100 dark:bg-black/20 ltr:mr-2 rtl:ml-2"
														alt="Image Description" />
													{idx.data1}
												</td>
												<td className="!p-[0.65rem] truncate">{idx.data}</td>
												<td className="!p-[0.65rem] text-sm"><span
													className={`badge leading-none bg-${idx.color}/10 text-${idx.color} rounded-sm`}>{idx.text}</span></td>
												<td className="!p-[0.65rem]">
													<span className="text-sm font-semibold">{idx.sale}</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
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
									<tbody className="">
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
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Sales.layout = "Contentlayout";

export default Sales;
