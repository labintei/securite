import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import 'reflect-metadata';

export enum ChannelUserStatus {
  FRIEND = "Friend",
  BLOCKED = "Blocked"
}

// true firend false block

@Entity()
export class UserRelation {

  @PrimaryColumn('varchar')
  owner: User;

  @PrimaryColumn('varchar')
  related: User;

  @Column('boolean')
  status: boolean;

  @ManyToOne(() => User, (user) => (user.relations))
  @JoinColumn({ name: 'owner' })
  owner_setfk: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'related' })
  related_setfk: User;
}
