import React, { useState, useEffect } from "react";
import "./FileUpload.css";

const FileUpload = () => {
  const [subject, setSubject] = useState("");
  //const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState([]);  // Added filteredFiles state
  const [filter, setFilter] = useState("all");  // Added filter state for the subject filter

  // file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);
    //formData.append("link", link);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Upload successful:", result);
        loadFiles();
      } else {
        console.error("Upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setLoading(false);
    }
  };

  // get uploaded files from correct server (using port 5000 for backend)
  const loadFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/files");
      const data = await response.json();
      setFiles(data);
      setFilteredFiles(data);  // show all files initially
    } catch (error) {
      console.error("Error loading files:", error);
    }
  };

  // filter the files based on the selected subject
  const handleFilterChange = (e) => {
    const selectedSubject = e.target.value;
    setFilter(selectedSubject);
    if (selectedSubject === "all") {
      setFilteredFiles(files);  // show all files if "all" is selected
    } else {
      const filtered = files.filter((file) => file.subject === selectedSubject);
      setFilteredFiles(filtered);  // show filtered files by subject
    }
  };

  // load the files to appear on page
  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <center>
    <div class="image">
      <img src="/images/file-upload-logo.png" width="250" height="250"></img>
    </div>
    <div className="upload-container">
      <h2>Upload Your Study Materials Here!</h2>

      {/* file upload form */}
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
        />
        <input
          type="text"
          name="subject"
          value={subject}
          placeholder="Enter Subject/Topic"
          onChange={(e) => setSubject(e.target.value)}
        />
        {/*<input
          type="url"
          name="link"
          value={link}
          placeholder="Enter a Link (optional)"
          onChange={(e) => setLink(e.target.value)}
        />*/}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
    {/* filter dropdown menu */}
    <center>
      <div className="filter-container">
        <label htmlFor="subjectFilter">Filter by Subject:</label>
        <select id="subjectFilter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          {files
            .map((file) => file.subject)
            .filter((value, index, self) => self.indexOf(value) === index) // unique subjects
            .map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
        </select>
      </div>
      </center>

      {/* html to display uploaded files */}
      <div className="file-list">
        <h3><center>Uploaded Files</center></h3>
        <div id="fileContainer">
          {filteredFiles.map((file) => (
            <div key={file._id} className="file-item" data-subject={file.subject}>
              <table className="file-table">
                <tr>
                  <td><strong>File:</strong></td>
                  <td>{file.filename}</td>
                </tr>
                <tr>
                  <td><strong>Subject:</strong></td>
                  <td>{file.subject}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                      Download here!
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>
    </center>
  );
};

export default FileUpload;