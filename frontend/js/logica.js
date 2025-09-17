document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});

  document.addEventListener("DOMContentLoaded", function() {
    const bnt = document.getElementById("toggle");

    bnt.addEventListener("click", function(){
        document.body.classList.toggle("dark");
    });
});


 function mostrarTela(telaId) {
        document.querySelector('.welcome').style.display = 'none';
        document.querySelector('#provas').style.display = 'none';
        document.querySelector('#' + telaId).style.display = 'block';
    }

    
    function mostrarTela(telaId) {
        
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('provas').style.display = 'none';
        document.getElementById(telaId).style.display = 'block';
    }

    function mostrarTela(tela) {
 
  const telas = document.querySelectorAll(".tela, #dashboard");
  
  telas.forEach(t => {
    t.style.display = "none"; 
  });

  
  const telaSelecionada = document.getElementById(tela);
  if (telaSelecionada) telaSelecionada.style.display = "block";
}


    async function buscarWikipedia(materia) {
  try {
    const resposta = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${materia}`);
    const dados = await resposta.json();
    return dados.extract; 
  } catch (error) {
    console.error("Erro Wikipedia:", error);
    return "Conteúdo não encontrado.";
  }
}

let anotacoes = JSON.parse(localStorage.getItem("anotacoes")) || [];
const listaAnotacoes = document.getElementById("listaAnotacoes");
const formAnotacao = document.getElementById("formAnotacao");

function renderAnotacoes() {
  listaAnotacoes.innerHTML = "";
  anotacoes.forEach((texto, i) => {
    listaAnotacoes.innerHTML += `
      <li class="anotacao">
        <span>${texto}</span>
        <div>
          <button class="btn-editar" onclick="editarAnotacao(${i})">Editar</button>
          <button class="btn-excluir" onclick="excluirAnotacao(${i})">Excluir</button>
        </div>
      </li>
    `;
  });
}

if (formAnotacao) {
  formAnotacao.addEventListener("submit", e => {
    e.preventDefault();
    const texto = document.getElementById("textoAnotacao").value.trim();
    if (texto) {
      anotacoes.push(texto);
      localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
      renderAnotacoes();
      formAnotacao.reset();
    }
  });
}

function excluirAnotacao(i) {
  anotacoes.splice(i, 1);
  localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
  renderAnotacoes();
}

function editarAnotacao(i) {
  const novoTexto = prompt("Edite sua anotação:", anotacoes[i]);
  if (novoTexto) {
    anotacoes[i] = novoTexto;
    localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
    renderAnotacoes();
  }
}

renderAnotacoes();

const API = 'http://localhost:3000';

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const tipoUsuario = document.getElementById("tipoUsuario").value; 
    const adm = document.getElementById("isAdmin").checked ? true : false; 

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const body = { 
        nome, 
        email, 
        senha, 
        tipo: tipoUsuario, 
        isAdmin: adm 
    };
    console.log("Enviando para API:", body);

    try {
        const resp = await fetch(`${API}/tb_aluno`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await resp.json();

        if (resp.ok) {
            alert(data.message || "Aluno cadastrado com sucesso!");
            this.reset(); 
        } else {
            alert(data.message || "Erro ao cadastrar aluno!");
        }

    } catch (err) {
        console.error("Erro ao enviar:", err);
        alert("Não foi possível conectar com a API.");
    }
});




