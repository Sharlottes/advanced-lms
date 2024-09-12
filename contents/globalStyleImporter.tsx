import styleText from "data-text:./global.css";
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://cyber.kyungnam.ac.kr/*"],
  all_frames: true
};
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  return style;
};
