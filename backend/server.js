import fs from 'fs'
import http from 'http'
import data from './assets/data.js'
import ejs from 'ejs'



const server = http.createServer((req, res)=>{
    console.log(req.url)
    if(req.url.match(/\.js$/)){
        const fileStream = fs.createReadStream(`./assets${req.url}`)
        console.log("entrou aqui")
        

        res.writeHead(200, {
            "Content-type": "text/javascript",
        })

    fileStream.pipe(res)
       
    }else{
        res.writeHead(200, {
            "Content-type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        })
       
        const dataTemp = {
            menus: Array.from(data.menus.values()).slice(0,3)
            .map(itemMenu => (
                {
                    ...itemMenu,
                    restaurant: {name: data.restaurantes.get(itemMenu.restaurantId).name}
                }
            ))
        }

        ejs.renderFile('./templates/index.ejs', dataTemp, (err, str)=>{
            if(err) console.log('error ==> ', err)

            res.write(str)
            res.end()
        })
        
    }

})

server.listen(9000, (err)=>{
    if(err) console.log(err)

    console.log('server listing at port 900')
})