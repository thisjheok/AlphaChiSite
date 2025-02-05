import './MenuContent.css'

interface MenuContentProps {
    title: string;
    imgSrc: string;
  }

const MenuContent = ({ title, imgSrc }: MenuContentProps) => {
    return (
        <div className="MenuContent">
            <img className="MenuContent-img" src={imgSrc}></img>
            <p className="MenuContent-title">{title}</p>
        </div>
    )
}   

export default MenuContent;