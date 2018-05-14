const net = require('net')
const fs = require('fs')
const host = 'challenge.yuansuan.cn'
const port = 7042
const address = `${host}:${port}`

const chunks = []
const all = []
let startWrite = false
let sent = false

let client = net.createConnection( {host, port, setKeepAlive:true}, (socket) =>{
  console.log('connected')
})

client.on('data', function(data){
  console.log('-------data begin-------\n')
  let msg = data.toString()
  let id = parseInt(msg.replace(/\D*/, ''))

  console.log('data:', data)
  console.log('msg:', msg)
  console.log('id:', id)
  if(msg.toLowerCase().indexOf('success') !== -1) {
    startWrite = true
  }


  if(!sent && id) {
    let reply = `IAM:${id}:zenoven@gmail.com\n`
    console.log('reply:', reply)
    client.write(reply, 'utf8', () => {
      sent = true
      console.log('reply sent.')
    })
  }

  console.log('startWrite:', startWrite)
  if(startWrite && msg.indexOf('SUCCESS') === -1) {
    chunks.push(data)
  }

  all.push(data)
  console.log('-------data end-------\n')
})
client.on('close', function () {
  console.log('connection closed')
})

client.on('end', function (data) {
  fs.writeFile('chunks', chunks, (err) => {
    if (err) {
      console.log('err:\n')
      console.log(err)
    }
    console.log('chunk has been saved!');
  })

  fs.writeFile('all', all, (err) => {
    if (err) {
      console.log('err:\n')
      console.log(err)
    }
    console.log('all has been saved!');
  })
})


