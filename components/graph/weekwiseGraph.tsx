import { UseStudentManager } from "@/hooks/student.hook";
import { WeeklyDataDatesSelector, WeeklyDataQuestionsSelector } from "@/recoil/student.atom";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loader } from "../Loader";
import { formatReadableDate, formatSortDate } from "@/libs/helper";

export const options = {
  title: "Weekly Progress",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: {
    title: "Date",
    format: "MMM dd, yyyy",
    gridlines: { count: 7 },
  },
  vAxis: {
    title: "Problems Solved",
    minValue: 0
  }
};

// Helper function to convert date to IST string
const toISTString = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  return new Date(date.toLocaleString('en-US', options)).toISOString().split('T')[0];
};

export function WeeklyGraph({oauth_id}:{oauth_id:string}) {
  const selectedStartDate = useRecoilValue(WeeklyDataDatesSelector("startDate"));
  const selectedEndDate = useRecoilValue(WeeklyDataDatesSelector("endDate"));
  const [weeklyQuestionsData, setWeklyQuestionsData] = useRecoilState(WeeklyDataQuestionsSelector);
  const studentManager = UseStudentManager();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([["Time", "LeetCode", "CodeForces"]]);

  const getDatesInRange = (startDate: string, endDate: string) => {
    const dates = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    // Add IST offset (5 hours and 30 minutes in milliseconds)
    const istOffset = 5.5 * 60 * 60 * 1000;
    currentDate.setTime(currentDate.getTime() + istOffset);
    end.setTime(end.getTime() + istOffset);

    while (currentDate <= end) {
      dates.push(toISTString(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDataForChart = (data: weeklyQuestionsType) => {
    // Get all dates in range
    const allDates = getDatesInRange(selectedStartDate.toISOString(), selectedEndDate.toISOString());
    
    // Create maps for quick lookup using IST dates
    const leetcodeMap = new Map(
      data.leetcode.map(item => {
        const date = new Date(item.date);
        return [toISTString(date), item.problemsSolved];
      })
    );
    
    const codeforcesMap = new Map(
      data.codeforces.map(item => {
        const date = new Date(item.date);
        return [toISTString(date), item.problemsSolved];
      })
    );

    // Format data for each date in range
    const formattedData = allDates.map(istDate => [
      formatSortDate(istDate), 
      leetcodeMap.get(istDate) || 0,
      codeforcesMap.get(istDate) || 0
    ]);

    return [["Time", "LeetCode", "CodeForces"], ...formattedData];
  };

  const getStudentWeeklyData = async () => {
    setLoading(true);
    try {
      let params: WeeklyStudentDataParams = {
        oauth_id,
        startDate: selectedStartDate,
        endDate: selectedEndDate
      };
      let res = await studentManager.getStudentWeeklyQuestions(params);
      const data = res?.data?.data as weeklyQuestionsType;
      setWeklyQuestionsData(data);
      // @ts-ignore
      setChartData(formatDataForChart(data));
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentWeeklyData();
  }, [selectedStartDate, selectedEndDate, oauth_id]);

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="w-full py-3">
      {loading ? 
        <div className="w-full bg-inherit"><Loader/></div> :
        <div className="w-full overflow-auto scrollbar-hide">
          <h4 className="text-xl px-3 pb-3 pt-2">Weekly Report</h4>
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
                    timeZone: 'Asia/Kolkata',
                  },
                },
              ]}
            />
          </div>
        </div>
      }
    </div>
  );
}