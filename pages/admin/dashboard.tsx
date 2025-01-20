import UploadFile from '@/components/modals/UploadFile';
import PageHeader from '@/shared/layout-components/page-header/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <Seo title="Admin Dashboard" />
        <PageHeader currentpage="Admin Dashboard" />
        <div className='flex flex-col'>
        <UploadFile/>
      </div>
    </div>
  )
}
Dashboard.layout = "Contentlayout";
export default Dashboard;