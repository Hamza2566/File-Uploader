
  // Get elements
  const modal = document.getElementById("newFolderModal");
  const btn = document.querySelector(".open-modal-btn");
  const closeBtn = document.querySelector(".close");
  // Open modal
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
 document.querySelectorAll(".folder-form").forEach(form => {
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const params = new URLSearchParams(formData); // converts to x-www-form-urlencoded
    for (let [key, value] of formData.entries()) {
  console.log(key, value);
}


  const response = await fetch(form.action, {
    method: form.method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  const html = await response.text();
  document.querySelector(".folder-content").innerHTML = html;
});
 })




  const newfilebtn = document.querySelector(".newfile")
  const modalfile =  document.querySelector(".modal-file")
  newfilebtn.addEventListener("click",()=>{
     modalfile.style.display = "flex";
  })
  const closebtn = document.querySelector(".file-close")
   closebtn.addEventListener("click", () => {
    modalfile.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modalfile) {
      modalfile.style.display = "none";
    }
    console.log(e.target);
    
  });
