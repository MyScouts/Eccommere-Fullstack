import { Breadcrumb, Menu } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import SubMenu from 'antd/lib/menu/SubMenu'
import React from 'react'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
    LaptopOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import { LayoutProps } from '../PageWithLayout'
import Link from 'next/link'

const UserLayout: LayoutProps = ({ children }) => {
    return (
        <div className='main-user-layout'>
            <Layout>
                <Header className="header" style={{ display: "flex" }}>
                    <div className="logo">
                        Mobile Shop
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link href={'/home'}>Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">Products</Menu.Item>
                        <Menu.Item key="3">
                            <Link href={'/profile'}>Profile</Link>
                        </Menu.Item>
                    </Menu>
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