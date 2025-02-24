import './main.css'
import Header from './Header/Header'
import Hello from '../Components/Hello/Hello'
import Notice from './Notice/Notice'
import Menu from './Menu/Menu'
import Activity from './Activity/Activity'
const Main = () => {
    return (
        <>
            <Header />
            <div className="MainContainer">
                <Hello />
                <Notice />
                <Menu />
                <Activity />
            </div>
        </>
    )
}

export default Main;