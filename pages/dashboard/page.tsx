import UploadFile from '@/components/modals/UploadFile'
import StudentTable from '@/components/tabels/StudentTable'
import { useDebounce } from '@/hooks/debounce.hook'
import { StudentFilterSelector } from '@/recoil/student.atom'
import PageHeader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import { Search } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
const Page = () => {

  const setStudentSearch = useSetRecoilState(StudentFilterSelector("name"));
  const [searchValue, setSearchValue] = useState("")
  const debouncedSearchValue = useDebounce(searchValue, 300)

  useEffect(() => {
    setStudentSearch(debouncedSearchValue)
  }, [debouncedSearchValue, setStudentSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <Seo title="dashboard"/>
			<PageHeader currentpage="Dashboard"  mainpage="Dashboard" />
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='relative'>
            <input className='p-2 pr-8 rounded-md' placeholder='Search student by name' value={searchValue}
              onChange={handleSearchChange}/>
            <Search className='absolute right-2 top-2' size={20}/>
          </div>
          
          <UploadFile/>
        </div>
      
      <StudentTable mentorId='35e0619a-48c1-4887-98fb-9d7cf7368ae4'/>
      </div>
    </div>
  )
}

Page.layout = "Contentlayout";
export default Page