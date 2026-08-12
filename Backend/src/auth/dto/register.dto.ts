// src/auth/dto/register.dto.ts

import { IsEmail, IsNotEmpty, IsString, Length, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required.' })
  @Length(2, 200, { message: 'Full name must be between 2 and 200 characters.' })
  fullName!: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email address is required.' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters.' })
  password!: string;
}