
export default class API_CONSTANTS {
  static BASE_URL = process.env.API_BASE_URL || "http://localhost:8000/api";

  static login = this.BASE_URL+"/login";
  static verify = this.BASE_URL+"/verify";

  // leetcode
  static leetcodeDataById = this.BASE_URL+"/leetcode/<USER_ID>";
  static studentsByMentor = this.BASE_URL+"/mentors/mentor/<MENTOR_ID>/students";
  static studentById = this.BASE_URL+"/students/student/<STUDENT_ID>";
  static studentQuestionsByYear = this.BASE_URL+"/students/leetcode/stats";
  // mentor
  static mentorById = this.BASE_URL+"/mentors/mentor/<MENTOR_ID>";
  static instituteAllMentors = this.BASE_URL+"/"

  // admin
  static addInstitute = this.BASE_URL+"/institutes/institute/create";
  static getAllInstitute = this.BASE_URL+"/institutes/all_institutes";

}