import { ANNOUNCEMENT_ITEMS } from '../../constants/brand'

export default function AnnouncementBar() {
  const line = ANNOUNCEMENT_ITEMS.join(' · ')

  return (
    <div
      className="relative z-50 overflow-hidden bg-amazia-espresso py-2 text-white"
      aria-hidden="true"
    >
      <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        <span className="px-8 font-body text-[11px] font-medium uppercase tracking-[0.12em]">
          {line}
        </span>
        <span className="px-8 font-body text-[11px] font-medium uppercase tracking-[0.12em]">
          {line}
        </span>
      </div>
    </div>
  )
}
