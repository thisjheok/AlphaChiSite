import NoticeCard from "../../Components/NoticeCard/NoticeCard";
import './Notice.css'
const Notice = () => {
    return (
        <div className="Notice">
            <h1 className="Notice-title">공지사항</h1>
            <div className="Notice-preview">
                <NoticeCard />
                <NoticeCard />
            </div>
        </div>
    )
}

export default Notice;