import React, { useEffect } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { UseStudentManager } from '@/hooks/student.hook';
import { UseMentorManager } from '@/hooks/mentor.hook';
import { mentorDataSelector, studentDataSelector } from '@/recoil/auth.atom';
import dynamic from 'next/dynamic';


const InnerChildren = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => {
  const isMentor = Cookies.get("mentor");
  const userId = Cookies.get("CBuser");
  const token = Cookies.get("CBaccessToken");

  const studentManager = UseStudentManager();
  const setStudentData = useSetRecoilState(studentDataSelector);

  const mentorManager = UseMentorManager();
  const setMentorData = useSetRecoilState(mentorDataSelector);

  useEffect(() => {
    const getStudentById = async () => {
      try {
        let res = await studentManager.getStudentById(userId as string);
        if (res.status === 200) {
          setStudentData(res?.data?.data);
        } else {
          throw new Error("student not found");
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };

    const getMentorById = async () => {
      try {
        let res = await mentorManager.getMentorById(userId as string);
        if (res.status === 200) {
          setMentorData(res?.data?.data);
        } else {
          throw new Error("mentor not found");
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (userId && token) {
      if (isMentor) {
        getMentorById();
      } else {
        getStudentById();
      }
    }
  }, [userId, token, isMentor, studentManager, mentorManager, setStudentData, setMentorData]);

  return <>{children}</>;
}), {
  ssr: false 
});

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <InnerChildren>{children}</InnerChildren>
    </RecoilRoot>
  );
}