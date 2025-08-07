export default function AuthStaticSection() {
  const lang = localStorage.getItem("lang");
  return (
    <>
      <div
        className={`h-screen ${
          lang === "en" ? "before:right-0" : "before:left-0"
        } before:absolute before:h-full before:w-0.5 before:bg-orange-base/20 flex flex-col relative items-center justify-center `}
      >
        {/* Logo photo */}
        <div className=" w-28 md:w-44  ">
          <img className="w-full h-full" src="\src\assets\images\logo-full.png" alt="logo photo" />
        </div>
        {/* Main photo */}
        <div className="w-72 sm:w-96 xl:w-[628px] ">
          <img
            className="w-full h-full"
            src="\src\assets\images\auth\auth.png"
            alt="Welcoming photo"
          />
        </div>
      </div>
    </>
  );
}
