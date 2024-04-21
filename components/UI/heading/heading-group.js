function HeadingGroup({ title, subtitle }) {
  return (
    <div className="text-start flex flex-col gap-2">
      <h1 className={`text-neutral-dark-grey text-2xl font-bold`}>{title}</h1>
      <h2 className={`text-neutral-grey`}>{subtitle}</h2>
    </div>
  );
}

export default HeadingGroup;
