"use client"

import { useEffect, useState, useCallback } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns"
import { Chart } from "react-google-charts"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { UseStudentManager } from "@/hooks/student.hook"
import { WeeklyDataDatesSelector } from "@/recoil/student.atom"
import { Loader } from "@/components/Loader"
import { formatReadableDate, formatSortDate } from "@/libs/helper"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Helper function to convert date to IST string
const toISTString = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  return new Date(date.toLocaleString("en-US", options)).toISOString().split("T")[0]
}

export function WeeklyGraph({ oauth_id }: { oauth_id: string }) {
  const [selectedStartDate,setSelectedStartDate] = useRecoilState(WeeklyDataDatesSelector("startDate"));
  const [selectedEndDate,setSelectedEndDate] = useRecoilState(WeeklyDataDatesSelector("endDate"));
  const studentManager = UseStudentManager()
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([["Time", "LeetCode", "CodeForces"]])
  const [leetcodeAverage, setLeetcodeAverage] = useState(0)
  const [codeforcesAverage, setCodeforcesAverage] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedWeek, setSelectedWeek] = useState(new Date())

  const options = {
    title: `Leetcode Weekly Average : ${leetcodeAverage.toFixed(2)} | Codeforces Weekly Average : ${codeforcesAverage.toFixed(2)}`,
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      title: "Date",
      format: "MMM dd, yyyy",
      gridlines: { count: 7 },
    },
    vAxis: {
      title: "Problems Solved",
      minValue: 0,
    },
  }

  const getDatesInRange = useCallback((startDate: string, endDate: string) => {
    const dates = []
    const currentDate = new Date(startDate)
    const end = new Date(endDate)

    const istOffset = 5.5 * 60 * 60 * 1000
    currentDate.setTime(currentDate.getTime() + istOffset)
    end.setTime(end.getTime() + istOffset)

    while (currentDate <= end) {
      dates.push(toISTString(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
  }, [])

  const formatDataForChart = useCallback(
    (data:weeklyQuestionsType) => {
      // Get all dates in range
      const allDates = getDatesInRange(selectedStartDate.toISOString(), selectedEndDate.toISOString())

      // Create maps for quick lookup using IST dates
      const leetcodeMap = new Map(
        data.leetcode.map((item) => {
          const date = new Date(item.date)
          return [toISTString(date), item.problemsSolved]
        }),
      )

      const codeforcesMap = new Map(
        data.codeforces.map((item) => {
          const date = new Date(item.date)
          return [toISTString(date), item.problemsSolved]
        }),
      )

      // Format data for each date in range
      const formattedData = allDates.map((istDate) => [
        formatSortDate(istDate),
        leetcodeMap.get(istDate) || 0,
        codeforcesMap.get(istDate) || 0,
      ])

      return [["Time", "LeetCode", "CodeForces"], ...formattedData]
    },
    [selectedStartDate, selectedEndDate, getDatesInRange],
  )

  const getStudentWeeklyData = useCallback(async () => {
    setLoading(true)
    try {
      const params: WeeklyStudentDataParams = {
        oauth_id,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      }
      const res = await studentManager.getStudentWeeklyQuestions(params)
      const data = res?.data?.data as weeklyQuestionsType
      setLeetcodeAverage(data.leetcode.reduce((accum, lc) => accum + lc.problemsSolved, 0) / 7)
      setCodeforcesAverage(data.codeforces.reduce((accum, cf) => accum + cf.problemsSolved, 0) / 7);
      // @ts-ignore
      setChartData(formatDataForChart(data))
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }, [oauth_id, selectedStartDate, selectedEndDate])

  useEffect(() => {
    getStudentWeeklyData()
  }, [getStudentWeeklyData]);

  useEffect(()=>{
    setSelectedStartDate(selectedWeek);
    setSelectedEndDate(new Date(selectedWeek.getTime() + 6 * 24 * 60 * 60 * 1000));
  },[selectedWeek])

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number.parseInt(e.target.value))
    setSelectedWeek(new Date(new Date().getFullYear(), Number.parseInt(e.target.value), 1));
  }

  const handleWeekChange = (direction: "prev" | "next") => {
    setSelectedWeek((prevWeek) => {
      const newWeek = new Date(prevWeek)
      newWeek.setDate(newWeek.getDate() + (direction === "prev" ? -7 : 7))
      return newWeek;
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full py-3">
      <div className="w-full justify-between px-3 pb-3 pt-2">
        <h4 className="text-xl">Weekly Report</h4>
        <div className="flex justify-between items-center mt-2">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="rounded-sm mr-2 p-1 px-2 pe-8 border border-gray-200 text-gray-600 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200 dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleWeekChange("prev")} className="p-1 rounded-full hover:bg-gray-200">
              <ChevronLeftIcon/>
            </button>
            <span>
              {formatReadableDate(selectedWeek.toISOString())} - {" "}
              {formatReadableDate(new Date(selectedWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString())}
            </span>
            <button onClick={() => handleWeekChange("next")} className="p-1 rounded-full hover:bg-gray-200">
              <ChevronRightIcon/>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-auto scrollbar-hide">
        <div className="w-[200vw] md:w-[100vw] lg:w-[75vw] 2xl:w-fit">
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={chartData}
            options={options}
            formatters={[
              {
                column: 0,
                type: "DateFormat",
                options: {
                  timeZone: "Asia/Kolkata",
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}


