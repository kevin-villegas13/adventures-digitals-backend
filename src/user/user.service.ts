import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Response } from 'src/common/response/type/response.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getProfile(userId: string): Promise<Response<User>> {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException(`Usuario no encontrado`);

    return {
      status: true,
      message: 'Perfil obtenido con éxito',
      data: user,
    };
  }

  async updateProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Response<User>> {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
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
      data: updatedUser,
    };
  }

  async updateUserRoles(
    userId: string,
    roleIds: number[],
  ): Promise<Response<User>> {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const roles = await this.roleRepository.find({
      where: { id: In(roleIds) },
    });
    
    user.roles = roles;

    await this.userRepository.save(user);

    return {
      status: true,
      message: 'Roles actualizados con éxito',
      data: user,
    };
  }
}
