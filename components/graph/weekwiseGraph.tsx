import { UseStudentManager } from "@/hooks/student.hook";
import { WeeklyDataDatesSelector, WeeklyDataQuestionsSelector } from "@/recoil/student.atom";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loader } from "../Loader";

export const options = {
  title: "Weekly Programming Progress",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: {
    title: "Date",
    format: "MMM dd, yyyy",
    gridlines: { count: 3 },
  },
  vAxis: {
    title: "Problems Solved",
    minValue: 0
  }
};

export function WeeklyGraph({oauth_id}:{oauth_id:string}) {
  const selectedStartDate = useRecoilValue(WeeklyDataDatesSelector("startDate"));
  const selectedEndDate = useRecoilValue(WeeklyDataDatesSelector("endDate"));
  const [weeklyQuestionsData, setWeklyQuestionsData] = useRecoilState(WeeklyDataQuestionsSelector);
  const studentManager = UseStudentManager();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([["Time", "LeetCode", "CodeForces"]]);

  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDataForChart = (data: weeklyQuestionsType) => {
    // Convert string dates to Date objects for comparison
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    
    // Get all dates in range
    const allDates = getDatesInRange(start, end);

    // Create a map for quick lookup of existing data
    const leetcodeMap = new Map(
      data.leetcode.map(item => [new Date(item.date).toISOString().split('T')[0], item.problemsSolved])
    );
    const codeforcesMap = new Map(
      data.codeforces.map(item => [new Date(item.date).toISOString().split('T')[0], item.problemsSolved])
    );

    // Format data for each date in range
    const formattedData = allDates.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      return [
        date,
        leetcodeMap.get(dateStr) || 0,
        codeforcesMap.get(dateStr) || 0
      ];
    });

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
    <div className="w-full">
      {loading ? 
        <div className="w-full bg-inherit"><Loader/></div> :
        <div className="px-2 sm:p-6 w-full overflow-auto scrollbar-hide">
          <div className="w-full whitespace-nowrap rounded-md border py-5 ps-2">
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
                    timeZone: 0,
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