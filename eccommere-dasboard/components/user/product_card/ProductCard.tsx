import { Card } from 'antd'
import React, { useContext } from 'react'
import { IProductInfo } from '../../../interface/products'
import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Meta } from 'antd/lib/list/Item';
import { BASE_FILE_URL } from '../../../common/appConfig';
import { CartContext } from '../../../common/CartContext';
interface IProps {
    product: IProductInfo
}

const ProductCard = (props: IProps) => {
    const { cart, total, addToCart, removeFromCart } = useContext(CartContext)

    return (
        <div>
            <Card
                style={{ width: 300, marginTop: 20 }}
                cover={
                    <img
                        alt="example"
                        src={`${BASE_FILE_URL}${props.product.avatar}`}
                    />
                }
                actions={[
                    <HeartOutlined key="Love" />,
                    // <EditOutlined key="edit" />,
                    <ShoppingCartOutlined key="cart" onClick={() => addToCart(props.product)} />,
                ]}
            >
                <Meta
                    title={props.product.productName}
                    description={`${props.product.price} $`}
                />
            </Card>
        </div>
    )
}

export default ProductCard