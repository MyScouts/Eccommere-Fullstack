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
