import { NestFactory } from '@nestjs/core';

import { ProjectSeedService } from './project/project-seed.service';
import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(ProjectSeedService).run();

  await app.close();
};

void runSeed();
