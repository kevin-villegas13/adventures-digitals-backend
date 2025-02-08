import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { User } from './entities/user.entity';
import { Response } from 'src/common/response/type/response.type';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<Response<User>> {
    return this.userService.getProfile(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response<User>> {
    return this.userService.updateProfile(req.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('roles')
  async updateRoles(
    @Req() req,
    @Body('roleIds') roleIds: number[],
  ): Promise<Response<User>> {
    return this.userService.updateUserRoles(req.user, roleIds);
  }
}
