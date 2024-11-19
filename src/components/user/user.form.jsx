import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = ({ loadUser }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModelOpen] = useState(false);


    const handleClick = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        if (res.data) {
            notification.success({
                message: "CREATE USER",
                description: "Thêm mới user thành công!"
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
        setFullName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setIsModelOpen(false)
    }

    return (
        <div style={{ margin: "20px 0" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table users</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModelOpen(true)}
                >Create user</Button>

            </div>
            <Modal
                title="Create user"
                open={isModalOpen}
                onOk={() => handleClick()}
                onCancel={() => setIsModelOpen(false)}
                okText={"Create"}
                maskClosable={false}
            >
                <div style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column"
                }}>
                    <div >
                        <span>Full name</span>
                        <Input
                            placeholder="full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)} />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            placeholder="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            placeholder="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
            </Modal>
        </div>
    )
}

export default UserForm;