import Mentor from "@/services/mentor.service";
import { errorResponse, successResponse } from "@/services/responseWrapper";

export function UseMentorManager() {

  const getMentorById = async(mentorId:string):Promise<mentorByIdController> =>{
      try {
        let res = await Mentor.mentorById(mentorId);
        return successResponse<typeof res>({ data: res });
      } catch (error:any) {
        throw errorResponse({message: error.toString()});
      }
    }
  
    return {getMentorById}
}