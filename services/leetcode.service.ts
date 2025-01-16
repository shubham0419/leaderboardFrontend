import API_CONSTANTS from "@/constants/apiConstant";
import axios from "axios";

export default class Leetcode {
  static GetLeetCodeDataById = (userId:string)=>{
    return new Promise<LeetcodeDataByIdRes>(async (resolve,reject)=>{
      try {
        let res = await axios.get(API_CONSTANTS.leetcodeDataById.replace("<USER_ID>",userId));
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as LeetcodeDataByIdRes);
      } catch (error:any) {
        return reject(error);
      }
    })
  }
}

