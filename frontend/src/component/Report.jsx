import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports"); // Ensure this endpoint matches the backend
        setReport(response.data);
        console.log(response.status);
        setLoading(false); // Turn off loading after fetching data
      } catch (error) {
        setError("Error fetching report.");
        console.error(error);
        setLoading(false);
        console.log(response.error.body);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return <div>Loading report details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!report) {
    return <div>No report found.</div>;
  }

  return (
    <div>
      <h2>Report Details</h2>
      <p>
        <strong>Report Statement:</strong> {report.report_statement}
      </p>
      <p>
        <strong>Status:</strong> {report.status}
      </p>{" "}
      {/* Show the status */}
      {/* Detailed status display */}
      {report.status === "Under Investigation" && (
        <p style={{ color: "orange" }}>
          This report is currently under investigation.
        </p>
      )}
      {report.status === "Turned Down" && (
        <p style={{ color: "red" }}>
          This report has been turned down by the agency.
        </p>
      )}
      {report.status === "Submitted" && (
        <p style={{ color: "green" }}>
          This report has been submitted and is awaiting review.
        </p>
      )}
    </div>
  );
}
