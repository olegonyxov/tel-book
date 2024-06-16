import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    
    <div className='start-page'>
        <h1>Welcome to Telephone Book app!!! </h1>
        <Link to="/list" className='link-list'> {'>>'}Go To Tel-Book List{'<<'}</Link>
    </div>
  )
}
