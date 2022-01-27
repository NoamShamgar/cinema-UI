import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"

export default function Permdenied() {
    return (
        <div>
            Permission Denied!
        <br/>
            <Link to={ Object.keys(useSelector(state => state)).length !== 0?"/main":"/login"}>Back to Safe spott</Link>
        </div>
    )
}
