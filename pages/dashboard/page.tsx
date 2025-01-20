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
      <StudentTable mentorId='35e0619a-48c1-4887-98fb-9d7cf7368ae4'/>
      </div>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page