// Frontend

// The following code deals with when the user is interacting with the actual 
// frontend interface & wanting to upload their file & specify the subject, etc.
// If the file upload is successful, it will call a loadFiles() - still to be implemented.
const form = document.getElementById('uploadForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const fileInpt = document.getElementById('fileInput').files[0];
  const subjectInput = document.getElementById('subjectInput').value;
  const linkInput = document.getElementById('linkInput').value;

  formData.append("file", fileInput);
  formData.append("subject", subjectInput);
  formData.append("link", linkInput);

  try {
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result); // Handle result (file info, success message)

    if (result.success){
      alert("File uploaded successfully!");
      loadFiles(); // Will refresh the list of files to update
    }

  } catch (error) {
    console.error('Upload failed:', error); // Throw error if upload fails for some reason
  }
});