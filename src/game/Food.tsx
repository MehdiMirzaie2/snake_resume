import melon from "../assets/water-melon.png"

interface foodProps {
  dot: number[];
}

const Food = (props: foodProps) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };
  return <img src={melon} className="food" style={style} />;
};

export default Food;