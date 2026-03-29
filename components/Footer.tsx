interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`w-full max-w-5xl py-6 text-center ${className}`}>
      <p className="text-[11.5px] text-slate-600">
        Made with <span style={{ color: "#F472B6" }}>♥</span> ·{" "}
        <span style={{ color: "#F472B6" }}>Obume.hq</span>
      </p>
    </footer>
  );
}
