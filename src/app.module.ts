import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective, GraphQLSchema } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UserModule } from './modules/user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://serveyk0:STalker19@cluster0.vavmz.mongodb.net/Serveyk0?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: ['http://localhost:3001', 'https://studio.apollographql.com'],
        credentials: true,
      },
      transformSchema: (schema: GraphQLSchema) =>
        upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ headers: req }),
    }),
  ],
})
export class AppModule {}
