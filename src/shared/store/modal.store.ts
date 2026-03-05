import { create } from 'zustand';

type ModalState = {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;

  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true, isRegisterOpen: false }),
  closeLogin: () => set({ isLoginOpen: false }),

  isRegisterOpen: false,
  openRegister: () => set({ isRegisterOpen: true, isLoginOpen: false }),
  closeRegister: () => set({ isRegisterOpen: false }),

  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
