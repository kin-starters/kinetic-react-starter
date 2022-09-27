import { SVGProps } from 'react'

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2080.12 1188.01" {...props}>
      <defs>
        <linearGradient id="b" x1={473.88} y1={559.01} x2={692.73} y2={894.18} gradientUnits="userSpaceOnUse">
          <stop offset={0} stopColor="#fff" stopOpacity={0} />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <linearGradient id="c" x1={713.22} y1={281.54} x2={492.14} y2={559.96} gradientUnits="userSpaceOnUse">
          <stop offset={0} stopColor="#fff" />
          <stop offset={0.03} stopColor="#fff" stopOpacity={0} />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <style>{'.f{fill:#fff}'}</style>
      </defs>
      <path
        className="f"
        d="m992.08 350.09 102.81-28.96v353.64l1.35.68 116.34-141.37h117.03l-127.17 148.81 136.64 183.99h-121.75l-121.09-169.79-1.35.68v169.11H992.08V350.09ZM1412.31 369.7c32.47 0 59.52 26.38 59.52 58.85s-27.05 58.85-59.52 58.85-59.53-26.37-59.53-58.85 27.06-58.85 59.53-58.85Zm-51.41 164.38h102.81v332.8H1360.9v-332.8ZM1501.97 534.08h101.47v30.44l1.35.68c25.71-20.97 60.89-38.56 102.82-38.56 35.17 0 66.29 12.18 87.26 33.83 20.29 21.64 29.08 50.73 29.08 98.76v207.66h-102.81V676.14c0-25.03-3.39-37.2-11.5-46.68-8.8-10.14-20.97-14.2-35.18-14.2-26.38 0-51.4 13.52-69.67 27.73v223.9h-102.81v-332.8Z"
      />
      <path
        style={{
          fill: 'url(#b)',
        }}
        d="M513.37 595.83v295.18l257.22-149.1-257.22-146.08z"
      />
      <path
        style={{
          fill: 'url(#c)',
        }}
        d="M513.37 297v298.83L770.59 445.5 513.37 297z"
      />
      <path className="f" d="M256.16 445.5v297.01l257.21 148.5 1.05-.61-1.05-294.57V297L256.16 445.5z" />
      <path className="f" d="M770.59 445.5 513.37 595.83l257.22 146.08V445.5z" />
    </svg>
  )
}
