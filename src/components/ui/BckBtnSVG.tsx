// interface Props {
//   stroke: string;
//   width: number;
//   height: number;
// }

function BackBtnSVG({ stroke = "#4661E6", width = 5, height = 10 }) {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9L2 5l4-4"
        stroke={stroke}
        strokeWidth={2}
        fill="transparent"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default BackBtnSVG;
