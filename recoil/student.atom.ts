import { atom, selector, selectorFamily } from "recoil";


const StudentDataAtom = atom({
  key: 'StudentDataAtom',
  default: {
    selectedYear:"2025",
    studentDataFilter:{
      sortBy:"",
      sortOrder:"",
      name:"",
      limit:20,
      page:1
    },
    studentPagination:{
      currentPage: 1,
      totalPages: 1,
      totalStudents: 1,
      limit: 1,
    }
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


// selected year selector
export const SelectedYearSelector = selector<string>({
  key: 'SelectedYearSelector',
  get: ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.selectedYear ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev=>{
      return {
        ...prev,
        selectedYear: newValue as string
      }
    })
  }
})

// student leetcode questions
export const StudentLeetCodeQuestionsSelector = selector<LeetcodeProblemDataType[]>({
  key: 'StudentLeetCodeQuestionsSelector',
  get: ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.StudentLeetcodeQuestions ?? [];
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev=>{
      return {
        ...prev,
        StudentLeetcodeQuestions: newValue as LeetcodeProblemDataType[]
      }
    })
  }
})

// student Codeforces questions
export const StudentCodeforcesQuestionsSelector = selector<CodeforcesProfile[]>({
  key: 'StudentCodeforcesQuestionsSelector',
  get: ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.StudentCodeforcesQuestions ?? [];
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev=>{
      return {
        ...prev,
        StudentCodeforcesQuestions: newValue as CodeforcesProfile[]
      }
    })
  }
})

// student filter seletor
export const StudentFilterSelector = selectorFamily<studentFilterType[studentFilterKeysType] | undefined,studentFilterKeysType>({
  key: 'StudentFilterSelector',
  get: (field) => ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.studentDataFilter[field] ?? undefined;
  },
  set: (field) => ({ set }, newValue) => {
    set(StudentDataAtom, prev => ({
      ...prev,
      studentDataFilter: {
        ...prev.studentDataFilter,
        [field]: newValue
      }
    }))
  }
});

// studentData pagination selector
export const StudentDataPaginationSelector = selector<StudentPagenationResType>({
  key: 'StudentDataPaginationSelector',
  get: ({ get }) => {
    const studentData = get(StudentDataAtom);
    return studentData.studentPagination ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev => ({
      ...prev,
      studentPagination: newValue as StudentPagenationResType
    }))
  }
})

// weekly data dates selector
export const WeeklyDataDatesSelector = selectorFamily<Date,"endDate"|"startDate" >({
  key: 'WeeklyDataDatesSelector',
  get: (field) => ({ get }) => {
    const data = get(StudentDataAtom);
    return data?.weeklyGraphData?.date?.[field] ?? undefined;
  },
  set: (field) => ({ set }, newValue) => {
    set(StudentDataAtom, prev => ({
      ...prev,
      weeklyGraphData: {
        ...prev.weeklyGraphData,
        date: {
          ...prev.weeklyGraphData.date,
          [field]: newValue
        }
      }
    }))
  }
})

// weekly data questions selector
export const WeeklyDataQuestionsSelector = selector({
  key: 'WeeklyDataQuestionsSelector',
  get: ({ get }) => {
    const data = get(StudentDataAtom);
    return data?.weeklyGraphData?.questions ?? undefined;
  },
  set: ({ set }, newValue) => {
    set(StudentDataAtom, prev => ({
      ...prev,
      weeklyGraphData:{
        ...prev.weeklyGraphData,
        questions: newValue as weeklyQuestionsType
      }
    }))
  }
})