
declare type authAtom = {
  loginform: loginFormType;
  loginOTPRes: loginOTPResType;
  studentDetails: User;
  mentorDetails:Mentor
  instituteDetails:InstituteType;
  state:number;
  isAdmin:boolean;
  isInstitue:boolean
}

declare type loginFormType = {
  email: string;
  name?:string
  location?:string
  otp: string;
};


