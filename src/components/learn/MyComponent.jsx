import './style.css';

const MyComponent = () => {
    // const ntdat = 'thanh dat ' //string
    // const ntdat = 21 //number
    // const ntdat = true //boolean
    // const ntdat = null 
    // const ntdat = undefined
    // const ntdat = [1, 2, 3]
    const ntdat = {
        name: 'ntdat',
        age: 21

    }

    return (
        <>
            <div style={{ borderRadius: "10px" }}>Đây là component đầu tiên! By Nguyễn Thành Đạt</div>
            <div className="child"> {JSON.stringify(ntdat)}child</div>
        </>
    );
}

export default MyComponent;