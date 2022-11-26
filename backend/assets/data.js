import data from './retaurets.js'

const newData = data.reduce((acc, {menus, ...restaurant})=>({
    ...acc,
    restaurants: [...acc.restaurants, [restaurant.id, {...restaurant, menusId: menus.map(menu => menu.id)}]],
    menus: [...acc.menus, ...menus.map(menu => [menu.id, {...menu, restaurantId: restaurant.id}])]
}),{
    restaurants: [],
    menus: []

})

const restaurantes = new Map(newData.restaurants)
const menus = new Map(newData.menus)

 export default {
    restaurantes,
    menus
 }