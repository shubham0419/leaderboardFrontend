import { atom, selector } from "recoil";

export const LeetcodeAtom = atom({
  key: 'LeetcodeAtom',
    default: {
  } as LeetCodeAtom
})


export const LeetCodeAtomSelector = selector<LeetCodeData>({
  key: 'LeetCodeAtomSelector',
  get: ({ get }) => {
    const leetCodeAtom = get(LeetcodeAtom);
    return leetCodeAtom.userLeetcode ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(LeetcodeAtom, prev=>{
      return {
        ...prev, userLeetcode: newValue as LeetCodeData
      }
    });
  }
})


export const LeetcodeQuestionsSelector = selector<RecentSubmission[]>({
  key: 'LeetcodeQuestionsSelector',
  get: ({ get }) => {
    const data = get(LeetcodeAtom);
    return data?.userLeetcode?.recentSubmissions ?? [];
  },
})