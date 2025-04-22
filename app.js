// let titulo = document.querySelector('h1'); || n é errado esse, so é mais feioKKKKK
// titulo.innerHTML = 'Jogo do número secreto';
let listaDeNumerosSorteados = []
let numeroLimite = 10;
let numeroSecreto = gerarNumeroRandom();
let tentativas = 1;


function exibirTextoTela(tag, texto){
     let campo = document.querySelector(tag);
     campo.innerHTML = texto;

     //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    
       if('speechSynthesis' in window){
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
     } else {
        console.log('Web Speech API não suportada no Opera');
     } 
}

function exibirMensagemInicial(){
   exibirTextoTela('h1', "Jogo do Número Secreto");
   exibirTextoTela('p', "Escolha um número entre 1 e 10");
};
   exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTextoTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}, o numero secreto que era ${numeroSecreto}`;
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');


    } else if(chute > numeroSecreto) {
        exibirTextoTela('p','O número secreto é menor');
    } else {
        exibirTextoTela('p','O número secreto é maior');
    }
    tentativas++;
    limparCampo();
}

function gerarNumeroRandom() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if(quantidadeElementosLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroRandom();
    }else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input'); 
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroRandom();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}