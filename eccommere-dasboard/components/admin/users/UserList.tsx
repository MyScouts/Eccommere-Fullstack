import { Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { IUserInfo } from '../../../interface/user';
import { getAllUSersService } from '../../../services/userService';

import {
    DeleteOutlined,
    EditOutlined,
    UploadOutlined,
    PlusCircleFilled
} from '@ant-design/icons';
import ModalAddUser from './ModalAddUser';
import ModalUpdateUser from './ModalUpdateUser';

interface IPagination {
    current: number;
    pageSize: number;
}
const UserList = () => {
    const [users, setUsers] = useState<IUserInfo[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [response, setResponse] = useState<IPagination>({ current: 1, pageSize: 10 });
    const [addUser, setAddUser] = useState<boolean>(false)
    const [updateUser, setUpdateUser] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

    const getUsers = async () => {
        const result = await getAllUSersService({
            page: 1,
            pageSize: 5,
            search: ""
        })
        if (result && result.itemCount > 0) {
            setUsers(result.items)
            setResponse({
                current: result.currentPage,
                pageSize: result.pageCount ?? 1,
            })
        }
    }
    const loadMoreUsers = async ({ page }: { page: number }) => {
        const result = await getAllUSersService({
            page: page,
            pageSize: 5,
            search: ""
        })
        if (result && result.itemCount > 0) {
            setUsers(result.items)
        }
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setCurrentPage(pagination.current)
        loadMoreUsers({ page: pagination.current })

    };

    useEffect(() => {
        getUsers()
    }, [])

    const updateUserHandler = (user: IUserInfo) => {
        setUserInfo(user)
        setUpdateUser(true)
    }

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        }, {
            title: 'Email',
            dataIndex: 'email',
        }, {
            title: 'Email Verified',
            dataIndex: 'emailVerified',
            render: (text: any, record: any) => {
                return record.emailVerified ? "Yes" : "No"
            }
        }, {
            title: 'Phone Verified',
            dataIndex: 'phoneVerified',
            render: (text: any, record: any) => {
                return record.emailVerified ? "Yes" : "No"
            }
        }, {
            title: "Phone",
            dataIndex: "phoneNumber"
        }, {
            title: "Address",
            dataIndex: "address"
        }, {
            title: "Roles",
            dataIndex: "roles",
        }, {
            title: 'CreateAt',
            dataIndex: 'createdAt',
        }, {
            title: 'Status',
            dataIndex: 'logical_delete',
            render: (text: any, record: any) => {
                return record.logical_delete ? "Deleted" : "Active"
            }
        }, {
            title: 'Action',
            dataIndex: 'action',
            render: (text: any, record: IUserInfo) => {
                return <Row>
                    <div className="button-action" onClick={() => updateUserHandler(record)}>
                        <EditOutlined />
                    </div>
                    <div className="button-action">
                        <DeleteOutlined />
                    </div>
                </Row>
            }
        }
    ];

    return (
        <div>
            <Row align='middle' justify='space-between'>
                <h1>UserList</h1>

                <div className="button-action" onClick={() => setAddUser(true)}>
                    <PlusCircleFilled style={{ fontSize: "20px" }} />
                </div>
            </Row>
            <div style={{ marginTop: 50 }}>
                {
                    users && users.length > 0 ?
                        <>
                            <Table
                                style={{ marginTop: 50 }}
                                columns={columns}
                                // rowKey={record => record.login.uuid}
                                dataSource={users}
                                pagination={{ total: response.pageSize * 10 }}
                                // loading={loading}
                                onChange={handleTableChange}
                                rowKey={(record: IUserInfo) => record._id}

                            />

                            <ModalAddUser isModalVisible={addUser} setIsModalVisible={(status) => setAddUser(status)} handleOkCallback={() => { }} />
                            <ModalUpdateUser isModalVisible={updateUser} setIsModalVisible={(status) => setUpdateUser(status)} userInfo={userInfo} handleOkCallback={(status) => {
                                if(status){
                                    loadMoreUsers({ page: currentPage })
                                }
                            }} />
                        </>
                        :
                        <div>No Users</div>
                }
            </div>

        </div>
    )
}

export default UserList