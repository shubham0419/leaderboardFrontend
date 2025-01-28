declare type StudentsbyMentorResTye = {
  status: string;
  message: string;
  data: {
    mentor: Mentor;
    students: User[];
    pagination: StudentPagenationResType
  };
};

declare type AllStudentResType = {
  status: string;
  message: string;
  data: {
    students: User[];
    pagination: StudentPagenationResType
  };
};

declare type StudentPagenationResType ={
  currentPage: number;
  totalPages: number;
  totalStudents: number;
  limit: number;
}

declare type StudentsbyMentorParamsTye = {
  params: studentFilterType;
};

declare type StudentByIdResType = {
  status: string;
  message: string;
  data: User;
};

declare type StudentQuestionResType = {
  status: string;
  message: string;
  data: {
    problems: LeetcodeProblemDataType[];
  };
};

declare type WeeklyStudentDataResType ={
  status: string;
  message: string;
  data: {
    leetcode: StudentWeeklyQuestionsType[];
    codeforces:StudentWeeklyQuestionsType[];
  };
}

declare type StudentWeeklyQuestionsType = {
  date:string,
  problemsSolved:number
}

declare type LeetcodeProblemDataType = {
  id: string;
  leetcode_username: string;
  oauth_id: string;
  leetcode_profile_url: string;
  problem_name: string;
  problem_status: boolean;
  problem_date: string;
  sync_date: string;
  sync_status: boolean;
  created_at: string;
  updated_at: string;
};

declare type WeeklyStudentDataParams = {
  oauth_id:string,
  startDate:Date,
  endDate:Date,
}

declare type StudentProblemPayloadType = {
  oauth_id: string;
  year: string;
};

declare type CodeforcesQuestionResType = {
  status: string;
  message: string;
  data: {
    problems: CodeforcesProfile[];
  };
};

declare type CodeforcesProfile = {
  id: string;
  codeforces_username: string;
  oauth_id: string;
  codeforces_profile_url: string;
  problem_rating: number;
  problem_name: string;
  problem_status: boolean;
  problem_date: string;
  contestId: number;
  index: string;
  sync_date: string;
  sync_status: boolean;
  created_at: string;
  updated_at: string;
};
