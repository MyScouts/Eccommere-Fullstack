import React from 'react'
import OrderList from '../../../../components/admin/order_list/OrderList'
import DefaultLayout from '../../../../layouts/default/DefaultLayout'

const OrdersIndex = () => {
  return (
    <div>
      <OrderList/>
    </div>
  )
}

OrdersIndex.layout = DefaultLayout
export default OrdersIndex