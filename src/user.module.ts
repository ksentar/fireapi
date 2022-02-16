import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [FireormModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
