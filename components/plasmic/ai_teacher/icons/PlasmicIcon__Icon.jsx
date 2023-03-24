// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function IconIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 15 12"}
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
          "M12.818 2.238a2.936 2.936 0 001.287-1.62 5.863 5.863 0 01-1.86.71 2.927 2.927 0 00-4.988 2.67A8.31 8.31 0 011.225.94a2.926 2.926 0 00.906 3.908 2.916 2.916 0 01-1.326-.366v.037a2.93 2.93 0 002.348 2.87 2.931 2.931 0 01-1.322.05 2.93 2.93 0 002.734 2.034A5.874 5.874 0 01.23 10.685 8.286 8.286 0 004.718 12c5.384 0 8.329-4.46 8.329-8.329 0-.127-.003-.253-.009-.379A5.95 5.95 0 0014.5 1.777a5.83 5.83 0 01-1.681.46z"
        }
        clipRule={"evenodd"}
        fillRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default IconIcon;
/* prettier-ignore-end */
