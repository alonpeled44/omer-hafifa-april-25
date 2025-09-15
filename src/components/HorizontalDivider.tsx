import React, { CSSProperties } from "react";
import styles from "../styles/components/horizontal-divider.module.css";

interface HorizontalDividerProps {
  height?: string;
  width?: string;
}

export default function HorizontalDivider({
  height,
  width,
}: HorizontalDividerProps) {
  return (
    <div
      className={styles["horizontal-divider"]}
      style={
        {
          "--divider-height": height,
          "--divider-width": width,
        } as CSSProperties
      }
    />
  );
}
