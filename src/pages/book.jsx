import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchALLBookAPI } from "../services/api.service";
import BookForm from "../components/book/book.form";
import BookCreateUnControl from "../components/book/book.form.uncontrol";
import { Spin } from "antd";

const BookPage = () => {
    const [dataBook, setDataBook] = useState();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [loadingTable, setLoadingTable] = useState(false)

    const [isModalCreateBook, setIsModalCreateBook] = useState(false)

    useEffect(() => {
        loadTableBook()
    }, [current, pageSize])

    const loadTableBook = async () => {
        setLoadingTable(true);
        const res = await fetchALLBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result)
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false)
    }


    return (
        <div style={{ padding: "20px" }}>
            {/* <BookForm
                setIsModalCreateBook={setIsModalCreateBook}
                isModalCreateBook={isModalCreateBook}
                loadTableBook={loadTableBook}
            /> */}
            {loadingTable === true ?
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Spin size="large" />
                </div>
                :
                <>
                    <BookCreateUnControl
                        setIsModalCreateBook={setIsModalCreateBook}
                        isModalCreateBook={isModalCreateBook}
                        loadTableBook={loadTableBook}
                    />
                    <BookTable
                        dataBook={dataBook}
                        current={current}
                        pageSize={pageSize}
                        total={total}
                        setCurrent={setCurrent}
                        setPageSize={setPageSize}
                        loadTableBook={loadTableBook}
                        loadingTable={loadingTable}
                    />
                </>

            }

        </div>
    );
}

export default BookPage;