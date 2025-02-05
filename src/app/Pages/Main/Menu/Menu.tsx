import './Menu.css'
import MenuContent from '../../../Components/MenuContent/MenuContent'
const Menu = () => {
    return (
        <div className="Menu">
            <div className="Menu-header">
                <h1 className="Menu-title">바로가기</h1>
            </div>
            <div className="Menu-Contents">
                <MenuContent title="사물함" imgSrc="/img/icons/Cabinet.svg"  />
                <MenuContent title="게임존" imgSrc="/img/icons/Game.svg" />
                <MenuContent title="커뮤니티" imgSrc="/img/icons/Community.svg" />
            </div>
        </div>
    )
}

export default Menu