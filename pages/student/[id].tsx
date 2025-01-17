import QuestionNumberCard from '@/components/cards/Questionnumber';
import { UseStudentManager } from '@/hooks/student.hook';
import { SelectedStudentSelector, StudentLeetCodeQuestionsSelector } from '@/recoil/student.recoil'
import PageHeader from '@/shared/layout-components/page-header/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const Page = () => {
  const router = useRouter()
  const studentId = router.query.id;
  const [loading,setLoading] = useState(false);
  const studentManager = UseStudentManager();
  const setSelectedStudent = useSetRecoilState(SelectedStudentSelector);
  const setLeetCodeQusetions = useSetRecoilState(StudentLeetCodeQuestionsSelector);

  const getStudent = async ()=>{
    try {
      setLoading(true);
      let res = await studentManager.getStudentById(studentId as string);
      if(res.status==200){
        setSelectedStudent(res.data?.data as User);
        getStudentQuestions(res.data?.data?.oauth_id as string)
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

  const getStudentQuestions = async (oauth_id:string)=>{
    try {
      let payload = {oauth_id:oauth_id,year:"2025"}
      let res = await studentManager.getStudentLeetcodeQuestions(payload);
      if(res.status==200){
        setLeetCodeQusetions(res?.data?.data.problem as ProblemData[]);
      }else{
        throw {
          message:"Questions not found"
        }
      }
    } catch (error:any) {
      console.error(error.message);
    }
  }

  useEffect(()=>{
    if(studentId){
      getStudent();
    }
  },[studentId])

  return (
    <div>
    <Seo title="Profile"/>
    <PageHeader currentpage="Profile"  mainpage="Profile" />
    <div className='flex flex-col '>
      <QuestionNumberCard/>
    </div>
  </div>
  )
}
Page.layout = "Contentlayout";
export default Page