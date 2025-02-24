
// Frontend
// Create a form (UI) for user to upload pdfs

<form id="uploadForm" enctype="multipart/form-data">
  <input type="file" name="file" accept="application/pdf,.docx" />
  <input type="text" name="subject" placeholder="Enter Subject/Topic" />
  <input type="url" name="link" placeholder="Enter a Link" />
  <button type="submit">Upload</button>
</form>

// Code to send files to backend API
const form = document.getElementById('uploadForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    console.log(result); // Handle result (file info, success message)
  } catch (error) {
    console.error('Upload failed:', error); // Throw error if upload fails for some reason
  }
});

// TODO: Processing the files in backend API