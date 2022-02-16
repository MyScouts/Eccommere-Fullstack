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
    const url = `${BASE_URL}auth/login`;
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
        roles: response.data.roles,
      });
    }
    return response.status;
  } catch (error: any) {
    console.log("error", error);
    return 500;
  }
};


export const registerService = async ({ firstName, lastName, email, password, phoneNumber, roles }:
  { firstName: string, lastName: string, email: string, password: string, phoneNumber: string, roles: string | null | undefined }) => {

  try {
    const url = `${BASE_URL}auth/register`;
    const response = await RequestHelper.post(url, {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      roles
    });
    if (response.status === 200) {
      setToken(response.data.successToken);
      setUser({
        userId: response.data.userId,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        roles: response.data.roles,
      });
    }
    return response.status;

  } catch (error) {
    console.log("🚀 ~ file: authService.ts ~ line 61 ~ error", error)
    return 500;
  }

}


export const createUserService = async ({ firstName, lastName, email, password, phoneNumber, roles }:
  { firstName: string, lastName: string, email: string, password: string, phoneNumber: string, roles: string | null | undefined }) => {

  try {
    const url = `${BASE_URL}auth/register`;
    const response = await RequestHelper.post(url, {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      roles
    });
    return response.status;

  } catch (error) {
    console.log("🚀 ~ file: authService.ts ~ line 61 ~ error", error)
    return 500;
  }

}

export const updateUserService = async ({ firstName, lastName, phoneNumber, emailVerified, phoneVerified, userId, address, roles }:
  { firstName: string, lastName: string, phoneNumber: string, emailVerified: string, phoneVerified: string, userId: string, address: string, roles: string }) => {
    
    console.log("🚀 ~ file: authService.ts ~ line 93 ~  firstName, lastName, phoneNumber, emailVerified, phoneVerified, userId, address, roles",  firstName, lastName, phoneNumber, emailVerified, phoneVerified, userId, address, roles)
  try {
    const url = `${BASE_URL}user/${userId}`;
    const response = await RequestHelper.post(url, {
      firstName,
      lastName,
      phoneNumber,
      emailVerified,
      phoneVerified,
      address,
      roles
    });
    return response.status;
  } catch (error) {
    console.log("🚀 ~ file: authService.ts ~ line 61 ~ error", error)
    return 500;
  }

}