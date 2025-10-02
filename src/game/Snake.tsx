interface MySnakeProps {
  snakeDots: number[][];
}

const Snake = (props: MySnakeProps) => {
  return (
    <div>
      {props.snakeDots.map((dot: number[], i: number) => {
        const isHead = i === props.snakeDots.length - 1;
        const isTail = i === 0;
        const segmentIntensity = 1 - (i / props.snakeDots.length) * 0.3;
        
        return (
          <div
            key={i}
            // className="snake-segment"
            style={{
              left: `${dot[0]}%`,
              top: `${dot[1]}%`,
              width: '2%',
              height: '2%',
              position: 'absolute',
              backgroundColor: `rgba(220, 4, 44, ${segmentIntensity})`,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: isHead ? '50%' : isTail ? '40%' : '0%',
              boxShadow: isHead 
                ? '0 0 10px rgba(220, 4, 44, 0.6), inset 0 0 5px rgba(255, 255, 255, 0.2)'
                : '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 3px rgba(255, 255, 255, 0.1)',
              zIndex: isHead ? 3 : 2,
              transition: 'all 0.1s ease-out',
            }}
          >
            {isHead && (
              <>
                {/* Eyes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div 
                      className="bg-white rounded-full"
                      style={{
                        width: '25%',
                        height: '25%',
                        boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <div 
                        className="bg-black rounded-full"
                        style={{
                          width: '50%',
                          height: '50%',
                          margin: '25% 0 0 25%'
                        }}
                      />
                    </div>
                    <div 
                      className="bg-white rounded-full"
                      style={{
                        width: '25%',
                        height: '25%',
                        boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <div 
                        className="bg-black rounded-full"
                        style={{
                          width: '50%',
                          height: '50%',
                          margin: '25% 0 0 25%'
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Highlight effect */}
                <div 
                  className="absolute rounded-full"
                  style={{
                    top: '15%',
                    left: '15%',
                    width: '35%',
                    height: '35%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent)',
                  }}
                />
              </>
            )}
            {!isHead && (
              /* Subtle highlight on body segments */
              <div 
                className="absolute rounded-sm"
                style={{
                  top: '20%',
                  left: '20%',
                  width: '30%',
                  height: '30%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Snake;



// interface MySnakeProps {
//   snakeDots: number[][];
// }

// const Snake = (props: MySnakeProps) => {
//   return (
//     <div>
//       {props.snakeDots.map((dot: number[], i: number) => {
// 		const isHead = i === props.snakeDots.length - 1;
//         // const style = {
//         //   left: `${dot[0]}%`,
//         //   top: `${dot[1]}%`,
//         // };
// 		  // return <div className="snake" key={i} style={style} />;
// 		  return (
// 			  <div
// 				  key={i}
// 				  className={"snake"}
// 				  style={{
// 					  left: `${dot[0]}%`,
//           				top: `${dot[1]}%`,
// 					//   width: '12px',
// 					//   height: '12px',
// 					  borderRadius: isHead ? '50%' : '0%',
// 				  }}
// 			  >
// 				  {isHead && (
// 					  <div className="absolute inset-0 flex items-center justify-center">
// 						  <div className="w-1 h-1 bg-white rounded-full"></div>
// 					  </div>
// 				  )}
// 			  </div>
// 		  );
//       })}
//     </div>
//   );
// };

// export default Snake;