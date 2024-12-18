import React from "react";
import GrievanceRow from "./GrievanceRow";

const GrievanceTable = ({
  grievances,
  onAccept,
  onReject,
  onTransfer,
  onResolve,
}) => {
  return (
    <div className="card p-3">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Grievance ID</th>
            <th>Date</th>
            <th>Complainant Name</th>
            <th>Department</th>
            <th>Grievance Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((grievance) => (
            <GrievanceRow
              key={grievance.id}
              grievance={grievance}
              onAccept={onAccept}
              onReject={onReject}
              onTransfer={onTransfer}
              onResolve={onResolve}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceTable;
