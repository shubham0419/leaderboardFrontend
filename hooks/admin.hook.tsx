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

    const getAllInstitute = async():Promise<getAllInstituteController> =>{
      try {
        let res = await Admin.getAllInstitue();
        return successResponse<typeof res>({ data: res });
      } catch (error:any) {
        throw errorResponse({message: error.toString()});
      }
    }

    const addMentor = async(payload:AddMentorPayload):Promise<addMentorController> =>{
      try {
        let res = await Admin.AddMentor(payload);
        return successResponse<typeof res>({ data: res });
      } catch (error:any) {
        throw errorResponse({message: error.toString()});
      }
    }
  
    return {addInstitute, addMentor,getAllInstitute}
}