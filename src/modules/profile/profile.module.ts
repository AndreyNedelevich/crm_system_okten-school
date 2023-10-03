import { Module } from '@nestjs/common';

import { ProfileRepository } from './services/profile.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [ProfileRepository],
  exports: [ProfileRepository],
})
export class ProfileModule {}
