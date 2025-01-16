import UploadFile from '@/components/modals/UploadFile'
import PageHeader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Seo title="dashboard"/>
			<PageHeader currentpage="Dashboard" activepage="home" mainpage="Dashboard" />
      <UploadFile/>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page