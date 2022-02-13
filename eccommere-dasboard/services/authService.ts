import RequestHelper from "../common/appClient";
import { BASE_URL } from "../common/appConfig";
import { setToken, setUser } from "../utils/storageUtil";

export const adminLoginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const url = `${BASE_URL}admin/auth/login`;
    const response = await RequestHelper.post(url, {
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      setToken(response.data.successToken);
      setUser({
        userId: response.data.userId,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
    }
    return response.status;
  } catch (error: any) {
    console.log("error", error);
    return 500;
  }
};
