import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import BookDetail from "./book.detail";
import BookUpdate from "./book.update";
import BookUpdateUnControl from "./book.update.uncontrol";
import { deleteBookAPI } from "../../services/api.service";


const BookTable = ({ dataBook, current, pageSize, total, setCurrent, setPageSize, loadTableBook }) => {

    const [dataBookDetail, setDataBookDetail] = useState();
    const [isOpenBookDetail, setIsOpenBookDetail] = useState(false);

    const [dataBookUpdate, setDataBookUpdate] = useState();
    const [isModalBookUpdate, setIsModalBookUpdate] = useState(false)



    const handleDeleteBook = async (record) => {
        const res = deleteBookAPI(record._id);
        if (res) {
            notification.success({
                message: "SUCCESS",
                description: (
                    <span>
                        Đã xoá <strong>{record.mainText}</strong> thành công!
                    </span>
                )
            })
            await loadTableBook();
        } else {
            notification.error({
                message: "ERROR",
                description: JSON.stringify(res.message)
            })
        }
    }

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

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (<>{index + 1 + (current - 1) * pageSize}</>)
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (
                <a href='#' onClick={() => {
                    setDataBookDetail(record);
                    setIsOpenBookDetail(true)
                }
                }> {record._id}</a>
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text) { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text) }
            }

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',

        },
        {
            title: 'Tác giả',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataBookUpdate(record)
                            setIsModalBookUpdate(true);
                        }}
                        style={{
                            cursor: "pointer",
                            color: "orange"
                        }} />
                    <Popconfirm
                        title="DELETE BOOK"
                        placement="left"
                        description={(
                            <span>
                                Bạn có chắc chắn muốn xoá <strong>{record.mainText}</strong> không?
                            </span>
                        )}
                        onConfirm={() => {
                            handleDeleteBook(record)
                        }}
                        okText="Có"
                        cancelText="Huỷ"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <>
            <Table
                dataSource={dataBook}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />
            <BookDetail
                dataBookDetail={dataBookDetail}
                isOpenBookDetail={isOpenBookDetail}
                setIsOpenBookDetail={setIsOpenBookDetail}
            />
            {/* <BookUpdate
                dataBookUpdate={dataBookUpdate}
                isModalBookUpdate={isModalBookUpdate}
                setIsModalBookUpdate={setIsModalBookUpdate}
                loadTableBook={loadTableBook}
            /> */}
            <BookUpdateUnControl
                dataBookUpdate={dataBookUpdate}
                isModalBookUpdate={isModalBookUpdate}
                setIsModalBookUpdate={setIsModalBookUpdate}
                loadTableBook={loadTableBook}
            />
        </>
    )
}

export default BookTable;