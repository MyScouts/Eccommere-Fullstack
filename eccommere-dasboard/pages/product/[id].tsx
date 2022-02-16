/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { Button, Col, message, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { BASE_FILE_URL } from '../../common/appConfig'
import { CartContext } from '../../common/CartContext'
import { IProductAttribute, IProductInfo } from '../../interface/products'
import UserLayout from '../../layouts/user/UserLayout'
import { getProductAttributeService, getProductInfoService } from '../../services/productService'

const ProductDetail = () => {
    const [productInfo, setProductInfo] = React.useState<IProductInfo | null>(null)
    const [attributes, setAttributes] = useState<IProductAttribute[] | null>(null)
    const [images, setImages] = useState<string[] | null>(null)
    const router = useRouter()
    const productId = router.query.id as string
    const { cart, total, addToCart, removeFromCart } = useContext(CartContext)
    const [imageShow, setImageShow] = useState<number>(0)
    const getProductInfo = async () => {
        console.log("🚀 ~ file: [id].tsx ~ line 22 ~ getProductInfo ~ productId", productId)
        const result = await getProductInfoService(productId);
        if (result) {
            setProductInfo(result)
            return;
        }
        message.error({ content: 'Product not found!', key: 'error', duration: 2 });
        return;
    }

    const getAttributes = async () => {
        setAttributes(await getProductAttributeService(productId))
    }

    useEffect(() => {
        getProductInfo()
        getAttributes()

        if (productInfo && attributes) {
            const attrImage = attributes.map(attr => attr.imageUrl)
            setImages([productInfo.avatar, ...attrImage])
        }
    }, [productInfo, attributes])
    console.log("🚀 ~ file: [id].tsx ~ line 39 ~ useEffect ~ images", images)

    return (
        <div>
            {productInfo && (
                <>
                    <Row>
                        <h1>Product Detail - <span style={{ fontSize: 20, fontWeight: 'bolder' }}> ID Product: {productId}</span></h1>
                    </Row>
                    <Row style={{ marginTop: 50 }}>
                        {
                            images && images.length > 0
                            && <Col span={8} style={{ padding: "0 2rem 0 2rem" }}>
                                <img src={`${BASE_FILE_URL}${images[imageShow]}`} alt="product" style={{ width: '100%', height: "500px", objectFit: "cover" }} className="button-event" />
                                <Row justify='space-between' style={{ marginTop: 10, width: "100%" }}>
                                    {images.map((image, index) => {
                                        if (index === imageShow) return;
                                        return <Col style={{ marginTop: 10, flex: 1 }}>
                                            <img src={`${BASE_FILE_URL}${image}`} style={{ width: '100px', height: "100px", objectFit: "cover" }} alt="product" onClick={() => setImageShow(index)} className="button-event" />
                                        </Col>
                                    })}
                                </Row>
                            </Col>
                        }
                        <Col span={16}>
                            <Row>
                                <Col span={4}><h1>Product ID:</h1></Col>
                                <Col><h1>{productId}</h1></Col>
                            </Row>
                            <Row>
                                <Col span={4}><h1>Product Name:</h1></Col>
                                <Col><h1>{productInfo.productName}</h1></Col>
                            </Row>
                            <Row>
                                <Col span={4}><p>Price:</p></Col>
                                <Col><p>{productInfo.price}</p></Col>
                            </Row>
                            <Row>
                                <Col span={4}><p>Description:</p></Col>
                                <Col span={20}><p>{productInfo.description}</p></Col>
                            </Row>
                            <Row>
                                <Col span={4}><p>Sale:</p></Col>
                                <Col span={20}><p>{productInfo.sale === 0 ? "NO" : "YES"}</p></Col>
                            </Row>
                            <Row>
                                <Col span={4}><p>Rating:</p></Col>
                                <Col span={20}><p>{productInfo.rating}</p></Col>
                            </Row>
                            <Row align='middle' justify='end' style={{ gap: 10 }}>
                                <Col span={4}>
                                    <Button style={{ width: "100%" }} onClick={() => addToCart(productInfo)}>
                                        Add to Cart
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="primary" danger style={{ width: "100%" }} onClick={() => {
                                        addToCart(productInfo)
                                        router.push('/profile/checkout')
                                    }}>
                                        By now
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </>

            )}
        </div>
    )
}

ProductDetail.layout = UserLayout
export default ProductDetail