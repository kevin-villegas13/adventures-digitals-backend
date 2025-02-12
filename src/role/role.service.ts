import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entity/role.entity';
import { RoleType } from './enum/role.type';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  private async seedRoles() {
    const roles = Object.values(RoleType);

    for (const roleType of roles) {
      const roleExists = await this.roleRepository.findOne({
        where: { type: roleType },
      });

      if (!roleExists) {
        const newRole = this.roleRepository.create({ type: roleType });
        await this.roleRepository.save(newRole);
        console.log(`Rol creado: ${roleType}`);
      }
    }
  }
}
