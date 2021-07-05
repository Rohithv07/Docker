import React from 'react';
import { Link } from 'react-router-dom';

 // eslint-disable-next-line
export default() => {
    return(
        <div>
            In Some other page
            <Link to="/">Go Back Home</Link>
        </div>
    );
};