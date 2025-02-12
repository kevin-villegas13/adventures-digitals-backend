import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedRequest } from 'src/auth/interface/request.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.getProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('profile')
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(req, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('roles')
  async updateRoles(
    @Req() req: AuthenticatedRequest,
    @Body('roleIds') roleIds: number,
  ) {
    return this.userService.updateUserRoles(req, roleIds);
  }
}
