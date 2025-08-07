// ProgressCircle.tsx

type ProgessProps = {
  step: number;
};

const ProgressCircle = ({ step }: ProgessProps) => {
  // Calculate progress percentage for conic-gradient (each step is 16.67% of the circle)
  const progress: number = ((step - 1) / 6) * 100;

  return (
    <div className="relative w-16 h-16 mx-auto ">
      <div
        className="w-full h-full rounded-full transition-all duration-500"
        style={{
          background: `conic-gradient(#FF4100 0% ${progress}%, transparent 0% 100%)`,
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#242424] rounded-full flex items-center justify-center text-xl font-sans text-white">
          {step - 1}/6
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
