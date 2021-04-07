import './MenuBtn.scss'

const MenuBtn = ({ text, action }) => {
    return (
        <button className='menu-btn' onClick={action}>
            {text}
        </button>
    )
}

export default MenuBtn