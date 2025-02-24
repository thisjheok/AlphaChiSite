import './MenuContent.css'

interface MenuContentProps {
    title: string;
    imgSrc: string;
    onClick: () => void;
  }

const MenuContent = ({ title, imgSrc, onClick }: MenuContentProps) => {
    return (
        <div className="MenuContent" onClick={onClick}>
            <img className="MenuContent-img" src={imgSrc}></img>
            <p className="MenuContent-title">{title}</p>
        </div>
    )
}   

export default MenuContent;