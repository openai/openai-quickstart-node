// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function Icon2Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 14 14"}
      height={"1em"}
      width={"1em"}
      style={{
        fill: "currentcolor",
        ...(style || {}),
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M7 0C3.14 0 0 3.14 0 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm4.562 3.301a5.846 5.846 0 011.31 3.52 9.88 9.88 0 00-3.938-.038c-.21-.493-.429-.962-.649-1.406 1.267-.546 2.37-1.243 3.277-2.076zm-.789-.801c-.9.82-1.942 1.429-3.009 1.877a26.974 26.974 0 00-1.989-3.124A5.849 5.849 0 0110.773 2.5zM4.64 1.62a25.727 25.727 0 012.048 3.157c-2.217.722-4.368.844-5.402.855A5.898 5.898 0 014.64 1.62zM1.13 6.76h.033c.714 0 2.023-.049 3.563-.33.88-.16 1.713-.376 2.495-.643.203.406.406.834.602 1.282a10.59 10.59 0 00-2.75 1.364 12.384 12.384 0 00-2.555 2.36A5.848 5.848 0 011.13 6.76zm2.198 4.823a11.302 11.302 0 012.415-2.247A9.424 9.424 0 018.25 8.104c.5 1.295.926 2.726 1.18 4.244a5.847 5.847 0 01-6.1-.766zm7.135.16a23.296 23.296 0 00-1.105-3.905c1.111-.188 2.26-.149 3.44.116a5.882 5.882 0 01-2.335 3.79z"
        }
      ></path>
    </svg>
  );
}

export default Icon2Icon;
/* prettier-ignore-end */
