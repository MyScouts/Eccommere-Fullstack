import { Row } from 'antd'
import React from 'react'
import DefaultLayout from '../../../../layouts/default/DefaultLayout'
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import ProductList from '../../../../components/ProductList/ProductList';
const ProductsIndex = () => {
  const router = useRouter()

  return (
    <div>
      <Row align='middle' justify='space-between'>
        <h1 style={{ lineHeight: 0 }}>Products</h1>
        <div onClick={() => router.push("/admin/dashboard/products/create")}><PlusCircleOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
      </Row>
      <ProductList />
    </div>
  )
}

ProductsIndex.layout = DefaultLayout
export default ProductsIndex