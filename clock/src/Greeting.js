import React from 'react';

const Greeting = () => {
    return (
        <div className="Greeting">
            <h4>GOOD {props.timeOfDay}, IT'S CURRENTLY</h4>
        </div>
    );
};

export default Greeting;