import React, { useEffect, useState } from "react";
import departmentService from "../services/departmentService";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await departmentService.getAllDepartments();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load departments:", error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const totalDepartments = departments.length;
  const totalPending = departments.reduce(
    (sum, dept) => sum + Number(dept.pendingIssues || 0),
    0
  );
  const totalResolved = departments.reduce(
    (sum, dept) => sum + Number(dept.resolvedIssues || 0),
    0
  );
  const activeDepartments = departments.filter(
    (dept) => dept.status?.toLowerCase() === "active"
  ).length;

  return (
    <div className="container mt-4">
      {/* Hero */}
      <div
        className="p-4 rounded shadow-lg mb-4 text-white"
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e40af,#2563eb)",
        }}
      >
        <h2 className="fw-bold">🏢 Department Management Center</h2>
        <p className="mb-0">
          Track department performance, issue handling and operational efficiency across city services.
        </p>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold">{totalDepartments}</h3>
              <p className="mb-0 text-muted">Departments</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold text-warning">{totalPending}</h3>
              <p className="mb-0 text-muted">Pending Issues</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold text-success">{totalResolved}</h3>
              <p className="mb-0 text-muted">Resolved Issues</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold text-primary">{activeDepartments}</h3>
              <p className="mb-0 text-muted">Active Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department List */}
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">📋 Department Overview</h4>
            <button className="btn btn-primary" onClick={loadDepartments}>
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <p className="mb-0">Loading departments...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="alert alert-warning mb-0">
              No departments found.
            </div>
          ) : (
            <div className="row">
              {departments.map((dept) => (
                <div className="col-md-6 mb-4" key={dept.id}>
                  <div className="card shadow border-0 h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="fw-bold mb-0">
                          {dept.name || "Unnamed Department"}
                        </h5>

                        <span
                          className={`badge ${
                            dept.status?.toLowerCase() === "active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {dept.status || "Unknown"}
                        </span>
                      </div>

                      <hr />

                      <p>
                        <strong>Head:</strong>{" "}
                        {dept.departmentHead || "Not Assigned"}
                      </p>

                      <p>
                        <strong>Pending Issues:</strong>{" "}
                        {dept.pendingIssues || 0}
                      </p>

                      <p>
                        <strong>Resolved Issues:</strong>{" "}
                        {dept.resolvedIssues || 0}
                      </p>

                      <p className="mb-0">
                        <strong>Description:</strong>{" "}
                        {dept.description || "No description available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentPage;