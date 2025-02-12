import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entity/role.entity';
import { Response } from 'src/common/response/type/response.type';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';
import { SafeEntity } from 'src/common/response/type/safe.type';
import { sanitizeEntity } from 'src/common/utils/sanitizeEntity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getProfile(
    req: AuthenticatedRequest,
  ): Promise<Response<SafeEntity<User, 'password'>>> {
    const user = await this.userRepository.findOne({
      where: { id: Number(req.user.id) },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return {
      status: true,
      message: 'Perfil obtenido con éxito',
      data: sanitizeEntity(user, ['password']),
    };
  }

  async updateProfile(
    req: AuthenticatedRequest,
    updateUserDto: UpdateUserDto,
  ): Promise<Response<SafeEntity<User, 'password'>>> {
    const user = await this.userRepository.findOne({
      where: { id: Number(req.user.id) },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (updateUserDto.roleIds) {
      const roles = await this.roleRepository.find({
        where: { id: In(updateUserDto.roleIds) },
      });
      user.roles = roles;
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return {
      status: true,
      message: 'Perfil actualizado con éxito',
      data: sanitizeEntity(updatedUser, ['password']),
    };
  }

  async updateUserRoles(
    req: AuthenticatedRequest,
    roleIds: number,
  ): Promise<Response<SafeEntity<User, 'password'>>> {
    const user = await this.userRepository.findOne({
      where: { id: Number(req.user.id) },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const role = await this.roleRepository.find({
      where: { id: roleIds },
    });

    if (!role) throw new NotFoundException('Rol no encontrado');

    user.roles = role;

    await this.userRepository.save(user);

    return {
      status: true,
      message: 'Roles actualizados con éxito',
      data: sanitizeEntity(user, ['password']),
    };
  }
}
