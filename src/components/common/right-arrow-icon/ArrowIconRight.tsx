import ArrowIcon from "@/assets/images/Arrow-top-right.svg";

export default function ArrowIconRight() {
  return (
    <img
      src={ArrowIcon}
      alt="arrow-icon"
      className="bg-flame border-2 border-white p-2 rounded-full absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 hidden md:block"
    />
  );
}

export function ArrowIconLight() {
  return (
    <img
      src={ArrowIcon}
      alt="arrow-icon"
      className="bg-flame p-2 rounded-full hidden md:block"
    />
  );
}

export function ArrowIconStraight() {
  return (
    <img src={ArrowIcon} alt="arrow-icon" className="bg-flame p-2 rounded-full hidden md:block rotate-45 border-cloudy border" />
  );
}