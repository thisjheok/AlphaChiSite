'use client'
import './Menu.css'
import MenuContent from '../../Components/MenuContent/MenuContent'
import { useRouter } from 'next/navigation'

const Menu = () => {
    const router = useRouter();
    return (
        <div className="Menu">
            <div className="Menu-header">
                <h1 className="Menu-title">바로가기</h1>
            </div>
            <div className="Menu-Contents">
                <MenuContent title="사물함" imgSrc="/img/icons/Cabinet.svg" onClick={() => router.push('/BookCabinet')} />
                <MenuContent title="게임존" imgSrc="/img/icons/Game.svg" onClick={() => router.push('/GameZone')} />
                <MenuContent title="커뮤니티" imgSrc="/img/icons/Community.svg" onClick={() => router.push('/Community')} />
            </div>
        </div>
    )
}

export default Menu