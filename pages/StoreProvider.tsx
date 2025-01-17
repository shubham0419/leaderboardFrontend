"use client"
import React, { useEffect } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { UseStudentManager } from '@/hooks/student.hook';
import { UseMentorManager } from '@/hooks/mentor.hook';
import { mentorDataSelector, studentDataSelector } from '@/recoil/auth.atom';

export default function StoreProvider({children}: {children: React.ReactNode}){
    return <RecoilRoot><InnerChildren>{children}</InnerChildren></RecoilRoot>;
}

const InnerChildren = (({children} : {children: React.ReactNode})=>{
  const isMentor = Cookies.get("mentor");
  const userId = Cookies.get("CBuser");
  const token = Cookies.get("CBaccessToken");

  const studentManager = UseStudentManager();
  const setStudentData = useSetRecoilState(studentDataSelector);

  const mentorManager = UseMentorManager();
  const setMentorData = useSetRecoilState(mentorDataSelector);

  const getStudentById = async()=>{
  try {
      let res = await studentManager.getStudentById(userId as string);
      if(res.status==200){
        setStudentData(res?.data?.data);
      }else{
        throw {message:"student not found"}
      }
      } catch (error:any) {
        console.error(error.message);
      }
  }

  const getMentorById = async()=>{
    try {
        let res = await mentorManager.getMentorById(userId as string);
        if(res.status==200){
            setMentorData(res?.data?.data);
        }else{
            throw {message:"mentor not found"}
        }
    } catch (error:any) {
        console.log(error.message);
    }
  }

  useEffect(()=>{
    if(userId && token) {
        if(isMentor){
            getMentorById();
        }else{
            getStudentById();
        }
    }
  },[userId,token])

  return (
    <>{children}</>
  )

})