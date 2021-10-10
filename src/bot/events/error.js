module.exports = (client) => { 
    client.on('error', err =>{
        console.log(err)
    })
}
