export default function checkProperties(obj){

    const model = {
        'destinatario': "",
        'asunto': "",
        'cuerpo': ""
    }

    const objKeys = Object.keys(obj).sort()
    const modelKeys = Object.keys(model).sort()

    return JSON.stringify(objKeys) === JSON.stringify(modelKeys)

}