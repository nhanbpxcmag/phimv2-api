import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhimDetail, PhimDetailShare, PhimItem } from './models/phim.model';
import { PhimService } from './phim.service';
import { PhimAddArgs, PhimDeleteArgs, PhimEditArgs } from './dto/phimAdd.args';
import { GqlAuthGuard } from 'src/guards/jwt-auth-graphql.guard';
import { Ip, Request, UseGuards } from '@nestjs/common';
import { ReqDecorator } from 'src/decorators/req.decorator';

@Resolver()
export class PhimResolver {
  constructor(private service: PhimService) {}
  @Query(() => [PhimItem], { nullable: 'itemsAndList' })
  async phim_list(): Promise<PhimItem[]> {
    return this.service.phim_list();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [PhimItem], { nullable: 'itemsAndList' })
  async phim_list_admin(): Promise<PhimItem[]> {
    return this.service.phim_list_admin();
  }

  @Query(() => PhimDetail, { nullable: true })
  async phim_by_id(
    @Args('id', { type: () => Int }) id: number,
    @ReqDecorator() req,
  ): Promise<PhimDetail> {
    return this.service.phim_by_id(id, req.host);
  }
  @Query(() => PhimDetailShare, { nullable: true })
  async phim_share_by_id(
    @Args('id', { type: () => Int }) id: number,
    @ReqDecorator() req,
  ): Promise<PhimDetailShare> {
    return this.service.phim_share_by_id(id, req.host);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => PhimItem)
  async phim_add(@Args('input') input: PhimAddArgs) {
    return this.service.phim_add(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => PhimItem)
  async phim_edit(@Args('input') input: PhimEditArgs) {
    return this.service.phim_edit(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Boolean)
  async phim_delete(@Args('input') input: PhimDeleteArgs): Promise<boolean> {
    return this.service.phim_delete(input);
  }
}
