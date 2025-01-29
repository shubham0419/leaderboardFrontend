import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Auth {
  static login = (payload:LoginPayload) => {
    return new Promise<loginOTPResType>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.login,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as loginOTPResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static verifyOTP = (payload:verifyUserPayload)=>{
    return new Promise<verifyUserRes> (async (resolve,reject)=>{
      try {
        const res = await axios.post(API_CONSTANTS.verify,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as verifyUserRes);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
}
