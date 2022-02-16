import { message, Table } from 'antd'
import React, { useEffect } from 'react'
import { IOrderInfo } from '../../../interface/user'
import { getOrdersService } from '../../../services/userService'


const columns = [
    {
        title: 'Order ID',
        dataIndex: 'orderId',
    }, {
        title: 'Order At',
        dataIndex: 'createdAt',
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


const OrderList = () => {
    const [orders, setOrders] = React.useState<IOrderInfo[] | null>(null)

    const getOrder = async () => {
        const reslt = await getOrdersService()

        if (reslt) {
            setOrders(reslt)
            return
        }
        message.error({ content: 'Get Orders Failed', key: 'error', duration: 2 })
        return
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div>
            <h1>Order List</h1>

            <div style={{ marginTop: 50 }}>
                {
                    orders && orders.length > 0 ?
                        <Table
                            columns={columns}
                            // rowKey={record => record.login.uuid}
                            dataSource={orders}
                        // pagination={{ total: response.pageSize * 10 }}
                        // loading={loading}
                        // onChange={handleTableChange}
                        />
                        :
                        <div>No Orders</div>
                }
            </div>
        </div>
    )
}

export default OrderList
