import styleText from "data-text:../components/AdvancedNoti.module.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import AdvancedNoti from "../components/AdvancedNoti";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["https://cyber.kyungnam.ac.kr/*"],
  all_frames: true
};
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`div.login`);

export default function AdvancedNotiButton() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const notiButton = document.querySelector(
      `div.message_item[title="알림"]`
    ) as HTMLDivElement;
    notiButton.setAttribute("onclick", null);
    const elClone = notiButton.cloneNode(true) as HTMLDivElement;
    elClone.onclick = () => setToggle((prev) => !prev);
    notiButton.parentNode.replaceChild(elClone, notiButton);
  }, []);
  console.log(toggle);

  return createPortal(
    <>
      {toggle && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            zIndex: 99999,
            inset: 0,
            userSelect: "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
          onClick={() => setToggle(false)}>
          <AdvancedNoti />
        </div>
      )}
    </>,
    document.body
  );
}
