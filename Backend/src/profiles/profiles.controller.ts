import { Controller, Get, Post, Patch, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users/me/profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @GetUser('id') userId: string,
    @Body() dto: CreateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.createProfile(userId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMyProfile(@GetUser('id') userId: string): Promise<ProfileResponseDto> {
    return this.profilesService.getMyProfile(userId);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateMyProfile(
    @GetUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.updateMyProfile(userId, dto);
  }
}