const success=(res,code,message)=>{
    return res.send({
        status:code,
        message:message
    })
}
const failure=(res,code,message)=>{
    return res.send({
        status:code,
        message:message
    })
}

module.exports = {success,failure}