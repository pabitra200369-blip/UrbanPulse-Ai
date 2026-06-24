import React, { useEffect, useMemo, useState } from "react";
import workerService from "../services/workerService";

function WorkerManagementPage() {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const loadWorkers = async () => {
    try {
      setLoading(true);
      const data = await workerService.getAllWorkers();
      setWorkers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load workers:", error);
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, []);

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const text = `${worker.name || ""} ${worker.department || ""} ${worker.email || ""} ${worker.phone || ""}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [workers, searchTerm]);

  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(
    (worker) => worker.status?.toLowerCase() === "active"
  ).length;
  const inactiveWorkers = workers.filter(
    (worker) => worker.status?.toLowerCase() !== "active"
  ).length;
  const departmentsCovered = new Set(
    workers.map((worker) => worker.department).filter(Boolean)
  ).size;

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div
        className="p-4 rounded shadow-lg mb-4 text-white"
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e40af,#2563eb)",
        }}
      >
        <h2 className="fw-bold">👷 Worker Management Center</h2>
        <p className="mb-0">
          Manage field workers, monitor department assignments and track active workforce performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold">{totalWorkers}</h3>
              <p className="mb-0 text-muted">Total Workers</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold text-success">{activeWorkers}</h3>
              <p className="mb-0 text-muted">Active Workers</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold text-danger">{inactiveWorkers}</h3>
              <p className="mb-0 text-muted">Inactive Workers</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <h3 className="fw-bold text-primary">{departmentsCovered}</h3>
              <p className="mb-0 text-muted">Departments Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Refresh */}
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Search by worker name, department, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-primary w-100"
                onClick={loadWorkers}
              >
                🔄 Refresh Workers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Workers Table */}
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h4 className="fw-bold mb-3">📋 Worker Directory</h4>

          {loading ? (
            <div className="text-center py-4">
              <p className="mb-0">Loading workers...</p>
            </div>
          ) : filteredWorkers.length === 0 ? (
            <div className="alert alert-warning mb-0">
              No workers found for the current search.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Worker Name</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredWorkers.map((worker) => (
                    <tr key={worker.id}>
                      <td>{worker.id}</td>
                      <td className="fw-semibold">{worker.name || "N/A"}</td>
                      <td>{worker.department || "N/A"}</td>
                      <td>{worker.email || "N/A"}</td>
                      <td>{worker.phone || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            worker.status?.toLowerCase() === "active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {worker.status || "Unknown"}
                        </span>
                      </td>
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

export default WorkerManagementPage;