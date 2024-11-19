import { Result } from "antd";
import { Button } from "antd/es/radio";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <Result
            status="404"
            title="Oops!"
            subTitle={error.statusText || error.message}
            extra={<Button type="primary"><Link to={"/"}>Back Home</Link></Button>}
        />
    );
}

export default ErrorPage;
