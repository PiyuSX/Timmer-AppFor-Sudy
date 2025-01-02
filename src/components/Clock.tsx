import React, { useState, useEffect } from 'react';

export function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strHours = hours.toString().padStart(2, '0');
        return `${strHours}:${minutes} ${ampm}`;
    };

    return (
        <div className="fixed top-4 right-4 text-white font-mono text-2xl">
            {formatTime(time)}
        </div>
    );
}