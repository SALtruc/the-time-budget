export interface AvatarOption {
  id: string;
  src: string;
}

export const AVATARS: AvatarOption[] = Array.from({ length: 8 }, (_, i) => ({
  id: `avatar-${i + 1}`,
  src: `/assets/avatars/avatar-${i + 1}.png`,
}));
