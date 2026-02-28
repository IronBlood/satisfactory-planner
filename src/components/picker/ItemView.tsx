type CardviewProps = {
  name: string;
  image: string;
  onClick: () => void;
};

export default function Cardview({ name, image, onClick }: CardviewProps) {
  return (
    <div className="cursor-pointer rounded-lg bg-slate-700 p-2 hover:bg-slate-800 transition duration-200 ease-in-out" onClick={onClick}>
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
