
export default class API_CONSTANTS {
  static BASE_URL = process.env.API_BASE_URL || "http://localhost:8000/api";

  static login = this.BASE_URL+"/login";
  static verify = this.BASE_URL+"/verify";

  // leetcode
  static leetcodeDataById = this.BASE_URL+"/leetcode/<USER_ID>";
  
}