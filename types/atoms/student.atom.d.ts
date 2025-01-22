

declare type StudentDataAtomType = {
  studentData:User[];
  studentPagination:StudentPagenationResType;
  studentDataFilter:studentFilterType,
  mentor:Mentor
  selectedStudent:User;
  selectedYear:string
  StudentLeetcodeQuestions:LeetcodeProblemDataType[],
  StudentCodeforcesQuestions:CodeforcesProfile[]
}

declare type studentFilterType ={
  sortBy: sortByType,
  sortOrder:sortOrderType,
  page:number,
  limit:number,
  name:string,
}

declare type studentFilterKeysType = keyof studentFilterType;

declare type sortByType = "name" | "leetcode_ranking" | "leetcode_all" | "leetcode_easy" | "leetcode_medium" | "leetcode_hard" | "leetcode_contest" | "leetcode_lastSeen" | "codeforces_rating" | "codeforces_rank"  | "codeforces_lastSeen" | "codeforces_all" | "codeforces_contest" | "";
declare type sortOrderType = "asc" | "desc" | "";