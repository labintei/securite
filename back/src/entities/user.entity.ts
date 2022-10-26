import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ChannelUser } from './channeluser.entity';
import { UserRelation } from './userrelation.entity';
import { relationship_users } from './friend.entity'
//import { Message_Direct } from './message_direct.entity';
import 'reflect-metadata';


export enum UserStatus {
  ONLINE = "Online",
  OFFLINE = "Offline",
  MATCHING = "Matching",
  PLAYING = "Playing"
}

@Entity()
export class User {

  @PrimaryColumn({ length: 24, unique: true })
  username: string;

  @Column({ length: 8, unique: true })
  ft_login: string;

  @Column({ default: UserStatus.ONLINE })
  status: UserStatus;

  @Column({ nullable: true })
  twoFA: string;

  @Column({ type: 'float', default: 1 })
  rank: number;

  @Column({ type: 'int', default: 0 })
  victories: number;

  @Column({ type: 'int', default: 0 })
  defeats: number;

  @Column({ type: 'int', default: 0 })
  draws: number;

  @OneToMany(() => UserRelation, (relation) => (relation.owner))
  relations: UserRelation[];

  @OneToMany(() => ChannelUser, (chanusr) => (chanusr.user))
  channels: ChannelUser[];

// a enlever

  @OneToMany(() => relationship_users , (relation_u) => (relation_u.username))
  friends_blocks: relationship_users[];

  @OneToMany(() => relationship_users, (relations_i) => (relations_i.related_username))
  related: relationship_users[];

  // SAME possiblement

 /* @OneToMany(() => Message_Direct, (m) => (m.sender))
  messages_senders: Message_Direct[];

  @OneToMany(() => Message_Direct, (m) => (m.user))
  messages_users: Message_Direct[];
*/
}
