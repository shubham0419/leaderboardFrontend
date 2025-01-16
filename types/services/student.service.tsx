declare type StudentsbyMentorResTye = {
  status: string;
  message: string;
  data: {
    mentor:Mentor,
    students: User[]
  };
};