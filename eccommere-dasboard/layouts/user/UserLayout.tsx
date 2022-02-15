import { Badge, Breadcrumb, Menu, message, Row } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useContext, useEffect } from 'react'
import {
    ShoppingCartOutlined
} from '@ant-design/icons';
import { LayoutProps } from '../PageWithLayout'
import Link from 'next/link'
import { getUser } from '../../utils/storageUtil'
import { useRouter } from 'next/router'
import Avatar from 'antd/lib/avatar/avatar'
import { CartContext } from '../../common/CartContext'

const UserLayout: LayoutProps = ({ children }) => {
    const router = useRouter()
    const { cart, total, addToCart, removeFromCart,removeCart } = useContext(CartContext)
    console.log("🚀 ~ file: UserLayout.tsx ~ line 19 ~ cart", cart)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const user = getUser()
        if (user && user.roles !== 'admin') {
        } else {
            router.push('/login')
            message.error('You are not authorized to access this page')
        }
    }, [])

    return (
        <div className='main-user-layout'>
            <Layout>
                <Header className="header" style={{ display: "flex" }}>
                    <div className="logo">
                        Mobile Shop
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link href={'/home'}>Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">Products</Menu.Item>
                        <Menu.Item key="3">
                            <Link href={'/profile'}>Profile</Link>
                        </Menu.Item>
                    </Menu>

                    <Row justify='end' style={{ marginLeft: "auto" }} align="middle">
                        <div style={{ display: "flex", marginRight: 20 }} onClick={() => router.push('/profile/cart')}>
                            <Badge count={cart.length}>
                                <ShoppingCartOutlined style={{ fontSize: 25, color: "white" }} />
                            </Badge>
                        </div>
                        <div style={{ color: "white", fontWeight: "bolder", cursor: "pointer" }}>Log out</div>
                    </Row>
                </Header>
                <Content style={{ padding: '0 50px', minHeight: "86vh" }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </div>
    )
}

export default UserLayout