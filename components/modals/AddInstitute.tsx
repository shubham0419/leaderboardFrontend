import React, { useState } from 'react';
import { CustomSearchSelect } from '../inputs/SearchSelect';
import { BadgePlus, X } from 'lucide-react';
import { UseAdminManager } from '@/hooks/admin.hook';

const AddInstituteDialog = () => {
  const [name, setName] = useState("");
  const [location,setLocation] = useState("");
  const [email,setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const adminManager = UseAdminManager()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let payload = {
        name,
        location,
        email
      }
      const res = await adminManager.addInstitute(payload);
      if(res.status==200){
        alert("Institute Added Successfully");
        setIsOpen(false);
      }
    } catch (error:any) {
      alert(error.message);
    }
  };

  return (
    <div >
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 rounded-sm text-white px-4 py-2 rounded float-right flex gap-2"><BadgePlus/> Add Institue</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Institute</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black"><X/></button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="intitute_name" className="text-sm font-medium text-gray-700">Institute Name</label>
                <input id='intitute_name' type='text' className='rounded-md' placeholder='Enter Institute' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="intitute_name" className="text-sm font-medium text-gray-700">Email</label>
                <input id='intitute_name' type='email' className='rounded-md' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="intitute_name" className="text-sm font-medium text-gray-700">Location</label>
                <input id='intitute_name' type='text' className='rounded-md' placeholder='Enter Location' onChange={(e)=>setLocation(e.target.value)} />
              </div>
              <button
                type="submit"
                disabled={name.length < 2 || email.length<5 || location.length<4}
                className={`px-4 py-2 rounded-md text-white ${name.length < 2 || email.length<5 || location.length<4 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Add Institute
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInstituteDialog;
