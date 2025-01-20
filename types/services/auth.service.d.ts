

declare type loginOTPResType = {
  status: string;
  message: string;
  data: string;
};

declare type loginOtpPayload = {
  eamil: string;
};

declare type verifyUserRes = {
  status: string;
  message: string;
  data: AuthResponse 
};

declare type User = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  oauth_id?: string;
  registration?: string;
  roll_no?: string;
  year_of_grad?: string;
  branch?: string;
  linkedin_username?: string;
  leetcode_ranking?: number;
  leetcode_all?: number;
  leetcode_username?: string;
  leetcode_easy?: number;
  leetcode_medium?: number;
  leetcode_hard?: number;
  leetcode_contest:LeetcodeContestType[];
  leetcode_lastSeen:string,
  hackerblock_username?: string;
  codeforces_username?:string,
  codeforces_ranking?:number,
  codeforces_all?:number,
  codeforces_contest?: any[],
  codeforces_lastseen:Date,
  github?: string;
  resume_url?: string ;
  batch_ids: string[];
  section?: string;
  institute?: string ;
  mentors?: Mentor[]
  mentorship_started?: string; 
  created_at: string; 
  updated_at: string;
};

declare type LeetcodeContestType = {
  rating: number;
    contest: {
      title: string;
      startTime: number; 
    };
    ranking: number;
    attended: boolean;
    totalProblems: number;
    problemsSolved: number;
    trendDirection: string;
    finishTimeInSeconds: number
}

declare type Mentor = {
  id:string,
  name:string,
  email:string,
  isAdmin:boolean;
  institute:InstituteType;
  created_at: Date;
  updated_at: Date; 
}

declare type AuthResponse = {
  user: User | Mentor;
  accessToken: string;
};



declare type verifyUserPayload = {
  userId: string;
  otp: string;
  isMentor? :boolean
};

