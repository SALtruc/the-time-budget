import { create } from "zustand";
import type { RoleId } from "@/lib/game/types";
import type { SessionMode } from "@/lib/supabase/sessions";

interface SessionState {
  sessionId: string | null;
  roomCode: string | null;
  participantId: string | null;
  mode: SessionMode | null;
  roleId: RoleId | null;
  isHost: boolean;
  bonusHours: number;
  setSession: (params: {
    sessionId: string;
    roomCode: string;
    participantId: string;
    mode: SessionMode;
    roleId?: RoleId | null;
    isHost?: boolean;
    bonusHours?: number;
  }) => void;
  setRoleId: (roleId: RoleId) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  roomCode: null,
  participantId: null,
  mode: null,
  roleId: null,
  isHost: false,
  bonusHours: 0,

  setSession: ({
    sessionId,
    roomCode,
    participantId,
    mode,
    roleId = null,
    isHost = false,
    bonusHours = 0,
  }) => set({ sessionId, roomCode, participantId, mode, roleId, isHost, bonusHours }),

  setRoleId: (roleId) => set({ roleId }),

  clearSession: () =>
    set({
      sessionId: null,
      roomCode: null,
      participantId: null,
      mode: null,
      roleId: null,
      isHost: false,
      bonusHours: 0,
    }),
}));
