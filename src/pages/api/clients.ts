import dayjs from "dayjs";
import { CreateBooking } from "../view/MeetingRoomList/CreateBookingModal";
import { axiosInstance } from "./requireInterface";
import { message } from "antd";

export class ClientApi {
  static bookingAdd: any;
  constructor() {}
  /**
   * 添加预约
   * @param booking {CreateBooking} 预约信息
   * */
  public bookingAdd = async (booking: CreateBooking) => {
    const rangeStartDateStr = dayjs(booking.rangeStartDate).format(
      "YYYY-MM-DD"
    );
    const rangeStartTimeStr = dayjs(booking.rangeStartTime).format("HH:mm");
    const startTime = dayjs(
      rangeStartDateStr + " " + rangeStartTimeStr
    ).valueOf();

    const rangeEndDateStr = dayjs(booking.rangeEndDate).format("YYYY-MM-DD");
    const rangeEndTimeStr = dayjs(booking.rangeEndTime).format("HH:mm");
    const endTime = dayjs(rangeEndDateStr + " " + rangeEndTimeStr).valueOf();
    try {
      const { data } = await axiosInstance.post("/booking/add", {
        meetingRoomId: booking.meetingRoomId,
        startTime,
        endTime,
        note: booking.note,
      });
      if (data.code !== 200 && data.code !== 201) {
        message.error(data.data);
        return null;
      }
      return data.data;
    } catch (error) {
      message.error("接口异常");
    }
  };
}
