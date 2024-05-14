import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const existingPermission = await this.findOneByName(
      createPermissionDto.name,
    );

    if (existingPermission) {
      throw new BadRequestException('name already exists');
    }

    const permission = new Permission(createPermissionDto);

    return this.permissionRepository.save(permission);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const existingPermission = await this.findOne(id);

    if (!existingPermission) {
      throw new NotFoundException('permission not found');
    }

    return this.permissionRepository.save({
      ...existingPermission,
      ...updatePermissionDto,
    });
  }

  remove(id: number) {
    return this.permissionRepository.delete(id);
  }

  findOneByName(name: string) {
    return this.permissionRepository.findOne({
      where: { name },
    });
  }
}
