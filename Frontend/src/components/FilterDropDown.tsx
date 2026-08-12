// FilterDropdown.tsx
import React from 'react';


export interface FilterState {
categories: string[];
technologies: string[];
domains: string[];
}


interface FilterDropdownProps {
filters: FilterState;
setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}


const FilterDropdown: React.FC<FilterDropdownProps> = ({ filters, setFilters }) => {
return (
<div className="flex gap-4 mb-4">
<select
className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
onChange={(e) =>
setFilters((prev) => ({ ...prev, categories: [e.target.value] }))
}
>
<option value="">Select Category</option>
<option value="Web Development">Civil Engineering</option>
<option value="Data Science">Data Science</option>
</select>
</div>
);
};


export default FilterDropdown;