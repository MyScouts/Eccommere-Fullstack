import { Button, Checkbox, Col, Form, Input, message, Radio, Row } from 'antd'
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { CartContext } from '../../common/CartContext';
import UserLayout from '../../layouts/user/UserLayout'
import { checkoutService } from '../../services/userService';

const CheckOutIndex = () => {
  const { cart, total, addToCart, removeFromCart, clearCart } = useContext(CartContext)
  const router = useRouter()
  const onFinish = async (values: any) => {
    const items = cart.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity
    }))
    console.log('Success:', values);

    if (items.length > 0) {
      const resutl = await checkoutService({
        ...values,
        items
      })

      if (resutl === 200) {
        message.success({ content: 'Order Success', key: 'success', duration: 2 })
        router.push('/profile/orders')
        clearCart()
        return;
      }
    }

    message.error({ content: 'Order Failed', key: 'error', duration: 2 })
    return
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>

      <h1 style={{ textAlign: "center", fontSize: 25, fontWeight: "bolder" }}>Check Out</h1>
      <Row justify='center' style={{ marginTop: 50 }}>
        <Col span={10}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              labelAlign='left'
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your Address!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              labelAlign='left'
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }, {
                  pattern: /^[0-9]{10}$/,
                  message: 'Please input a valid phone number!'
                }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Method"
              name="method"
              labelAlign='left'
              rules={[{ required: true, message: 'Please input your Address!' }]}
            >
              <Radio.Group>
                <Radio.Button value="0">Offline</Radio.Button>
                <Radio.Button value="1">Payment</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

CheckOutIndex.layout = UserLayout
export default CheckOutIndex