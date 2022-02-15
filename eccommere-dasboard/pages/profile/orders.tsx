import React from 'react'
import OrderList from '../../components/user/orders/order_list'
import UserLayout from '../../layouts/user/UserLayout'

const OrdersIndex = () => {
  return (
    <div>
        <OrderList/>
    </div>
  )
}
OrdersIndex.layout = UserLayout
export default OrdersIndex