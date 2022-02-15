export interface IUserInfo {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string;
  avatar: string;
  phoneNumber: string;
}

export interface IOrderInfo {
  _id: string;
  userId: string;
  orderId: string;
  address: string;
  phoneNumber: string;
  status: number;
  method: number;
  itemQuantity: 11;
  total: string;
  acceptTime: string;
  orderTime: string;
  createdAt: string;
}
