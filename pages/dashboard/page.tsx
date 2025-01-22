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
      <StudentTable mentorId='9fed265a-7d99-4a97-820e-e871ee240a9b'/>
      </div>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page