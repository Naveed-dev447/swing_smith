

export interface IAnalysisResponse {
    status: number;
    data: any[];
    message: string;
}

export interface IUploadedPayload {
    file_name: string;
    mimetype: string;
}
