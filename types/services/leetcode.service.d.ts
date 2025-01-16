
declare type LeetcodeDataByIdRes = {
  status:string,
  message:string,
  data:LeetCodeData
}


declare type Submission = {
  title: string;
  titleSlug: string;
  statusDisplay: string;
  lang: string;
  timestamp: string; 
  submissionDate: string; 
};

declare type RecentSubmission = {
  date: string; 
  submissions: Submission[];
};

declare type LeetCodeData = {
  _id: string;
  username: string;
  leetcodeProfileUrl: string;
  ranking: number;
  totalSubmissions: number;
  totalSolved: number;
  totalEasySubmitted: number;
  totalEasySolved: number;
  totalMediumSubmitted: number;
  totalMediumSolved: number;
  totalHardSubmitted: number;
  totalHardSolved: number;
  recentSubmissions: RecentSubmission[];
  createdAt: string; 
  updatedAt: string; 
};
