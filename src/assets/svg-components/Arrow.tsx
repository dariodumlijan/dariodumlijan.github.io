import colors from '../../styles/_colors.scss';

function Arrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 255">
      <path
        d="M140.5,184.1l60.3-104.5c5.8-10-1.4-22.5-13-22.5H67.2c-11.5,0-18.8,12.5-13,22.5l60.3,104.5 C120.3,194.1,134.7,194.1,140.5,184.1z"
        fill={colors.primary}
      />
    </svg>
  );
}

export default Arrow;
