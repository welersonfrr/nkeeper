document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "./index.html";
});
