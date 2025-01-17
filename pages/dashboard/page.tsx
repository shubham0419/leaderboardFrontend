import UploadFile from '@/components/modals/UploadFile'
import StudentTable from '@/components/tabels/StudentTable'
import PageHeader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Seo title="dashboard"/>
			<PageHeader currentpage="Dashboard" activepage="home" mainpage="Dashboard" />
      <UploadFile/>
      <StudentTable mentorId='b2fe2d66-424f-494a-bf1f-ebf2f4b585aa'/>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page