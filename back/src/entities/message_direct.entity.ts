import { Entity, PrimaryColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';
import 'reflect-metadata';

/*
@Entity()
export class Message_Direct {

  @PrimaryColumn()
  sender: User;

  @PrimaryColumn()
  user: User;

  @Column()
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender' })
  senders: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  users: User;
}*/

