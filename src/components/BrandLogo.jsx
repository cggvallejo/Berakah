const BrandLogo = ({ className = "", variant = "full" }) => {
  // Logo Principal (Hero): logo-badge.webp (Sin texto integrado para maxima calidad)
  // Logo Scroll/Footer: logo-text.webp (Letras de cuerda)
  const imageSrc = variant === "full" ? "/logo-badge.webp" : "/logo-text.webp";

  return (
    <div 
      className={`relative flex flex-col items-center justify-center overflow-visible ${className}`}
    >
      <div className="relative group overflow-visible flex flex-col items-center">
        {/* Badge del Logo */}
        <img 
          src={imageSrc} 
          alt={`Berakah Logo ${variant}`} 
          className={`w-full h-auto object-contain z-10 relative transition-transform duration-300 ${
            variant === 'full' 
              ? 'max-w-[90vw] md:max-w-[600px]' 
              : 'max-w-[120px] md:max-w-[200px]'
          }`}
        />

        {/* Tipografía Premium Definida por Código (Solo en Hero) */}
        {variant === 'full' && (
          <div className="-mt-24 md:-mt-80 flex flex-col items-center gap-0 text-center w-full px-4 relative z-30">
            <div className="flex flex-col items-center">
              <span className="text-[18px] md:text-[28px] font-bold tracking-[0.5em] text-accent uppercase font-sans">
                México | Bolsas Artesanales
              </span>
              <span className="text-[12px] md:text-[20px] font-medium tracking-[0.3em] text-accent/70 uppercase font-sans mt-0.5">
                Eclesiastés 3:1
              </span>
            </div>
            
            <p className="mt-0.5 md:mt-1 text-[18px] md:text-[28px] lg:text-[32px] font-medium italic text-accent font-serif leading-tight max-w-[95vw] md:max-w-[800px]">
              "Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora."
            </p>
            
            {/* Decoración Inferior Sutil */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;

