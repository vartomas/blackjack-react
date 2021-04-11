import { useEffect, useState } from 'react'
import u from '../../../../utilities/u'
import './History.scss'
import { X } from "phosphor-react"

const History = ({ open, close }) => {

    const [history, setHistory] = useState(null)

    useEffect(() => {
        setHistory(u.getHistory(20))
    }, [])

    return (
        <div className='history' style={open ? {transform: 'scaleY(1)'} : {transform: 'scaleY(0)'}}>
            <div className='colse-history' onClick={close}>
                <X size={36} style={{color: 'white'}}/>
            </div>
            <h1>History</h1>
        </div>
    )
}

export default History
