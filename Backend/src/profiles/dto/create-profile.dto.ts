// src/profiles/dto/create-profile.dto.ts
import { IsString, IsOptional, IsNotEmpty, Length, Matches, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProfileDto {
  // Normalize string before validation runs
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters long.' })
  @Matches(/^[a-z0-9_]+$/, {
    message: 'Username can only contain lowercase letters, numbers, and underscores, with no spaces.',
  })
  username!: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Profile image URL must be a valid URL.' })
  @Length(1, 512)
  profileImageUrl?: string;
}