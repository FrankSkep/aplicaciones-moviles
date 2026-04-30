import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioInput } from './dto/create-usuario-input.dto';
import { UpdateUsuarioInput } from './dto/update-usuario-input';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUsuarioInput: CreateUsuarioInput) {
    return this.prisma.user.create({
      data: {
        email: createUsuarioInput.email,
        name: createUsuarioInput.nombre || '',
        passwordHash: '', // Es requerido en la base de datos
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUsuarioInput: UpdateUsuarioInput) {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: updateUsuarioInput.email,
        name: updateUsuarioInput.nombre,
      },
    });
  }

  async remove(id: number) {
    // Delete associated todos first to avoid foreign key constraint error
    await this.prisma.todo.deleteMany({
      where: { userId: id },
    });
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
