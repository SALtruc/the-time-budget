import { create } from "zustand";

interface PlayerState {
  studentId: string;
  avatarId: string | null;
  yearOfStudy: string;
  program: string;
  accessCode: string;
  playerProfileId: string | null;
  setStudentId: (studentId: string) => void;
  setAvatarId: (avatarId: string) => void;
  setProfileFields: (fields: {
    yearOfStudy?: string;
    program?: string;
    accessCode?: string;
  }) => void;
  setPlayerProfileId: (id: string) => void;
  reset: () => void;
}

const initialState = {
  studentId: "",
  avatarId: null as string | null,
  yearOfStudy: "",
  program: "",
  accessCode: "",
  playerProfileId: null as string | null,
};

export const usePlayerStore = create<PlayerState>((set) => ({
  ...initialState,

  setStudentId: (studentId) => set({ studentId }),
  setAvatarId: (avatarId) => set({ avatarId }),
  setProfileFields: (fields) =>
    set((state) => ({
      yearOfStudy: fields.yearOfStudy ?? state.yearOfStudy,
      program: fields.program ?? state.program,
      accessCode: fields.accessCode ?? state.accessCode,
    })),
  setPlayerProfileId: (id) => set({ playerProfileId: id }),
  reset: () => set(initialState),
}));
