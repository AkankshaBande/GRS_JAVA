import React, { useState } from "react";

const GrievanceRow = ({
  grievance,
  onAccept,
  onReject,
  onTransfer,
  onResolve,
}) => {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferDetails, setTransferDetails] = useState({
    department: "",
    designation: "",
    employeeName: "",
  });

  const handleReject = () => {
    setShowRejectReason(true);
  };

  const handleRejectSubmit = () => {
    onReject(grievance.grievanceId, rejectReason);
    setShowRejectReason(false);
  };

  const handleTransferSubmit = () => {
    const { department, designation, employeeName } = transferDetails;

    // Check if any field is empty
    if (!department || !designation || !employeeName) {
      alert("Please fill out the form correctly.");
    } else {
      onTransfer(grievance.grievanceId, transferDetails);
      setShowTransferModal(false); // Close modal after transfer
    }
  };

  const buttonStyle = {
    backgroundColor: "#126262",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    margin: "5px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#21a1a5",
  };

  const modalBackdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const modalActionsStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  };

  const inputStyle = {
    width: "100%", // Set width to 100% for consistency
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <>
      <tr>
        <td>{grievance.grievanceId}</td>
        <td>{grievance.date}</td>
        <td>{grievance.complainantName}</td>
        <td>{grievance.department}</td>
        <td>{grievance.type}</td>
        <td>{grievance.status}</td>
        <td>
          {grievance.status === "pending" && (
            <>
              <button
                className=" m-2"
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={() => onAccept(grievance.grievanceId)}
              >
                Accept
              </button>
              <button
                className=" m-2"
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={handleReject}
              >
                Reject
              </button>
            </>
          )}
          {grievance.status === "accepted" && (
            <>
              <button
                className=" m-2"
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={() => setShowTransferModal(true)}
              >
                Transfer
              </button>
              <button
                className=" m-2"
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={() => onResolve(grievance.grievanceId)}
              >
                Resolve
              </button>
            </>
          )}
        </td>
        {showRejectReason && (
          <td>
            <textarea
              placeholder="Enter reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={inputStyle}
            />
            <button
              className=" m-2"
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = buttonStyle.backgroundColor)
              }
              onClick={handleRejectSubmit}
            >
              Submit Reject
            </button>
          </td>
        )}
      </tr>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h5>Transfer Grievance</h5>
            <label>Department:</label>
            <select
              value={transferDetails.department}
              onChange={(e) =>
                setTransferDetails({
                  ...transferDetails,
                  department: e.target.value,
                })
              }
              style={inputStyle} // Apply the same width style
            >
              <option value="">Select Department</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
            </select>

            <label>Designation:</label>
            <select
              value={transferDetails.designation}
              onChange={(e) =>
                setTransferDetails({
                  ...transferDetails,
                  designation: e.target.value,
                })
              }
              style={inputStyle} // Apply the same width style
            >
              <option value="">Select Designation</option>
              <option value="Manager">Manager</option>
              <option value="Senior Staff">Senior Staff</option>
              <option value="Junior Staff">Junior Staff</option>
            </select>

            <label>Employee Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={transferDetails.employeeName}
              onChange={(e) =>
                setTransferDetails({
                  ...transferDetails,
                  employeeName: e.target.value,
                })
              }
              style={inputStyle} // Apply the same width style
            />

            <div style={modalActionsStyle}>
              <button
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={handleTransferSubmit}
              >
                Submit Transfer
              </button>
              <button
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={() => setShowTransferModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GrievanceRow;
