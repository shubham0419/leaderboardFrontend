import AddMentorDialog from '@/components/modals/AddMentor'
import { UseAdminManager } from '@/hooks/admin.hook'
import { allInstituteSelector } from '@/recoil/admin.atom'
import PageHeader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const Page = () => {

  const adminManager = UseAdminManager();
  const setAllInstitute = useSetRecoilState(allInstituteSelector);
  const [loading,setLoading] = useState(false);

  const getAllInstitute = async ()=>{
    try {
      setLoading(true);
      let res = await adminManager.getAllInstitute();
      if(res.status==200){
        setAllInstitute(res.data?.data.institutes as InstituteType[]);
      }
    } catch (error:any) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getAllInstitute();
  },[])

  return (
    <div>
      <Seo title="Add Mentor" />
      <PageHeader currentpage="Add Mentor" />
      {loading?"loading":<div className='flex flex-col gap-2'>
        <AddMentorDialog/>
      </div>}
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page