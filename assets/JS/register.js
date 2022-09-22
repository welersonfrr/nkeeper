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
    localStorage.getItem(username) == null
      ? saveAccount({
          login: username,
          password: password,
          notes: [],
        })
      : alert("Nome de usuário não disponivel!");
  }
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
  alert("Conta criada com sucesso");
  window.location.href = "./index.html";
}
