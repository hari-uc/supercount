import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Countdown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column()
  eventDate: Date;

  @Column()
  description: string;

  @Column()
  alertFrequency: number;

  @Column()
  alertTime: string;

  @Column()
  timezone: string;

  @Column()
  createdBy: string;

  @Column("simple-array")
  rolesToMention: string[];

  @Column("simple-array")
  alertChannels: string[];

  @Column("simple-enum", { enum: ["active", "inactive", "deleted"] })
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
