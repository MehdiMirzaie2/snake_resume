interface MySnakeProps {
  snakeDots: number[][];
}

const Snake = (props: MySnakeProps) => {
  return (
    <div>
      {props.snakeDots.map((dot: number[], i: number) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return <div className="snake" key={i} style={style} />;
      })}
    </div>
  );
};

export default Snake;