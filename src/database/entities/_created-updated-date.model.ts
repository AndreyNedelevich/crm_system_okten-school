import { BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatedUpdatedDateModel {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated: Date;

  @BeforeUpdate()
  updateDates() {
    this.updated = new Date();
  }
}
