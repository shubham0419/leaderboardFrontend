
import Leetcode from "@/services/leetcode.service";
import { errorResponse, successResponse } from "@/services/responseWrapper";


export function useLeetCoddeManager(){

  const getLeetCodeDataById = async(userId:string):Promise<LeetcodeByIdController> =>{
    try {
      let res = await Leetcode.GetLeetCodeDataById(userId);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      return errorResponse({message: error.toString()})
    }
  }

  return { getLeetCodeDataById }
}