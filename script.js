document.getElementById("adicionarTarefa").addEventListener("click", function() {
    var novaTarefaTexto = document.getElementById("novaTarefa").value.trim();
    
    if (novaTarefaTexto) {
        var novaTarefa = document.createElement("li");
        novaTarefa.textContent = novaTarefaTexto;

        novaTarefa.innerHTML += '<button class="excluir">Excluir</button>';
        novaTarefa.innerHTML += '<button class="concluir">Concluir</button>';

        novaTarefa.querySelector(".excluir").addEventListener("click", function() {
            novaTarefa.remove();
            atualizarLocalStorage(); 
        });

        novaTarefa.querySelector(".concluir").addEventListener("click", function() {
            novaTarefa.classList.toggle("completed");
            atualizarLocalStorage(); 
        });

        document.getElementById("listaTarefas").appendChild(novaTarefa);
        document.getElementById("novaTarefa").value = "";

        salvarTarefaLocalStorage(novaTarefaTexto);
    } else {
        alert("Por favor, insira uma tarefa.");
    }
});


function salvarTarefaLocalStorage(tarefa) {
    var tarefas = [];
    if (localStorage.getItem("tarefas")) {
        tarefas = JSON.parse(localStorage.getItem("tarefas"));
    }
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    var tarefas = JSON.parse(localStorage.getItem("tarefas"));
    if (tarefas) {
        tarefas.forEach(function(tarefa) {
            criarTarefa(tarefa);
        });
    }
}


function criarTarefa(texto) {
    var novaTarefa = document.createElement("li");
    novaTarefa.textContent = texto;

    novaTarefa.innerHTML += '<button class="excluir">Excluir</button>';
    novaTarefa.innerHTML += '<button class="concluir">Concluir</button>';

    novaTarefa.querySelector(".excluir").addEventListener("click", function() {
        novaTarefa.remove();
        atualizarLocalStorage();
    });

    novaTarefa.querySelector(".concluir").addEventListener("click", function() {
        novaTarefa.classList.toggle("completed");
        atualizarLocalStorage();
    });

    document.getElementById("listaTarefas").appendChild(novaTarefa);
}

function atualizarLocalStorage() {
    var tarefas = [];
    var listaTarefas = document.getElementById("listaTarefas").children;
    for (var i = 0; i < listaTarefas.length; i++) {
        tarefas.push(listaTarefas[i].textContent);
    }
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


carregarTarefas();


const usernameInput = document.getElementById('username');
const repositoriesContainer = document.getElementById('repositories');
const buscarRepositoriosButton = document.getElementById('buscar-repositorios');

buscarRepositoriosButton.addEventListener('click', async () => {
  const username = usernameInput.value.trim();

  if (!username) {
    alert('Por favor, digite o nome de usuário do GitHub!');
    return;
  }

  try {
    const url = `https://api.github.com/search/repositories?q=user:${username}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar repositórios: ${response.status}`);
    }

    const data = await response.json(); 

    const repositories = data.items; 

    repositoriesContainer.innerHTML = ''; 

    if (repositories.length === 0) {
      repositoriesContainer.innerHTML = `<p>Nenhum repositório público encontrado para o usuário ${username}.</p>`;
    } else {
      for (const repo of repositories) {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('repository');

        const nameElement = document.createElement('h2');
        nameElement.innerText = repo.name;

        const descriptionElement = document.createElement('p');
        descriptionElement.innerText = repo.description;

        const linkElement = document.createElement('a');
        linkElement.href = repo.html_url;
        linkElement.innerText = 'Ver repositório';

        repositoryElement.appendChild(nameElement);
        repositoryElement.appendChild(descriptionElement);
        repositoryElement.appendChild(linkElement);

        repositoriesContainer.appendChild(repositoryElement);
      }
    }
  } catch (error) {
    console.error(error);
    alert('Erro ao buscar repositórios!');
  }
}); 

