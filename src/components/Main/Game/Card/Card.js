import React, { useEffect, useRef } from 'react'
import './Card.scss'

// importing card iamges
function importCards(r) {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
   }
const images = importCards(require.context('../../../../assets/cards', false, /\.(png|jpe?g|svg)$/));

const Card = ({ card }) => {

    const cardDiv = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            cardDiv.current.style.transform = 'rotateY(0deg)'
        }, 10)
    }, [])

    const imgUrl = images[card.url].default
    return (
        <div ref={cardDiv} className='card'>
            <img src={imgUrl} alt={card.name}/>
        </div>
    )
}

export default Card