import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.findOneByName(createRoleDto.name);

    if (existingRole) {
      throw new BadRequestException('name already exists');
    }

    const role = new Role(createRoleDto);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const existingRole = await this.findOne(id);

    if (!existingRole) {
      throw new NotFoundException('role not found');
    }

    return this.roleRepository.save({
      ...existingRole,
      ...updateRoleDto,
    });
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }

  findOneByName(name: string) {
    return this.roleRepository.findOne({
      where: { name },
    });
  }
}
