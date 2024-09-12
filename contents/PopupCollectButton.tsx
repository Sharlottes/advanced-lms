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
      .querySelectorAll(
        "div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > span > p:has(a) > a"
      )
      .values() as IterableIterator<HTMLAnchorElement>;

    for (const element of elements) {
      const uri = element.href;
      const imgUri = element.getElementsByTagName("img")[0].src;
      setData((prev) => [...prev, [uri, imgUri] as const]);
    }
    mainPop.remove();
  }, []);

  return (
    <div
      style={{
        zIndex: 999,
        position: "fixed"
      }}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        팝업 {isOpen ? "닫기" : "열기"}
      </button>
      {isOpen && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {data.map(([uri, imgUri]) => (
            <div key={uri}>
              <a href={uri}>
                <img src={imgUri} width={360} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
