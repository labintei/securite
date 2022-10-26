
import {ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';


// process.env.POSTGRES_PASSWORD
@WebSocketGateway((parseInt(process.env.WEBSITE_PORT, 10) || 3001))
export class FrontGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection(@MessageBody() data){
        console.log("conneted");
    }

    async handleDisconnect(@ConnectedSocket() socket) {
        console.log(socket.id);
        console.log(socket);
    }

    @SubscribeMessage('message')
    sendMessage(@MessageBody() data)
    {
        console.log(data);
    }

    @SubscribeMessage('create')
    createchannel(@MessageBody() data)
    {
        console.log(data)
    }
}