export interface IProductInfo {
  avatar: string;
  sale: number;
  rating: number;
  quantity: number;
  _id: string;
  productName: string;
  price: number;
  description: string;
  productId: string;
  background: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IProductAttribute {
  title: string;
  imageUrl: string;
  description: string;
  likes: number;
  comments: [];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
