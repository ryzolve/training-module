import { create } from 'zustand';

const instialState = {
  isQuizOpen: false,
};

export const quizProgress = create(
  (set) => ({
    ...instialState,
    toggleQuiz: (isQuizOpen) => set((state) => ({ isQuizOpen })),
  }),
  {
    name: 'user-progress',
  }
);
