import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search tasks...", 
  debounceMs = 300,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceMs]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        icon="Search"
        iconPosition="left"
        className="pr-10"
      />
      
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;