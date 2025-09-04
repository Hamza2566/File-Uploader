// ======================
// Folder Modal (New Folder)
// ======================
const folderModal = document.getElementById("newFolderModal");

// Event delegation for folder modal
document.addEventListener("click", (e) => {
  // Open folder modal
  if (e.target.classList.contains("open-modal-btn")) {
    folderModal.style.display = "flex";
  }

  // Close folder modal (click X)
  if (e.target.classList.contains("close")) {
    folderModal.style.display = "none";
  }

  // Close folder modal (click outside content)
  if (e.target === folderModal) {
    folderModal.style.display = "none";
  }
});

// ======================
// File Modal (New File)
// ======================
document.addEventListener("click", (e) => {
  const fileModal = document.querySelector(".modal-file");

  // Open file modal
  if (e.target.classList.contains("newfile")) {
    fileModal.style.display = "flex";
  }

  // Close file modal (click X)
  if (e.target.classList.contains("file-close")) {
    fileModal.style.display = "none";
  }

  // Close file modal (click outside content)
  if (e.target === fileModal) {
    fileModal.style.display = "none";
  }
});

// ======================
// Handle folder form submissions (AJAX)
// ======================
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("folder-link")) {
    const folderId = e.target.dataset.id;
    console.log("Clicked folder:", folderId);

    try {
      const response = await fetch(`/files/${folderId}`, {
        method: "GET"
      });

      if (!response.ok) throw new Error("Failed to load files");

      const html = await response.text();
      document.querySelector(".folder-content").innerHTML = html;
    } catch (err) {
      console.error(err);
      document.querySelector(".folder-content").innerHTML =
        `<p style="color:red;">⚠️ Failed to load files</p>`;
    }
  }
});
