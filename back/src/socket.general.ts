import { Injectable } from '@nestjs/common';


import { Socket, Server } from "socket.io";
import 'reflect-metadata';
 export class App_Server
 {
   public serv: Server;

   constructor(server: Server)
   {
      this.serv = new Server(3002, {});
      this.serv.on("connection", (socket) => {cors:{origin: '*'}});
      //this.serv.on('connection',this.StartListeners);
      this.serv.listen(/*(parseInt(process.env.WEBSITE_PORT, 10) || 3001)*/3001);
   }

   /* LevelList.tsx */

   /* MatchHistory.tsx */

   /* MatchList.tsx */

   /* PlayerProfile.tsx */


/*
   StartListeners = (socket: Socket) => {

      socket.on()
   }*/

 };



 


