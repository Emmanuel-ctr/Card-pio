//PEGANDO DO DOM
const total01 = document.querySelector("#total")
const itens01 = document.querySelector("#itens")
const cardapio01 = document.querySelector("#cardapio")

//PEGANDO API
const endPoint = "https://lanches.alissonfreire.repl.co/"

//ARRAY 
const itensSelecao = []

//ACUM
let totalValor = 0.0

//CLASSE
    class Item {
        constructor(objItem){
            this.id = objItem.id
            this.nome = objItem.nome
            this.descricao = objItem.descricao
            this.preco = objItem.preco
            this.quantidade = 1
    }
}

//FUNÇÃO
const adicionarItem = (obj) => {
    let posiçãodoArray = -1

    for (let i in itensSelecao) {
        if (itensSelecao[i].id == obj.id) {
            posiçãodoArray = i
            break
        }
    }
    if(posiçãodoArray == -1){
        let objItem = new Item(obj)
        itensSelecao.push(objItem)
    }else{
        itensSelecao[posiçãodoArray].quantidade += 1
    }

    itensListados()

    mudarValor()
}

const mudarValor = ()=>{
    totalValor = 0.0
    for (let obj of itensSelecao) {
        totalValor += obj.preco * obj.quantidade
    }

    total01.innerHTML = `R$ ${totalValor.toFixed(2).replace(".", ",")}`
}

const removerItem = (indice) => {
    let objItem = itensSelecao[indice]

    totalValor -= objItem.preco * objItem.quantidade

    itensSelecao.splice (indice, 1)

    itensListados()

    mudarValor()
}

const itensListados = () => {
    itens01.innerHTML = ""

    itensSelecao.map((elem, i) => {
        const divItemEscolhido = document.createElement("div")
        divItemEscolhido.setAttribute("class", "ItemEscolhido")

        let vlrItem = elem.preco * elem.quantidade

        divItemEscolhido.innerHTML = `${elem.descricao} ${elem.quantidade} R$ ${elem.preco.toFixed(2).replace(".",",")} R$ ${vlrItem.toFixed(2).replace(".",".")}`

        const img = document.createElement("img")
        img.setAttribute("src", "imagens/remover.png")
        img.addEventListener("click", () => {
            removerItem(i)
        })

        divItemEscolhido.appendChild(img)

        itens01.appendChild(divItemEscolhido)

    })
}


const gerarDados = (dados)=>{
    dados.map ((elem, i)=>{

    const divCard = document.createElement("div")
    divCard.setAttribute("class", "card")

    const imagemCard = document.createElement("div")
    imagemCard.setAttribute("class", "imgCard")

    const img = document.createElement("img")
    img.setAttribute("src", elem.caminhoimg)

    imagemCard.appendChild(img)

    const divDescricao = document.createElement("div")
    divDescricao.setAttribute("class", "descricao")
    divDescricao.innerHTML = elem.nome

    const divDetalhe = document.createElement("div")
    divDetalhe.setAttribute("class", "detalhe")
    divDetalhe.innerHTML = elem.descricao

    const divValor = document.createElement("div")
    divValor.setAttribute("class", "valor")
    divValor.innerHTML = `R$ ${elem.preco.toFixed(2).replace(".", ",")}`

    const divButton = document.createElement("div")
        divButton.setAttribute("class", "divButton")

        const btnButton = document.createElement("button")
        btnButton.setAttribute("class", "btnAdd")
        btnButton.innerHTML = "Adicionar"
        btnButton.addEventListener("click", () => {
           adicionarItem(elem)
        })

    divButton.appendChild(btnButton)

    divCard.appendChild(imagemCard)
    
    divCard.appendChild(divDescricao)

    divCard.appendChild(divDetalhe)

    divCard.appendChild(divValor)

    divCard.appendChild(divButton)

    cardapio01.appendChild(divCard)
})
}

const puxarDadosApi = () => {
    fetch(endPoint)
        .then(res => res.json())
        .then(dados => {
            gerarDados(dados)
        }).catch(console.log("NÃO FOI POSSÍVEL CARREGAR OS DADOS"))
}
puxarDadosApi()