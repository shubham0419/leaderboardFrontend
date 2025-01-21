import React, { useEffect, useState } from 'react';
import { CustomSearchSelect } from '../inputs/SearchSelect';
import { BadgePlus, X } from 'lucide-react';
import { UseAdminManager } from '@/hooks/admin.hook';
import { useRecoilValue } from 'recoil';
import { allInstituteSelector } from '@/recoil/admin.atom';

const AddMentorDialog = () => {
  const [name, setName] = useState("");
  const [instituteId , setInstituteId] = useState("");
  const [email,setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const adminManager = UseAdminManager();
  const allInstitutes = useRecoilValue(allInstituteSelector);
  const [formatedInstitues,setFormatedInstitutes] = useState<{
    label: string;
    id: string;
}[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let payload = {
        name,
        instituteId,
        email
      }
      const res = await adminManager.addMentor(payload);
      if(res.status==200){
        setIsOpen(false);
        alert("Mentor Added Successfully");
      }
    } catch (error:any) {
      alert(error.message);
    }
  };

  useEffect(()=>{
    const formatData = allInstitutes.map((inst)=>({
      label:inst.name,
      id:inst.id
    }));
    setFormatedInstitutes(formatData)
  },[allInstitutes])


  const handleSelect = (id: string) => {
    setInstituteId(id);
  }

  return (
    <div >
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 rounded-sm text-white px-4 py-2 rounded float-right flex gap-2"><BadgePlus/> Add Mentor</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Mentor</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black"><X/></button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="intitute_name" className="text-sm font-medium text-gray-700">Mentor Name</label>
                <input id='intitute_name' type='text' className='rounded-md' placeholder='Enter Institute' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="intitute_name" className="text-sm font-medium text-gray-700">Email</label>
                <input id='intitute_name' type='email' className='rounded-md' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <CustomSearchSelect items={formatedInstitues} onSelect={handleSelect} />
              </div>
              <button
                type="submit"
                disabled={name.length < 2 || email.length<5 || instituteId.length < 6}
                className={`px-4 py-2 rounded-md text-white ${name.length < 2 || email.length<5 || instituteId.length < 6 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Add Mentor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMentorDialog;
