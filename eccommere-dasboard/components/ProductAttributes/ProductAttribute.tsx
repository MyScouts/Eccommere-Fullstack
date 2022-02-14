import { Form, Input, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { IProductAttribute } from '../../interface/products'
import { getProductAttributeService } from '../../services/productService'
import {
    PlusCircleOutlined
} from '@ant-design/icons'
import AttributeCard from '../attributeCard/AttributeCard'
interface IProps {
    productId: string
}

const ProductAttribute = (props: IProps) => {
    const [attributes, setAttributes] = useState<IProductAttribute[] | null>(null)
    const [form] = Form.useForm();
    const getAttributes = async () => {
        setAttributes(await getProductAttributeService(props.productId))
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // setIsModalVisible(false);
        form.validateFields()
            .then((values) => {
                // Submit values
                // submitValues(values);
            })
            .catch((errorInfo) => { });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values: any) => {


    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        getAttributes()
    }, [])

    return (
        <div style={{ marginTop: 50 }}>
            <Row align='middle' justify='space-between'>
                <h1>Product Attributes</h1>
                <div onClick={showModal}><PlusCircleOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
            </Row>

            {attributes && attributes.length > 0
                ? attributes.map((attribute, index) => <AttributeCard attribute={attribute} key={index} />)
                : <h1>No attributes</h1>
            }


            <Modal title="New Attribute" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        labelAlign='left'
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            },
                            {
                                type: 'email',
                                message: 'Please input a valid email address!'
                            }
                        ]}>
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


                </Form>
            </Modal>

        </div>
    )
}

export default ProductAttribute
