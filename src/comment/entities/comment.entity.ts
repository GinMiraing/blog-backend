import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, default: '' })
  nick: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  email: string;

  @Column({ type: 'char', length: 32, default: '' })
  email_md5: string;

  @Column({ type: 'varchar', length: 60, default: '' })
  link: string;

  @Column({ type: 'varchar', default: '' })
  content: string;

  @Column({ type: 'boolean', default: false })
  is_admin: boolean;

  @Column({ type: 'boolean', default: false })
  is_hidden: boolean;

  @Column({ type: 'bigint', default: 0 })
  timestamp: number;

  @Column({ type: 'int', default: 0 })
  reply_count: number;

  @Column({ type: 'varchar', length: 50, default: '' })
  path: string;

  @Column({ type: 'int', default: 0 })
  parent_id: number;

  @Column({ type: 'int', default: 0 })
  reply_id: number;

  @Column({ type: 'varchar', length: 50, default: '' })
  reply_nick: string;
}
