import { Button, Form, Input, message, Modal, Row, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { IProductAttribute } from '../../interface/products'
import { getProductAttributeService, newProductAttribute } from '../../services/productService'
import {
    PlusCircleOutlined,
    UploadOutlined
} from '@ant-design/icons'
import AttributeCard from '../attributeCard/AttributeCard'
import { useRouter } from 'next/router'
import ModalCreate from './ModalCreate'
interface IProps {
    productId: string
}

const ProductAttribute = (props: IProps) => {
    const router = useRouter()
    const [attributes, setAttributes] = useState<IProductAttribute[] | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const getAttributes = async () => {
        setAttributes(await getProductAttributeService(props.productId))
    }

    // const setIsModalDeleteVisible = () => setModalDelete(true)

    const showModal = () => {
        setIsModalVisible(true);
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
                ? attributes.map((attribute, index) => <AttributeCard attribute={attribute} key={index} productId={props.productId} />)
                : <h1>No attributes</h1>
            }
            <ModalCreate isModalVisible={isModalVisible} setIsModalVisible={(status) => setIsModalVisible(status)} productId={props.productId} />
        </div>
    )
}


export default ProductAttribute
