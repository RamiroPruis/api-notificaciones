
import sendMail from './mailer.js'
import checkProperties from './checker.js'
import http from 'http';
import errorHandler from './error.js';

const PORT = 2005




const server = http.createServer((req,res)=>{
    const {url,method} = req
    if (url !=='/api/notificaciones'){
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
                    try{
                        sendMail(body,res)
                        
                    }
                    catch{
                        errorHandler(500,"Ocurrio un error interno, intentelo nuevamente",res)
                    }
                    
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