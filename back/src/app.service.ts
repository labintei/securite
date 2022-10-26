import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import 'reflect-metadata';
import { throws } from 'assert';
import { userInfo } from 'os';
import { BeforeSoftRemove, EntityManager, Not } from 'typeorm';
import { relationship_users } from './entities/friend.entity';
import { Message } from './entities/message.entity';
import { User } from './entities/user.entity';
import { Match } from './entities/match.entity';
import { ChannelUser , ChannelUserStatus} from './entities/channeluser.entity';
//
import { Channel,  ChannelStatus } from './entities/channel.entity';
import { DataSource } from 'typeorm';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
import { channel } from 'diagnostics_channel';
import { UserRelation } from './entities/userrelation.entity';


// getManager marquee comme deprecated

@Injectable()
export class AppService {

  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
    private data: DataSource
  ){}


  async newUserbis(){
    const user = this.manager.create(User, {username: "lolo", ft_login: "yoyo"});
    const bis = this.manager.create(User);
    bis.username = 'jock';
    bis.ft_login = 'jock';

    await this.manager.save(user);
    await this.manager.save(bis);
    
    const U = await this.manager.findOne(User, {where: {username: 'jock'}});
    return U;
    //await this.manager.insert(User, {username: "labintei",ft_login: "labintei"});
    //await this.manager.insert(User, {username: "popo", ft_login: 'popopopo'});
}

  async friends(u:string): Promise<User[]>
  {
    const sender = await this.manager.findOne(User, {where: {username: u}});
    const f = await this.manager.createQueryBuilder(User, "user")
                                .leftJoin(UserRelation, 'user.relations', 'UserRelation')
                                .where('UserRelation.owner = :owner', {owner: sender})
                                .andWhere('UserRelation.relations = :status', {status: true})
                                .andWhere('user.username != :u', { u : u})
                                .getMany();
    return f;
  }

  async others(u: string): Promise<User[]>
  {
    // peut etre avec les unions
    const sender = await this.manager.findOne(User, {where: {username: u}});
    const multiples = await this.manager.getRepository(User).createQueryBuilder("a").where("a.username != : id", {id: u}).getQuery();
    const f = await this.manager.createQueryBuilder(User, "user")
                        .leftJoin(UserRelation, 'user.relations', 'UserRelation')
                        .where('UserRelation.owner = :owner', {owner: sender})
                        .andWhere('user.username != :u', { u : u})
                        .getQuery()
    const d_k = await this.manager.query('${multipes} MINUS ${f}');
    return d_k;
  }

  /* LeaderBord*/

  async leaderboard()
  {
    return  await this.manager.find(User, {order: {rank: "ASC"}});
  }

  /* Hystory */

  async hystory(u:string)
  {// or operator is square brackets
    const y = await this.manager.findOne(User, {where: {username: u}});
   // return await this.manager.find(Match, {where: [User: y} , {user2: y}]});
  }

  async profil(u:string)
  {
    return await this.manager.findOne(User, {where: {username: u}});
  }

  /* Creation */

  async CUser(usern:string,userlog:string): Promise<User>{
    const pointeruser = await this.manager.create(User, {username: usern, ft_login: userlog});
    await this.manager.save(pointeruser);
    return pointeruser;
}

  async Cmessage_chan(msg:string,sender_username:string,channel_name:string): Promise<Message>
  {
    const get_Channel = await this.manager.findOne(Channel, {where: {name: channel_name}});
    const get_sender = await this.manager.findOne(User, {where: {username: sender_username}});
    const pointer_message = await this.manager.create(Message, {content: msg, channel: get_Channel, sender: get_sender});
    await this.manager.save(pointer_message);
    return pointer_message;
  }

  async CCuser(cusername:string,cchannelname:string,custatus:any)
  {
    const channel_f = await this.manager.findOne(Channel, {where :{ name: cchannelname}});
    const user_f = await this.manager.findOne(User, {where: {username: cusername}});
    const pointeurccuser = await this.manager.create(ChannelUser, {channel: channel_f, user: user_f, status: custatus})
    this.manager.save(pointeurccuser);
    return pointeurccuser;
  }

  async CChannel(channel_name:string, status_s:any , password:string)
  {
    const pointeurchannel = await this.manager.create(Channel, {status: status_s, password: password, name: channel_name});
    this.manager.save(pointeurchannel);
    return pointeurchannel;
  }



  async newUser(){
      //const user = this.manager.create(User, {username: "lolo", ft_login: "yoyo"});
      const bis = this.manager.create(User);
      bis.username = 'jockk';
      bis.ft_login = 'jockk';

      //await this.manager.save(user);
      await this.manager.save(bis);
      return bis;
      //const U = await this.manager.findOne(User, {where: {username: 'jock'}});
      //return U;
      //await this.manager.insert(User, {username: "labintei",ft_login: "labintei"});
      //await this.manager.insert(User, {username: "popo", ft_login: 'popopopo'});
  }


  async NewMessage() {

    const usersrc = await this.manager.findOne(User, {where : { username: "labintei" }});
    const userdest = await this.manager.find(User, {where: { username: 'popo'}});

    // voir si il ne faut pas rajouter deux trois choses
    this.manager.insert(Message, {
      content: 'vrrrrrrrrrrrrrrrrrrrrrrrr',
      sender: usersrc
    })
  }

  getHello(): string {
    return 'Hello World!';
  }

}



