
var pontos = 0
var bombas = 0

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

var derrotado = false
function moverPersonagem(direcao) {
    if (derrotado == false) {
        let posicaoAtual = document.getElementsByClassName('active')[0];
        let objective = document.getElementsByClassName("objective")[0];
        let objectivePosition = parseInt(document.getElementsByClassName("objective")[0].innerHTML);
        let enemyPosition = parseInt(Math.floor(Math.random() * 49) + 1);
        let posicoesInimigos = document.getElementsByClassName('enemy')

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
            document.getElementById('tabuleiro').classList.add("ganhou")


            objectivePosition = parseInt(Math.floor(Math.random() * 49) + 1);

            inimigos = document.getElementsByClassName("enemy")
            c = 0
            var listaPosicoes = []
            while (posicoesInimigos.length > c) {
                listaPosicoes.push(parseInt(posicoesInimigos[c].innerHTML))
                c++
            }
            while (listaPosicoes.includes(objectivePosition)) {
                objectivePosition = parseInt(Math.floor(Math.random() * 49) + 1);
            }
            quadradoObjetivo = document.getElementById("quadrado"+objectivePosition)
            document.getElementById('quadrado' + objectivePosition).classList.add('objective');

            enemyPosition = parseInt(Math.floor(Math.random() * 49) + 1);


            while(enemyPosition == objectivePosition || enemyPosition == novaPosicao || listaPosicoes.includes(enemyPosition)) {
                enemyPosition = parseInt(Math.floor(Math.random() * 49) + 1);
            }
            document.getElementById('quadrado' + enemyPosition).classList.add('enemy');

            pontos += 1
            if (pontos % 4 == 0) {
                bombas ++
            }
        }
        c = 0
        var listaPosicoes = []
        while (posicoesInimigos.length > c) {
            listaPosicoes.push(parseInt(posicoesInimigos[c].innerHTML))
            c++
        }
        console.log("listaPosicoes ",listaPosicoes )
        if (listaPosicoes.includes(novaPosicao)) {
            console.log("Entrou",listaPosicoes)
            derrota()
        }

        document.getElementById("pontos").innerHTML = `Pontos: ${pontos}`
        document.getElementById("bombas").innerHTML = `Bombas: ${bombas}`
        // if (pontos > 0) {
        //     tabuleiro = document.getElementsByClassName('ganhou')[0]
        //     if (pontos % 2 == 0) {
        //         tabuleiro.style.backgroundColor = "red"
        //     }else if (pontos % 3 == 0) {
        //          tabuleiro.style.backgroundColor = "#dddd00"
        //     }else {
        //          tabuleiro.style.backgroundColor = "green"
        //     }
        // }
    }
}

function derrota() {
    document.getElementsByClassName('titulo')[0].innerHTML = 'Você foi derrotado, sinto muito.'
    document.getElementsByClassName('active')[0].classList.remove('active')
    derrotado = true;

}

function destruirInimigo(quadradoClicado) {
    quadradoEscolhido = document.getElementById("quadrado"+quadradoClicado)

    if (bombas > 0 && quadradoEscolhido.classList.contains('enemy')) {
        quadradoEscolhido.classList.remove("enemy")
        bombas --
    }
}
// document.getElementById("MyElement").classList.add('MyClass');
//
// document.getElementById("MyElement").classList.remove('MyClass');
//
// if ( document.getElementById("MyElement").classList.contains('MyClass') )
//
// document.getElementById("MyElement").classList.toggle('MyClass');



window.onload = function start() {
    timer()
    let objectivePosition = parseInt(Math.floor(Math.random() * 49) + 1);
    document.getElementById('quadrado' + objectivePosition).classList.add('objective');
}
