import { useEffect, useRef, useState } from "react";
import { BallManager } from '../game/classes/BallManager'
import { baseURL } from "../utils/Common_Constant";
import { Button } from "../ui/Button";
import axios from "axios";
import { pad, unpadInDecimal } from "../utils/Value_padding";


export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const [amount, setAmount] = useState<number>(0);
  const convasRef = useRef<HTMLCanvasElement | null>(null);
  const [curAmount, setCurAmount] = useState<number>(0);
  const [multi, setMulti] = useState<number>(0);
  const [flag, setFlag] = useState<Boolean>(false);
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
      <div className="flex flex-col">
        <label htmlFor="Point" className="text-xl font-bold">Bet Amount</label>
        <input id="Point"
          className="mb-4 border border-gray-300 rounded-md p-2 w-full max-w-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number"
          onChange={(e) => setAmount(pad(Number(e.target.value)))}
          placeholder="0.00000" />
        <Button
          className="px-10 mb-4"
          onClick={async () => {
            const response = await axios.post(`${baseURL}/game`, {
              data: 1,
              betAmount: amount
            });
            setFlag(false);
            if (ballManager) {
              ballManager.addBall(response.data.point);
              setTimeout(() => { setFlag(true) }, 3000)
            }
            setCurAmount(unpadInDecimal(response.data.resultAmount));
            setMulti(response.data.multi);
          }}
        >
          Bet
        </Button>
      </div>
      <canvas ref={convasRef} width="800" height="800"></canvas>
      {flag && <div>
        <h2>Win: {multi}x</h2>
        Current Amount: {curAmount}
      </div>}
    </div>
  );

}
