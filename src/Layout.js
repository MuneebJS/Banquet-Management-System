import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';


export default class extends React.Component {
    render() {
        return <div >

            <Header />
            <div className="container" style={{ minHeight: 600, marginBottom: 50 }}>
                {this.props.children}
            </div>
            <Footer />
        </div>
    }
}