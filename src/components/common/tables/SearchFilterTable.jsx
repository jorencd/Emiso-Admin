import React, { useState, useCallback } from "react";
import Button from "../button/Button";
import AddModal from "../modal/AddModal";

function SearchFilterTable({
  title,
  placeholder,
  categories,
  onSearchChange,
  onCategoryChange,
  buttonText,
  children,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = useCallback(
    (value) => {
      setSearch(value);
      onSearchChange(value);
    },
    [onSearchChange],
  );

  const handleCategoryChange = useCallback(
    (value) => {
      setCategory(value);
      onCategoryChange(value);
    },
    [onCategoryChange],
  );

  return (
    <div className="w-full h-screen p-2 px-10 border border-green-700">
      <h1 className="mb-4 text-xl font-bold text-neutral-700">{title}</h1>

      <div className="flex justify-between w-full gap-3 mb-4">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-3 border rounded-md border-neutral-300 focus:outline-none focus:ring"
        />
        <div className="flex items-center gap-3">
          <Button 
          text={buttonText} 
          color="green" 
          onClick={handleAddClick} />

          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-2 bg-white border rounded-md w-30 border-neutral-300 focus:outline-none focus:ring"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>{children}</div>

      <AddModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default SearchFilterTable;
