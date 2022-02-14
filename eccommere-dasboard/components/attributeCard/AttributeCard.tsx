import { Button, Card, Col, Form, Input, message, Modal, Row, Upload } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import Image from 'next/image'
import React, { useState } from 'react'
import { BASE_FILE_URL } from '../../common/appConfig'
import { IProductAttribute } from '../../interface/products'
import {
    DeleteOutlined,
    EditOutlined,
    UploadOutlined
} from '@ant-design/icons'
import { removeAttribueService, updateProductAttributeService } from '../../services/productService'
import { useRouter } from 'next/router'
interface IProps {
    attribute: IProductAttribute,
    productId: string
}

const AttributeCard = (props: IProps) => {
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    return (
        <div>
            <Card
            // hoverable
            // style={{ width: "100%" }}
            // cover={<img alt="example" src={`${BASE_FILE_URL}${props.attribute.imageUrl}`} />}
            >
                {/* <Meta title= description={props.attribute.description} /> */}
                <Row align='top'>
                    <Col span={3}>
                        <Avatar shape='square' size={150} src={`${BASE_FILE_URL}${props.attribute.imageUrl}`} />
                    </Col>
                    <Col span={20}>
                        <h4>{props.attribute.title}</h4>
                        <p>{props.attribute.description}</p>
                    </Col>
                    <Col>
                        <Row justify='center'>
                            <div onClick={() => setModalEdit(true)}><EditOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
                            <div onClick={() => setModalDelete(true)}><DeleteOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <ModalDelete isModalVisible={modalDelete} setIsModalVisible={(status) => setModalDelete(status)} productId={props.productId} attributeId={props.attribute._id} />
            <EditModal isModalVisible={modalEdit} setIsModalVisible={(status) => setModalEdit(status)} productId={props.productId} attribute={props.attribute} />
        </div>
    )
}


interface IMoalDeleteProps {
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void
    attributeId: string
    productId: string
}

const ModalDelete = (props: IMoalDeleteProps) => {
    const router = useRouter()
    const handleOk = async () => {
        const resutl = await removeAttribueService(props.productId, props.attributeId)
        if (resutl === 200) {
            message.success({ content: 'Delete is successfully!', key: 'success', duration: 2 });
            props.setIsModalVisible(false)
            router.reload()
            return;
        }
        message.error({ content: 'Delete is failed!', key: 'error', duration: 2 });
    };

    const handleCancel = () => {
        props.setIsModalVisible(false)
    };
    return (
        <Modal title="Confirm Delete Attributes" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure you want to delete this attribute?</p>
        </Modal>
    )
}


interface IEditModalProps {
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void
    attribute: IProductAttribute
    productId: string
}

const EditModal = (props: IEditModalProps) => {
    const attribute = props.attribute
    const [form] = Form.useForm();
    const router = useRouter()
    const [avatarFile, setAvatarFile] = useState<File | null>(null)

    const handleOk = async () => {
        form.validateFields()
            .then(async (values) => {
                const result = await updateProductAttributeService({
                    title: values.title,
                    description: values.description,
                    productId: props.productId,
                    image: avatarFile,
                    attributeId: attribute._id
                })
                if (result === 200) {
                    message.success({ content: 'Create is successfully!', key: 'success', duration: 2 });
                    props.setIsModalVisible(false)
                    router.reload()
                    form.resetFields();
                    return
                }
                message.error({ content: 'Create is failed!', key: 'error', duration: 2 });

                // Submit values
                // submitValues(values);
            })
            .catch((errorInfo) => { });
    };

    const handleCancel = () => {
        props.setIsModalVisible(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const uploadAvatar = (file: any) => {
        setAvatarFile(file)
        form.setFieldsValue({
            avatar: file.name
        })
    }


    return (
        <div>
            <Modal title="New Attribute" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                {
                    props.attribute &&
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 6 }}
                        // wrapperCol={{ span: 16 }}
                        initialValues={{
                            title: props.attribute.title,
                            description: props.attribute.description,
                        }}
                        // onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            labelAlign='left'
                            label="Avatar"
                            name="avatar"
                        >
                            <Upload beforeUpload={uploadAvatar}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                            <Input hidden />
                        </Form.Item>

                        <Form.Item
                            labelAlign='left'
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input  title!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelAlign='left'
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input description!' }]}>
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                }
            </Modal>
        </div>
    )

}

export default AttributeCard