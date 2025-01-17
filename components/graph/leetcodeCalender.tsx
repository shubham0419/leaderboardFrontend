// "use client"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Spinner } from "@/components/ui/spinner"
// import { LeetcodeQuestionsSelector } from "@/recoil/leetcode.atom"
// import { Chart } from "react-google-charts"
// import { useRecoilValue } from "recoil"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { useEffect, useState } from "react"

// const data = [
//   [
//     {
//       type: "date",
//       id: "Date",
//     },
//     {
//       type: "number",
//       id: "Won/Loss",
//     },
//   ],
// ];

// export function LeetcodeHistograph() {
//   const allQuestions = useRecoilValue(LeetcodeQuestionsSelector);
//   const startYear = 2024;
//   const endYear = new Date().getFullYear();
//   const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
//   const [selectedYear, setSelectedYear] = useState(startYear.toString());
//   const [questionData,setQuestionData] = useState(data);

//   useEffect(()=>{
//     const newData = data;
//     allQuestions.forEach((questn) => {
//       const acceptedCount = questn.submissions.reduce((accum, q) =>
//         accum + (selectedYear == (new Date(questn.date).getFullYear()).toString() ? 1 : 0)
//       , 0);
//       if (selectedYear === (new Date(questn.date).getFullYear()).toString()) {
//         newData.push([
//           // @ts-ignore
//           new Date(questn.date),
//           // @ts-ignore
//           acceptedCount
//         ])
//       }
//     });
//     setQuestionData(newData);
//   },[selectedYear]);

//   console.log(selectedYear,questionData);
//   return (
//     <Card className="w-full">
//       <CardHeader className={("flex  items-stretch space-y-0 border-b p-0 md:flex-row md:justify-between px-6 py-5 sm:py-6")}>
//         <div className="flex flex-1 flex-col justify-center gap-1  ">
//           <CardTitle>Leetcode Questions Histograph</CardTitle>
//           <CardDescription>
//             Number of Questions Attepmted over the period of time
//           </CardDescription>
//         </div>
//         <Select defaultValue={startYear.toString()} onValueChange={(e) => setSelectedYear(e)}>
//           <SelectTrigger className="w-fit px-4">
//             <SelectValue placeholder="Year" />
//           </SelectTrigger>
//           <SelectContent className="">
//             {years.map(year => {
//               return <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
//             })}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="px-2 sm:p-6 w-full overflow-auto scrollbar-hide">
//         <ScrollArea className="w-full whitespace-nowrap rounded-md border py-5 ps-2">
//           {questionData.length < 2 ? <Spinner /> :
//             <div className="w-[230vw] md:w-[120vw] lg:w-[92vw] 2xl:w-full">
//               <Chart
//                 chartType="Calendar"
//                 width="100%"
//                 height="100%"
//                 data={questionData}
//               />
//             </div>}
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   )
// }
