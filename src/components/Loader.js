import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';


export default (props) => (
    <div className="laoder">
        <CircularProgress size={60} thickness={7} />
    </div>
)