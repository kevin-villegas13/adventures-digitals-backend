import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { User } from './entities/user.entity';
import { Response } from 'src/common/response/type/response.type';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Req() req): Promise<Response<User>> {
    return this.userService.getProfile(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('profile')
  async updateProfile(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response<User>> {
    return this.userService.updateProfile(req.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('roles')
  async updateRoles(
    @Req() req ,
    @Body('roleIds') roleIds: number[],
  ): Promise<Response<User>> {
    return this.userService.updateUserRoles(req.user, roleIds);
  }
}
