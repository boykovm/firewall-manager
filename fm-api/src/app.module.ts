import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { FirewallModule } from './firewall/firewall.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ProfileModule,
    AuthModule,
    FirewallModule,
  ],
})
export class AppModule {}
