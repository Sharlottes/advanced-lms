import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://cyber.kyungnam.ac.kr/*"],
  all_frames: true
};

const notiButton = document.querySelector('div.message_item[title="알림"]');
