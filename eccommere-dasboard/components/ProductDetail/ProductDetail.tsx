import { Col, message, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { BASE_FILE_URL } from '../../common/appConfig'
import { IProductInfo } from '../../interface/products'
import { getProductInfoService, removeProductService } from '../../services/productService'
import {
    DeleteOutlined,
    EditOutlined,
    UploadOutlined
} from '@ant-design/icons'
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import { CartContext } from '../../common/CartContext'
interface IProps {
    productId: string
}

const ProductDetail = (props: IProps) => {
    const router = useRouter()
    const [productInfo, setProductInfo] = React.useState<IProductInfo | null>(null)
    const [showDeleteModal, setShowDeleteModal] = React.useState(false)
    const { cart, total, addToCart, removeFromCart } = useContext(CartContext)

    const getProductInfo = async () => {
        const result = await getProductInfoService(props.productId);
        if (result) {
            setProductInfo(result)
            return;
        }
        router.push("/admin/dashboard/products")
        message.error({ content: 'Product not found!', key: 'error', duration: 2 });
        return;
    }

    useEffect(() => {
        getProductInfo()
    }, [])


    // 
    const deleteProduct = async () => {
        const result = await removeProductService(props.productId);
        if (result === 200) {
            message.success({ content: 'Product deleted!', key: 'success', duration: 2 });
            router.push("/admin/dashboard/products")
            return;
        }
        message.error({ content: 'Product not deleted!', key: 'error', duration: 2 });
        return;
    }

    return (
        <div >
            <Row align='middle' justify='space-between'>
                <h1>Product Detail</h1>
                <Row justify='center'>
                    <div onClick={() => router.push({
                        pathname: '/admin/dashboard/products/edit/[id]',
                        query: { id: props.productId }
                    })}><EditOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
                    <div onClick={() => setShowDeleteModal(true)}><DeleteOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
                </Row>
            </Row>
            <Row align='middle'>
                <Col span={4} style={{ marginTop: 20 }}>
                    <Avatar shape='square' size={250} src={`${BASE_FILE_URL}${productInfo?.avatar}`} />
                </Col>
                <Col span={3}>
                    <h1>Product ID:</h1>
                    <h1>Product Name:</h1>
                    <h1>Description:</h1>
                    <h1>Product Price:</h1>
                    <h1>Product Quantity:</h1>
                    <h1>createdAt:</h1>
                    <h1>updatedAt:</h1>
                </Col>
                <Col span={17}>
                    <h1>{productInfo?.productId}</h1>
                    <h1>{productInfo?.productName}</h1>
                    <h1 className='one-line'>{productInfo?.description}</h1>
                    <h1>{productInfo?.price}</h1>
                    <h1>{productInfo?.quantity}</h1>
                    <h1>{productInfo?.createdAt}</h1>
                    <h1>{productInfo?.updatedAt}</h1>

                </Col>
            </Row>
            <ModalConfirm isModalVisible={showDeleteModal} handleOkCallback={deleteProduct} setIsModalVisible={(status) => setShowDeleteModal(status)} />
        </div>
    )
}

export default ProductDetail
