import https from 'https'
import dotenv from 'dotenv'
dotenv.config()

const AUTH_TOKEN = `Bearer ${process.env.SENDGRID_API_KEY}`

const options = {
    hostname: 'api.sendgrid.com',
    path: '/v3/mail/send',
    method: 'POST',
    headers: {
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json'
      }
}

const FROM_MAIL = { email: "turnosdistribuidos@hotmail.com", name:"Te Vacunamos"}







export default function sendMail(body,responseAPI){
    const mail = {"personalizations":[{"to":[{"email":body.destinatario}],"subject":body.asunto}],"content": [{"type": "text/html", "value": body.cuerpo}],"from":FROM_MAIL,"reply_to":FROM_MAIL}
   
    const req = https.request(options,(res)=>{
        let data = []
        res.on('data',(chunk)=>{
            data.push(chunk)
        })
    
        res.on("end",()=>{
            if (res.statusCode != 202){
                let response = JSON.parse(Buffer.concat(data).toString()) 
           
            
                responseAPI.writeHead(res.statusCode,{"Content-Type": "application/json"})
                responseAPI.end(JSON.stringify(response))
            }
            else{
                responseAPI.writeHead(202,{"Content-Type": "application/json"})
                responseAPI.end('{"msg":"Email enviado correctamente"}')
            }
        })
    
        res.on("error",(err)=>{
            console.log(err)
        })
    })

    req.write(JSON.stringify(mail))

    req.end()
   
}
