setInterval(timer, 1000)

var seconds = 120
var time = seconds * 1000
var gameIsStart = false
//document.getElementById('time').innerHTML = `${seconds}s <span id="moreSeconds"></span>`
$('#time').html(`${seconds}s <span id=''moreSeconds></span>`)

function verificarPosicao(position) {
    let posicaoAtual = $('.active:first')
    let posicoesInimigos = $('.enemy')
    var c = 0
    var listaPosicoes = []
    while (posicoesInimigos.length > c) {
        listaPosicoes.push(parseInt(posicoesInimigos[c].innerHTML))
        c++
    }
    let objectivePosition = parseInt($('.objective:first').html())
    let novaPosicao = parseInt(posicaoAtual.html());
    if (position == novaPosicao || listaPosicoes.includes(position) ||
        position == objectivePosition) {
        return true
    } else {
        return false
    }

}


function startGame() {
    $('#audioStart')[0].play()
    zerarQuadrados()
    zerarInformacoes()
    zerarItens()
    gameIsStart = true
    $('#buttonStart').css('display', 'none');
    $('#buttonPause').css('display', 'initial');

    timer()
    return gameIsStart
}

var gameIsPaused = false
$("#buttonPause").css("display","none")

function pauseGame() {
    if (gameIsPaused == false && gameIsStart == true) {
        gameIsPaused = true
        $('#buttonPause').html('Despausar')
    } else {
        gameIsPaused = false
        $('#buttonPause').html('Pausar')
    }
}

var maiorPonto = localStorage.getItem('maiorPonto')
if (maiorPonto == null) {
    maiorPonto = 0
}
$('#maiorPontuacao').html(`Maior Pontuação: ${maiorPonto}`)

function timer() {
    if (gameIsStart == true && gameIsPaused == false) {
        if (seconds >= 0) {
            $('#time').html(`${seconds}s <span id='moreSeconds'></span>`)
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
    var quantidadeQuadrados = parseInt($('.quadrado').length)
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
        let posicaoAtual = $('.active:first');
        let objective = $(".objective:first");
        let objectivePosition = parseInt($(".objective:first").html());
        let enemyPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
        let posicoesInimigos = $('.enemy')

        let novaPosicao = parseInt(posicaoAtual.html());
        switch (direcao) {
            case "cima":
                novaPosicao -= 10
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else {
                    posicaoAtual.removeClass('active')
                    $("#quadrado" + novaPosicao).addClass("active")
                    scrollBy(0,-50)
                }
                break
            case "esquerda":
                novaPosicao -= 1
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else if ((posicaoAtual.html()).slice(-1) == '0') {
                    novaPosicao = posicaoAtual.html()
                    break
                } else {
                    posicaoAtual.removeClass('active')
                    $("#quadrado" + novaPosicao).addClass("active")
                }
                break
            case "baixo":
                novaPosicao += 10
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else {
                    posicaoAtual.removeClass('active')
                    $("#quadrado" + novaPosicao).addClass("active")
                    scrollBy(0,50)
                }
                break
            case "direita":
                novaPosicao += 1
                if (novaPosicao < 0 || novaPosicao >= quantidadeQuadrados) {
                    break
                } else if ((posicaoAtual.html()).slice(-1) == '9') {
                    novaPosicao = posicaoAtual.html()
                    break
                } else {
                    posicaoAtual.removeClass('active')
                    $("#quadrado" + novaPosicao).addClass("active")
                }
                break
        }
        //Quando o usuário vence, posição nova deve ser igual à posição do objetivo
        var quadrados = $('.quadrado')
        if (novaPosicao == objectivePosition) {
            var c = 0
            var posicaoItem = -1
            quadrados.each(function() {
                if ($(this).hasClass("quadradoItem")) {
                    posicaoItem = parseInt($('#quadrado'+c).html())
                }
            })
            $('#audioCoin')[0].play()
            seconds += 3
            $("#time").html(`${seconds}s <span id="moreSeconds"></span>`)
            $('#moreSeconds').html = '+3'
            setTimeout(clearMoreSeconds, 500)


            objective.removeClass("objective")
            $('#tabuleiro').addClass("ganhou")


            objectivePosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1)
            inimigos = $(".enemy")
            c = 0
            var listaPosicoes = []
            posicoesInimigos.each(function() {
                listaPosicoes.push(parseInt($(this).html()))
            })
            while (objectivePosition == posicaoItem || listaPosicoes.includes(objectivePosition) || objectivePosition == novaPosicao)  {
                objectivePosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
            }
            quadradoObjetivo = $("#quadrado" + objectivePosition)
            $('#quadrado' + objectivePosition).addClass('objective');

            enemyPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);


            while (enemyPosition == posicaoItem || enemyPosition == objectivePosition || enemyPosition == novaPosicao || listaPosicoes.includes(enemyPosition)) {
                enemyPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
            }
            $('#quadrado' + enemyPosition).addClass('enemy');
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
        posicoesInimigos.each(function() {
            listaPosicoes.push(parseInt($(this).html()))


        })
        // Limitar o número de inimigos para a a metade do tabuleiro
        if (listaPosicoes.length > numeroMaxInimigo) {
            inimigoDestruido = listaPosicoes[Math.floor(Math.random() * listaPosicoes.length)]
            $('#quadrado' + inimigoDestruido).removeClass("enemy")
            $("#audioDestroyEnemy")[0].play()

        }
        if (listaPosicoes.includes(novaPosicao)) {
            derrotado = true
            derrota()
        }
        if (temQuadradoItem) {
            c = 0;
            quadrados.each(function(index) {
                if ($(this).hasClass('quadradoItem')) {
                    itemPosition = $('#quadrado'+index).html()
                }
            })

            if (novaPosicao == itemPosition) {
                $('#audioPickItem')[0].play()
                $('4quadrado'+itemPosition).removeClass('quadradoItem')
                temQuadradoItem = false
                item0 = $('#item0')
                item1 = $('#item1')
                item2 = $('#item2')
                item3 = $('#item3')
                if (!(item0.hasClass('temItem'))) {
                    item0.addClass('temItem')
                    item0.html(`<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(0)" ondragstart="dragStart(0)"
                    alt="Imagem de uma enderpearl">`)
                }
                else if (!(item1.hasClass('temItem'))) {
                    item1.addClass('temItem')
                    item1.html(`<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(1)" ondragstart="dragStart(1)"
                    alt="Imagem de uma enderpearl">`)
                }
                else if (!(item2.hasClass('temItem'))) {
                    item2.addClass('temItem')
                    item2.html(`<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(2)" ondragstart="dragStart(2)"
                    alt="Imagem de uma enderpearl">`)
                }
                else if (!(item3.hasClass('temItem'))) {
                    item3.addClass('temItem')
                    item3.html(`<img src="../img/Enderpearl.png" width="40px" ondragend="dragEnd(3)" ondragstart="dragStart(3)"
                    alt="Imagem de uma enderpearl">`)
                }
            }
        }
        $("#pontos").html(`Pontos: ${pontos}`)
        $("#bombas").html(`Bombas: ${bombas}`)
    }
}

function derrota() {
    $('#audioDeath')[0].play()
    seconds = 0
    $("#time").html(`${seconds}s <span id="moreSeconds"></span>`)
    $('.titulo:first').html('Você foi derrotado, sinto muito.')
    $('.active:first').removeClass('active')
    $('#buttonStart').html("Recomeçar")
    $('#buttonStart').css("display",'initial')
    $('#buttonPause').css("display",'none')

    gameIsStart = false
}

function clearMoreSeconds() {
    $("#moreSeconds").html(``)
}

function escolherQuadrado(quadradoClicado, foiArrastado) {
    quadradoEscolhido = $("#quadrado" + quadradoClicado)
    if (bombas > 0 && quadradoEscolhido.hasClass('enemy') && gameIsPaused == false && gameIsStart) {
        $("#audioDestroyEnemy")[0].play()
        quadradoEscolhido.removeClass("enemy")
        bombas--
       $("#bombas").html(`Bombas: ${bombas}`)
    }
    var espacosDeItens = $('.espacoItem')
    c = 0
    var temItem = false
    var itemClicado = false
    espacosDeItens.each(function() {
        if ($(this).hasClass('temItem')) {
            temItem = true
        }
        if ($(this).hasClass('itemClicado')) {
            itemClicado = true
        }
    })
    c = 0
    if (foiArrastado == undefined) {
        foiArrastado = false
    }
    while (espacosDeItens.length > 0 && !gameIsPaused && gameIsStart && temItem && (itemClicado || foiArrastado )) {
        var teste = espacosDeItens[c].hasClass('itemClicado')
        if (teste) {
            var itemAtivo = c
            var temAtivo = true
            break
        }
        c++
    }
    foiArrastado = false
    if ((temAtivo) && !(quadradoEscolhido.hasClass('enemy')) &&
    !(quadradoEscolhido.hasClass('objective')) &&
    !(quadradoEscolhido.hasClass('active')) &&
    !(quadradoEscolhido.hasClass('quadradoItem')) && (gameIsStart) && (!gameIsPaused)) {

        $('#audioTeleport')[0].play()
        $('.active')[0].removeClass('active')
        $('#quadrado'+quadradoClicado).addClass('active')
        $('.itemClicado:first').removeClass('temItem')
        $('.itemClicado:first').html("")
        c = 0
        while (espacosDeItens.length > c) {
            if (espacosDeItens[c].hasClass('itemClicado')) {
                espacosDeItens[c].removeClass('itemClicado')
            }
            c++
        }

    }


}

function zerarQuadrados() {

    if (derrotado == false) {
        $('.active:first').removeClass("active")
    }
    quadradosInimigos = $('.enemy')
    quadradosInimigos.each(function() {
        $(this).removeClass('enemy')
    })
    quadradosObjetivos = $('.objective')
    quadradosObjetivos.each(function() {
        $(this).removeClass('objective')
    })
    let valores  = carregarValores()
    let quantidadeQuadrados = valores[0]
    $('#quadrado0').addClass('active')
    let objectivePosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
    $('#quadrado' + objectivePosition).addClass('objective');


    itens = $('.quadradoItem')
    if ( itens.length > 0) {
        itens.each(function() {
            $(this).removeClass("quadradoItem")
        })
        let itemPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
        $('#quadrado'+itemPosition).addClass('quadradoItem')
    }
}

function zerarInformacoes() {
    $('.titulo:first').html('Tabuleiro')
    pontos = 0
    bombas = 0
    seconds = 120
    time = seconds * 1000
    $("#pontos").html(`Pontos: ${pontos}`)
    $("#bombas").html(`Bombas: ${bombas}`)
    derrotado = false
}

function rankPonto(maiorPonto) {
    localStorage.setItem("maiorPonto", maiorPonto);
    if (maiorPonto == null) {
        maiorPonto = 0
    }
   $("#maiorPontuacao").html(`Maior Pontuação: ${localStorage.getItem("maiorPonto")}`)

}


setInterval(spawnItem, 30000)

var temQuadradoItem = false

function spawnItem() {
    if (gameIsPaused == false && gameIsStart && temQuadradoItem == false) {
        let itemPosition = parseInt(Math.floor(Math.random() * (quantidadeQuadrados-1)) + 1);
        let typeItem = parseInt(Math.floor(Math.random() * 4))
        typeItem = 0 //Só tem um item até agora, quando tiver mais pode remover essa linha
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
        $('#quadrado' + itemPosition).addClass('quadradoItem')
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
    espacosItens = $('.espacoItem')
    var espacosItens = $('.espacoItem')
    c = 0
    espacosItens.each(function(index) {
        if ($(this).hasClass("itemClicado")) {
            var ativo = index
            $(this).removeClass("itemclicado")
        }
    })
    itemClicado = parseInt(itemClicado)
    quadradoClicado = itemClicado
    itemClicado = $('#item'+itemClicado)
    if (itemClicado.hasClass('temItem')) {
        itemClicado.toggleClass('itemClicado')
    }
    c = 0
    if (quadradoClicado == ativo) {
        while (espacosItens.length > c) {
        if (espacosItens[c].hasClass('itemClicado')) {
            espacosItens[c].removeClass('itemClicado')
        }
        c++
    }
    }

}

function zerarItens() {
    espacosDeItens = $('.espacoItem')
    c = 0
    espacosDeItens.each(function () {

        if ($(this).hasClass('itemClicado')) {
            $(this).removeClass('itemClicado')
        }
        if ($(this).hasClass('temItem')) {
            $(this).removeClass('temItem')
            $(this).html(``)
        }
    }
    )
}

        

function carregarTema() {
    var temaAtual = localStorage.getItem('temaAtual')
    let espacos = $('.espacoItem')
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
