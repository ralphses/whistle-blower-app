import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AgencyDashboard() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [actionError, setActionError] = useState(""); // Separate error for actions

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reports/agency"
        );
        setReports(response.data);
        setLoading(false); // Turn off loading when reports are fetched
      } catch (error) {
        setError("Error fetching reports.");
        console.error(error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleInvestigate = async (reportId) => {
    if (
      window.confirm(
        "Are you sure you want to mark this report as 'Under Investigation'?"
      )
    ) {
      try {
        await axios.put(
          `http://localhost:5000/api/reports/${reportId}/investigate`
        );
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId
              ? { ...report, status: "Under Investigation" }
              : report
          )
        );
        setActionError(""); // Clear any previous action errors
      } catch (error) {
        setActionError("Error updating report status.");
        console.error("Error updating report status.", error);
      }
    }
  };

  const handleTurnDown = async (reportId) => {
    if (window.confirm("Are you sure you want to turn down this report?")) {
      try {
        await axios.put(
          `http://localhost:5000/api/reports/${reportId}/turn-down`
        );
        setReports((prevReports) =>
          prevReports.filter((report) => report.id !== reportId)
        );
        setActionError(""); // Clear any previous action errors
      } catch (error) {
        setActionError("Error turning down the report.");
        console.error("Error turning down the report.", error);
      }
    }
  };

  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Agency Dashboard</h2>
      {actionError && <p className="error-message">{actionError}</p>}

      {reports.length === 0 ? (
        <p>No reports available for your agency.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id} style={{ marginBottom: "20px" }}>
              <p>
                <strong>Report Statement:</strong> {report.report_statement}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      report.status === "Under Investigation"
                        ? "orange"
                        : report.status === "Turned Down"
                        ? "red"
                        : "green",
                  }}
                >
                  {report.status}
                </span>
              </p>
              <div>
                <button
                  onClick={() => handleInvestigate(report.id)}
                  disabled={report.status === "Under Investigation"}
                >
                  Investigate
                </button>
                <button
                  onClick={() => handleTurnDown(report.id)}
                  disabled={report.status === "Turned Down"}
                >
                  Turn Down
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
