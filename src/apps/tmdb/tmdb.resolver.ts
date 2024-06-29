import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetTMDBByIDArgs } from './dto/tmdb.args';
import { TmdbService } from './tmdb.service';
import { TmdbItem } from './models/tmdb.model';

@Resolver()
export class TmdbResolver {
  constructor(private service: TmdbService) {}
  @Query((type) => TmdbItem)
  async getInfoByIdTMDB(@Args() params: GetTMDBByIDArgs): Promise<TmdbItem> {
    return this.service.getInfoByIdTMDB(params);
  }
}
