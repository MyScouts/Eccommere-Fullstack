import { Modal } from 'antd'
import React from 'react'

interface IProps {
    isModalVisible: boolean
    handleOkCallback: () => void,
    setIsModalVisible: (isModalVisible: boolean) => void
}

const ModalConfirm = (props: IProps) => {
    const handleOk = () => {
        props.handleOkCallback()
        props.setIsModalVisible(false)
    };

    const handleCancel = () => {
        props.setIsModalVisible(false)
    }

    return (
        <Modal title="Confirm Modal" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
        </Modal>
    )
}

export default ModalConfirm
