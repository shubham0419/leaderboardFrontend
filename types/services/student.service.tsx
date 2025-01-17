declare type StudentsbyMentorResTye = {
  status: string;
  message: string;
  data: {
    mentor:Mentor,
    students: User[]
  };
};

declare type StudentByIdResType = {
  status: string;
  message: string;
  data: User
};


declare type StudentQuestionResType = {
  status: string;
  message: string;
  data: {
    problems:ProblemData[]
  }
};

declare type ProblemData = {
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

declare type StudentProblemPayloadType = {
  oauth_id:string,
  year:string
}