
declare type authAtom = {
  loginform: loginFormType;
  loginOTPRes: loginOTPResType;
  studentDetails: User;
  mentorDetails:Mentor
  state:number;
  isAdmin:boolean;
  isMentor:boolean
}

declare type loginFormType = {
  email: string;
  otp: string;
};


