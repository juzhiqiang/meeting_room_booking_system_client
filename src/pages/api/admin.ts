import { message } from "antd";
import { axiosInstance } from "./requireInterface";

export class AdminApi {
  constructor() {}
  /**
   * 添加预约
   * */
  public meetingRoomUsedCount = async (startTime: string, endTime: string) => {
    try {
      const {
        data: { data, code },
        status,
      } = await axiosInstance.get("/statistic/meetingRoomUsedCount", {
        params: {
          startTime,
          endTime,
        },
      });
      if (status !== 200 && code !== 200 && code !== 201)
        throw Error("接口异常");
      return data;
    } catch (error) {
      message.error(error as any);
    }
  };

  /**
   * 添加预约
   * */
  public userBookingCount = async (startTime: string, endTime: string) => {
    try {
      const {
        data: { data, code },
        status,
      } = await axiosInstance.get("/statistic/userBookingCount", {
        params: {
          startTime,
          endTime,
        },
      });
      console.log(data);
      if (status !== 200 && code !== 200 && code !== 201)
        throw Error("接口异常");
      return data;
    } catch (error) {
      message.error(error as any);
    }
  };
}
