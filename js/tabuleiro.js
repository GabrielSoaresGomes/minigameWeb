function escreverTabuleiro() {
    document.getElementById('tabuleiro')
    let tabuleiro = document.getElementById('tabuleiro')
    let numeroQuadrado = 50
    for (let i = 0; i < numeroQuadrado; i++) {
        if (i % 10 == 0) {
            novaLinha = document.createElement('div')
            novaLinha.classList.add('linha')
            tabuleiro.appendChild(novaLinha)
        }
        var divNova = document.createElement('div')
        divNova.classList.add('quadrado')
        divNova.id = "quadrado" + i
        divNova.innerHTML = i
        divNova.setAttribute('onclick', "escolherQuadrado(" + i + ")")
        divNova.setAttribute('ondragover','return false')
        divNova.setAttribute("ondrop", "dragDrop("+i+")")
        if (i == 0) {
            divNova.classList.add('active')
        }
        if (i == numeroQuadrado-1) {
            divNova.setAttribute('onload',"carregarValores()")
        }
        novaLinha.appendChild(divNova)

    }
}