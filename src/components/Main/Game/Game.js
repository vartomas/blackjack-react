import { useState, useEffect, useContext } from 'react'
import Cards from '../../cards'
import './Game.scss'
import BetBtn from './BetBtn/BetBtn'
import Card from './Card/Card'
import u from '../../../utilities/u'
import { userContext } from '../../../App'

const Game = () => {
    const {user, setUser} = useContext(userContext)

    const [cards, setCards] = useState(Cards)
    const [playerCards, setPlayerCards] = useState([])
    const [playerValue, setPlayerValue] = useState(0)
    const [dealerCards, setDealerCards] = useState([])
    const [dealerValue, setDealerValue] = useState(0)
    const [bet, setBet] = useState(null)
    const [allowBtns, setAllowBtns] = useState(false)
    const [standState, setStandState] = useState(false)
    const [endMessage, setEndMessage] = useState(null)

    const shuffleCards = () => {
        let shuffled = cards
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        setCards(shuffled)
    }

    useEffect(() => shuffleCards(), [])

    const drawCard = target => {
        const cardArr = cards
        const card = cardArr.shift()
        target === 'dealer' ? setDealerCards(prev => [...prev, card]) : setPlayerCards(prev => [...prev, card])
        setCards(cardArr)
    }

    const makeBet = async value => {
        if (value > user.credits) return
        const response = await u.updateCredits(user.credits - value)
        setUser({
            ...user,
            credits: response
        })
        setDealerCards([])
        setPlayerCards([])
        setEndMessage(null)
        setBet(value)
        setTimeout(() => {
            drawCard('dealer')
        }, 500)
        setTimeout(() => {
            drawCard('player')
        }, 1000)
        setTimeout(() => {
            drawCard('player')
        }, 1500)
        setTimeout(() => {
            setAllowBtns(true)
        }, 1800)
    }

    useEffect(() => {
        setDealerValue(calculateValue(dealerCards))
        setPlayerValue(calculateValue(playerCards))
    }, [playerCards, dealerCards])

    const hit = () => {
        if (!allowBtns) return
        drawCard('player')
    }

    const stand = () => {
        if (!allowBtns) return
        setStandState(true)
        setAllowBtns(false)
    }

    useEffect(() => {
        if (dealerValue > 21) return gameEnd(false, true)
        if (standState) {
            setTimeout(() => {
                if (dealerValue < 18) {drawCard('dealer')} else gameEnd()
            }, 500)}
    }, [standState, dealerValue])

    useEffect(() => {
        if (playerValue > 21) gameEnd(true, false)
    }, [playerValue])

    const gameEnd = (playerOver, dealerOver) => {
        setStandState(false)
        setCards(Cards)
        shuffleCards()
        
        if (dealerOver) return win()
        if (playerOver) return lose()
        if (playerValue > dealerValue) return win()
        if (playerValue < dealerValue) return lose()
        if (playerValue === dealerValue) return draw()
    }

    const win = async () => {
        setEndMessage('YOU WIN')
        const response = await u.updateCredits(user.credits + bet * 2)
        setUser({
            ...user,
            credits: response
        })
        setBet(null)
        setAllowBtns(false)
    }

    const lose = async () => {
        setEndMessage('YOU LOST')
        const response = await u.updateCredits(user.credits)
        setUser({
            ...user,
            credits: response
        })
        setBet(null)
        setAllowBtns(false)
    }

    const draw = () => {
        setEndMessage('DRAW')
        setUser({
            ...user,
            credits: user.credits + bet
        })
        setBet(null)
        setAllowBtns(false)
    }

    const calculateValue = hand => {
            let aces = 0
            hand.forEach(e => e.value === 11 && aces++)
            let value = hand.reduce((a, c) => a += (c.value !== 11 && c.value), 0)
            switch (aces) {
                case 1: return value + 11 > 21 ? value + 1 : value + 11
                case 2: return value + 12 > 21 ? value + 2 : value + 12
                case 3: return value + 13 > 21 ? value + 3 : value + 13
                case 4: return value + 14 > 21 ? value + 4 : value + 14
                default: return value
            }
    }

    return (
        <div className='game-board'>
            {endMessage && <div className='end-message'><span>{endMessage}</span></div>}
            {!bet && <div className='palce-bet'><span>Please place your bet to start the game</span></div>}
            <div className='dealer-area'>
                {dealerCards.map(e => <Card key={e.url} card={e} target={'dealer'}/>)}
                <div className='dealer-points'><span className='points'>{dealerValue}</span></div>
            </div>
            <div className='player-area'>
                {playerCards.map(e => <Card key={e.url} card={e} target={'dealer'}/>)}
                <div className='player-bets-area'>
                    {bet ? 
                        <BetBtn value={bet} makeBet={makeBet} 
                        border={{border: `2px solid ${bet === 200 ? 'red' : bet === 100 ? 'orange' : 'yellow'}`}} placed={true} /> 
                        : 
                        <>
                            <BetBtn value={200} makeBet={makeBet} border={{border: '2px solid red'}} placed={false} />
                            <BetBtn value={100} makeBet={makeBet} border={{border: '2px solid orange'}} placed={false} />
                            <BetBtn value={50} makeBet={makeBet} border={{border: '2px solid yellow'}} placed={false} />
                        </>
                    }
                </div>
                {bet && <div className='player-btns'>
                    <button onClick={stand}>STAND</button>
                    <button onClick={hit}>HIT</button>
                </div>}
                <div className='player-points'><span className='points'>{playerValue}</span></div>
            </div>
        </div>
    )
}

export default Game