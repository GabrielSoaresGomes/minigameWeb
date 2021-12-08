function escreverTabuleiro() { document.getElementById('tabuleiro').innerHTML = `
    <div id="linha00" class="linha">
        <div id="quadrado0" class="quadrado active" onclick="escolherQuadrado(0)">0</div>
        <div id="quadrado1" class="quadrado" onclick="escolherQuadrado(1)">1</div>
        <div id="quadrado2" class="quadrado" onclick="escolherQuadrado(2)">2</div>
        <div id="quadrado3" class="quadrado" onclick="escolherQuadrado(3)">3</div>
        <div id="quadrado4" class="quadrado" onclick="escolherQuadrado(4)">4</div>
        <div id="quadrado5" class="quadrado" onclick="escolherQuadrado(5)">5</div>
        <div id="quadrado6" class="quadrado" onclick="escolherQuadrado(6)">6</div>
        <div id="quadrado7" class="quadrado" onclick="escolherQuadrado(7)">7</div>
        <div id="quadrado8" class="quadrado" onclick="escolherQuadrado(8)">8</div>
        <div id="quadrado9" class="quadrado" onclick="escolherQuadrado(9)">9</div>
    </div>
    <div id="linha01" class="linha">
        <div id="quadrado10" class="quadrado" onclick="escolherQuadrado(10)">10</div>
        <div id="quadrado11" class="quadrado" onclick="escolherQuadrado(11)">11</div>
        <div id="quadrado12" class="quadrado" onclick="escolherQuadrado(12)">12</div>
        <div id="quadrado13" class="quadrado" onclick="escolherQuadrado(13)">13</div>
        <div id="quadrado14" class="quadrado" onclick="escolherQuadrado(14)">14</div>
        <div id="quadrado15" class="quadrado" onclick="escolherQuadrado(15)">15</div>
        <div id="quadrado16" class="quadrado" onclick="escolherQuadrado(16)">16</div>
        <div id="quadrado17" class="quadrado" onclick="escolherQuadrado(17)">17</div>
        <div id="quadrado18" class="quadrado" onclick="escolherQuadrado(18)">18</div>
        <div id="quadrado19" class="quadrado" onclick="escolherQuadrado(19)">19</div>
    </div>
    <div id="linha02" class="linha">
        <div id="quadrado20" class="quadrado" onclick="escolherQuadrado(20)">20</div>
        <div id="quadrado21" class="quadrado" onclick="escolherQuadrado(21)">21</div>
        <div id="quadrado22" class="quadrado" onclick="escolherQuadrado(22)">22</div>
        <div id="quadrado23" class="quadrado" onclick="escolherQuadrado(23)">23</div>
        <div id="quadrado24" class="quadrado" onclick="escolherQuadrado(24)">24</div>
        <div id="quadrado25" class="quadrado" onclick="escolherQuadrado(25)">25</div>
        <div id="quadrado26" class="quadrado" onclick="escolherQuadrado(26)">26</div>
        <div id="quadrado27" class="quadrado" onclick="escolherQuadrado(27)">27</div>
        <div id="quadrado28" class="quadrado" onclick="escolherQuadrado(28)">28</div>
        <div id="quadrado29" class="quadrado" onclick="escolherQuadrado(29)">29</div>
    </div>
    <div id="linha03" class="linha">
        <div id="quadrado30" class="quadrado" onclick="escolherQuadrado(30)">30</div>
        <div id="quadrado31" class="quadrado" onclick="escolherQuadrado(31)">31</div>
        <div id="quadrado32" class="quadrado" onclick="escolherQuadrado(32)">32</div>
        <div id="quadrado33" class="quadrado" onclick="escolherQuadrado(33)">33</div>
        <div id="quadrado34" class="quadrado" onclick="escolherQuadrado(34)">34</div>
        <div id="quadrado35" class="quadrado" onclick="escolherQuadrado(35)">35</div>
        <div id="quadrado36" class="quadrado" onclick="escolherQuadrado(36)">36</div>
        <div id="quadrado37" class="quadrado" onclick="escolherQuadrado(37)">37</div>
        <div id="quadrado38" class="quadrado" onclick="escolherQuadrado(38)">38</div>
        <div id="quadrado39" class="quadrado" onclick="escolherQuadrado(39)">39</div>
    </div>
    <div id="linha04" class="linha">
        <div id="quadrado40" class="quadrado" onclick="escolherQuadrado(40)">40</div>
        <div id="quadrado41" class="quadrado" onclick="escolherQuadrado(41)">41</div>
        <div id="quadrado42" class="quadrado" onclick="escolherQuadrado(42)">42</div>
        <div id="quadrado43" class="quadrado" onclick="escolherQuadrado(43)">43</div>
        <div id="quadrado44" class="quadrado" onclick="escolherQuadrado(44)">44</div>
        <div id="quadrado45" class="quadrado" onclick="escolherQuadrado(45)">45</div>
        <div id="quadrado46" class="quadrado" onclick="escolherQuadrado(46)">46</div>
        <div id="quadrado47" class="quadrado" onclick="escolherQuadrado(47)">47</div>
        <div id="quadrado48" class="quadrado" onclick="escolherQuadrado(48)">48</div>
        <div id="quadrado49" class="quadrado" onclick="escolherQuadrado(49)">49</div>
    </div>`
}