import './NoticeCard.css'

interface NoticeCardProps {
    title: string;
    date: string;
    content: string;
    id: number;
    writer_id: number;
    onClick?: () => void;
}

const NoticeCard = ({ title, date, content, id, writer_id, onClick }: NoticeCardProps) => {
    return (
        <div className="NoticeCard" onClick={onClick}>
            <div className="NoticeCard-header">
                <h1 className="NoticeCard-title">{title}</h1>
                <p className="NoticeCard-date">{date}</p>
            </div>
            <div className="NoticeCard-content-box">
                <p className="NoticeCard-content">{content}</p>
            </div>
        </div>
    )
}

export default NoticeCard;