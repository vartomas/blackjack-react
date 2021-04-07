import './BetBtn.scss'

const BetBtn = ({ value, makeBet, border, placed }) => {
    return (
        <div className='bet-btn' onClick={() => !placed && makeBet(value)} style={border}>
            {value}
        </div>
    )
}

export default BetBtn