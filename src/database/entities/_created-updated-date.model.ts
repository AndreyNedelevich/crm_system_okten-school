import { BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatedUpdatedDateModel {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated: Date;

  @BeforeUpdate()
  updateDates() {
    this.updated = new Date();
  }
}
