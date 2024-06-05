import { useEffect, useRef, useState } from "react";
import { BallManager } from '../game/classes/BallManager'
import { baseURL } from "../utils/Common_Constant";
import { Button } from "../ui/Button";
import axios from "axios";


export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const convasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (convasRef.current) {
      const ballManager = new BallManager(
        convasRef.current
      );
      setBallManager(ballManager);
    }
  }, [convasRef]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={convasRef} width="800" height="800"></canvas>
      <Button
        className="px-10 mb-4"
        onClick={async () => {
          const response = await axios.post(`${baseURL}/game`, {
            data: 1
          });
          if (ballManager) {
            ballManager.addBall(response.data.point);
          }
        }}
      >
        Add ball
      </Button>
    </div>
  );

}
