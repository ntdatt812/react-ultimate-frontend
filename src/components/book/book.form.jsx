import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createBookAPI, handleUploadFileAPI } from "../../services/api.service"

const BookForm = ({ isModalCreateBook, setIsModalCreateBook, loadTableBook }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

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

    const handleOk = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFileAPI(selectedFile, "book");
        if (resUpload.data) {
            //success
            //step 2: upload user
            const thumbnail = resUpload.data.fileUploaded;
            const res = await createBookAPI(thumbnail, mainText, author, price, quantity, category);
            if (res.data) {
                resetModal()
                await loadTableBook()
                notification.success({
                    message: "CREATE BOOK",
                    description: "Thêm sách mới thành công!"
                })
            } else {
                notification.error({
                    message: "Ảnh thumbnail không hợp lệ!",
                    description: JSON.stringify(res.message)
                })
            }
        } else {
            //failed
            notification.error({
                message: "Ảnh thumbnail",
                description: "Bạn cần upload ảnh thumbnail!"
            })
        }
    }

    const resetModal = () => {
        setQuantity(null)
        setCategory(null)
        setPrice(null)
        setAuthor("")
        setMainText("")
        setIsModalCreateBook(false)
        setSelectedFile(null)
        setPreview(null)
    }

    return (
        <div style={{ margin: "20px 0" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table books</h3>
                <Button
                    type="primary"
                    onClick={() => {
                        setIsModalCreateBook(true)
                    }}
                >Create book</Button>
            </div>
            <Modal
                title="Create a book"
                open={isModalCreateBook}
                onOk={handleOk}
                onCancel={() => setIsModalCreateBook(false)}
            >
                <div style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column"
                }}>
                    <div >
                        <span>Tiêu đề</span>
                        <Input
                            placeholder="Tên sách"
                            value={mainText}
                            onChange={(event) => setMainText(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            placeholder="Tác giả"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <span>Giá tiền</span>
                        <InputNumber
                            value={price}
                            addonAfter="₫"
                            onChange={(event) => setPrice(event)}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>Số lượng</span>
                        <InputNumber
                            value={quantity}
                            onChange={(event) => setQuantity(event)}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>Thể loại</span>
                        <Select
                            showSearch
                            placeholder="Chọn thể loại"
                            optionFilterProp="label"
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

                            ]}
                            value={category}
                            onChange={(event) => { setCategory(event) }}
                        />
                    </div>
                    <div>
                        <span>Ảnh thumbnail</span>
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
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BookForm