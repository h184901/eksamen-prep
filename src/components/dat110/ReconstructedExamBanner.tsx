interface Props {
  warning: string;
}

// Amber banner shown at top of a reconstructed exam page.
// Hard requirement: any exam with reconstructedFromSensor=true MUST render this
// (enforced via sync structural validation — bannerWarning must be non-empty).
export default function ReconstructedExamBanner({ warning }: Props) {
  return (
    <div
      role="alert"
      className="mb-6 rounded-xl border-l-4 border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-900 dark:text-amber-100"
    >
      <div className="flex items-baseline gap-2">
        <span aria-hidden className="text-base">
          ⚠️
        </span>
        <div>
          <p className="font-bold mb-1">Rekonstruert eksamen — ikke offisiell</p>
          <p>{warning}</p>
        </div>
      </div>
    </div>
  );
}
