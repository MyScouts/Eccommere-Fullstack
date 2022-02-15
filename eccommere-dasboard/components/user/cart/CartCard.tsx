import { Card, Col, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useContext, useState } from 'react'
import { BASE_FILE_URL } from '../../../common/appConfig'
import { DeleteOutlined } from '@ant-design/icons'
import { CartContext } from '../../../common/CartContext'
import ModalConfirm from '../../ModalConfirm/ModalConfirm'
interface ICartInfo {
    productId: string,
    quantity: number
    avatar: string
    name: string
    price: number
}

interface IProps {
    cartInfo: ICartInfo
}

const CartCard = (props: IProps) => {
    const { cart, total, addToCart, removeFromCart, removeCart } = useContext(CartContext)
    const [deleteModal, setDeleteModal] = useState(false)

    return (
        <Col span={24}>
            <Card
            
            >
                <Row align='top'>
                    <Col span={3}>
                        <Avatar shape='square' size={150} src={`${BASE_FILE_URL}${props.cartInfo.avatar}`} />
                    </Col>
                    <Col span={20}>
                        <h4>Product ID: {props.cartInfo.productId}</h4>
                        <h4>Product Name: {props.cartInfo.name}</h4>
                        <p>Price: {props.cartInfo.price}</p>
                        <p>Quantity: {props.cartInfo.quantity}</p>
                    </Col>
                    <Col>
                        <Row justify='center'>
                            <div onClick={() => setDeleteModal(true)}><DeleteOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <ModalConfirm isModalVisible={deleteModal} handleOkCallback={() => removeCart(props.cartInfo.productId)} setIsModalVisible={(status) => setDeleteModal(status)} />
        </Col>
    )
}

export default CartCard