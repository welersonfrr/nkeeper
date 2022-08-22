const session = sessionStorage.getItem("logged");
let logged;
checkLogged();
getNotas();
let data = {
  notes: [],
};

// Adicionar nota
document.getElementById("recados-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = document.getElementById("input-descricao").value;
  const detalhamento = document.getElementById("input-detalhamento").value;

  data.notes.unshift({
    descricao: descricao,
    detalhamento: detalhamento,
  });

  saveData(data);
  e.target.reset();

  getNotas();
});

// Salvar a nota no usuário logado
function saveData(data) {
  logged.notes.push(data.notes[0]);
  localStorage.setItem(logged.login, JSON.stringify(logged));
  alert("Nota Salva!");
  return;
}

// Escrever notas na tela
function getNotas() {
  const notas = logged.notes;
  let htmlElement = ``;

  if (notas.length) {
    notas.forEach((e, index) => {
      htmlElement += `
      <tr>
      <th scope="row">${index + 1}</th>
      <td>${e.descricao}</td>
      <td>${e.detalhamento}</td>
      <td>
        <div class="action-group">
          <button class="apagar" id="apagar-${index}">Apagar</button>
          <button class="editar" id="editar-${index}">Editar</button>
        </div>
      </td>
    </tr>
      `;
    });
  }

  document.getElementById("lista-recados").innerHTML = htmlElement;
}

// Checar se está logado
function checkLogged() {
  if (session != null) {
    sessionStorage.setItem("logged", session);
    logged = JSON.parse(localStorage.getItem(session));
    return;
  }

  window.location.href = "./index.html";
}

// logout
document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "./index.html";
});
