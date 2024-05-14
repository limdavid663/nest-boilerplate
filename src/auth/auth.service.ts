import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger();

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('password does not match');
    }

    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findOneByUsername(
      registerDto.username,
    );

    this.logger.debug(
      `existingUser: ${existingUser.username}`,
      AuthService.name,
    );

    if (existingUser) {
      throw new BadRequestException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = new User({
      ...registerDto,
      password: hashedPassword,
    });

    await this.userService.create(newUser);

    return this.login(newUser);
  }
}
