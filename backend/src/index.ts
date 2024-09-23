import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8080});
let senderSocket : any = null;
let receiverSocket : any = null;

wss.on('connection', function connection(ws){
    
    ws.on('message', function message(data : any){
        const message = JSON.parse(data);
        if(message.type === 'sender'){
            console.log('Sender set');
            senderSocket = ws;
        }
        else if(message.type === 'receiver'){
            console.log('Receiver set');
            receiverSocket = ws;
        }
        else if(message.type === 'createOffer'){
            console.log('Offer received');
            receiverSocket?.send(JSON.stringify({ type : "createOffer", sdp : message.sdp}))
        }
        else if(message.type === 'createAnswer'){  
            console.log('Answer received');
            senderSocket?.send(JSON.stringify({ type : "createAnswer", sdp : message.sdp}))
        }
        else if(message.type === 'iceCandidate'){
            if (ws === senderSocket) {
                receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
              } else if (ws === receiverSocket) {
                senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
              }
        }


    })
    







    //identify as sender
    //create offer 
    //create answer 
    // add ice candidate
    //identify as receiver
    //ws.send('something');
})