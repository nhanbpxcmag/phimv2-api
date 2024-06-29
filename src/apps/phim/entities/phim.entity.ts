import {
  Field,
  Int,
  ObjectType,
  GraphQLTimestamp,
  Float,
} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { TypeTMDB } from 'src/apps/tmdb/dto/tmdb.args';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Phim {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Vui lòng nhập' })
  ten: string; //tmdb: movie -> title; tv -> name

  @Field({ nullable: true })
  @Column({ nullable: true })
  ten_sub?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mota?: string; //tmdb: overview

  @Field()
  @Column()
  poster_path: string; //tmdb: poster_path

  @Field({ nullable: true })
  @Column({ nullable: true })
  backdrop_path?: string; //tmdb: backdrop_path

  // @Field((type) => Int, { nullable: true })
  // @Column({ type: 'float', nullable: true })
  // release_date?: number;

  @Field((type) => Int)
  @Column()
  nam: number;

  @Field((type) => Int, { nullable: true })
  @Column({ type: 'float', nullable: true })
  tmdb_id?: number; //tmdb: id

  @Field((type) => TypeTMDB, { nullable: true })
  @Column({ nullable: true })
  tmdb_type?: 'movie' | 'tv'; //tmdb: movie hoac tv

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_stream_filePath?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_stream_fileName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_stream_fileExt?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub_filePath?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub_fileName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub_fileExt?: string;

  @Field((type) => Boolean)
  @Column({ default: true })
  isActive: boolean;

  @Field((type) => Float)
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: number;

  @Field((type) => Float)
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: number;
}
