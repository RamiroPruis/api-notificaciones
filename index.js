
import sendMail from './mailer.js'
import checkProperties from './checker.js'
import http from 'http';
import errorHandler from './error.js';

const PORT = 2020




const server = http.createServer((req,res)=>{
    const {url,method} = req
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Allow-Headers', '*')

    if (url !=='/api/notificacion'){
        errorHandler(400,"Endpoint no valido",res)
    } else{
        if (method === 'POST'){
            let data = []

            req.on("data",(chunk)=>{
                data.push(chunk)
            })

            req.on("end",()=>{
                const body = JSON.parse(Buffer.concat(data).toString())
                
                if (!checkProperties(body)){
                    errorHandler(400,'Parametros invalidos',res)
                }else{
                    
                    sendMail(body,res)
                    
                } 
            })
            
        }else{
            errorHandler(405, "Metodo no valido",res)
        }
    }
})

server.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})