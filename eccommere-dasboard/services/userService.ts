import RequestHelper from "../common/appClient";
import { BASE_URL } from "../common/appConfig";
import { IOrderInfo, IUserInfo } from "../interface/user";

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

export const getOrdersService = async () => {
  try {
    const url = `${BASE_URL}user/orders`;
    const response = await RequestHelper.get(url, {});
    return response.data as IOrderInfo[];
  } catch (error) {
    return null;
  }
};

interface IPaginateResponse {
  itemCount: number;
  perPage: number;
  currentPage: number;
  pageCount: null;
  items: IOrderInfo[];
}

export const getAdminOrdersService = async ({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const url = `${BASE_URL}user/orders-admin?search=${search}&page=${page}&pageSize=${pageSize}`;
    const response = await RequestHelper.get(url, {});
    return response.data as IPaginateResponse;
  } catch (error) {
    return null;
  }
};

export const updateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: number;
}) => {
  try {
    const url = `${BASE_URL}user/orders-admin`;
    const response = await RequestHelper.post(url, { status, orderId });
    return response.status;
  } catch (error) {
    return 500;
  }
};


interface IPaginateResponseUser {
  itemCount: number;
  perPage: number;
  currentPage: number;
  pageCount: null;
  items: IUserInfo[];
}

export const getAllUSersService = async ({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const url = `${BASE_URL}user/admin?search=${search}&page=${page}&pageSize=${pageSize}`;
    const response = await RequestHelper.get(url, {});
    return response.data as IPaginateResponseUser;
  } catch (error) {
    return null;
  }
}

export const updateProfileService = async ({
  firstName,
  lastName,
  phoneNumber,
  address,
  avatar,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  avatar: File;
}) => {

  try {
    const url = `${BASE_URL}user/profile`;
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('avatar', avatar);
    const response = await RequestHelper.post(url, formData);
    return response.status;
  } catch (error) {
    return 500;
  }
}