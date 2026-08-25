// src/profiles/dto/profile-response.dto.ts
export class ProfileResponseDto {
  id: string;
  userId: string;
  username: string;
  phone: string | null;
  bio: string | null;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(profile: any) {
    // Explicit, hardcoded mapping to strictly prevent data leakage
    this.id = profile.id;
    this.userId = profile.userId;
    this.username = profile.username;
    this.phone = profile.phone ?? null;
    this.bio = profile.bio ?? null;
    this.profileImageUrl = profile.profileImageUrl ?? null;
    this.createdAt = profile.createdAt;
    this.updatedAt = profile.updatedAt;
  }
}