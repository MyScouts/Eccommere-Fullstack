import { Avatar, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    EditOutlined
} from '@ant-design/icons';
import Link from 'next/link'
import { getUserInfoService } from '../../services/userService';
import { IUserInfo } from '../../interface/user';
import UserLayout from '../../layouts/user/UserLayout';
import { BASE_FILE_URL } from '../../common/appConfig';
const ProfileIndex = () => {

    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

    const getUserInfo = async () => {
        setUserInfo(await getUserInfoService());
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <div>
            <Col>
                <Row>
                    <Col span={20}>
                        <h1>Profile</h1>
                    </Col>
                    <Col span={4} >
                        <Row justify='end'><Link href={'/profile/edit'} passHref><EditOutlined className="button-action" style={{ fontSize: 20, color: "green" }} /></Link></Row>
                    </Col>
                </Row>

                <Row style={{ marginTop: 20, backgroundColor: "white", padding: "1rem", borderRadius: 5, boxShadow: "0 0 1px black" }} align='top'>
                    <Col span={3} style={{ marginTop: 40, }}>
                        <Row align='middle' justify='center'>
                            <Avatar size={100} src={userInfo?.avatar !== null && userInfo?.avatar !== "" ? `${BASE_FILE_URL}${userInfo?.avatar}` : `https://joeschmoe.io/api/v1/random`} />
                        </Row>
                    </Col>
                    <Col span={20}>
                        <Row>
                            <Col span={3}>
                                <h3>Fist Name:</h3>
                            </Col>
                            <Col span={17}>
                                <h3 style={{ textTransform: "capitalize" }}>{userInfo?.firstName} </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={3}>
                                <h3>Last Name:</h3>
                            </Col>
                            <Col span={17}>
                                <h3 style={{ textTransform: "capitalize" }}>{userInfo?.lastName} </h3>
                            </Col>

                        </Row>

                        <Row>
                            <Col span={3}>
                                <h3>Email:</h3>
                            </Col>
                            <Col span={17}>
                                <h3 >{userInfo?.email} </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={3}>
                                <h3>Phone Number:</h3>
                            </Col>
                            <Col span={17}>
                                <h3 >{userInfo?.phoneNumber} </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={3}>
                                <h3>Address:</h3>
                            </Col>
                            <Col span={17}>
                                <h3 >{userInfo?.address} </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={3}>
                                <h3>Email Verified:</h3>
                            </Col>
                            <Col span={17}>
                                <h3 >{userInfo?.emailVerified} </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={3}>
                                <h3>Phone Verified:</h3>
                            </Col>
                            <Col span={17}>
                                <h3 >{userInfo?.phoneVerified} </h3>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
        </div>
    )
}

ProfileIndex.layout = UserLayout
export default ProfileIndex