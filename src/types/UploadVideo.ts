
export interface IVideoData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
export interface IUploadVideoResponse {
  status: number;
  data: IVideoData;
  message: string;
}
