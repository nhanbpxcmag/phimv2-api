import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Login } from './modals/auth.modal';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/jwt-auth-graphql.guard';

@Resolver()
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Query(() => Login)
  async auth_login(@Args('password') key_master: string): Promise<Login> {
    let kq = await this.service.signIn(key_master);
    return kq;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Boolean)
  async auth_check(): Promise<boolean> {
    return true;
  }
}
