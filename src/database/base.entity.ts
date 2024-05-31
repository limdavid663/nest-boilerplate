import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  public created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  constructor(entity?: Partial<T>) {
    Object.assign(this, entity);
  }
}
