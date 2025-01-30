import PropTypes from "prop-types";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };

    return (
        <button
            style={styles}
            onClick={props.hold}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
        >
            {props.value}
        </button>
    );
}

Die.propTypes = {
    value: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
    hold: PropTypes.func.isRequired
};
