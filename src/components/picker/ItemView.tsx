type CardviewProps = {
  name: string;
  image: string;
  onClick: () => void;
  activeItem: string | undefined;
};

export default function Cardview({ name, image, onClick, activeItem }: CardviewProps) {
  return (
    <div className={[
      "cursor-pointer rounded-lg p-2 hover:bg-slate-800 transition duration-200 ease-in-out",
      activeItem === name ? "bg-slate-800 ring-1 ring-sky-500" : "bg-slate-700"
    ].join(" ")} onClick={onClick}>
      <img
        alt={name}
        loading="lazy"
        width="256"
        height="256"
        decoding="async"
        className="m-auto aspect-square w-full max-w-32"
        src={image}
      />
      <div className="m-2 text-center text-sm">{name}</div>
    </div>
  );
}
