import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://cyber.kyungnam.ac.kr/*"],
  all_frames: true
}
async function fetchData() {
  const d = await fetch(
    "https://cyber.kyungnam.ac.kr/ilos/mp/notification_list.acl",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        start: "0",
        display: "81",
        OPEN_DTM: "2024.09.10",
        encoding: "utf-8"
      })
    }
  ).then((r) => r.text())
  const doc = new DOMParser().parseFromString(d, "text/html")
  const elems = doc.getElementsByClassName("notification_content")
  const dataList = []
  for (const elem of elems) {
    const listener = elem.getAttribute("onclick")
    const subject =
      elem
        .getElementsByClassName("notification_subject")[0]
        ?.firstElementChild.textContent.trim() ?? "없음"
    const day = elem
      .getElementsByClassName("notification_day")[0]
      .lastElementChild.textContent.trim()
    const t = elem.getElementsByClassName("notification_text")[0]
    const text = t.lastChild.textContent.trim()
    const title = t.firstElementChild.textContent.trim()

    dataList.push({ listener, subject, day, text, title })
  }
  return dataList
}

interface Data {
  listener: string
  subject: string
  day: string
  text: string
  title: string
}
export default function AdvancedNoti() {
  const [data, setData] = useState<Data[]>()

  useEffect(() => {
    ;(async () => {
      const exist = localStorage.getItem("data")
      if (exist) {
        setData(JSON.parse(exist))
        return
      }
      const data = await fetchData()
      localStorage.setItem("data", JSON.stringify(data))
      setData(data)
    })()
  }, [])

  return <></>
}
