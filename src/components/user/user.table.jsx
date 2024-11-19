
import React, { useState } from 'react';
import { message, notification, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import DetailUser from './detail.user';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = ({ dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize }) => {
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res?.data) {
            message.success("Xoá user thành công!")
            await loadUser()
        } else {
            notification.error({
                message: "ERROR",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (<>{index + 1 + (current - 1) * pageSize}</>)
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (
                <a href='#' onClick={() => {
                    setDataDetail(record);
                    setIsDetailOpen(true);
                }
                }> {record._id}</a>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdate(true);
                        }}
                        style={{
                            cursor: "pointer",
                            color: "orange"
                        }} />
                    <Popconfirm
                        title="DELETE USER"
                        placement="left"
                        description={`Bạn có chắc chắn muốn xoá ${record.fullName} không?`}
                        onConfirm={() => {
                            handleDeleteUser(record._id)
                        }}
                        okText="Có"
                        cancelText="Huỷ"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        //meu thay doi trang
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    return (
        <>
            <Table
                dataSource={dataUsers}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdate={isModalUpdate}
                setIsModalUpdate={setIsModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <DetailUser
                isDetailOpen={isDetailOpen}
                dataDetail={dataDetail}
                setIsDetailOpen={setIsDetailOpen}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
        </>

    )

}

export default UserTable;