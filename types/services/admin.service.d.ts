declare type AddInstitutePayload = {
  name: string;
  location: string;
  email: string;
};

declare type AddMentorPayload = {
  name: string;
  instituteId: string;
  email: string;
}

declare type AddInstituteResponseType = {
  status: string;
  message: string;
  data: InstituteType;
};

declare type AddMentorResponseType = {
  status: string;
  message: string;
  data: Mentor;
};


declare type getAllInstituteResponseType = {
  status: string;
  message: string;
  data: {
    institutes: InstituteType[]
  };
};