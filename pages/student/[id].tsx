import QuestionNumberCard from '@/components/cards/Questionnumber';
import { UseStudentManager } from '@/hooks/student.hook';
import { SelectedStudentSelector } from '@/recoil/student.recoil'
import PageHeader from '@/shared/layout-components/page-header/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const Page = () => {
  const router = useRouter()
  const studentId = router.query.id;
  const [loading,setLoading] = useState(false);
  const studentManager = UseStudentManager();
  const setSelectedStudent = useSetRecoilState(SelectedStudentSelector);

  const getStudent = async ()=>{
    try {
      setLoading(true);
      let res = await studentManager.getStudentById(studentId as string);
      if(res.status==200){
        setSelectedStudent(res.data?.data as User);
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