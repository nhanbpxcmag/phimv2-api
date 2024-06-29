import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phim } from './entities/phim.entity';
import { PhimService } from './phim.service';
import { PhimResolver } from './phim.resolver';
import { TmdbModule } from '../tmdb/tmdb.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phim]),
    forwardRef(() => TmdbModule),
    forwardRef(() => FileModule),
  ],
  providers: [PhimService, PhimResolver],
})
export class PhimModule {}
