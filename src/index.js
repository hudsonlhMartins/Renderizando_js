import data from './module/retaurets.js'

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

const menuUnico = menus.get('46f2f03e-1f45-410a-97c4-ac6ace524c8a')
console.log('menuUnico ==> ', menuUnico)