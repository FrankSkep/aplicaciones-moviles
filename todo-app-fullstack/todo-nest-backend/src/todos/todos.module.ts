import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';

@Module({
	imports: [PrismaModule],
	providers: [TodosResolver, TodosService],
	exports: [TodosService],
})
export class TodosModule {}
