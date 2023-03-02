import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { ProjectSeedModule } from './project/project-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ProjectSeedModule,
  ],
})
export class SeedModule {}
