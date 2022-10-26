import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ChannelUser } from './channeluser.entity';
import { UserRelation } from './userrelation.entity';
import 'reflect-metadata';
/*
export enum UserRelations {
    FRIEND = "Friend",
    BLOCKED = "Blocked"
}*/


/* Probleme les relationship ne passe pas necessairement par un channel*/

@Entity()
export class relationship_users {

  @PrimaryColumn({ length: 24, unique: true })
  username: string;

  @Column({ length: 8, unique: true })
  related_username: string;

  @Column()
  status: boolean;

  @OneToMany(() => UserRelation, (relation) => (relation.owner))
  relations: UserRelation[];

  @OneToMany(() => ChannelUser, (chanusr) => (chanusr.user))
  channels: ChannelUser[];
}
