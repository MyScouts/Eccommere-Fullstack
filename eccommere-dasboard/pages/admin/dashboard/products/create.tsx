import { Button, Col, Form, Input, InputNumber, message, Row, Upload } from 'antd'
import React, { useState } from 'react'
import DefaultLayout from '../../../../layouts/default/DefaultLayout'
import { UploadOutlined } from '@ant-design/icons';
import { createProductService } from '../../../../services/productService';
import { useRouter } from 'next/router';
const CreateProduct = () => {
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [bacgroundFile, setBacgroundFile] = useState<File | null>(null)
    const router = useRouter()
    const onFinish = async (values: any) => {
        console.log("🚀 ~ file: create.tsx ~ line 8 ~ onFinish ~ values", values)
        console.log('Success:', values);
        message.loading({ content: 'Loading...', key: 'loading', });

        const result = await createProductService({
            avatar: avatarFile,
            background: bacgroundFile,
            ...values
        })

        message.destroy()
        if (result.status === 200) {
            message.success({ content: 'Create is successfully!', key: 'success', duration: 2 });
            router.push({
                pathname: "/admin/dashboard/products/[id]",
                query: { id: result.data.productId }
            })
            return;
        }
        message.error({ content: 'Create is failed!', key: 'error', duration: 2 });


    };

    const onFinishFailed = (errorInfo: any) => message.error({ content: "Please check your input!", key: "error", duration: 2 })
    const uploadAvatar = (file: any) => setAvatarFile(file)
    const uploadBacground = (file: any) => setBacgroundFile(file)

    return (
        <div>
            <Col>
                <h1>Create new product!</h1>
                <Form
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 8 }}
                    style={{ marginTop: 50 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        labelAlign='left'
                        label="Product Avatar"
                    >
                        <Upload beforeUpload={uploadAvatar}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        label="Product Background"
                    >
                        <Upload beforeUpload={uploadBacground}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        label="Product Name"
                        name="productName"
                        rules={[{ required: true, message: 'Please input product name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        name="description"
                        label="Introduction"
                        rules={[{ required: true, message: 'Please input product description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input product price!' }, { type: "number", message: 'Please input a valid price!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        labelAlign='left'
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please input product quantity!' }, { type: 'number', message: 'Please input a valid quantity!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 7, span: 4 }}>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Col>
        </div>
    )
}

CreateProduct.layout = DefaultLayout
export default CreateProduct
