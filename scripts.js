let senha = gerarSenha();
const listaTentativas = document.getElementById("lista-tentativas");
const senhaElemento = document.getElementById("senha-correta");

// Exibe a senha correta ao carregar a página
senhaElemento.textContent = senha;

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

function verificarPalpite(event) {
    event.preventDefault(); // Impede o comportamento padrão do envio do formulário

    const palpite = document.getElementById("palpite").value;
    if (palpite.length !== 4 || isNaN(palpite)) {
        alert("Digite um palpite válido de 4 dígitos.");
        return;
    }

    if (palpite === senha) {
        alert("Parabéns! Você acertou a senha!");
        listaTentativas.innerHTML = ''; // Limpa tentativas anteriores
        senha = gerarSenha(); // Gera nova senha
        senhaElemento.textContent = senha; // Atualiza a senha correta exibida
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

