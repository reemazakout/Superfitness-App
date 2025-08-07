import ProgressCircle from "@/components/custom/circle-progress";

type FormWrapperProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  error?: string;
  step: number;
};

export default function FormWrapper({
  children,
  title,
  description,
  error,
  step,
}: FormWrapperProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center  p-4">
        <ProgressCircle step={step} />
        {/* Welcom massage */}
        <h2 className=" text-center font-baloo font-extrabold text-3xl md:text-[48px]  leading-[140%] tracking-none capitalize ">
          {title}
        </h2>
        {description && (
          <p className="font-normal text-base md:text-xl  tracking-none leading-140 capitalize">
            {description}
          </p>
        )}
        {error && <p className="text-red-500 p-3  font-semibold">{error}</p>}
      </div>
      <div className="flex items-center justify-center ">{children}</div>
    </>
  );
}
