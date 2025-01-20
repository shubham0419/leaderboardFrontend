
import React, { useEffect } from 'react'
import Login from '..';
import { useSetRecoilState } from 'recoil';
import { isMentorSelector } from '@/recoil/auth.atom';

const LoginMentor = () => {
  const setIsMentor = useSetRecoilState(isMentorSelector);

  useEffect(()=>{
    setIsMentor(true);
  },[])

  return (
    <Login />
  )
}

export default LoginMentor;