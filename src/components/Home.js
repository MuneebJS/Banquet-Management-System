import React from 'react';
import homeImg from '../components/home.jpg';
import Title from './Title';


export default (props) => (
    <div className="container-fluid home">
        <Title>Welcome to Banquet App</Title>
        <img src={homeImg} style={{ width: '100%' }} />
    </div>
)