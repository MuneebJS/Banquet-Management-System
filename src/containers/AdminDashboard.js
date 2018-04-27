
import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import ReservationRequests from './ReservationRequests';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

export default class AdminDashboard extends React.Component {

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
                <Tab label="Requests" value="a">
                    <div>
                        <h2 style={styles.headline}>Requests</h2>
                        <ReservationRequests />
                    </div>
                </Tab>
                <Tab label="Accepted" value="b">
                    <div>
                        <h2 style={styles.headline}>Accepted</h2>
                        <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
            </p>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}