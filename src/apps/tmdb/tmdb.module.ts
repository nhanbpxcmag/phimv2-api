import { Module } from '@nestjs/common';
import { TmdbResolver } from './tmdb.resolver';
import { TmdbService } from './tmdb.service';

@Module({
  providers: [TmdbResolver, TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
