import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { TypeTMDB } from '../dto/tmdb.args';

@ObjectType()
export class TmdbItem {
  @Field()
  ten: string;

  @Field((type) => Int)
  nam: number;

  @Field()
  mota: string;

  @Field()
  poster_path: string;

  @Field()
  backdrop_path: string;

  @Field()
  poster_path_tmdb: string;

  @Field()
  backdrop_path_tmdb: string;

  @Field((type) => Float)
  release_date: number;

  @Field((type) => Float)
  tmdb_id: number;

  @Field((type) => TypeTMDB)
  tmdb_type: TypeTMDB;
}
