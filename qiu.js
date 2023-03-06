
import { WechatyBuilder } from 'wechaty'
import axios from 'axios'

var rturns=[]
var rquestion=''
const wechaty = WechatyBuilder.build() // get a Wechaty instance
wechaty.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
wechaty.on('login', user => console.log(`User ${user} logged in`))
//wechaty.on('message', message => console.log(`Message: ${message}`))
wechaty.on('message', async message => {
  const room = message.room()
  if (room) {
    const topic = await room.topic()
    console.log(`Room: ${topic}`)
    if (topic == '11 year' || topic == 'soso' || topic == 'cc'){
        if (await message.mentionSelf()) {
            const talker = message.talker()
            console.log(`talker:${talker}`)
            const rhistory = '\nuser: '+message.text()
            const messages = rquestion+'\nuser: '+message.text()
            console.log(` ‰»Î:\n${messages}\nΩ· ¯`)

            axios.get('http://127.0.0.1:8000/api', {
              params: {
                messages: messages
              }
            })
            .then(function (response) {
              console.log(`assistant:${response.data['text'].toString()}`);
              room.say(response.data['text'].toString())
              rturns.push(rhistory.toString())
              rturns.push('\nassistant:'+response.data['text'].toString())
              if (rturns.length<=3){
                rquestion = rturns.toString()
              }else{
                rturns.shift()
                rquestion = rturns.toString()
              }
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(function () {
              // always executed
            });  
          }
    }
  } 
})
await wechaty.start()