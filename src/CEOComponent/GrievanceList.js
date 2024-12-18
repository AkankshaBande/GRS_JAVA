import React from "react";

function GrievanceList({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Grievance Number</th>
          <th>Date</th>
          <th>Department</th>
          <th>Employee Assigned</th>
          <th>Status</th>
          <th>Current Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((grievance) => (
          <tr key={grievance.grievanceNumber}>
            <td>{grievance.grievanceNumber}</td>
            <td>{grievance.date}</td>
            <td>{grievance.department}</td>
            <td>{grievance.employeeAssigned}</td>
            <td>{grievance.status}</td>
            <td>{grievance.currentAction}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GrievanceList;
