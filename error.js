export default function errorHandler(code,msg,res){
    res.writeHead(code,{'Content-Type':"application/json"})
    const obj = {
        response: msg
    }
    res.end(JSON.stringify(obj,null,2))
}