function moverPersonagem(direcao) {
    let posicaoAtual = document.getElementsByClassName('active')[0];
    let novaPosicao = parseInt(posicaoAtual.innerHTML)
    switch (direcao) {
        case "cima":
            novaPosicao -= 10
            if (novaPosicao < 0 || novaPosicao > 49) {
                alert("Que feio, querendo sair do mapa!")
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
        case "esquerda":
            novaPosicao -= 1
            if (novaPosicao < 0 || novaPosicao > 49) {
                alert("Que feio, querendo sair do mapa!")
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
        case "baixo":
            novaPosicao += 10
            if (novaPosicao < 0 || novaPosicao > 49) {
                alert("Que feio, querendo sair do mapa!")
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
        case "direita":
            novaPosicao += 1
            if (novaPosicao < 0 || novaPosicao > 49) {
                alert("Que feio, querendo sair do mapa!")
            } else {
                posicaoAtual.classList.remove('active')
                document.getElementById("quadrado" + novaPosicao).classList.add("active")
            }
            break
    }

}

// document.getElementById("MyElement").classList.add('MyClass');
//
// document.getElementById("MyElement").classList.remove('MyClass');
//
// if ( document.getElementById("MyElement").classList.contains('MyClass') )
//
// document.getElementById("MyElement").classList.toggle('MyClass');
