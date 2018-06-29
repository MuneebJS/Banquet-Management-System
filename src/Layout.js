import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import homeImg from './components/home.jpg';
import { withRouter } from 'react-router-dom';


class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            isHome: false,
            styles: {},
        }
    }
    componentDidMount() {
        let styles;
        if (this.props.location.pathname === '/') {
            styles = { backgroundImage: `url(${homeImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }
            this.setState({
                isHome: true,
                styles,
            })
            window.location.reload();
        } else {
            console.log("false")

            styles = { background: 'red' }
            this.setState({
                isHome: false,
                styles,
            })
        }
    }
    componentWillReceiveProps() {
        if (this.props.location.pathname === '/') {
            // styles = { backgroundImage: `url(${homeImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }
            this.setState({
                isHome: true,
                // styles,
            })
            window.location.reload();
        } else {
            console.log("false")

            styles = { background: 'red' }
            this.setState({
                isHome: false,
                // styles,
            })
        }
    }
    render() {
        let styles;
        // if (this.props.match.path === '/' && this.props.match.url === '/') {
        if (this.props.location.pathname === '/') {
            styles = { backgroundImage: `url(${homeImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }
        } else {
            styles = { background: 'red' }
        }
        console.log("this.prop s", this.props.location.pathname)
        return (
            <div className={this.state.isHome ? 'homeback' : 'nonHomeBack'} style={
                this.state.styles
            }>
                <Header />
                <div className="container" style={{ minHeight: 600, marginBottom: 50 }}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Layout);