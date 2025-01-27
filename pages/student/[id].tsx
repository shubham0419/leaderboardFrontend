import QuestionNumberCard from '@/components/cards/Questionnumber';
import { UseStudentManager } from '@/hooks/student.hook';
import { SelectedStudentSelector, SelectedYearSelector, StudentCodeforcesQuestionsSelector, StudentLeetCodeQuestionsSelector } from '@/recoil/student.atom'
import PageHeader from '@/shared/layout-components/page-header/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import StudentQuestionsTable from '@/components/tabels/StudentQuestionsTable';
import { LeetcodeHistograph } from '@/components/graph/leetcodeCalender';
import { Loader } from '@/components/Loader';
import { CodeforcesCalander } from '@/components/graph/CodeForcesCalender';

const Page = () => {
  const router = useRouter()
  const studentId = router.query.id;
  const [loading,setLoading] = useState(false);
  const studentManager = UseStudentManager();
  const [selectedStudent,setSelectedStudent] = useRecoilState(SelectedStudentSelector);
  const setLeetCodeQusetions = useSetRecoilState(StudentLeetCodeQuestionsSelector);
  const setCodeforcesQuestions = useSetRecoilState(StudentCodeforcesQuestionsSelector);
  const selectedYear = useRecoilValue(SelectedYearSelector);

  const getStudentLCQuestions = async (oauth_id:string)=>{
    try {
      let payload = {oauth_id:oauth_id,year:selectedYear}
      let res = await studentManager.getStudentLeetcodeQuestions(payload);
      if(res.status==200){
        setLeetCodeQusetions(res?.data?.data.problems as LeetcodeProblemDataType[]);
      }else{
        throw {
          message:"Questions not found"
        }
      }
    } catch (error:any) {
      console.error(error.message);
    }
  }

  const getStudentCFQuestions = async (oauth_id:string)=>{
    try {
      let payload = {oauth_id:"oauth_Shubhamo7",year:"2024"}
      let res = await studentManager.getCodeforcescodeQuestions(payload);
      if(res?.status==200){
        setCodeforcesQuestions(res?.data?.data?.problems as CodeforcesProfile[]);
      }else{
        throw {
          message:"Questions not found"
        }
      }
    } catch (error:any) {
      console.error(error.message);
    }
  }


  const getStudent = async ()=>{
    try {
      setLoading(true);
      let res = await studentManager.getStudentById(studentId as string);
      if(res.status==200){
        setSelectedStudent(res.data?.data as User);
        await Promise.all([
          getStudentLCQuestions(res.data?.data?.oauth_id as string),
          getStudentCFQuestions(res.data?.data?.oauth_id as string)
        ]);
      }else{
        throw {
          message:"user not found"
        }
      }
    } catch (error:any) {
      console.error(error.message);
    }finally{
      setLoading(false)
    }
  }


  useEffect(()=>{
    if(studentId){
      getStudent();
    }
  },[studentId,selectedYear])

  return (
    <div className='w-full h-full'>
    <Seo title="Profile"/>
    {loading?<div className='col-span-12 h-[80Vh] w-full bg-inherit'><Loader /></div>:<><PageHeader currentpage={selectedStudent?.name ? (`${selectedStudent?.name.toLowerCase()} Profile`):"Profile"}  mainpage="Profile" />
    <div className='flex flex-col '>
      <QuestionNumberCard/>
      <LeetcodeHistograph />
      <CodeforcesCalander/>
      <StudentQuestionsTable />
    </div></>}
  </div>
  )
}
Page.layout = "Contentlayout";
export default Page