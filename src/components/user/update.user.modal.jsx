import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";


const UpdateUserModal = ({ isModalUpdate, setIsModalUpdate, dataUpdate, setDataUpdate, loadUser }) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");


    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }
    }, [dataUpdate])


    const handleClick = async () => {
        const res = await updateUserAPI(id, fullName, phone)
        if (res.data) {
            notification.success({
                message: "UPDATE USER",
                description: "Cập nhật user thành công!"
            })
            await loadUser();
            resetDataModal();

        } else {
            notification.error({
                message: "ERROR",
                description: JSON.stringify(res.message)
            })
        }

    }

    const resetDataModal = () => {
        setId("")
        setFullName("")
        setPhone("")
        setDataUpdate(null)
        setIsModalUpdate(false)
    }

    return (
        <Modal
            title="Update user"
            open={isModalUpdate}
            onOk={() => handleClick()}
            onCancel={() => setIsModalUpdate(false)}
            okText={"Save"}
            maskClosable={false}
        >
            <div style={{
                display: "flex",
                gap: "15px",
                flexDirection: "column"
            }}>
                <div >
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled />
                </div>
                <div>
                    <span>Full name</span>
                    <Input
                        placeholder="full name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>

                <div>
                    <span>Phone</span>
                    <Input
                        placeholder=" number phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleClick()
                            }
                        }}
                    />
                </div>
            </div>
        </Modal >
    )
}

export default UpdateUserModal;