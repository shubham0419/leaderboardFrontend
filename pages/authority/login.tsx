
import React, { useEffect } from 'react'
import Login from '..';
import { useSetRecoilState } from 'recoil';
import { isMentorSelector } from '@/recoil/auth.atom';

const login = () => {
  const setIsMentor = useSetRecoilState(isMentorSelector);

  useEffect(()=>{
    setIsMentor(true);
  },[])

  return (
    <Login />
  )
}

export default login;