import React, { useState } from 'react';
import { CustomSearchSelect } from '../inputs/SearchSelect';
import { FileUp } from 'lucide-react';

const UploadFile = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.item(0);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOpen(false);
    const formData = new FormData();
    formData.append("datafiles", file as File);
    formData.append("mentorId","9fed265a-7d99-4a97-820e-e871ee240a9b");
    formData.append("institue","GLA");

    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="flex gap-2 bg-[#172c4f] dark:bg-white dark:text-[#172c4f] font-semibold text-white px-4 py-2 rounded-sm float-right"><FileUp/> Upload File</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 rounded-md">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Upload File in XLXS Format</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">&times;</button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="file" className="text-sm font-medium text-gray-700">Upload Students File</label>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="border rounded px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={!file}
                className={`px-4 py-2 rounded-md text-white ${!file ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
