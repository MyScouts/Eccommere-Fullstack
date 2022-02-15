import { Button, Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { CartContext } from '../../common/CartContext'
import CartCard from '../../components/user/cart/CartCard'
import UserLayout from '../../layouts/user/UserLayout'

interface ICartInfo {
    productId: string,
    quantity: number
    avatar: string
    name: string
    price: number
}

const CartIndex = () => {
    const { cart, total, addToCart, removeFromCart } = useContext(CartContext)
    const router = useRouter()
    return (
        <div>
            <h1>MY CART</h1>
            <Row>
                {
                    cart && cart.length > 0 && cart.map((item: ICartInfo, index: number) => <CartCard cartInfo={item} key={index} />)
                }

            </Row>

            {
                cart && cart.length > 0 &&
                <>
                    <Row style={{ marginTop: 20 }} justify="end">
                        <Col>
                            <h1>Total: {total}</h1>
                            <Button onClick={() => router.push('/profile/checkout')}>
                                Order Now
                            </Button>
                        </Col>
                    </Row>
                </>
            }
        </div>
    )
}

CartIndex.layout = UserLayout
export default CartIndex