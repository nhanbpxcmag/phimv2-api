import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { TypeTMDB } from 'src/apps/tmdb/dto/tmdb.args';

@InputType()
export class PhimAddArgs {
  @Field()
  @IsNotEmpty({ message: 'Vui lòng nhập' })
  ten: string; //tmdb: movie -> title; tv -> name

  @Field({ nullable: true })
  ten_sub: string;

  @Field({ nullable: true })
  mota?: string; //tmdb: overview

  @Field()
  @IsNotEmpty({ message: 'Vui lòng nhập' })
  poster_path: string;

  @Field({ nullable: true })
  backdrop_path?: string;

  // @Field((type) => Int, { nullable: true })
  // release_date?: number;

  @Field((type) => Int)
  nam: number;

  @Field({ nullable: true })
  @ValidateIf((object, value) => {
    return value !== null && value !== undefined;
  })
  @IsNumber()
  tmdb_id?: number;

  @Field((type) => TypeTMDB, { nullable: true })
  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsEnum(TypeTMDB)
  tmdb_type?: TypeTMDB;

  @Field({ nullable: true })
  link_stream_filePath?: string;

  @Field({ nullable: true })
  link_stream_fileName?: string;

  @Field({ nullable: true })
  link_stream_fileExt?: string;

  @Field({ nullable: true })
  link_sub_filePath?: string;

  @Field({ nullable: true })
  link_sub_fileName?: string;

  @Field({ nullable: true })
  link_sub_fileExt?: string;
}

@InputType()
export class PhimEditArgs extends PhimAddArgs {
  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

@InputType()
export class PhimDeleteArgs {
  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Field((type) => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  del_file: boolean;
}
