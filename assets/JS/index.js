let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// Logar no sistema
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const keepLogged = document.getElementById("manter").checked;

  const account = checkAccount(username);

  if (!account) {
    loginError();
    return;
  } else {
    if (account.password != password) {
      loginError();
      return;
    }

    saveSession(username, keepLogged);

    window.location.href = "./home.html";
  }
});

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);
    window.location.href = "./home.html";
  }
}

function checkAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

function loginError() {
  const errorBox = document.createElement("div");
  errorBox.setAttribute("class", "error-box");
  errorBox.innerText = "Verifique seu usuário e senha!";

  document.body.appendChild(errorBox);

  setTimeout(() => {
    document.body.removeChild(errorBox);
  }, 4500);

  return;
}

function saveSession(data, keep) {
  if (keep) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}
