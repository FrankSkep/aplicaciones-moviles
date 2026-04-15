import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
	constructor(private readonly prisma: PrismaService) {}

	create(createTodoInput: CreateTodoInput) {
		return this.prisma.todo.create({
			data: {
				titulo: createTodoInput.titulo,
				descripcion: createTodoInput.descripcion,
				userId: createTodoInput.userId,
				completada: createTodoInput.completada,
			},
		});
	}

	findAll() {
		return this.prisma.todo.findMany();
	}

	findOne(id: string) {
		return this.prisma.todo.findUnique({
			where: { id },
		});
	}

	update(id: string, updateTodoInput: UpdateTodoInput) {
		return this.prisma.todo.update({
			where: { id },
			data: {
				titulo: updateTodoInput.titulo,
				descripcion: updateTodoInput.descripcion,
				userId: updateTodoInput.userId,
				completada: updateTodoInput.completada,
			},
		});
	}

	remove(id: string) {
		return this.prisma.todo.delete({
			where: { id },
		});
	}
}
