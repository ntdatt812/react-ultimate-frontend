import { AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';
//import './header.css'

const Header = () => {
    const [current, setCurrent] = useState('');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
            if (currentRoute) {
                setCurrent(currentRoute);
            }
        } else {
            setCurrent("home")
        }
    }, [location])

    const handleLogout = async () => {
        const res = await logoutAPI();
        console.log(">check res: ", res)
        if (res.data) {
            //xoá token của người dùng
            localStorage.removeItem("access_token");
            //reset thông tin của người dùng
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Đăng xuất thành công!")

            //redirrect to home
            navigate("/");
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>User</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={"/books"}>Book</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },

        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => {
                        handleLogout()
                    }}>Đăng xuất</span>,
                    key: 'logout',
                    icon: <LogoutOutlined />,
                }
            ]
        }])

    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    );
}
export default Header;