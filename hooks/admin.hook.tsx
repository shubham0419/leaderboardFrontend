import Admin from "@/services/admin.service";
import { errorResponse, successResponse } from "@/services/responseWrapper";

export function UseAdminManager() {

  const addInstitute = async(payload:AddInstitutePayload):Promise<addInstituteController> =>{
      try {
        let res = await Admin.AddInstitute(payload);
        return successResponse<typeof res>({ data: res });
      } catch (error:any) {
        throw errorResponse({message: error.toString()});
      }
    }
  
    return {addInstitute}
}