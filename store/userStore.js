import { create } from 'zustand'

const useUserStore = create((set) => ({
    userId: null,
    setUserId: (userId) => set(() => ({ userId })),
}))

export default useUserStore