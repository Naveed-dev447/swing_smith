// src/api/FormUpsert.ts
import { IFormUpsert, IFormUpsertResponse } from "../../../../types/FormUpsert";
import apiClient from "../../../../config/client";
import { ShowToast } from "../../../../components/ShowToast";

export const formUpsertAPICall = async (payload: IFormUpsert): Promise<IFormUpsertResponse> => {
  try {
    const response = await apiClient.post<IFormUpsertResponse>('form/upsert', payload);

    if (response.data) {
      ShowToast('success', `${response.data.message}`)
    }

    return response.data;
  } catch (error) {
    console.error("Form Upsert API call failed:", error);
    throw error;
  }
};

export default formUpsertAPICall;
