import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AGENCY = ["NDLEA", "NAFDAC", "POLICE", "EFCC", "NDPC"];

export default function Form() {
  const [reportStatement, setReportStatement] = useState("");
  const [agency, setAgency] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("");
  const [isWalletSynced, setIsWalletSynced] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [publishReport, setPublishReport] = useState("yes");
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reportId, setReportId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
          setIsWalletSynced(true);
        })
        .catch((err) => {
          console.error("Wallet synchronization error:", err);
          setErrorMessage("Failed to sync wallet. Please try again.");
        });
    } else {
      alert("Install MetaMask Please");
      setIsWalletSynced(false);
    }
  };

  const accountChanged = (acctName) => {
    setWalletAddress(acctName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check for required fields
    if (!reportStatement || !location || !agency) {
      setErrorMessage("All fields are required.");
      return;
    }

    // File size validation
    if (file && file.size > 5 * 1024 * 1024) {
      // 5MB max size
      setErrorMessage("File size should not exceed 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("walletAddress", walletAddress || "");
    formData.append("reportStatement", reportStatement);
    formData.append("location", location);
    formData.append("agency", agency);
    formData.append("publishReport", publishReport);
    if (file) {
      formData.append("filePath", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reports",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setReportId(response.data.reportId);
        setFormSubmitted(true);
        setSuccessMessage("Your report has been successfully made!");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setErrorMessage("Failed to submit the report. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={connectWallet}
            className="sync-button"
            required
          >
            {walletAddress ? walletAddress : "Sync Wallet Address"}
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {isWalletSynced && (
            <>
              <div className="form-group">
                <label htmlFor="reportStatement">Report Statement</label>
                <textarea
                  value={reportStatement}
                  onChange={(e) => setReportStatement(e.target.value)}
                  placeholder="Write your report here...."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Report Location:</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="agency">Agency</label>
                <select
                  id="agency"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select an Agency
                  </option>
                  {AGENCY.map((agency) => (
                    <option key={agency} value={agency}>
                      {agency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="fileUpload">Upload Files (Max 5MB)</label>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="form-group">
                <label>Would you like to publish the report?</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="yes"
                      checked={publishReport === "yes"}
                      onChange={(e) => setPublishReport(e.target.value)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      checked={publishReport === "no"}
                      onChange={(e) => setPublishReport(e.target.value)}
                    />
                    No
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </>
          )}
        </form>
      ) : (
        // Show success message after form is submitted
        <div>
          <p>{successMessage}</p>
          <button onClick={() => navigate("/")}>Go to Homepage</button>
          {reportId && (
            <button onClick={() => navigate(`/report/${reportId}`)}>
              Go to Report Page
            </button>
          )}
        </div>
      )}
    </div>
  );
}
