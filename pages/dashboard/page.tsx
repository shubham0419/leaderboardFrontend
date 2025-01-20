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
      <StudentTable mentorId='5a172ae4-f917-4807-b899-fa342916f42f'/>
      </div>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page