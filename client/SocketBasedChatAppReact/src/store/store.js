import { create } from 'zustand'

export const useConnStore = create((set) => ({
    conn: "",
    setConn: (newConn) => set({ conn: newConn }),
}))