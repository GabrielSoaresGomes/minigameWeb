//-----------------------------------------------------------------
function dragStart(itemArrastado) {
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