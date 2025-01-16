import React, { useState } from 'react';

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

    const formData = new FormData();
    formData.append("datafiles", file as File);
    formData.append("mentorId","b2fe2d66-424f-494a-bf1f-ebf2f4b585aa");
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
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Upload File</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Upload File in XLXS Format</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">&times;</button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="mentor-name" className="text-sm font-medium text-gray-700">Mentor's Name</label>
                <input
                  id="mentor-name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="file" className="text-sm font-medium text-gray-700">Upload File</label>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="border rounded px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={name.length < 2}
                className={`px-4 py-2 rounded text-white ${name.length < 2 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
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
