import React from 'react';

const Clock = (props) => {
    return (
        <div className="Clock">
            <h6></h6>
            <div className="Time">
                <h1>{props.time}</h1>
                <h4>{props.timeZone}</h4>
            </div>
            

        </div>
    );
};

export default Clock;