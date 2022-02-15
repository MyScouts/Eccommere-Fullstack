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

export const checkoutService = async ({
  address,
  phoneNumber,
  method,
  items,
}: {
  address: string;
  phoneNumber: string;
  method: number;
  items: any[];
}) => {
  try {
    const url = `${BASE_URL}user/orders`;
    const response = await RequestHelper.post(url, {
      address,
      phoneNumber,
      method,
      items,
    });
    return response.status;
  } catch (error) {
    return 500;
  }
};
