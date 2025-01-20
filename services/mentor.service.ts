import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Mentor {
  static mentorById = (mentorId: string) => {
    return new Promise<MentorByIdResType>(async (resolve, reject) => {
      try {
        const res = await axios.get(API_CONSTANTS.mentorById.replace("<MENTOR_ID>",mentorId));
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as MentorByIdResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static getInstituteAllMentors = (institueId:string) =>{
    return new Promise<InstituteAllMentorsResType>(async(resolve,reject)=>{
      try {
        const res = await axios.get(API_CONSTANTS.instituteAllMentors.replace("<INSTITUTE_ID",institueId))
      } catch (error:any) {
        
      }
    })
  }
}