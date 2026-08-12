export default function Splash({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div className="splash splash-active">
      <span className="splash-logo logo-text" style={{ fontSize: 28, fontWeight: 500 }}>
        ShapeHaus
      </span>
    </div>
  )
}
