import AddInstituteDialog from '@/components/modals/AddInstitute'
import PageHeader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Seo title="Add Intitute" />
      <PageHeader currentpage="Add Institute" />
      <div className='flex flex-col gap-2'>
        <AddInstituteDialog/>
      </div>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page