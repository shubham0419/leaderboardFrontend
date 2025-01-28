import { UseStudentManager } from "@/hooks/student.hook";
import { WeeklyDataDatesSelector, WeeklyDataQuestionsSelector } from "@/recoil/student.atom";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useRecoilState, useRecoilValue } from "recoil";

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

  const formatDataForChart = (data: weeklyQuestionsType) => {
    const allDates = new Set([
      ...data.leetcode.map(item => item.date),
      ...data.codeforces.map(item => item.date)
    ]);

    const formattedData = Array.from(allDates).map(date => {
      const leetcodeEntry = data.leetcode.find(item => item.date === date);
      const codeforcesEntry = data.codeforces.find(item => item.date === date);
      
      return [
        new Date(date),
        leetcodeEntry?.problemsSolved || 0,
        codeforcesEntry?.problemsSolved || 0
      ];
    });

    // Sort by date
    formattedData.sort((a, b) => (a[0] as Date).getTime() - (b[0] as Date).getTime());

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
  );
}