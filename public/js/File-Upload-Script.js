// Frontend

// The following code deals with when the user is interacting with the actual 
// frontend interface & wanting to upload their file & specify the subject, etc.
// If the file upload is successful, it will call a loadFiles() function that will
// send the file data to the backend
const form = document.getElementById("uploadForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const fileInpt = document.getElementById("fileInput").files[0];
  const subjectInput = document.getElementById("subjectInput").value;
  console.log('Subject input value:', subjectInput);
  const linkInput = document.getElementById("linkInput").value;

  formData.append("file", fileInput);
  formData.append("subject", subjectInput);
  formData.append("link", linkInput);

  console.log("FormData: ", formData);

  // send formdata to server
  fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData
  })

    .then(response => response.json())
    .then(data => {
      console.log("Upload successful!", data);
      loadFiles();
    })
    .catch(error => console.error("Error uploading: ", error));
});

// The following code is the actual implementation of the loadFiles() function
// which will send the files or whatever the user uploads to the backend database
// and will actually then display the uploaded files on the frontend with a
// dynamic filtering option
async function loadFiles(){
  try {
      const response = await fetch("http://localhost:3000/api/files");
      const files = await response.json();
      
      if (response.ok) {
          const fileContainer = document.getElementById("fileContainer");
          const subjectFilter = document.getElementById("subjectFilter");

          fileContainer.innerHTML = "";  // clear existing files
          subjectFilter.innerHTML = ""; // clear dropdown (avoid duplicate subjects)

          // all option for dropdown menu that will show all files
          const allOption = document.createElement("option");
          allOption.value = "all";
          allOption.textContent = "All";
          subjectFilter.appendChild(allOption);
          
          const subjects = new Set(); // use a set to store **unique** subjects

          files.forEach(file => {
              subjects.add(file.subject); // unique subjects
              const fileElement = document.createElement("div");
              fileElement.className = "file-item";
              fileElement.dataset.subject = file.subject;

              // html code to dynamically create the elements to display for when files are uploaded
              fileElement.innerHTML = `
                  <table class="file-table">
                      <tr>
                          <td><strong>File:</strong></td>
                          <td>${file.filename}</td>
                      </tr>
                      <tr>
                          <td><strong>Subject:</strong></td>
                          <td>${file.subject}</td>
                      </tr>
                      <tr>
                          <td colspan="2"><a href="${file.file_url}" target="_blank">Download here!</a></td>
                      </tr>
                  </table>
              `;
              fileContainer.appendChild(fileElement);
          });

          // add subjects to dropdown option
          subjects.forEach(subject => {
            const option = document.createElement("option");
            option.value = subject;
            option.textContent = subject;
            subjectFilter.appendChild(option);
          });

      } else {
          console.error("Failed to load files", response);
      }
  } catch (error) {
      console.error("Error loading files:", error);
  }
}

// change dropdown to add subjects and filter the files that are displayed
document.getElementById("subjectFilter").addEventListener("change", (event) => {
  const selectedSubject = event.target.value;
  const files = document.querySelectorAll(".file-item");

  files.forEach(file => {
    if (selectedSubject === "all" || file.dataset.subject === selectedSubject){
      file.style.display = "block"; // shows file
    } else {
      file.style.display = "none"; // won't show file
    }
  });
});

// when page loads, load the files
document.addEventListener("DOMContentLoaded", loadFiles)