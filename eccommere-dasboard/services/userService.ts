import RequestHelper from "../common/appClient";
import { BASE_URL } from "../common/appConfig";

export const getUserInfoService = async () => {
  try {
    const url = `${BASE_URL}user/profile`;
    const response = await RequestHelper.get(url, {});
    return response.data;
  } catch (error) {
    return null;
  }
};
