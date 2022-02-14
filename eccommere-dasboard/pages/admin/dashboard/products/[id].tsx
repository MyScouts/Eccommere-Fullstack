import { useRouter } from 'next/router'
import React from 'react'
import ProductAttribute from '../../../../components/ProductAttributes/ProductAttribute'
import ProductDetail from '../../../../components/ProductDetail/ProductDetail'
import DefaultLayout from '../../../../layouts/default/DefaultLayout'

const ProductDetailIndex = () => {
    const router = useRouter()
    const productId = router.query.id as string
    console.log("🚀 ~ file: [id].tsx ~ line 9 ~ ProductDetailIndex ~ productId", productId)
    return (
        <div>
            {productId && (
                <div>
                    <ProductDetail productId={productId} />
                    <ProductAttribute productId={productId} />
                </div>

            )}
        </div>
    )
}

ProductDetailIndex.layout = DefaultLayout
export default ProductDetailIndex
