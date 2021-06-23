import React from 'react';

const Info = (props) => {
    return (
        <div className={"Info" + props.background}>
            <div className="InfoItem">
                <p>CURRENT TIMEZONE</p>
                <h2>{props.timeZone}</h2>
            </div>
            <div className="InfoItem">
                <p>DAY OF THE YEAR</p>
                <h2>{props.dayOfYear}</h2>
            </div>
            <div className="InfoItem">
                <p>DAY OF THE WEEK</p>
                <h2>{props.dayOfWeek}</h2>
            </div>
            <div className="InfoItem">
                <p>WEEK NUMBER</p>
                <h2>{props.weekNumber}</h2>
            </div>
        </div>
    );
};

export default Info;