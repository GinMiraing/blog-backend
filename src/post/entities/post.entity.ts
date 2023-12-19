import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, default: '' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'char', length: 10, default: '' })
  create_at: string;

  @Column({ type: 'char', length: 10, default: '' })
  update_at: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  source_url: string;

  @Column({ type: 'boolean', default: false })
  is_hidden: boolean;

  @Column({ type: 'varchar', length: 20, default: '' })
  category: string;

  @Column({ type: 'int', default: 0 })
  likes: number;
}
