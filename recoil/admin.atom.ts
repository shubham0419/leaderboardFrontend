import { atom, selector } from "recoil"



const adminAtom = atom({
  key: 'admin',
  default: {

  } as adminAtom
})

export const allInstituteSelector = selector<InstituteType[]>({
  key: 'allInstituteSelector',
  get: ({ get }) => {
    const admin = get(adminAtom)
    return admin.allInstitute ?? []
  },
  set: ({ set }, newValue) => {
    set(adminAtom, (prev) => ({ ...prev, allInstitute: newValue as InstituteType[] }))
  }
})

// all mentorsSelector
export const allMentorSelector = selector<Mentor[]>({
  key: 'allMentorSelector',
  get: ({ get }) => {
    const admin = get(adminAtom);
    return admin.allMentors ?? [];
  },
  set: ({ set }, newValue) => {
    set(adminAtom, (prev) => ({ ...prev, allMentors: newValue as Mentor[]}));
  }
})