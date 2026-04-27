const MexicanHeritage = ({ className = "" }) => {
  return (
    <div className={`absolute pointer-events-none opacity-10 select-none ${className}`}>
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full fill-none stroke-accent/40 stroke-[0.5]"
      >
        {/* Simple Minimalist Agave Symbol */}
        <path d="M200 400 Q200 200 150 150 M200 400 Q200 200 250 150" />
        <path d="M200 400 Q200 250 100 200 M200 400 Q200 250 300 200" />
        <path d="M200 400 Q200 300 60 280 M200 400 Q200 300 340 280" />
        <path d="M200 400 L200 100" />
        {/* Decorative dots (Starry desert night style) */}
        <circle cx="200" cy="50" r="1" className="fill-accent/20" />
        <circle cx="150" cy="80" r="0.5" className="fill-accent/20" />
        <circle cx="250" cy="80" r="0.5" className="fill-accent/20" />
      </svg>
    </div>
  );
};

export default MexicanHeritage;
