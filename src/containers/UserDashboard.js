
import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import UserReservationRequests from './UserReservationRequests';
import UserAcceptedRequests from './UserAcceptedRequests';
import { withRouter } from 'react-router-dom';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >

                <Tab label="Accepted" value="b">
                    <div>
                        <h2 style={styles.headline}>Accepted</h2>
                        <UserAcceptedRequests />
                    </div>
                </Tab>
                <Tab label="Rejected" value="a">
                    <div>
                        <h2 style={styles.headline}>Rejected</h2>
                        <UserReservationRequests />
                    </div>
                </Tab>
            </Tabs>
        );
    }
}



export default withRouter(AdminDashboard);
