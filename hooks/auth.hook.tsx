import Auth from "@/services/auth.service";
import { errorResponse, successResponse } from "@/services/responseWrapper";

export function UseAuthManager() {
  
  const getOTP = async(payload:LoginPayload):Promise<authOTPController> =>{
    try {
      let res = await Auth.login(payload);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }

  const verifyOTP = async(payload:verifyUserPayload):Promise<authVerifyController> =>{
    try {
      let res = await Auth.verifyOTP(payload);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      throw errorResponse({message: error.toString()});
    }
  }

  return {getOTP,verifyOTP}
}