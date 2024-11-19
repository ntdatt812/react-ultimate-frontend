import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Register user success!"
            })
            navigate("/")
        } else {
            notification.error({
                message: "Register user",
                description: JSON.stringify(res.message)
            })
        }
    }


    return (
        <Form
            layout="vertical"
            name="basic"
            form={form}
            onFinish={onFinish}
            style={{ margin: "10px" }}
        // onFinishFailed={onFinishFailed}
        >
            <Row justify={"center"}>
                <Col md={6} xs={24}>
                    <h2>Đăng ký tài khoản</h2>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col md={6} xs={24}>
                    <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col md={6} xs={24} >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col md={6} xs={24}>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col md={6} xs={24}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col md={6} xs={24}>
                    <div>
                        <Button
                            htmlType="submit"
                            type="primary">Register</Button>
                    </div>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col md={6} xs={24}>
                    <Divider />
                    <div style={{ display: "flex", justifyContent: " center" }}>
                        <p>Bạn đã có tài khoản?<Link to={"/login"}> Đăng nhập ngay</Link></p>
                    </div>
                </Col>
            </Row>

        </Form>
    );
}

export default RegisterPage;