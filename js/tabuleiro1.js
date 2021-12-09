function escreverTabuleiro() { document.getElementById('tabuleiro')
    let tabuleiro = document.getElementById('tabuleiro')
    let numeroQuadrado = 50
    for (let i = 0; i < numeroQuadrado; i++) {
        var divNova = document.createElement('div')
        divNova.classList.add('quadrado')
        if (i == 0) {
            divNova.classList.add('active')
        }
        tabuleiro.appendChild(divNova)

    }

    // `
    // <div id="linha00" class="linha">
    //     <div id="quadrado0" class="quadrado active" onclick="escolherQuadrado(0)" ondragend="dragEnd(0)">0</div>
    //     <div id="quadrado1" class="quadrado" onclick="escolherQuadrado(1)" ondragend="dragEnd(1)">1</div>
    //     <div id="quadrado2" class="quadrado" onclick="escolherQuadrado(2)" ondragend="dragEnd(2)">2</div>
    //     <div id="quadrado3" class="quadrado" onclick="escolherQuadrado(3)" ondragend="dragEnd(3)">3</div>
    //     <div id="quadrado4" class="quadrado" onclick="escolherQuadrado(4)" ondragend="dragEnd(4)">4</div>
    //     <div id="quadrado5" class="quadrado" onclick="escolherQuadrado(5)" ondragend="dragEnd(5)">5</div>
    //     <div id="quadrado6" class="quadrado" onclick="escolherQuadrado(6)" ondragend="dragEnd(6)">6</div>
    //     <div id="quadrado7" class="quadrado" onclick="escolherQuadrado(7)" ondragend="dragEnd(7)">7</div>
    //     <div id="quadrado8" class="quadrado" onclick="escolherQuadrado(8)" ondragend="dragEnd(8)">8</div>
    //     <div id="quadrado9" class="quadrado" onclick="escolherQuadrado(9)" ondragend="dragEnd(9)">9</div>
    // </div>
    // <div id="linha01" class="linha">
    //     <div id="quadrado10" class="quadrado" onclick="escolherQuadrado(10)" ondragend="dragEnd(10)">10</div>
    //     <div id="quadrado11" class="quadrado" onclick="escolherQuadrado(11)" ondragend="dragEnd(11)">11</div>
    //     <div id="quadrado12" class="quadrado" onclick="escolherQuadrado(12)" ondragend="dragEnd(12)">12</div>
    //     <div id="quadrado13" class="quadrado" onclick="escolherQuadrado(13)" ondragend="dragEnd(13)">13</div>
    //     <div id="quadrado14" class="quadrado" onclick="escolherQuadrado(14)" ondragend="dragEnd()">14</div>
    //     <div id="quadrado15" class="quadrado" onclick="escolherQuadrado(15)" ondragend="dragEnd()">15</div>
    //     <div id="quadrado16" class="quadrado" onclick="escolherQuadrado(16)" ondragend="dragEnd()">16</div>
    //     <div id="quadrado17" class="quadrado" onclick="escolherQuadrado(17)" ondragend="dragEnd()">17</div>
    //     <div id="quadrado18" class="quadrado" onclick="escolherQuadrado(18)" ondragend="dragEnd()">18</div>
    //     <div id="quadrado19" class="quadrado" onclick="escolherQuadrado(19)" ondragend="dragEnd()">19</div>
    // </div>
    // <div id="linha02" class="linha">
    //     <div id="quadrado20" class="quadrado" onclick="escolherQuadrado(20)" ondragend="dragEnd()">20</div>
    //     <div id="quadrado21" class="quadrado" onclick="escolherQuadrado(21)" ondragend="dragEnd()">21</div>
    //     <div id="quadrado22" class="quadrado" onclick="escolherQuadrado(22)" ondragend="dragEnd()">22</div>
    //     <div id="quadrado23" class="quadrado" onclick="escolherQuadrado(23)" ondragend="dragEnd()">23</div>
    //     <div id="quadrado24" class="quadrado" onclick="escolherQuadrado(24)" ondragend="dragEnd()">24</div>
    //     <div id="quadrado25" class="quadrado" onclick="escolherQuadrado(25)" ondragend="dragEnd()">25</div>
    //     <div id="quadrado26" class="quadrado" onclick="escolherQuadrado(26)" ondragend="dragEnd()">26</div>
    //     <div id="quadrado27" class="quadrado" onclick="escolherQuadrado(27)" ondragend="dragEnd()">27</div>
    //     <div id="quadrado28" class="quadrado" onclick="escolherQuadrado(28)" ondragend="dragEnd()">28</div>
    //     <div id="quadrado29" class="quadrado" onclick="escolherQuadrado(29)" ondragend="dragEnd()">29</div>
    // </div>
    // <div id="linha03" class="linha">
    //     <div id="quadrado30" class="quadrado" onclick="escolherQuadrado(30)" ondragend="dragEnd()">30</div>
    //     <div id="quadrado31" class="quadrado" onclick="escolherQuadrado(31)" ondragend="dragEnd()">31</div>
    //     <div id="quadrado32" class="quadrado" onclick="escolherQuadrado(32)" ondragend="dragEnd()">32</div>
    //     <div id="quadrado33" class="quadrado" onclick="escolherQuadrado(33)" ondragend="dragEnd()">33</div>
    //     <div id="quadrado34" class="quadrado" onclick="escolherQuadrado(34)" ondragend="dragEnd()">34</div>
    //     <div id="quadrado35" class="quadrado" onclick="escolherQuadrado(35)" ondragend="dragEnd()">35</div>
    //     <div id="quadrado36" class="quadrado" onclick="escolherQuadrado(36)" ondragend="dragEnd()">36</div>
    //     <div id="quadrado37" class="quadrado" onclick="escolherQuadrado(37)" ondragend="dragEnd()">37</div>
    //     <div id="quadrado38" class="quadrado" onclick="escolherQuadrado(38)" ondragend="dragEnd()">38</div>
    //     <div id="quadrado39" class="quadrado" onclick="escolherQuadrado(39)" ondragend="dragEnd()">39</div>
    // </div>
    // <div id="linha04" class="linha">
    //     <div id="quadrado40" class="quadrado" onclick="escolherQuadrado(40)" ondragend="dragEnd()">40</div>
    //     <div id="quadrado41" class="quadrado" onclick="escolherQuadrado(41)" ondragend="dragEnd()">41</div>
    //     <div id="quadrado42" class="quadrado" onclick="escolherQuadrado(42)" ondragend="dragEnd()">42</div>
    //     <div id="quadrado43" class="quadrado" onclick="escolherQuadrado(43)" ondragend="dragEnd()">43</div>
    //     <div id="quadrado44" class="quadrado" onclick="escolherQuadrado(44)" ondragend="dragEnd()">44</div>
    //     <div id="quadrado45" class="quadrado" onclick="escolherQuadrado(45)" ondragend="dragEnd()">45</div>
    //     <div id="quadrado46" class="quadrado" onclick="escolherQuadrado(46)" ondragend="dragEnd()">46</div>
    //     <div id="quadrado47" class="quadrado" onclick="escolherQuadrado(47)" ondragend="dragEnd()">47</div>
    //     <div id="quadrado48" class="quadrado" onclick="escolherQuadrado(48)" ondragend="dragEnd()">48</div>
    //     <div id="quadrado49" class="quadrado" onclick="escolherQuadrado(49)" ondragend="dragEnd()">49</div>
    // </div>`
}