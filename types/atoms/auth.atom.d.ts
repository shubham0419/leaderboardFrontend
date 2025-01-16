

declare type authAtom = {
  loginform: loginFormType;
  loginOTPRes: loginOTPResType;
  userDetails: User;
  state:number;
  isAdmin:boolean;
  isMentor:boolean
}

declare type loginFormType = {
  email: string;
  otp: string;
};