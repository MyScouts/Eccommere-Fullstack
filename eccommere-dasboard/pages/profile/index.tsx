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

                <Row style={{ marginTop: 20 }} align='top'>
                    <Col span={3}>
                        <Avatar size={100} src={userInfo?.avatar !== null && userInfo?.avatar !== "" ? `${BASE_FILE_URL}${userInfo?.avatar}` : `https://joeschmoe.io/api/v1/random`} />
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

                    </Col>
                </Row>
            </Col>
        </div>
    )
}

ProfileIndex.layout = UserLayout
export default ProfileIndex