import React, { useState } from "react";
import axios from "axios";


const GrievanceRow = ({
  grievance,
  onAccept,
  onReject,
  onTransfer,
  onResolve,
}) => {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    setShowRejectReason(true);
  };

  const handleRejectSubmit = () => {
    onReject(grievance.grievanceId, rejectReason);
    setShowRejectReason(false);
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
          {/* Pending and Transferred Status */}
          {(grievance.status === "pending" ||
            grievance.status === "transferred") && (
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
                onClick={() => onAccept(grievance.grievanceId)}
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

          {/* Accepted Status */}
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
                onClick={() => onTransfer(grievance.grievanceId)}
              >
                Transfer
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
                onClick={() => onResolve(grievance.grievanceId)}
              >
                Resolve
              </button>
            </>
          )}
        </td>
      </tr>

      {/* Reject Reason Section */}
      {showRejectReason && (
        <tr>
          <td colSpan="7">
            <textarea
              placeholder="Enter reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
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
              Submit Reject
            </button>
          </td>
        </tr>
      )}
    </>
  );
};
export default GrievanceRow;
