import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager"
import { WIDTH } from "../utils/Common_Constant";
import { Quotes } from "../components/Quotes";
import { FoundIssue } from "../components/FoundIssue";
import { pad } from "../utils/Value_padding";
import { DemoGame } from "../components/DemoGame";

export function Home() {

  const convasRef = useRef<HTMLCanvasElement | null>(null);
  //@ts-ignore
  const [outputs, setOutputs] = useState<{ [key: number]: number[] }>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
  });

  async function simulate(ballManager: BallManager) {
    let i = 0;
    while (1) {
      i++;
      ballManager.addBall(pad(WIDTH / 2 + 20 * (Math.random() - 0.5)));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  useEffect(() => {
    if (convasRef.current) {
      const ballManager = new BallManager(
        convasRef.current as unknown as HTMLCanvasElement,
        (index: number, startX?: number) => {
          setOutputs((outputs: any) => {
            return {
              ...outputs,
              [index]: [...(outputs[index] as number[]), startX],
            };
          });
        }
      );
      simulate(ballManager);
      return () => {
        ballManager.stop();
      };
    }
  }, [convasRef]);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between">
      <DemoGame />
      <Quotes />
    </div>
  )
}
