import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://cyber.kyungnam.ac.kr/*"],
  all_frames: true,
  run_at: "document_end"
};

export default function PopupCollectButton() {
  const [data, setData] = useState<[string, string][]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mainPop = document.getElementsByClassName("mainpop")[0];
    const elements = mainPop
      .querySelectorAll(".mainpop span > p:has(a) > a")
      .values() as IterableIterator<HTMLAnchorElement>;

    for (const element of elements) {
      const uri = element.href;
      const imgElems = Array.from(element.getElementsByTagName("img"));
      setData((prev) => [
        ...prev,
        ...imgElems.map((e) => [uri, e.src] as [string, string])
      ]);
    }
    mainPop.remove();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        zIndex: 999,
        inset: 0
      }}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          textWrap: "nowrap",
          zIndex: 9991,
          position: "relative"
        }}>
        팝업 {isOpen ? "닫기" : "열기"}
      </button>
      {isOpen && (
        <>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              inset: 0,
              zIndex: 9990
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              width: "calc(100vw - 18px)",
              margin: "16px",
              position: "relative",
              zIndex: 9991
            }}>
            {data.map(([uri, imgUri]) => (
              <div key={uri}>
                <a href={uri}>
                  <img src={imgUri} width={360} />
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
