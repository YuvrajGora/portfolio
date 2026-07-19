export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute top-[10%] -left-[10%] h-[32rem] w-[32rem] rounded-full opacity-[0.07] blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, var(--color-blue), transparent 70%)" }}
      />
      <div
        className="absolute top-[55%] -right-[10%] h-[36rem] w-[36rem] rounded-full opacity-[0.06] blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, var(--color-purple), transparent 70%)", animationDelay: "-7s" }}
      />
      <div
        className="absolute bottom-[5%] left-[20%] h-[28rem] w-[28rem] rounded-full opacity-[0.05] blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, var(--color-cyan), transparent 70%)", animationDelay: "-3s" }}
      />
    </div>
  );
}
