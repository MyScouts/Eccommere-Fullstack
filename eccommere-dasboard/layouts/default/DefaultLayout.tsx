import React, { useEffect, useState } from 'react'
import type { LayoutProps } from '../PageWithLayout'
import { Layout, Menu, Breadcrumb, Row, Space, Popconfirm, message, Avatar } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { getUser } from '../../utils/storageUtil';
import { IUserInfo } from '../../interface/user';
import Text from 'antd/lib/typography/Text';
import { getUserInfoService } from '../../services/userService';
import Link from 'next/link';
import { BASE_FILE_URL } from '../../common/appConfig';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const menuObjects = [
    {
        title: 'Home',
        icon: <HomeOutlined />,
        path: '/admin/dashboard',
        key: 1,
    },
    {
        title: 'Dashboard',
        icon: <UserOutlined />,
        key: "sub1",
        children: [
            {
                title: 'Users',
                icon: <UserOutlined />,
                key: 3,
                path: '/admin/dashboard/users',
            },
            {
                title: 'Products',
                icon: <UserOutlined />,
                key: 4,
                path: '/admin/dashboard/products',
            },
            {
                title: 'Orders',
                icon: <UserOutlined />,
                key: 5,
                path: '/admin/dashboard/orders',
            }
        ]
    },
]



const DefaultLayout: LayoutProps = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const onCollapse = () => setCollapsed(!collapsed)
    const router = useRouter()
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)


    const getUserInfo = async () => {
        setUserInfo(await getUserInfoService());
    }

    useEffect(() => {
        getUserInfo();
    }, [])


    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const user = getUser()
        console.log("🚀 ~ file: DefaultLayout.tsx ~ line 79 ~ useEffect ~ user", user)
        if (user && user.roles === 'admin') {
        } else {
            router.push('/')
            message.error('You are not authorized to access this page')
        }
    }, [])


    function logoutHanlder() {
        localStorage.removeItem('TOKEN');
        router.push('/login')
        message.success('Logout successfully!')
    }

    return (
        <Layout style={{ minHeight: '100vh' }} hasSider className='admin-layout-page'>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
                theme="dark"
            >
                <div className="logo" style={{ color: "white" }}>
                    {/* <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bolder", textTransform: "uppercase" }}>Admin</h1> */}
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {menuObjects.map((menu, index) => {
                        if (menu.children) {
                            return (
                                <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
                                    {menu.children.map((child, childIndex) => {
                                        return (
                                            <Menu.Item key={child.key} icon={child.icon} onClick={() => router.push(child.path)}>
                                                {child.title}
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            )
                        }
                        return (
                            <Menu.Item key={menu.key} icon={menu.icon} onClick={() => router.push(menu.path)}>
                                <span>{menu.title}</span>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        position: "sticky",
                        top: 0,
                        width: `calc(100% - ${collapsed ? '80px' : '200px'})`,
                        left: 200,
                        padding: 0,
                    }}
                >
                    <Row align='middle' justify='end' style={{ padding: "0px 2rem" }}>
                        <Text className='hello-text-header' onClick={() => router.push('/admin/profile')}>Hello, {userInfo?.firstName} {userInfo?.lastName}</Text>
                        <Avatar src={userInfo?.avatar !== null && userInfo?.avatar !== "" ? `${BASE_FILE_URL}${userInfo?.avatar}` : `https://joeschmoe.io/api/v1/random`} style={{ marginRight: 15 }} />
                        <div className='button-event' >
                            <Popconfirm placement='bottomRight' title="Do you wan't logout!" okText="Yes" cancelText="No" onConfirm={logoutHanlder}>
                                <LogoutOutlined style={{ fontSize: 20, color: "#FC4F4F" }} />
                            </Popconfirm>
                        </div>

                    </Row>

                </Header>
                <Content
                    className="site-layout"
                    style={{ marginLeft: collapsed ? 100 : 220, marginTop: 20, marginBottom: 20, marginRight: 20 }}
                >
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{ textAlign: 'center' }}
                >
                    The App ©2021 Created by
                </Footer>
            </Layout>
        </Layout>
    )
}

export default DefaultLayout