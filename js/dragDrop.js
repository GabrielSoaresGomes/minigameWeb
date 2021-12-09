//-----------------------------------------------------------------
function dragStart(itemArrastado) {
    let itens = document.getElementsByClassName('espacoItem')
    for (let item of itens) {
        if (item.classList.contains('itemClicado')) {
            item.classList.remove('itemClicado')
        }
    }
    document.getElementById('item'+itemArrastado).classList.add('itemClicado')
    return itemArrastado
}

function dragEnd(itemArrastado) {
    document.getElementById('item'+itemArrastado).classList.remove('itemClicado')
}

function dragDrop(quadradoEscolhido) {
    if (!gameIsPaused && gameIsStart) {
        var foiArrastado = false
        foiArrastado = true
        escolherQuadrado(quadradoEscolhido, foiArrastado)
    }
}