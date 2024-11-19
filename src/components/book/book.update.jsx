import { Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFileAPI, updateBookAPI } from "../../services/api.service"


const BookUpdate = ({ dataBookUpdate, isModalBookUpdate, setIsModalBookUpdate, loadTableBook, }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const [idUpdate, setIdUpdate] = useState("")
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            setIdUpdate(dataBookUpdate._id)
            setMainText(dataBookUpdate.mainText);
            setAuthor(dataBookUpdate.author);
            setPrice(dataBookUpdate.price);
            setQuantity(dataBookUpdate.quantity);
            setCategory(dataBookUpdate.category);
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

    const handleOk = async () => {
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
        await updateBook(anhThumbnail);

    }

    const updateBook = async (anhThumbnail) => {
        const res = await updateBookAPI(idUpdate, anhThumbnail, mainText, author, price, quantity, category);
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
        <div style={{ margin: "20px 0" }}>
            <Modal
                title="Create a book"
                open={isModalBookUpdate}
                onOk={handleOk}
                onCancel={() => setIsModalBookUpdate(false)}
            >
                <div style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column"
                }}>
                    <div >
                        <span>Id:</span>
                        <Input
                            disabled
                            value={idUpdate}
                            onChange={(event) => setMainText(event.target.value)}
                        />
                    </div>
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

export default BookUpdate;