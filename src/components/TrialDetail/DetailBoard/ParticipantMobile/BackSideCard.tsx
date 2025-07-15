export default function BackSideCard() {
  return (
    <div className="w-full min-h-20 max-h-30 h-full flex gap-2 items-end justify-center relative">
      <div className="border-2 border-schema-primary absolute top-1/6 left-0 w-full h-2/3 -skew-x-24 flex justify-center items-center">
      <img className="object-cover h-full skew-x-24" src="/monster/monsterDefault.webp" alt="" />
      </div>
    </div>
  );
}
