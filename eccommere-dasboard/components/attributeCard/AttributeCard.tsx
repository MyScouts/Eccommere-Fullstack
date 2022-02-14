import { Card, Col, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import Image from 'next/image'
import React from 'react'
import { BASE_FILE_URL } from '../../common/appConfig'
import { IProductAttribute } from '../../interface/products'
import {
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons'
interface IProps {
    attribute: IProductAttribute
}

const AttributeCard = (props: IProps) => {
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
                            <div onClick={() => { }}><EditOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
                            <div onClick={() => { }}><DeleteOutlined style={{ fontSize: 20, marginBottom: 5 }} className="button-action" /></div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default AttributeCard