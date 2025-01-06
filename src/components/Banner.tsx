import React from 'react';

const Banner = ({ email }: { email: string }) => {
    return <div className="flex justify-end">
        <div>{email}</div>
    </div>
}

export default Banner;