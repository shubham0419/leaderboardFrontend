import { errorResponse, successResponse } from "@/services/responseWrapper";
import Student from "@/services/student.service";


export function UseStudentManager(){

  const getStudentByMentor = async(mentorId:string,params:StudentsbyMentorParamsTye):Promise<StudentByMentorController> =>{
    try {
      let res = await Student.getStudentsByMentor(mentorId,params);
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

  const getStudentLeetcodeQuestions = async(payload:StudentProblemPayloadType):Promise<StudentQuestionsController>=>{
    try {
      let res = await Student.getStudentLeetcodeQuestionsByYear(payload);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      return errorResponse({message: error.toString()})
    }
  }

  const getCodeforcescodeQuestions = async(payload:StudentProblemPayloadType):Promise<StudentCFQuestionsController>=>{
    try {
      let res = await Student.getStudentCodeforcesQuestionsByYear(payload);
      return successResponse<typeof res>({ data: res });
    } catch (error:any) {
      return errorResponse({message: error.toString()})
    }
  }
  return { getStudentByMentor,getStudentById ,getStudentLeetcodeQuestions,getCodeforcescodeQuestions}
}