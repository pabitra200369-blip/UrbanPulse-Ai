import React, { useEffect, useState } from "react";
import complaintService from "../services/complaintService";

function CitizenReportsPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIssues = async () => {
    try {
      setLoading(true);
      const data = await complaintService.getAllComplaints();
      setIssues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load citizen reports:", error);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const total = issues.length;
  const resolved = issues.filter((i) => i.status === "Resolved").length;
  const pending = issues.filter((i) => i.status === "Pending").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const highPriority = issues.filter((i) => i.priority === "High").length;

  return (
    <div className="container mt-4">
      {/* Hero */}
      <div
        className="p-4 rounded shadow-lg mb-4 text-white"
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e40af,#2563eb)",
        }}
      >
        <h2 className="fw-bold">📊 Citizen Reports & Analytics Center</h2>
        <p className="mb-0">
          Analyze city issues, resolution trends, priority distribution and citizen reporting activity.
        </p>
      </div>

      {/* Stats */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow text-center border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold">{total}</h3>
              <p className="mb-0 text-muted">Total Issues</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold text-success">{resolved}</h3>
              <p className="mb-0 text-muted">Resolved</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold text-warning">{pending}</h3>
              <p className="mb-0 text-muted">Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold text-danger">{highPriority}</h3>
              <p className="mb-0 text-muted">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Stats */}
      <div className="row mt-1 mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold">🚧 In Progress Issues</h5>
              <h3 className="text-primary">{inProgress}</h3>
              <p className="mb-0 text-muted">
                Complaints currently being handled by city workers and departments.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold">🌍 City Performance Summary</h5>
              <p className="mb-0 text-muted">
                Urban Pulse AI tracks complaint resolution, worker activity, department performance and issue priorities to improve city services and citizen satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">📋 Recent Citizen Reports</h4>
            <button className="btn btn-primary" onClick={loadIssues}>
              🔄 Refresh Reports
            </button>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <p className="mb-0">Loading reports...</p>
            </div>
          ) : issues.length === 0 ? (
            <div className="alert alert-warning mb-0">
              No citizen reports found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Issue Type</th>
                    <th>Location</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td>{issue.id}</td>
                      <td>{issue.issueType || "N/A"}</td>
                      <td>{issue.location || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            issue.priority === "High"
                              ? "bg-danger"
                              : issue.priority === "Medium"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {issue.priority || "N/A"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            issue.status === "Resolved"
                              ? "bg-success"
                              : issue.status === "In Progress"
                              ? "bg-primary"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {issue.status || "N/A"}
                        </span>
                      </td>
                      <td>{issue.createdAt || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CitizenReportsPage;