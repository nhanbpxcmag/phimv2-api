import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum TypeTMDB {
  TV = 'tv',
  MOVIE = 'movie',
}

registerEnumType(TypeTMDB, {
  name: 'TypeTMDB',
  description: 'Type: TV or MOVIE',
  valuesMap: {
    TV: {
      description: 'TV',
    },
    MOVIE: {
      description: 'MOVIE',
    },
  },
});

@ArgsType()
export class GetTMDBByIDArgs {
  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  tmdb_id: number;

  @Field((type) => TypeTMDB)
  @IsNotEmpty()
  @IsEnum(TypeTMDB)
  tmdb_type: TypeTMDB;
}
