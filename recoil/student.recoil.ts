import { atom, selector } from "recoil";


const StudentDataAtom = atom({
  key: 'StudentDataAtom',
  default: {

  } as StudentDataAtomType
});

export const StudentsDataSelector = selector<User[] | undefined>({
  key: 'StudentsDataSelector',
  get: ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.studentData ?? [];
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev=>{
      return {
        ...prev,
        studentData: newValue as User[]
      }
    });
  }
})

// StudentMentorselector
export const StudentMentorSelector = selector<Mentor | undefined>({
  key: 'StudentMentorSelector',
  get: ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.mentor ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev=>{
      return {
        ...prev,
        mentor: newValue as Mentor
      }
    })
  }
});

// selected student selector
export const SelectedStudentSelector = selector<User>({
  key: 'SelectedStudentSelector',
  get: ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.selectedStudent ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev=>{
      return {
        ...prev,
        selectedStudent: newValue as User
      }
    })
  }
})