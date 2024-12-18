import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GrievanceRow = ({
  grievance,
  onAccept,
  onReject,
  onResolve,
}) => {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

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
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const handleReject = () => {
    setShowRejectReason(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      alert("Rejection reason cannot be empty.");
      return;
    }
    onReject(grievance.id, rejectReason);
    setShowRejectReason(false);
  };

  return (
    <>
      <tr>
        <td>{grievance.id}</td>
        <td>{grievance.date}</td>
        <td>{grievance.complainantName}</td>
        <td>
          {grievance.department ? grievance.department.departmentName : "N/A"}
        </td>
        <td>{grievance.type}</td>
        <td>{grievance.status}</td>
        <td>
          {grievance.status === "pending" && (
            <>
              <button
                className="m-2"
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={() => onAccept(grievance.id)}
              >
                Accept
              </button>
              <button
                className="m-2"
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
                className="m-2"
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={() => onResolve(grievance.id)}
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
              className="m-2"
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
              Reject
            </button>
          </td>
        )}
      </tr>
      {/* Reject Modal */}
      {showRejectReason && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h5>Reject Grievance</h5>
            <textarea
              placeholder="Enter reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={inputStyle}
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
                onClick={handleRejectSubmit}
              >
                Reject
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
                onClick={() => setShowRejectReason(false)}
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
