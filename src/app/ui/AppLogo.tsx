import { SVGProps } from 'react'

export interface AppLogoProps extends SVGProps<SVGSVGElement> {
  height?: number
  width?: number
}

export function AppLogo(props: AppLogoProps) {
  props = {
    height: 48,
    width: 48,
    ...props,
  }
  return (
    <svg viewBox="0 0 400 400" version="1.1" {...props}>
      <title>kin-coin-white-on-violet</title>
      <defs>
        <linearGradient x1="0.250809465%" y1="-12.4737448%" x2="65.0194612%" y2="101.073921%" id="linearGradient-1">
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%"></stop>
          <stop stopColor="#FFFFFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="70.5715816%" y1="-5.17351002%" x2="6.73153017%" y2="87.9965198%" id="linearGradient-2">
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%"></stop>
          <stop stopColor="#FFFFFF" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="NEW-Purple-White-Copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="kin-coin-white-on-violet">
          <circle id="Oval" fill="#7546F6" cx="200" cy="200" r="200"></circle>
          <g id="kin-logo-white-sideicon" transform="translate(73.828125, 54.296875)" fillRule="nonzero">
            <g id="Group">
              <polygon
                id="Path"
                fill="url(#linearGradient-1)"
                points="126.169422 146.401911 126.169422 291.015625 252.34375 217.968993"
              ></polygon>
              <polygon
                id="Path"
                fill="url(#linearGradient-2)"
                points="126.169422 0 126.169422 146.401911 252.34375 72.7526815"
              ></polygon>
              <polygon
                id="Path"
                stroke="#FFFFFF"
                fill="#FFFFFF"
                points="0 72.7526815 0 218.262944 126.169422 291.015625 126.68448 290.716776 126.169422 146.401911 126.169422 0"
              ></polygon>
              <polygon
                id="Path"
                fill="#FFFFFF"
                points="252.34375 72.7526815 126.169422 146.401911 252.34375 217.968993"
              ></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
