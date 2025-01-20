import UploadFile from '@/components/modals/UploadFile'
import StudentTable from '@/components/tabels/StudentTable'
import PageHeader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React from 'react'

const Page = () => {

  return (
    <div>
      <Seo title="dashboard"/>
			<PageHeader currentpage="Dashboard"  mainpage="Dashboard" />
      <div className='flex flex-col'>
      <UploadFile/>
      <StudentTable mentorId='d42587b7-8c41-43e5-9e45-9c3310620da1'/>
      </div>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page