import React from "react";
import Select from "@/components/atoms/Select";

const PrioritySelector = ({ value, onChange, label, required, className }) => {
  const priorityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" }
  ];

  return (
    <Select
      label={label}
      value={value}
      onChange={onChange}
      options={priorityOptions}
      placeholder="Select priority"
      required={required}
      className={className}
    />
  );
};

export default PrioritySelector;