import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TodosService } from './todos.service';

@Module({
	imports: [PrismaModule],
	providers: [TodosService],
	exports: [TodosService],
})
export class TodosModule {}
