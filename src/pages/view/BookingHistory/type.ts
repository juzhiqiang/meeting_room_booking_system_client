import { MeetingRoomSearchResult } from "@/pages/admin/MeetingRoomManage";

export interface SearchBooking {
  username: string;
  meetingRoomName: string;
  meetingRoomPosition: string;
  rangeStartDate: Date;
  rangeStartTime: Date;
  rangeEndDate: Date;
  rangeEndTime: Date;
}

export interface BookingSearchResult {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
  createTime: string;
  updateTime: string;
  room: MeetingRoomSearchResult;
}
