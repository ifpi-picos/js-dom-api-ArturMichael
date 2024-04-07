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
