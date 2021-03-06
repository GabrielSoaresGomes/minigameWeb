setInterval(timer, 1000)

var seconds = 120
var time = seconds * 1000
var gameIsStart = false
document.getElementById('time').innerHTML = `${seconds}s <span id="moreSeconds"></span>`

function verificarPosicao(position) {
    let posicaoAtual = document.getElementsByClassName('active')[0];
    let posicoesInimigos = document.getElementsByClassName('enemy')
    var c = 0
    var listaPosicoes = []
    while (posicoesInimigos.length > c) {
        listaPosicoes.push(parseInt(posicoesInimigos[c].innerHTML))
        c++
    }
    let objectivePosition = parseInt(document.getElementsByClassName("objective")[0].innerHTML);
    let novaPosicao = parseInt(posicaoAtual.innerHTML);
    if (position == novaPosicao || listaPosicoes.includes(position) ||
        position == objectivePosition) {
        return true
    } else {
        return false
    }

}


function startGame() {
    document.querySelector('#audioStart').play()
    zerarQuadrados()
    zerarInformacoes()
    zerarItens()
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
    } else {
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
    keyPressed = (String.fromCharCode(event.keyCode)).toUpperCase()

    if (["W","A","S","D"].includes(keyPressed) && gameIsStart && gameIsPaused == false) {
        switch (keyPressed) {
        case "W":
            teclaPressionada = "cima";
            break
        case "D":
            teclaPressionada = "direita";
            break
        case "A":
            teclaPressionada = "esquerda";
            break
        case "S":
            teclaPressionada = "baixo";
            break
    }
        moverPersonagem(teclaPressionada)
    }
    if (['1','2','3','4'].includes(keyPressed) && gameIsStart && !gameIsPaused) {
        keyPressed = parseInt(keyPressed)
        var veioPelasTeclas = true
        ativarDesativarItem(keyPressed, veioPelasTeclas)

    }

}

var derrotado = false

function carregarValores() {
//Pegar o número total de quadrados
    var quantidadeQuadrados = parseInt(document.getElementsByClassName('quadrado').length)
    var numeroMaxInimigo = parseInt(quantidadeQuadrados / 2)
    return [quantidadeQuadrados, numeroMaxInimigo]
}
function moverPersonagem(direcao) {
    let valores = carregarValores()
    quantidadeQuadrados = valores[0]
    numeroMaxInimigo = valores[1]
    maiorPonto = localStorage.getItem('maiorPonto')
    if (derrotado == false) {
        if (maiorPonto == null) {
            maiorPonto = 0
        }
        let posicaoAtual = document.getElementsByClassName('active')[0];
        let objective = document.getElementsByClassName("objective")[0];
        let objectivePosition = parseInt(document.getElementsByClassName("objective")[0].innerHTML);
        let enemyPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
        let posicoesInimigos = document.getElementsByClassName('enemy')

        let novaPosicao = parseInt(posicaoAtual.innerHTML);
        switch (direcao) {
            case "cima":
                novaPosicao -= 10
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else {
                    posicaoAtual.classList.remove('active')
                    document.getElementById("quadrado" + novaPosicao).classList.add("active")
                    scrollBy(0,-50)
                }
                break
            case "esquerda":
                novaPosicao -= 1
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else if ((posicaoAtual.innerHTML).slice(-1) == '0') {
                    novaPosicao = posicaoAtual.innerHTML
                    break
                } else {
                    posicaoAtual.classList.remove('active')
                    document.getElementById("quadrado" + novaPosicao).classList.add("active")
                }
                break
            case "baixo":
                novaPosicao += 10
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else {
                    posicaoAtual.classList.remove('active')
                    document.getElementById("quadrado" + novaPosicao).classList.add("active")
                    scrollBy(0,50)
                }
                break
            case "direita":
                novaPosicao += 1
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else if ((posicaoAtual.innerHTML).slice(-1) == '9') {
                    novaPosicao = posicaoAtual.innerHTML
                    break
                } else {
                    posicaoAtual.classList.remove('active')
                    document.getElementById("quadrado" + novaPosicao).classList.add("active")
                }
                break
        }
        //Quando o usuário vence, posição nova deve ser igual à posição do objetivo
        var quadrados = document.getElementsByClassName('quadrado')
        if (novaPosicao == objectivePosition) {
            var c = 0
            var posicaoItem = -1
            while (c < quadrados.length) {
                if (quadrados[c].classList.contains('quadradoItem')) {
                    posicaoItem = parseInt(document.getElementById('quadrado'+c).innerHTML)
                }
                c++
            }
            document.querySelector('#audioCoin').play()
            seconds += 3
            document.getElementById("time").innerHTML = `${seconds}s <span id="moreSeconds"></span>`
            document.getElementById('moreSeconds').innerHTML = '+3'
            setTimeout(clearMoreSeconds, 500)


            objective.classList.remove("objective")
            document.getElementById('tabuleiro').classList.add("ganhou")


            objectivePosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1)
            inimigos = document.getElementsByClassName("enemy")
            c = 0
            var listaPosicoes = []
            while (posicoesInimigos.length > c) {
                listaPosicoes.push(parseInt(posicoesInimigos[c].innerHTML))
                c++
            }
            while (objectivePosition == posicaoItem || listaPosicoes.includes(objectivePosition) || objectivePosition == novaPosicao)  {
                objectivePosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
            }
            quadradoObjetivo = document.getElementById("quadrado" + objectivePosition)
            document.getElementById('quadrado' + objectivePosition).classList.add('objective');

            enemyPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);


            while (enemyPosition == posicaoItem || enemyPosition == objectivePosition || enemyPosition == novaPosicao || listaPosicoes.includes(enemyPosition)) {
                enemyPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
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
        // Limitar o número de inimigos para a a metade do tabuleiro
        if (listaPosicoes.length > numeroMaxInimigo) {
            inimigoDestruido = listaPosicoes[Math.floor(Math.random() * listaPosicoes.length)]
            document.getElementById('quadrado' + inimigoDestruido).classList.remove("enemy")
            document.querySelector("#audioDestroyEnemy").play()

        }
        if (listaPosicoes.includes(novaPosicao)) {
            derrotado = true
            derrota()
        }
        if (temQuadradoItem) {
            c = 0;
            while (c < quadrados.length) {
                if (quadrados[c].classList.contains('quadradoItem')) {
                   itemPosition = document.getElementById('quadrado'+c).innerHTML
                }
                c++
            }
            if (novaPosicao == itemPosition) {
                document.querySelector('#audioPickItem').play()
                document.getElementById('quadrado'+itemPosition).classList.remove('quadradoItem')
                temQuadradoItem = false
                item0 = document.getElementById('item0')
                item1 = document.getElementById('item1')
                item2 = document.getElementById('item2')
                item3 = document.getElementById('item3')
                if (!(item0.classList.contains('temItem'))) {
                    item0.classList.add('temItem')
                    item0.innerHTML = `<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(0)" ondragstart="dragStart(0)"
                    alt="Imagem de uma enderpearl">`
                }
                else if (!(item1.classList.contains('temItem'))) {
                    item1.classList.add('temItem')
                    item1.innerHTML = `<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(1)" ondragstart="dragStart(1)"
                    alt="Imagem de uma enderpearl">`
                }
                else if (!(item2.classList.contains('temItem'))) {
                    item2.classList.add('temItem')
                    item2.innerHTML = `<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(2)" ondragstart="dragStart(2)"
                    alt="Imagem de uma enderpearl">`
                }
                else if (!(item3.classList.contains('temItem'))) {
                    item3.classList.add('temItem')
                    item3.innerHTML = `<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(3)" ondragstart="dragStart(3)"
                    alt="Imagem de uma enderpearl">`
                }


            }
        }
        document.getElementById("pontos").innerHTML = `Pontos: ${pontos}`
        document.getElementById("bombas").innerHTML = `Bombas: ${bombas}`
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

function escolherQuadrado(quadradoClicado, foiArrastado) {
    quadradoEscolhido = document.getElementById("quadrado" + quadradoClicado)
    if (bombas > 0 && quadradoEscolhido.classList.contains('enemy') && gameIsPaused == false && gameIsStart) {
        document.querySelector("#audioDestroyEnemy").play()
        quadradoEscolhido.classList.remove("enemy")
        bombas--
        document.getElementById("bombas").innerHTML = `Bombas: ${bombas}`
    }
    var espacosDeItens = document.getElementsByClassName('espacoItem')
    c = 0
    var temItem = false
    var itemClicado = false
    while (c < espacosDeItens.length) {
        if (espacosDeItens[c].classList.contains('temItem')) {
            temItem = true
        }
        if (espacosDeItens[c].classList.contains('itemClicado')) {
            itemClicado = true
        }
        c++

    }
    c = 0
    if (foiArrastado == undefined) {
        foiArrastado = false
    }
    while (espacosDeItens.length > 0 && !gameIsPaused && gameIsStart && temItem && (itemClicado || foiArrastado )) {
        var teste = espacosDeItens[c].classList.contains('itemClicado')
        if (teste) {
            var itemAtivo = c
            var temAtivo = true
            break
        }
        c++
    }
    foiArrastado = false
    if ((temAtivo) && !(quadradoEscolhido.classList.contains('enemy')) &&
    !(quadradoEscolhido.classList.contains('objective')) &&
    !(quadradoEscolhido.classList.contains('active')) &&
    !(quadradoEscolhido.classList.contains('quadradoItem')) && (gameIsStart) && (!gameIsPaused)) {

        document.querySelector('#audioTeleport').play()
        document.getElementsByClassName('active')[0].classList.remove('active')
        document.getElementById('quadrado'+quadradoClicado).classList.add('active')
        document.getElementsByClassName('itemClicado')[0].classList.remove('temItem')
        document.getElementsByClassName('itemClicado')[0].innerHTML = ``
        c = 0
        while (espacosDeItens.length > c) {
            if (espacosDeItens[c].classList.contains('itemClicado')) {
                espacosDeItens[c].classList.remove('itemClicado')
            }
            c++
        }

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
    let valores  = carregarValores()
    let quantidadeQuadrados = valores[0]
    document.getElementById('quadrado0').classList.add('active')
    let objectivePosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
    document.getElementById('quadrado' + objectivePosition).classList.add('objective');


    itens = document.getElementsByClassName('quadradoItem')
    if ( itens.length > 0) {
        for( const item of itens) {
            item.classList.remove('quadradoItem')
        }
        let itemPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
        document.getElementById('quadrado'+itemPosition).classList.add('quadradoItem')
    }
}

function zerarInformacoes() {
    document.getElementsByClassName('titulo')[0].innerHTML = 'Tabuleiro'
    pontos = 0
    bombas = 0
    seconds = 120
    time = seconds * 1000
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


setInterval(spawnItem, 30000)

var temQuadradoItem = false

function spawnItem() {
    if (gameIsPaused == false && gameIsStart && temQuadradoItem == false) {
        let itemPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
        let typeItem = parseInt(Math.floor(Math.random() * 4))
        typeItem = 0 //Só tem um item até agora
        switch (typeItem) {
            case 0:
                let item = "teleporte";
            case 1:
                item = "";
            case 2:
                item = "";
            case 3:
                item = "";

        }
        while (verificarPosicao(itemPosition)) {
            itemPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
        }
        document.getElementById('quadrado' + itemPosition).classList.add('quadradoItem')
        temQuadradoItem = true
    }
}

function ativarDesativarItem(itemClicado, veioPelasTeclas) {
    if(veioPelasTeclas) {
        switch (itemClicado) { //Quando vem da função de usar os números para escolher os itens
            case 1:
                itemClicado = 0
                break;
            case 2:
                itemClicado = 1
                break;
            case 3:
                itemClicado = 2
                break;
            case 4:
                itemClicado = 3
                break;
        }
    }
    veioPelasTeclas = false
    espacosItens = document.getElementsByClassName('espacoItem')
    var espacosItens = document.getElementsByClassName('espacoItem')
    c = 0
    while (espacosItens.length > c) {
        if (espacosItens[c].classList.contains('itemClicado')) {
            var ativo = c
            espacosItens[c].classList.remove('itemClicado')
        }
        c++
    }
    itemClicado = parseInt(itemClicado)
    quadradoClicado = itemClicado
    itemClicado = document.getElementById('item'+itemClicado)
    if (itemClicado.classList.contains('temItem')) {
        itemClicado.classList.toggle('itemClicado')
    }
    c = 0
    if (quadradoClicado == ativo) {
        while (espacosItens.length > c) {
        if (espacosItens[c].classList.contains('itemClicado')) {
            espacosItens[c].classList.remove('itemClicado')
        }
        c++
    }
    }

}

function zerarItens() {
    espacosDeItens = document.getElementsByClassName('espacoItem')
    c = 0
    while (espacosDeItens.length > c) {
        if (espacosDeItens[c].classList.contains('itemClicado')) {
            espacosDeItens[c].classList.remove('itemClicado')
        }
        if (espacosDeItens[c].classList.contains('temItem')) {
            espacosDeItens[c].classList.remove('temItem')
            espacosDeItens[c].innerHTML = ``
        }
        c++
    }
}

function carregarTema() {
    var temaAtual = localStorage.getItem('temaAtual')
    let espacos = document.getElementsByClassName('espacoItem')
    if (temaAtual == undefined) {
        temaAtual = "light"
    }
    if (temaAtual == "light") {
        document.getElementsByTagName('body')[0].style.backgroundColor = "white"
        document.getElementsByTagName('body')[0].style.color = "black"
        var imagemTema = document.getElementsByClassName("imagemTema")[0]
        imagemTema.setAttribute("src","img/adjust-solid-black.svg")
        for (espaco of espacos) {
            espaco.style.borderColor = 'black'
        }
    }
    else {
        document.getElementsByTagName('body')[0].style.backgroundColor = "black"
        document.getElementsByTagName('body')[0].style.color = "white"
        var imagemTema = document.getElementsByClassName("imagemTema")[0]
        imagemTema.setAttribute("src","img/adjust-solid-white.svg")
        for (espaco of espacos) {
            espaco.style.borderColor = 'white'
        }
    }
}

function trocarTema() {
    var temaAtual = localStorage.getItem('temaAtual')
    let espacos = document.getElementsByClassName('espacoItem')
    if (temaAtual == undefined) {
    temaAtual = "light"
}
    if (temaAtual == "light") {
        temaAtual = "dark"
        localStorage.setItem("temaAtual", temaAtual)
        document.getElementsByTagName('body')[0].style.backgroundColor = "black"
        document.getElementsByTagName('body')[0].style.color = "white"
        var imagemTema = document.getElementsByClassName("imagemTema")[0]
        imagemTema.setAttribute("src","img/adjust-solid-white.svg")
        for (espaco of espacos) {
            espaco.style.borderColor = 'white'
        }
    }
    else {
        temaAtual = "light"
        localStorage.setItem("temaAtual", temaAtual)
        document.getElementsByTagName('body')[0].style.backgroundColor = "white"
        document.getElementsByTagName('body')[0].style.color = "black"
        var imagemTema = document.getElementsByClassName("imagemTema")[0]
        imagemTema.setAttribute("src","img/adjust-solid-black.svg")
        for (espaco of espacos) {
            espaco.style.borderColor = 'black'
        }
    }
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
