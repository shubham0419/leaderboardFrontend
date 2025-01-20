import PageHeader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Seo title="Add Mentor" />
      <PageHeader currentpage="Add Mentor" />

    </div>
  )
}

Page.layout = "Contentlayout";
export default Page