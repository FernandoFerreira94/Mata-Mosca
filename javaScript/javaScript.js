let width = 0
let height = 0
let vidas = 1 // count das vidas
let tempo = 15 // tempo do jogo
let nivelTempo = 0 // cronometro nivel 

var nivelHref = window.location.search //  recupera apenas parametros passado pela URL

nivelHref = nivelHref.replace('?','') // replace('localizar caracter','substituir o caracter localizado')

switch (nivelHref) { // função dinamica para jogador escolher o nivel do game
    case 'easy':
        nivelTempo = 2000
    break;

    case 'normal':
         nivelTempo = 1500
    break;

    case 'hard':
        nivelTempo = 1000
     break;

    default:
        break;
}

function campoGame() { // funçao redimesiona o tamanho da tela, dinamico, aplicado no body da pagina
 width = window.innerWidth
 height = window.innerHeight   
}

campoGame() // função chamada para poder usar a pagina inteira 

document.getElementById('cronometro').innerHTML = tempo // incremetando o tempo no id antes do jogo comecar

let cronometro = setInterval(()=>{ // cronometro do jogo
    tempo --
if (tempo < 0) {
    clearInterval(cronometro); // pausa o setInterval do cronometro
    clearInterval(criaMosca); // pausa o setInterval das mosca randomica
    window.location.href = './vitoria.html'
} else {
    document.getElementById('cronometro').innerHTML = tempo // função para que o tempo nao passa do zero indo para -1
}
},1000)

// função de img randomica tamanho lado e posição na pagina
function imgRandomica() {
    
    let imgMosca = document.getElementById('mosca') // variavel da img mosca
    let coracao = document.getElementById('v'+vidas) // criando o variavel das img vidas

    // remover a mosca caso ja exisitir no body, evitar que acumula img de mosca
    if (imgMosca ) { // quando a pagina reconhecer se existe o id mosca ela ira remover, logo em seguida a função vai criar novamente, efeito de aparecer e sumir
        imgMosca.remove() // remove o id

        if(vidas > 3) { // if para quando a vidas acabar tomamos uma acao 
           window.location.href = ('./gameOver.html')
        } else {
            coracao.src = '../imagens/coracao_vazio.png' // modificando vida cheia para vazia se nao matar a mosca
            vidas++    // count incremetando para passa para outra img de vida  
        }
         
    }
    
    // criando posição random da mosca
    // math.floor arredonda a posição random
    var posicaoX = Math.floor( Math.random()*width) - 90 // -90 para que a img nao ultrapase o limite da pagina, ja que o ponto de referencia da img fica no canto superios a esquerda
    var posicaoY = Math.floor( Math.random()*height) - 90
    
    posicaoX = posicaoX < 0 ? 0 : posicaoX // nao houver o erro da img fica escondida no lado esquerda da pagina, ja que estamos coloando um limite de -90 para loado direito, esse limite poder vim a ser negativo para lado esquerdo, mesmo para vetical
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    
    console.log(posicaoX,posicaoY)
    
    let mosca = document.createElement('img') // criando a img da mosca
    mosca.className = sizeImg() + ' ' + ladoImg() // adicionando o classe para img/ no css essa class ja foi customizado
    // necessatio cocatenar um ' ' entre as classe.

    mosca.src = '../imagens/mosca.png' // adicionando o caminho quem vem a img
    mosca.id = 'mosca'; // atribindo id para IMG

    mosca.onclick = ()=>{ // função de click para matar a mosca
        mosca.remove(); // remove a img

    }
    // podemos estilizar usando o css pos ja que atribuimos o id nessa img
    mosca.style.position = 'absolute' // posição absoluta em relacao ao body
    mosca.style.left = posicaoX+'px' // deixando random a posição horizontal da mosca, precicamos cotatenar 'px' para que o DOM interprete que é em px o valor
    mosca.style.top = posicaoY+'px' // deixando random a posição vertical da mosca

    document.body.appendChild(mosca) // adicionando img da mosca no body

}

// funçao para fica dinamico o tamanho da mosca, class ja foram criada no css
function sizeImg() {  
    let sizeRandom = Math.floor(Math.random()*3) // random das posiçao 0, 1 e 2 , 
    return 'moscaSize'+sizeRandom // retorna moscaSize0/1/2 mesmo nome das classes no css
}

// função para o lado ficar dinamico, class ja customizada no css
function ladoImg() {
    let ladoRandom = Math.floor(Math.random()*2) //  random das posição 0 e 1
    return 'moscaLado'+ladoRandom // retorna moscaLado0/1 mesmo nome das classes no css
}

//função serInterval da dificuldade do game
var criaMosca = setInterval(()=>{ // função dinamica escolher niveis
    imgRandomica()
},nivelTempo)
