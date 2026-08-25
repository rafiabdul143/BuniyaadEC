// src/profiles/profiles.service.ts
import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfilesService {
  private readonly reservedUsernames = new Set([
    'admin', 'administrator', 'api', 'auth', 'login', 'logout', 'register',
    'settings', 'support', 'system', 'users', 'user', 'profile', 'profiles',
    'feed', 'search', 'help', 'about',
  ]);

  constructor(private readonly prisma: PrismaService) {}

  public validateReservedUsername(username: string): void {
    if (this.reservedUsernames.has(username)) {
      throw new BadRequestException(`The username '${username}' is reserved and cannot be used.`);
    }
  }

  async createProfile(userId: string, dto: CreateProfileDto): Promise<ProfileResponseDto> {
    // dto.username is already trimmed and lowercased by @Transform in the DTO
    this.validateReservedUsername(dto.username);

    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user.');
    }

    try {
      const profile = await this.prisma.profile.create({
        data: {
          userId,
          username: dto.username,
          phone: dto.phone,
          bio: dto.bio,
          profileImageUrl: dto.profileImageUrl,
        },
      });

      return new ProfileResponseDto(profile);
    } catch (error) {
      // Final authority unique-constraint check
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Username is already taken.');
      }
      throw error;
    }
  }

  async getMyProfile(userId: string): Promise<ProfileResponseDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }

    return new ProfileResponseDto(profile);
  }

  async updateMyProfile(userId: string, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    // Prevent empty empty/silent updates
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field must be provided to update the profile.');
    }

    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      throw new NotFoundException('Profile not found.');
    }

    if (dto.username) {
      this.validateReservedUsername(dto.username);
    }

    try {
      const updatedProfile = await this.prisma.profile.update({
        where: { userId },
        data: {
          ...(dto.username && { username: dto.username }),
          ...(dto.phone !== undefined && { phone: dto.phone }),
          ...(dto.bio !== undefined && { bio: dto.bio }),
          ...(dto.profileImageUrl !== undefined && { profileImageUrl: dto.profileImageUrl }),
        },
      });

      return new ProfileResponseDto(updatedProfile);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Username is already taken.');
      }
      throw error;
    }
  }
}