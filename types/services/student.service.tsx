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