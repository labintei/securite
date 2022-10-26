import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Channel } from "./channel.entity";
import { User } from "./user.entity";
import 'reflect-metadata';

export enum ChannelUserStatus {
  OWNER = "Owner",
  ADMIN = "Admin",
  JOINED = "Joined",
  MUTED = "Muted",
  BANNED = "Banned"
}

@Entity()
export class ChannelUser {

  @PrimaryColumn('int')
  channel: Channel;

  @PrimaryColumn('varchar')
  user: User;

  @ManyToOne(() => Channel, (chan) => (chan.users))
  @JoinColumn({ name: 'channel' })
  channel_setfk: Channel;

  @ManyToOne(() => User, (user) => (user.channels))
  @JoinColumn({ name: 'user' })
  user_setfk: User;

  @Column({ default: ChannelUserStatus.OWNER })
  status: ChannelUserStatus;
}
