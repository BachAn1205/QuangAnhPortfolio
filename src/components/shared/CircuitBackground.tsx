export function CircuitBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(13,148,136,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.06),transparent_35%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.07),transparent_35%)]" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,116,139,0.55) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12] dark:opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit-lines"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 60 H50 M50 60 V20 M50 60 V100 M70 20 H110 M70 100 H110 M70 20 V100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-500 dark:text-teal-300/80"
            />
            <circle
              cx="50"
              cy="60"
              r="3"
              className="fill-teal-600/70 dark:fill-teal-300/70"
            />
            <circle
              cx="70"
              cy="20"
              r="2.5"
              className="fill-slate-500/70 dark:fill-sky-300/60"
            />
            <circle
              cx="70"
              cy="100"
              r="2.5"
              className="fill-slate-500/70 dark:fill-sky-300/60"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-lines)" />
      </svg>
    </div>
  );
}
