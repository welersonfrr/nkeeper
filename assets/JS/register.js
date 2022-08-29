//Criar conta
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;

  if (password != repeatPassword) {
    alert("Senhas não coincidem ");
    return;
  } else {
    saveAccount({
      login: username,
      password: password,
      notes: [],
    });
    alert("Conta criada com sucesso");
    window.location.href = "./index.html";
  }
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
