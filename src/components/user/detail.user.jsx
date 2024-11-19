import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFileAPI, updateUserAvatarAPI } from "../../services/api.service";

const DetailUser = ({ isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

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

    const handleUpdateAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFileAPI(selectedFile, "avatar");
        if (resUpload.data) {
            //success
            //step 2: upload user
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.email);
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()
                notification.success({
                    message: "UPDATE AVATAR",
                    description: "Cập nhật avatar thành công!"
                })
            } else {
                notification.error({
                    message: "ERROR UPDATE AVATAR",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            //failed
            notification.error({
                message: "ERROR",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    return (
        <Drawer
            width={"40vw"}
            title="Chi tiết thông tin user"
            onClose={() => {
                setDataDetail(null)
                setIsDetailOpen(false)
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <div style={{}}>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar: </p>
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

                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>
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
                        >Upload avatar</label>
                        <input
                            type="file"
                            hidden id="btnUpload"
                            onChange={(event) => { handleOnChangeFile(event) }}
                        />
                    </div>
                    {preview &&
                        <>
                            <br />
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

                                    src={preview} />
                            </div>
                            <br />
                            <Button
                                type="primary"
                                onClick={handleUpdateAvatar}
                            >Save</Button>
                        </>}
                </div>
                :
                <>Không có dữ liệu</>
            }
        </Drawer>
    )
}
export default DetailUser;