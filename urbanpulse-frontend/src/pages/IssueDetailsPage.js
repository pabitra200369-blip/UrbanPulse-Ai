import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function IssueDetailsPage() {
  const { id } = useParams();

  const issues =
    JSON.parse(localStorage.getItem("issues")) || [];

  const issue = issues.find(
    (item) => item.id.toString() === id
  );

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const role =
  localStorage.getItem("role");

  useEffect(() => {
    if (issue?.feedback) {
      setRating(issue.feedback.rating || "");
      setComment(issue.feedback.comment || "");
    }
  }, [issue]);

  if (!issue) {
    return (
      <div className="container mt-4">
        <h3>Issue Not Found</h3>
      </div>
    );
  }

  const saveFeedback = () => {
    const allIssues =
      JSON.parse(localStorage.getItem("issues")) || [];

    const updatedIssues = allIssues.map((item) =>
      item.id === issue.id
        ? {
            ...item,
            feedback: {
              rating,
              comment,
            },
          }
        : item
    );

    localStorage.setItem(
      "issues",
      JSON.stringify(updatedIssues)
    );

    alert("Feedback Submitted Successfully");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <div
  className="p-4 rounded shadow-lg mb-4 text-white"
  style={{
    background:
      "linear-gradient(135deg,#0f172a,#1e40af,#2563eb)",
  }}
>
  <h2 className="fw-bold">
    🔍 Issue Tracking Center
  </h2>

  <p className="mb-0">
    Monitor issue progress, resolution status and citizen feedback.
  </p>
</div>

          <p>
            <strong>ID:</strong> {issue.id}
          </p>

          <p>
            <strong>Type:</strong> {issue.type}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {issue.location}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {issue.description}
          </p>

          <p>
  <strong>Priority:</strong>{" "}

  <span
    className={`badge ${
      issue.priority === "High"
        ? "bg-danger"
        : issue.priority === "Medium"
        ? "bg-warning text-dark"
        : "bg-success"
    }`}
  >
    {issue.priority}
  </span>
</p>
          <p>
  <strong>Reported On:</strong>{" "}
  {issue.createdAt || "N/A"}
</p>

 <p>
  <strong>Status:</strong>{" "}

  <span
    className={`badge ${
      issue.status === "Resolved"
        ? "bg-success"
        : issue.status === "In Progress"
        ? "bg-primary"
        : "bg-warning text-dark"
    }`}
  >
    {issue.status}
  </span>
</p>
<h5 className="mt-4">
  📈 Resolution Progress
</h5>

<div className="progress mb-3">

  <div
    className={`progress-bar ${
      issue.status === "Resolved"
        ? "bg-success"
        : issue.status === "In Progress"
        ? "bg-primary"
        : "bg-warning"
    }`}
    role="progressbar"
    style={{
      width:
        issue.status === "Pending"
          ? "25%"
          : issue.status === "In Progress"
          ? "75%"
          : "100%"
    }}
  >
    {
      issue.status === "Pending"
        ? "25%"
        : issue.status === "In Progress"
        ? "75%"
        : "100%"
    }
  </div>

</div>

<p>
  <strong>⏱ Estimated Resolution:</strong>{" "}
  {issue.priority === "High"
    ? "24 Hours"
    : issue.priority === "Medium"
    ? "48 Hours"
    : "72 Hours"}
</p>

<div className="alert alert-light">
  🤖 AI Prediction: This issue is expected
  to be resolved within the estimated timeframe.
</div>

          <p>
            <strong>Resolution Note:</strong>{" "}
            {issue.resolutionNote ||
              "Not Available"}
          </p>
          <p>
  <strong>Assigned Worker:</strong>{" "}

  {issue.assignedWorker ||
    "Not Assigned Yet"}
</p>

          <hr />

          <h4 className="mt-4 fw-bold">
  📌 Smart Resolution Timeline
</h4>

<div className="mt-3">

  <div className="alert alert-success">
    ✅ Issue Reported
  </div>

  {issue.assignedWorker && (
    <div className="alert alert-info">
      👷 Assigned To: {issue.assignedWorker}
    </div>
  )}

  {(issue.status === "In Progress" ||
    issue.status === "Resolved") && (
    <div className="alert alert-primary">
      🔧 Work Started
    </div>
  )}

  {issue.resolutionNote && (
    <div className="alert alert-warning">
      📝 Resolution Note Added
    </div>
  )}

  {issue.status === "Resolved" && (
    <div className="alert alert-success">
      🎉 Issue Successfully Resolved
    </div>
  )}

</div>

          {issue.image && (
            <>
              <h5 className="mt-4">
                Uploaded Image
              </h5>

              <img
                src={issue.image}
                alt="Issue"
                className="img-fluid rounded"
                style={{
                  maxWidth: "400px",
                }}
              />
            </>
          )}

          {issue.mapLink && (
            <div className="mt-4">
              <a
                href={issue.mapLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                📍 Open Location
              </a>
            </div>
          )}

          {issue.status === "Resolved" &&
          role === "user" &&(
            <div className="card mt-4">
              <div className="card-body">
                <h4>
                  ⭐ Rate Resolution
                </h4>

                <div className="mb-3">
                  <label>Rating</label>

                  <select
                    className="form-select"
                    value={rating}
                    onChange={(e) =>
                      setRating(e.target.value)
                    }
                  >
                    <option value="">
                      Select Rating
                    </option>

                    <option value="1">
                      ⭐
                    </option>
                    <option value="2">
                      ⭐⭐
                    </option>
                    <option value="3">
                      ⭐⭐⭐
                    </option>
                    <option value="4">
                      ⭐⭐⭐⭐
                    </option>
                    <option value="5">
                      ⭐⭐⭐⭐⭐
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Comment</label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={comment}
                    onChange={(e) =>
                      setComment(e.target.value)
                    }
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveFeedback}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueDetailsPage;