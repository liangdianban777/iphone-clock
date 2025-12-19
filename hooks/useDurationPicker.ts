import { useState } from 'react';

export const useDurationPicker = () => {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);

    const disabled = hour === 0 && minute === 0 && second === 0;

    return {
        second,
        minute,
        hour,
        setSecond,
        setMinute,
        setHour,
        disabled,
    }
}
