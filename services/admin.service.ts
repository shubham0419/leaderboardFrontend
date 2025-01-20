import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Admin {
  static AddInstitute = (payload:AddInstitutePayload) => {
    return new Promise<AddInstituteResponseType>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.addInstitute,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as AddInstituteResponseType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };
}
