import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 60, default: '' })
  link: string;

  @Column({ type: 'varchar', default: '' })
  avatar: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  category: string;

  @Column({ type: 'boolean', default: false })
  is_hidden: boolean;

  @Column({ type: 'int', default: 0 })
  sorting: boolean;
}
