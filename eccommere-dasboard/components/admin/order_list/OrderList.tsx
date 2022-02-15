import { Button, Form, message, Modal, Radio, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { IOrderInfo } from '../../../interface/user';
import { getAdminOrdersService, updateOrderStatus } from '../../../services/userService';




interface IPagination {
    current: number;
    pageSize: number;
}

const OrderList = () => {
    const [orders, setOrders] = useState<IOrderInfo[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [response, setResponse] = useState<IPagination>({
        current: 1,
        pageSize: 10
    });

    const [updateStatus, setUpdateStatus] = useState<boolean>(false)
    const [orderInfo, setOrderInfo] = useState<IOrderInfo | null>(null)

    const getOrders = async () => {
        const result = await getAdminOrdersService({
            page: 1,
            pageSize: 5,
            search: ""
        })
        console.log("🚀 ~ file: ProductList.tsx ~ line 47 ~ getProducts ~ result", result)
        if (result && result.itemCount > 0) {
            setOrders(result.items)
            setResponse({
                current: result.currentPage,
                pageSize: result.pageCount ?? 1,
            })

            console.log("🚀 ~ file: ProductList.tsx ~ line 16 ~ ProductList ~ response", response)
        }
    }
    const loadMoreOrders = async ({ page }: { page: number }) => {
        const result = await getAdminOrdersService({
            page: page,
            pageSize: 5,
            search: ""
        })
        if (result && result.itemCount > 0) {
            setOrders(result.items)
        }
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setCurrentPage(pagination.current)
        loadMoreOrders({ page: pagination.current })

    };

    useEffect(() => {
        getOrders()
    }, [])


    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            render: (name: string, record: IOrderInfo) => <div className='element-link' onClick={() => updateOrderStatus(name, record)}>{name}</div>
        }, {
            title: 'Order At',
            dataIndex: 'createdAt',
        }, {
            title: "Address",
            dataIndex: "address"
        }, {
            title: "Phone",
            dataIndex: "phoneNumber"
        }, {
            title: 'Quantity',
            dataIndex: 'itemQuantity',
        },
        {
            title: 'Toatal',
            dataIndex: 'total',
        }, {
            title: 'Status',
            dataIndex: 'status',
            render: (status: number) => <div>{status === 0
                ? "INPROGESS" :
                status === 1
                    ? "SHIPPING"
                    : status === 2
                        ? "DONE"
                        : "CANCALED"}</div>
        }

    ];

    const updateOrderStatus = async (orderId: string, order: IOrderInfo) => {
        setOrderInfo(order)
        setUpdateStatus(true)
    }

    const updateStatusCallback = async (status: boolean) => {
        if(status){
            loadMoreOrders({ page: currentPage })
        }
    }

    return (
        <div>
            Order List
            {
                orders && orders.length > 0 &&
                <>

                    <Table
                        style={{ marginTop: 50 }}
                        columns={columns}
                        // rowKey={record => record.login.uuid}
                        dataSource={orders}
                        pagination={{ total: response.pageSize * 10 }}
                        // loading={loading}
                        onChange={handleTableChange}
                    />
                </>
            }
            <UpdateOrderStatusModal isModalVisible={updateStatus} orderInfo={orderInfo} setIsModalVisible={(status) => setUpdateStatus(status)} handleOkCallback={(status) => updateStatusCallback(status)} />
        </div>
    )
}

export default OrderList


interface IProps {
    isModalVisible: boolean
    setIsModalVisible: (isModalVisible: boolean) => void,
    orderInfo: IOrderInfo | null,
    handleOkCallback: (status: boolean) => void
}


const UpdateOrderStatusModal = (props: IProps) => {
    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                console.log("🚀 ~ file: OrderList.tsx ~ line 147 ~ .then ~ values", values)
                const result = await updateOrderStatus({
                    orderId: props.orderInfo?.orderId ?? "",
                    status: values.status
                })
                if (result === 200) {
                    message.success({ content: 'Create is successfully!', key: 'success', duration: 2 });
                    props.setIsModalVisible(false)
                    form.resetFields();
                    props.handleOkCallback(true)
                    return
                }
                message.error({ content: 'Create is failed!', key: 'error', duration: 2 });
                return;
            })
    }
    const handleCancel = () => {
        props.setIsModalVisible(false)
    }

    return (
        <Modal title="Confirm Modal" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel} width={700}>
            {
                props.orderInfo &&
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        status: props.orderInfo?.status
                    }}
                    autoComplete="off"
                    form={form}

                >
                    <Form.Item
                        label="Status"
                        name="status"
                        labelAlign='left'
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Radio.Group>
                            <Radio.Button value="0">PROCESSING</Radio.Button>
                            <Radio.Button value="1">SHIPPING</Radio.Button>
                            <Radio.Button value="2">DONE</Radio.Button>
                            <Radio.Button value="3">CANCLED</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            }
        </Modal>
    )
}