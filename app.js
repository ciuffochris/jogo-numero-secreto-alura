let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }    
}

function msgsIniciais(){
    exibirTextoNaTela   ('h1' , 'Jogo do Número Secreto');
    exibirTextoNaTela   ('p' , ' Escolha um número entre 1 e 100');
}

msgsIniciais();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
     let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
     let msgTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
      exibirTextoNaTela('p' , msgTentativas);  
     document.getElementById("reiniciar").removeAttribute('disabled');
    }
    else {
       if ( chute > numeroSecreto){
            exibirTextoNaTela('p' , 'O numero secreto é menor que o chute');
       } else{
            exibirTextoNaTela('p', 'O numero secreto é maior que o chute');
       }
       tentativas ++;
       limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosDaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeNumerosDaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
}    

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    msgsIniciais();
    document.getElementById("reiniciar").setAttribute("disabled" , true);
}