import React, { useState } from "react";
import trackingService from "../services/trackingService";

function TrackingPage() {

  const [id, setId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {

    try {

      const data =
        await trackingService.trackComplaint(id);

      if (data) {

        setComplaint(data);
        setError("");

      } else {

        setComplaint(null);
        setError("Complaint Not Found");

      }

    } catch (err) {

      setComplaint(null);
      setError("Complaint Not Found");

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2>📍 Track Complaint</h2>

        <input
          type="number"
          className="form-control mt-3"
          placeholder="Enter Complaint ID"
          value={id}
          onChange={(e) =>
            setId(e.target.value)
          }
        />

        <button
          className="btn btn-primary mt-3"
          onClick={handleTrack}
        >
          Track Complaint
        </button>

      </div>

      {error && (

        <div className="alert alert-danger mt-3">

          {error}

        </div>

      )}

      {complaint && (

        <div className="card shadow mt-4">

          <div className="card-body">

            <h4>
              Complaint Details
            </h4>

            <hr />

            <p>
              <b>ID:</b> {complaint.id}
            </p>

            <p>
              <b>Issue Type:</b>{" "}
              {complaint.issueType}
            </p>

            <p>
              <b>Status:</b>{" "}
              {complaint.status}
            </p>

            <p>
              <b>Priority:</b>{" "}
              {complaint.priority}
            </p>

            <p>
              <b>Assigned Worker:</b>{" "}
              {complaint.assignedWorker}
            </p>

            <p>
              <b>Resolution Note:</b>{" "}
              {complaint.resolutionNote}
            </p>

            <p>
              <b>Created At:</b>{" "}
              {complaint.createdAt}
            </p>

          </div>

        </div>

      )}

    </div>

  );

}

export default TrackingPage;