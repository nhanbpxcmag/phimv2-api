import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Phim } from '../entities/phim.entity';
import { Column } from 'typeorm';

@ObjectType()
export class PhimItem extends Phim {}

@ObjectType()
export class PhimDetail extends Phim {
  @Field({ nullable: true })
  @Column({ nullable: true })
  link_stream?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub?: string;
}
@ObjectType()
export class PhimDetailShare extends Phim {
  @Field({ nullable: true })
  @Column({ nullable: true })
  link_stream?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  link_stream_public?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub_public?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub_download?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  link_sub_download_public?: string;
}
