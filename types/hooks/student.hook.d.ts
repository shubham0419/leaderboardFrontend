
declare type StudentWeeklyDataController = responseWrapperType & {
  data?:WeeklyStudentDataResType
}

declare type AllStudentsController = responseWrapperType & {
  data?:AllStudentResType
}

declare type StudentByMentorController = responseWrapperType & {
  data?:StudentsbyMentorResTye
}

declare type StudentByIdController = responseWrapperType & {
  data?:StudentByIdResType
}

declare type StudentQuestionsController = responseWrapperType & {
  data?:StudentQuestionResType
}

declare type StudentCFQuestionsController = responseWrapperType & {
  data?:CodeforcesQuestionResType
}