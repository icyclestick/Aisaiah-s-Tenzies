import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import PropTypes from 'prop-types';

export default function MyStopwatch({ startTime, newGame, gameWon }) {
    const {
        seconds,
        minutes,
        isRunning,
        start,
        reset,
        pause
    } = useStopwatch({ autoStart: false });

    const formattedMinutes = String(minutes).padStart(2, '0'); // Ensures minutes is always two digits
    const formattedSeconds = String(seconds).padStart(2, '0'); // Ensures seconds is always two digits

    useEffect(() => {
        if (startTime) {
            start();
        }
    }, [startTime, start]);

    useEffect(() => {
        if (newGame) {
            reset();
        }
    }, [newGame, reset]);

    useEffect(() => {
        if (gameWon) {
            pause();
        }
    }, [gameWon, isRunning, pause]);

    return (
        <div className="timer-container">
            <div className="timer-display">
                <span>{formattedMinutes}</span>
                <span className="timer-colon">:</span>
                <span>{formattedSeconds}</span>
            </div>
        </div>
    );
}

MyStopwatch.propTypes = {
    startTime: PropTypes.bool.isRequired,  // Ensures startTime is a boolean
    newGame: PropTypes.bool.isRequired,    // Ensures newGame is a boolean
    gameWon: PropTypes.bool.isRequired     // Ensures gameWon is a boolean
};
