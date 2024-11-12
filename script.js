let senha = gerarSenha();
const listaTentativas = document.getElementById("lista-tentativas");
const respostaElemento = document.getElementById("resposta");
const senhaElemento = document.getElementById("senha-correta");

function gerarSenha() {
    let senha = '';
    while (senha.length < 4) {
        let digito = Math.floor(Math.random() * 10).toString();
        if (!senha.includes(digito)) { // Evita dígitos repetidos
            senha += digito;
        }
    }
    return senha;
}

function mostrarResposta() {
    senhaElemento.textContent = senha; // Exibe a senha gerada
    respostaElemento.style.display = "block"; // Mostra o elemento de resposta
}

function verificarPalpite(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const palpite = document.getElementById("palpite").value;
    if (palpite.length !== 4 || isNaN(palpite)) {
        alert("Digite um palpite válido de 4 dígitos.");
        return;
    }

    if (palpite === senha) {
        alert("Parabéns! Você acertou a senha!");
        listaTentativas.innerHTML = ''; // Limpa tentativas anteriores
        senha = gerarSenha(); // Gera nova senha
        mostrarResposta(); // Atualiza a senha correta exibida
    } else {
        const resultado = compararSenha(palpite, senha);
        mostrarTentativa(palpite, resultado);
    }

    document.getElementById("palpite").value = ""; // Limpa o campo de entrada
}

function compararSenha(palpite, senha) {
    let bulls = 0, cows = 0;

    for (let i = 0; i < palpite.length; i++) {
        if (palpite[i] === senha[i]) {
            bulls++;
        } else if (senha.includes(palpite[i])) {
            cows++;
        }
    }

    return `${bulls} Bulls, ${cows} Cows`;
}

function mostrarTentativa(palpite, resultado) {
    const itemLista = document.createElement("li");
    itemLista.textContent = `Palpite: ${palpite} - ${resultado}`;
    listaTentativas.appendChild(itemLista);
}
