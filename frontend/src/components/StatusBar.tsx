import { GitBranch } from "lucide-react";

type Props = {
  branchName?: string;
};

export default function StatusBar({ branchName = "main" }: Props) {
  return (
    <div className="statusbar" role="contentinfo" aria-label="Status bar">
      <div className="layout-inner statusbar__inner">
        <span className="statusbar__item">
          <GitBranch size={16} strokeWidth={2} aria-hidden="true" />
          <span className="statusbar__text">{branchName}</span>
        </span>
        <span className="statusbar__item statusbar__item--muted">
          <span className="statusbar__text">Portfolio</span>
        </span>
      </div>
    </div>
  );
}

