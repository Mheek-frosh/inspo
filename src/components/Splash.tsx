import { logos } from '../assets/paths'

export default function Splash({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div className="splash splash-active">
      <div className="splash-brand">
        <img src={logos.markWhite} alt="" className="splash-logo-mark" aria-hidden="true" />
        <span className="splash-logo logo-text">Biomusclepilates</span>
      </div>
    </div>
  )
}
