import axios from "axios";
import { apiURL } from "../config";

export const getData = async (id: string, apiToken: string) => {
  try {
    const { data } = await axios({
      headers: { Authorization: `Bearer ${apiToken}` },
      method: "GET",
      url: `${apiURL}${id}`,
    });
    return data.note;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const updateData = async (
  id: string,
  note: string,
  apiToken: string
) => {
  try {
    await axios({
      headers: { Authorization: `Bearer ${apiToken}` },
      method: "PUT",
      url: `${apiURL}${id}`,
      data: { note },
    });
    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
};
