import React from "react";
import Select from "@/components/atoms/Select";

const CategorySelector = ({ 
  categories = [], 
  value, 
  onChange, 
  label, 
  required, 
  className 
}) => {
  const categoryOptions = categories.map(category => ({
    value: category.Id,
    label: category.name
  }));

  return (
    <Select
      label={label}
      value={value}
      onChange={onChange}
      options={categoryOptions}
      placeholder="Select category"
      required={required}
      className={className}
    />
  );
};

export default CategorySelector;