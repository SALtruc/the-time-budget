export interface AvatarOption {
  id: string;
  src: string;
  selectedSrc: string;
  nonSelectedSrc: string;
}

export const AVATARS: AvatarOption[] = Array.from({ length: 8 }, (_, i) => ({
  id: `avatar-${i + 1}`,
  src: `/assets/avatars-roadmap/nonselect-${i + 1}.png`,
  selectedSrc: `/assets/avatars-roadmap/selected-${i + 1}.png`,
  nonSelectedSrc: `/assets/avatars-roadmap/nonselect-${i + 1}.png`,
}));

export function getAvatarSrc(avatarId: string | null): string | null {
  return AVATARS.find((a) => a.id === avatarId)?.src ?? null;
}
