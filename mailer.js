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

const FROM_MAIL = { email: "turnosdistribuidos@hotmail.com", name:"EL PAKE"}



const req = https.request(options,(res)=>{

    console.log(`STATUS CODE = ${res.statusCode}`)
    let data = []
    res.on('data',(chunk)=>{
        data.push(chunk)
    })

    res.on("end",()=>{
        const response = JSON.parse(Buffer.concat(data).toString())

        console.log(response)
    })

    res.on("error",(err)=>{
        console.log(err)
    })
})



export default function sendMail(body){
    const mail = {"personalizations":[{"to":[{"email":body.destinatario}],"subject":body.asunto}],"content": [{"type": "text/html", "value": body.cuerpo}],"from":FROM_MAIL,"reply_to":FROM_MAIL}


    req.write(JSON.stringify(mail))

    req.end()
   
}
