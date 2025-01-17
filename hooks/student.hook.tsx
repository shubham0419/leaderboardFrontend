import { errorResponse, successResponse } from "@/services/responseWrapper";
import Student from "@/services/student.service";


export function UseStudentManager(){

  const getStudentByMentor = async(mentorId:string):Promise<StudentByMentorController> =>{
    try {
      let res = await Student.getStudentsByMentor(mentorId);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      return errorResponse({message: error.toString()})
    }
  }

  const getStudentById = async(studentId:string):Promise<StudentByIdController>=>{
    try {
      let res = await Student.getStudentById(studentId);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      return errorResponse({message: error.toString()})
    }
  }

  return { getStudentByMentor,getStudentById }
}