import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Student {
  static getStudentsByMentor = async(mentorId:string) => {
    return new Promise<StudentsbyMentorResTye>(async (resolve,reject)=>{
    try {
      let res = await axios.get(API_CONSTANTS.studentsByMentor.replace("<MENTOR_ID>",mentorId));
      if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as StudentsbyMentorResTye);
    } catch (error:any) {
      return reject(error);
    }
  })
  }
}