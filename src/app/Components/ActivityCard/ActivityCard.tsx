import './ActivityCard.css'
const ActivityCard = () => {
    return (
        <div className="ActivityCard">
            <div className="ActivityCard-header">
                <img src="/img/icons/Calendar.svg" alt="calendar" className="ActivityCard-header-calendar" />
                <div className="ActivityCard-header-title-box">
                    <div className="ActivityCard-header-next-activity">다음 활동</div>
                    <div className="ActivityCard-header-next-date">2025.02.05 (목) 19:00</div>
                    <div className="ActivityCard-header-next-content">정규 활동</div>
                </div>
            </div>
            <div className="ActivityCard-line"></div>
            <div className="ActivityCard-content">
                <div className="ActivityCard-content-title">최신 게시글</div>
                <div className="ActivityCard-content-box">
                    <div className="ActivityCard-content-post">
                        <div className="ActivityCard-content-post-title">제목1</div>
                        <div className="ActivityCard-content-post-date">2분 전</div>
                    </div>
                    <div className="ActivityCard-content-post">
                        <div className="ActivityCard-content-post-title">제목2</div>
                        <div className="ActivityCard-content-post-date">1시간 전</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard;