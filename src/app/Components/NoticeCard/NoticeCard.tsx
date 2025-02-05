import './NoticeCard.css'

const NoticeCard = () => {
    return (
        <div className="NoticeCard">
            <div className="NoticeCard-header">
                <h1 className="NoticeCard-title">제목</h1>
                <p className="NoticeCard-date">2025.02.05</p>
            </div>
            <div className="NoticeCard-content-box">
                <p className="NoticeCard-content">내용</p>
            </div>
        </div>
    )
}

export default NoticeCard;