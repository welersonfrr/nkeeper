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

// Remover nota
function removeNota(index) {
  if (confirm("Deseja remover esta nota?")) {
    logged.notes.splice(index, 1);
    localStorage.setItem(logged.login, JSON.stringify(logged));
    getNotas();
    return;
  }
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
          <button class="apagar" id="apagar-${index}" onclick="removeNota(${index})"">Apagar</button>
          <button class="editar" id="editar-${index}" onclick="modal(${index})"">Editar</button>
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

// escreve modal para ediçao da nota
function modal(index) {
  let htmlElement = ``;
  htmlElement += `
    <div class="modal">
      <div class="edit-box">
        <h3>Editar Nota</h3>
          <div class="input-group">
            <input type="text" value="${logged.notes[index].descricao}" id="newDescricao" required />
            <input type="text" value="${logged.notes[index].detalhamento}" id="newDetalhamento" required />
          </div>
          <div class="action-group">
            <button type="button" class="cancelar" id="cancelar" onclick="removeModal()">Cancelar</button>
            <button type="submit" class="confirmar" id="confirmar" onclick="updateNota(${index})">Confirmar</button>
          </div>
      </div>
    </div>
  `;
  document.getElementById("edit-form").innerHTML = htmlElement;
  document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

// atualiza informação da nota
function updateNota(index) {
  let descricao = document.getElementById("newDescricao").value;
  let detalhamento = document.getElementById("newDetalhamento").value;

  logged.notes[index].descricao = descricao;
  logged.notes[index].detalhamento = detalhamento;

  localStorage.setItem(logged.login, JSON.stringify(logged));
  alert("nota atualizada");

  getNotas();
  removeModal();
  return;
}

// remove modal
function removeModal() {
  document.getElementById("edit-form").innerHTML = "";
}
