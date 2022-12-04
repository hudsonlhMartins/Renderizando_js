import data from '/data.js'

const isChildren = (children) =>{
    // console.log('children ==> ', children)
    return (Array.isArray(children) || typeof children === 'string')
}

const isString = (value) => typeof value == 'string'
const toArray = (value) => Array.isArray(value) ? value : [value] 

const normalizerChildrens = (childrens) =>{
    if(isString(childrens)){
        return document.createTextNode(childrens)
    }


    if(Array.isArray(childrens)){
       return childrens.map($crildren =>(
            isString($crildren) ? document.createTextNode($crildren) : $crildren
        ))
    }

    return childrens
}

const extractTagtName = (tagName) =>{
    const regex = /^(\w+)/
    return tagName.match(regex)[0]
}

const extractClassAndId = (tagName)=>{
    //div#card.container.item
    const regex = /[\#\.]{1}([\w\-\_]*)/g

    return (Array.from(tagName.matchAll(regex))).reduce((acc, [eleFind, eleOfGroup])=>{
        eleFind.startsWith('.') ? acc.classes.push(eleOfGroup) : acc.id.push(eleOfGroup)
        return acc
    }, {classes: [], id:[]})
 
}

const el =(tagName, attrsArr, childrenArr)=>{

    const $el = document.createElement(extractTagtName(tagName))

    const {classes, id} = extractClassAndId(tagName)
    console.log(classes, id)

    if(classes.length){
        $el.classList.add(...classes)
    }
    if(id.length){
        $el.id = id.pop()
    }
    const childrens = (isChildren(attrsArr)) ? attrsArr : childrenArr
    const attrs = !isChildren(attrsArr) ? attrsArr : {}

    Object.entries(attrs).forEach(([chave, value])=>{
        $el.setAttribute(chave, value)
    })

    const $childrens = normalizerChildrens(childrens)
    toArray($childrens).forEach($children =>{
        $el.appendChild($children)
    })
    

    return $el
}

const cardapio = (menu)=>{

    return el('div#card.container.item', [
        el('header', [
            el('div',[
                el('span', 'oi'),
                'mundo',
                el('strong', '!!!')
            ] ),
            el('h3', {style: 'color: red'}, `${menu.title}`)
        ]),
        el('div', [
            el('ul', menu.sections.map((section)=>{
                return el('li', section.title)
            }))
        ])
    ])
}

const $flagment = document.createDocumentFragment()

const $cartapios = document.querySelector(".cartapios_container")
const carapios = () =>{
    Array.from(data.menus.values()).slice(3)
    .forEach(menu =>{
        const item = cardapio(menu)
        $flagment.appendChild(item)
    })

    $cartapios.appendChild($flagment)
}

carapios()
