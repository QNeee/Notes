import { Context } from 'components/context';
import { useContext } from 'react';
import { Modal } from 'antd';
export const DeleteModal = () => {
    const { handleOk, handleCancel, isModalOpen } = useContext(Context);
    return <Modal title="Do u rly want to delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    </Modal>
}