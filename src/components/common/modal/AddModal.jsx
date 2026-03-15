import React, { useState } from 'react';

const AddModal = ({ isOpen, onClose, title, categories, inputText }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

        <form className="flex flex-col">
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-3 file:border-0 file:bg-transparent mb-4"
            placeholder="Title"
          />

          <div class="grid w-full items-center gap-1.5">
            <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Category</label>
            <select
            className="px-3 mb-4 py-2 w-full bg-white border rounded-md border-gray-400 focus:outline-none focus:ring"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          </div>

          {/* File Input with Dynamic Label */}
          <div class="grid w-full mb-4 items-center gap-1.5">
            <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">PDF file</label>
            <input id="picture" type="file" class="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
          </div>


          <div class="grid w-full mb-4 items-center gap-1.5">
            <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Background Picture</label>
            <input id="picture" type="file" class=" flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 mt-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#71b280] text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-[#5b9168] transition ease-in-out duration-150"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;