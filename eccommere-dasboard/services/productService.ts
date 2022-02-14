import RequestHelper from "../common/appClient";
import { BASE_URL } from "../common/appConfig";
import { IProductAttribute, IProductInfo } from "../interface/products";

interface ICreateProduct {
  productName: string;
  description: string;
  price: number;
  quantity: number;
  avatar: File | null;
  background: File | null;
}
export const createProductService = async ({
  productName,
  description,
  price,
  quantity,
  avatar,
  background,
}: ICreateProduct) => {
  try {
    const url = `${BASE_URL}products`;
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    if (avatar) formData.append("avatar", avatar);
    if (background) formData.append("background", background);
    const response = await RequestHelper.post(url, formData);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("🚀 ~ file: productService.ts ~ line 19 ~ error", error);
    return {
      status: 400,
    };
  }
};

export const getProductInfoService = async (productId: string) => {
  try {
    const url = `${BASE_URL}products/${productId}`;
    const response = await RequestHelper.get(url, {});
    return response.data as IProductInfo;
  } catch (error) {
    return null;
  }
};

export const getProductAttributeService = async (productId: string) => {
  try {
    const url = `${BASE_URL}products/${productId}/attributes`;
    const response = await RequestHelper.get(url, {});
    return response.data.attributes as IProductAttribute[];
  } catch (error) {
    return null;
  }
};

export const newProductAttribute = async ({
  productId,
  title,
  description,
  image,
}: {
  productId: string;
  title: string;
  description: string;
  image: File;
}) => {
  try {
    const url = `${BASE_URL}products/${productId}/attributes`;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("product_attrbutes", image);
    const response = await RequestHelper.post(url, formData);
    return response.status;
  } catch (error) {
    return 500;
  }
};

export const removeAttribueService = async (
  productId: string,
  attributeId: string
) => {
  try {
    const url = `${BASE_URL}products/${productId}/attributes/${attributeId}`;
    const response = await RequestHelper.delete(url, {});
    return response.status;
  } catch (error) {
    return 500;
  }
};

export const updateProductAttributeService = async ({
  productId,
  attributeId,
  title,
  description,
  image,
}: {
  productId: string;
  attributeId: string;
  title: string;
  description: string;
  image: File | null;
}) => {
  try {
    const url = `${BASE_URL}products/${productId}/attributes/${attributeId}`;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("product_attrbutes", image);
    const response = await RequestHelper.put(url, formData);
    return response.status;
  } catch (error) {
    return 500;
  }
};

interface IPaginateResponse {
  itemCount: number;
  perPage: number;
  currentPage: number;
  pageCount: null;
  items: IProductInfo[];
}

export const getProductsService = async ({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const url = `${BASE_URL}products?search=${search}&page=${page}&pageSize=${pageSize}`;
    const response = await RequestHelper.get(url, {});
    return response.data as IPaginateResponse;
  } catch (error) {}
};
