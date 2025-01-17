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
      <StudentTable mentorId='3074f013-e456-4175-9f41-449f96ced25a'/>
      </div>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page