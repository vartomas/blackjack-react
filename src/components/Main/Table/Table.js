import { useEffect, useState } from 'react'
import './Table.scss'

const Table = () => {
    const [dimensions, setDimensions] = useState({
        width: '',
        height: '',
        top: '',
        left: ','
    })

    const getDimensions = () => {
        const d = {
            width: window.innerWidth + 300 + 'px',
            height: window.innerHeight + 'px',
            top: -(window.innerHeight / 2) + 'px',
            left: '-150px'
        }
        setDimensions(d)
    }

    useEffect(() => {
        getDimensions()
        window.addEventListener('resize', getDimensions)
    }, [])

    return (
        <div className='table'>
            <div className='dealer-circle' style={dimensions}></div>
        </div>
    )
}

export default Table
