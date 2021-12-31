import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({})
export class Message extends Model {
  @PrimaryKey
  @Column
  hash!: string;

  @Column
  version!: number;

  @Column
  timestamp!: Date;

  @Column
  sender!: string;

  @Column
  recipient!: string;

  @Column
  mimeType!: string;

  @Column
  content!: string;
}
