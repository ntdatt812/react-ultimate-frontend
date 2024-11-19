import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setIsLoading(true)
        const res = await loginAPI(values.username, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công!");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/")
        } else {
            notification.error({
                message: "ERROR",
                description: JSON.stringify(res.message)
            })
        }
        setIsLoading(false)
    };

    return (
        <Row justify={"center"} >
            <Col xs={24} md={16} lg={8}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",

                }}>
                    <Card
                        title="Đăng nhập tài khoản"
                        bordered={true}
                        style={{ width: 400, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                    >
                        <Form
                            name="login"
                            initialValues={{
                                remember: true,
                            }}
                            style={{
                                maxWidth: 360,
                            }}
                            onFinish={onFinish}
                        >

                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={isLoading}
                                    >
                                        Log in
                                    </Button>
                                    <Link to={"/"}>Go to home page</Link>
                                </div>
                            </Form.Item>
                            <Divider />
                            <div style={{ display: "flex", justifyContent: " center" }}>
                                <p>Bạn chưa có tài khoản?<Link to={"/register"}> Đăng ký ngay</Link></p>
                            </div>
                        </Form >
                    </Card>
                </div >
            </Col>
        </Row>
    );
}

export default LoginPage;