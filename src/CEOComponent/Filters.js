import React from "react";
import './GrievanceReport.css';

function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <label>
        Date From:
        <input
          type="date"
          name="start"
          value={filters.dateRange.start}
          onChange={handleDateChange}
        />
      </label>
      <label>
        Date To:
        <input
          type="date"
          name="end"
          value={filters.dateRange.end}
          onChange={handleDateChange}
        />
      </label>
      <label>
        Status:
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>
      <label>
        Department:
        <select
          name="department"
          value={filters.department}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="education">EDUCATION</option>
          <option value="health">HEALTH</option>
          <option value="finance">FINANCE</option>
        </select>
      </label>
    </div>
  );
}

export default Filters;
