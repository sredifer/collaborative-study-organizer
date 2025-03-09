// Frontend

// The following code deals with when the user is interacting with the actual 
// frontend interface & wanting to upload their file & specify the subject, etc.
// If the file upload is successful, it will call a loadFiles() - still to be implemented.
const form = document.getElementById("uploadForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const fileInpt = document.getElementById("fileInput").files[0];
  const subjectInput = document.getElementById("subjectInput").value;
  const linkInput = document.getElementById("linkInput").value;

  formData.append("file", fileInput);
  formData.append("subject", subjectInput);
  formData.append("link", linkInput);

  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result); // Handle result (file info, success message)

    if (result.success){
      alert("File uploaded successfully!");
      loadFiles(); // Will refresh the list of files to update
    }

  } catch (error) {
    console.error("Upload failed:", error); // Throw error if upload fails for some reason
  }
});

// The following code is the actual implementation of the loadFiles() function
// which will send the files or whatever the user uploads to the backend database
// (also to be implemented soon) and will actually then display the uploaded files
async function loadFiles(){
  const response = await fetch("http://localhost:3000/api/upload");
  const files = await response.json();
  const fileContainer = document.getElementById("fileContainer");
  fileContainer.innerHTML = "";

  files.forEach(file => {
    const fileElement = document.createElement("div");
    fileElement.className = "file-item";
    // Dynamically create HTML elements (in this case, the uploaded files) & insert 
    // them into the webpage. Different HTML is generated based on user input
    fileElement.innerHTML = `
      <div class="file-info">
        <span class = "file-name>${file.filename}</span>
        <span class = "file-subject">${file.subject}</span>
      </div>
      <div class="file-actions">
        <a href="${file.file_url}" target="_blank">Download</a>
      </div>
    `;
    fileContainer.appendChild(fileElement)
  });
}

// When page loads, load the files
document.addEventListener("DOMContentLoaded", loadFiles)