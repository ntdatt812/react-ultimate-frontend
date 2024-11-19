import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFileAPI, updateBookAPI } from "../../services/api.service";


const BookUpdateUnControl = ({ dataBookUpdate, isModalBookUpdate, setIsModalBookUpdate, loadTableBook }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            form.setFieldsValue({
                id: dataBookUpdate._id,
                mainText: dataBookUpdate.mainText,
                author: dataBookUpdate.author,
                price: dataBookUpdate.price,
                quantity: dataBookUpdate.quantity,
                category: dataBookUpdate.category,

            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`)
        }
    }, [dataBookUpdate])

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }
    const onFinish = async (value) => {
        let anhThumbnail = "";
        if (!preview && !selectedFile) {
            notification.error({
                message: "Ảnh thumbnail",
                description: "Bạn cần chọn ảnh thubnail"
            })
            return
        }
        if (preview && !selectedFile) {
            anhThumbnail = dataBookUpdate.thumbnail;
        }
        if (preview && selectedFile) {
            const resUpload = await handleUploadFileAPI(selectedFile, "book");
            if (resUpload.data) {
                anhThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "ERROR",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }
        await updateBook(value, anhThumbnail);

    }

    const updateBook = async (value, anhThumbnail) => {
        const res = await updateBookAPI(value.id, anhThumbnail, value.mainText, value.author, value.price, value.quantity, value.category);
        if (res.data) {
            notification.success({
                message: "UPDATE BOOK",
                description: "Cập nhật book thành công!"
            })
            setIsModalBookUpdate(false)
            setSelectedFile(null)
            setPreview(null)
            await loadTableBook()
        } else {
            notification.error({
                message: "UPDATE BOOK",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <Modal
            title="Create a book"
            open={isModalBookUpdate}
            onCancel={() => setIsModalBookUpdate(false)}
            onOk={form.submit}
        >
            <Form
                form={form}
                layout="vertical"
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Id"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Tiêu đề"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn không được để trống tiêu đề!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn không được để trống tác giả!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn không được để trống giá tiền!',
                        },
                    ]}
                >
                    <InputNumber addonAfter="₫" />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn không được để trống số lượng!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Thể loại"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn không được để trống thể loại!',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn thể loại"
                        optionFilterProp="label"
                        name="category"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },

                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },

                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },

                        ]} />
                </Form.Item>
                <Form.Item
                    label="Ảnh thumbnail"
                >

                    <div  >
                        <label
                            htmlFor="btnUpload"
                            style={{
                                borderRadius: "5px",
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                cursor: "pointer"
                            }}
                        >Upload</label>
                        <input
                            type="file"
                            hidden id="btnUpload"
                            onChange={(event) => { handleOnChangeFile(event) }}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            style={{ display: "none" }}
                        />
                    </div>
                    {preview ?
                        <div style={{
                            marginTop: "10px",
                            height: "150px",
                            width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain"
                                }}
                                src={preview}
                            />
                        </div>
                        : <></>
                    }
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default BookUpdateUnControl;