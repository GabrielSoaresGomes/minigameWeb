setInterval(timer, 1000)
var time = 5000
var seconds = 5

var gameIsStart = false

function startGame() {
    document.querySelector('#audioStart').play()
    zerarQuadrados()
    zerarInformacoes()
    gameIsStart = true
    document.getElementById('buttonStart').style.display = "none"
    document.getElementById('buttonPause').style.display = 'initial'
    timer()
    return gameIsStart
}

var gameIsPaused = false
document.getElementById('buttonPause').style.display = 'none'
function pauseGame() {
    if (gameIsPaused == false && gameIsStart == true) {
        gameIsPaused = true
        document.getElementById('buttonPause').innerHTML = "Despausar"
    }else {
        gameIsPaused = false
        document.getElementById('buttonPause').innerHTML = "Pausar"
    }
    
    

}

var maiorPonto = localStorage.getItem('maiorPonto')
if (maiorPonto == null) {
    maiorPonto = 0
}
document.getElementById("maiorPontuacao").innerHTML = `Maior Pontuação: ${maiorPonto}`;

function timer() {
    if (gameIsStart == true && gameIsPaused == false) {
        if (seconds >= 0) {
            document.getElementById("time").innerHTML = `${seconds}s <span id="moreSeconds"></span>`
            seconds -= 1
        } else {
            derrotado = true
            derrota()
        }
    }
}

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
    if (gameIsStart && gameIsPaused == false) {
       moverPersonagem(keyPressed)
    }
}

var derrotado = false

function moverPersonagem(direcao) {
    maiorPonto = localStorage.getItem('maiorPonto')
    if (derrotado == false) {
        if (maiorPonto == null) {
            maiorPonto = 0
        }
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
                    novaPosicao = posicaoAtual.innerHTML
                    break
                } else {
                    posicaoAtual.classList.remove('active')
                    document.getElementById("quadrado" + novaPosicao).classList.add("active")
                }
                break
        }
        //Quando o usuário vence, posição nova deve ser igual à posição do objetivo
        if (novaPosicao == objectivePosition) {
            document.querySelector('#audioCoin').play()
            seconds += 3
            document.getElementById("time").innerHTML = `${seconds}s <span id="moreSeconds"></span>`
            document.getElementById('moreSeconds').innerHTML = '+3'
            setTimeout(clearMoreSeconds, 500)


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
            while (listaPosicoes.includes(objectivePosition) || objectivePosition == novaPosicao) {
                objectivePosition = parseInt(Math.floor(Math.random() * 49) + 1);
            }
            quadradoObjetivo = document.getElementById("quadrado" + objectivePosition)
            document.getElementById('quadrado' + objectivePosition).classList.add('objective');

            enemyPosition = parseInt(Math.floor(Math.random() * 49) + 1);


            while (enemyPosition == objectivePosition || enemyPosition == novaPosicao || listaPosicoes.includes(enemyPosition)) {
                enemyPosition = parseInt(Math.floor(Math.random() * 49) + 1);
            }
            document.getElementById('quadrado' + enemyPosition).classList.add('enemy');
            pontos += 1
            if (pontos % 4 == 0) {
                bombas++
            }
            if (pontos > maiorPonto) {
                var maiorPonto = pontos
                rankPonto(maiorPonto)
            }
        }
        c = 0
        var listaPosicoes = []
        while (posicoesInimigos.length > c) {
            listaPosicoes.push(parseInt(posicoesInimigos[c].innerHTML))
            c++
        }
        if (listaPosicoes.length > 25) {
            inimigoDestruido = listaPosicoes[Math.floor(Math.random() * listaPosicoes.length)]
            document.getElementById('quadrado'+inimigoDestruido).classList.remove("enemy")
            document.querySelector("#audioDestroyEnemy").play()

        }
        if (listaPosicoes.includes(novaPosicao)) {
            derrotado = true
            derrota()
        }


        document.getElementById("pontos").innerHTML = `Pontos: ${pontos}`
        document.getElementById("bombas").innerHTML = `Bombas: ${bombas}`
        if (derrotado) {
            derrota()
        }
    }
}

function derrota() {
    document.querySelector('#audioDeath').play()
    seconds = 0
    document.getElementById("time").innerHTML = `${seconds}s <span id="moreSeconds"></span>`
    document.getElementsByClassName('titulo')[0].innerHTML = 'Você foi derrotado, sinto muito.'
    document.getElementsByClassName('active')[0].classList.remove('active')
    document.getElementById('buttonStart').innerHTML = "Recomeçar"
    document.getElementById('buttonStart').style.display = 'initial'
    document.getElementById('buttonPause').style.display = 'none'

    gameIsStart = false

}

function clearMoreSeconds() {
    document.getElementById("moreSeconds").innerHTML = ``
}

function destruirInimigo(quadradoClicado) {
    quadradoEscolhido = document.getElementById("quadrado" + quadradoClicado)

    if (bombas > 0 && quadradoEscolhido.classList.contains('enemy') && gameIsPaused == false && gameIsStart) {
        document.querySelector("#audioDestroyEnemy").play()
        quadradoEscolhido.classList.remove("enemy")
        bombas--
        document.getElementById("bombas").innerHTML = `Bombas: ${bombas}`
    }
}

function zerarQuadrados() {
    if (derrotado == false) {
        document.getElementsByClassName('active')[0].classList.remove("active")
    }
    quadradosInimigos = document.getElementsByClassName('enemy')

    while (0 < quadradosInimigos.length) {
        quadradosInimigos[0].classList.remove('enemy')
    }
    quadradosObjetivos = document.getElementsByClassName('objective')
    while (0 < quadradosObjetivos.length) {
        quadradosObjetivos[0].classList.remove('objective')
    }

    document.getElementById('quadrado0').classList.add('active')
    let objectivePosition = parseInt(Math.floor(Math.random() * 49) + 1);
    document.getElementById('quadrado' + objectivePosition).classList.add('objective');
}

function zerarInformacoes() {
    document.getElementsByClassName('titulo')[0].innerHTML = 'Tabuleiro'
    pontos = 0
    bombas = 0
    seconds = 5
    time = 5000
    document.getElementById("pontos").innerHTML = `Pontos: ${pontos}`
    document.getElementById("bombas").innerHTML = `Bombas: ${bombas}`
    derrotado = false
}

function rankPonto(maiorPonto) {
    localStorage.setItem("maiorPonto", maiorPonto);
    if (maiorPonto == null) {
        maiorPonto = 0
    }
    document.getElementById("maiorPontuacao").innerHTML = `Maior Pontuação: ${localStorage.getItem("maiorPonto")}`;

}

// document.getElementById("MyElement").classList.add('MyClass');
//
// document.getElementById("MyElement").classList.remove('MyClass');
//
// if ( document.getElementById("MyElement").classList.contains('MyClass') )
//
// document.getElementById("MyElement").classList.toggle('MyClass');


// window.onload = function start() {
//
// }
