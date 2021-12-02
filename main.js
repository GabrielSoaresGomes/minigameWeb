window.onload = function start() {
    let objectivePosition = parseInt(Math.floor(Math.random() * 49) + 1);
    document.getElementById('quadrado' + objectivePosition).classList.add('objective');
}
var pontos = 0

function tecla() {
    keyPressed = (String.fromCharCode(event.keyCode))
    switch (keyPressed) {
        case "W":
            keyPressed = "cima";
            break
        case "D":
            keyPressed = "direita";
            break
        case "A":
            keyPressed = "esquerda";
            break
        case "S":
            keyPressed = "baixo";
            break
    }
    moverPersonagem(keyPressed)
}


function moverPersonagem(direcao) {
    let posicaoAtual = document.getElementsByClassName('active')[0];
    let objective = document.getElementsByClassName("objective")[0];
    let objectivePosition = parseInt(document.getElementsByClassName("objective")[0].innerHTML);
    let novaPosicao = parseInt(posicaoAtual.innerHTML);
    switch (direcao) {
        case "cima":
            novaPosicao -= 10
            if (novaPosicao < 0 || novaPosicao > 49) {
                break
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
        case "esquerda":
            novaPosicao -= 1
            if (novaPosicao < 0 || novaPosicao > 49) {
                break
            } else if (["0", "10", "20", "30", "40"].includes(posicaoAtual.innerHTML)) {
                break
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
        case "baixo":
            novaPosicao += 10
            if (novaPosicao < 0 || novaPosicao > 49) {
                break
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
        case "direita":
            novaPosicao += 1
            if (novaPosicao < 0 || novaPosicao > 49) {
                break
            } else if (['9', '19', '29', '39'].includes(posicaoAtual.innerHTML)) {
                break
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
    }
    //Quando o usuário vence, posição nova deve ser igual à posição do objetivo
    if (novaPosicao == objectivePosition) {
        objective.classList.remove("objective")
        document.getElementsByTagName('body')[0].classList.add("ganhou")

        objectivePosition = parseInt(Math.floor(Math.random() * 49) + 1);
        document.getElementById('quadrado' + objectivePosition).classList.add('objective');
        pontos += 1
    }
    document.getElementById("pontos").innerHTML = `Pontos: ${pontos}`
}

// document.getElementById("MyElement").classList.add('MyClass');
//
// document.getElementById("MyElement").classList.remove('MyClass');
//
// if ( document.getElementById("MyElement").classList.contains('MyClass') )
//
// document.getElementById("MyElement").classList.toggle('MyClass');




