import { create } from 'zustand';

const instialState = {
  lessons: [],
};

export const useUserProgress = create(
  // persist(
  (set) => ({
    ...instialState,
    addToLessons: (id) =>
      set((state) =>
        state.lessons.includes(id)
          ? state.lessons
          : { lessons: [...state.lessons, { LessonTitle: id }] }
      ),
    updateLessons: (userProgress) => {
      set({ lessons: userProgress });
    },
    reset: () => {
      set(instialState);
    },
  }),
  {
    name: 'user-progress',
  }
  // )
);
