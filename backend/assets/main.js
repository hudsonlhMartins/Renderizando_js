import data from '/data.js'

const cartapio = (menu)=>{
    console.log("menu ==> ", menu)
    return `
    <div id=${menu.id} class="cartapio">
        <header>
            <h3>${menu.title} - ${data.restaurantes.get(menu.restaurantId).name}</h3>
        </header>
        <div class="cartapio_body">
            <ul>
                ${menu.sections.map(section =>(
                    `
                    <li>${section.title}</li>
                        
                    `
                )).join("")}
        
            </ul>
        </div>
    </div>
    `
}

const carapios = () =>{
    return Array.from(data.menus.values()).slice(3)
    .map(cartapio).join("")
}

const containerEl = document.querySelector(".cartapios_container")
containerEl.insertAdjacentHTML("beforeend", carapios())