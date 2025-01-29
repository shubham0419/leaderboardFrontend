
import React, { useEffect } from 'react'
import Login from '..';
import { useSetRecoilState } from 'recoil';
import { isInstituteSelector } from '@/recoil/auth.atom';

const LoginMentor = () => {
  const setIsInstitute = useSetRecoilState(isInstituteSelector);

  useEffect(()=>{
    setIsInstitute(true);
  },[])

  return (
    <Login />
  )
}

export default LoginMentor;