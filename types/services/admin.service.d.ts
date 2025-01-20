declare type AddInstitutePayload = {
  name: string;
  location: string;
  email: string;
};

declare type AddInstituteResponseType = {
  status: string;
  message: string;
  data: InstituteType;
};

declare type InstituteType = {
  id: string;
  name: string;
  location: string;
  year: string[];
  created_at: Date;
  updated_at: Date;
  mentors: Mentor[];
};
