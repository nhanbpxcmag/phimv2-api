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
