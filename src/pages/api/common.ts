import { axiosInstance } from "./requireInterface";

// 通用接口
export class CommonApi {
  static unbind: any;
  constructor() {}

  /**
   *  解除预定
   *  @param id  预定id
   * */
  public unbind = async (id: number) => {
    return await axiosInstance.get("/booking/unbind/" + id);
  };
}
