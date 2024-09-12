import { useEffect } from "react";

import { useStorage } from "@plasmohq/storage/hook";

import useSet from "~hooks/useSet";

import * as styles from "./AdvancedNoti.module.css";

async function fetchData(): Promise<Data> {
  const date = new Date();

  const d = await fetch(
    "https://cyber.kyungnam.ac.kr/ilos/mp/notification_list.acl",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        start: "0",
        display: "200",
        OPEN_DTM: `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`,
        encoding: "utf-8"
      })
    }
  ).then((r) => r.text());
  const doc = new DOMParser().parseFromString(d, "text/html");
  const elems = doc.getElementsByClassName("notification_content");
  const dataList = [];
  const titles = new Set<string>();
  const subjects = new Set<string>();
  for (const elem of elems) {
    const listener = elem.getAttribute("onclick");
    const subject = elem
      .getElementsByClassName("notification_subject")[0]
      ?.firstElementChild.textContent.trim();
    const day = elem
      .getElementsByClassName("notification_day")[0]
      .lastElementChild.textContent.trim();
    const t = elem.getElementsByClassName("notification_text")[0];
    const text = t.lastChild.textContent.trim();
    const title = t.firstElementChild.textContent.trim();
    if (title) titles.add(title);
    if (subject) subjects.add(subject);
    dataList.push({ listener, subject, day, text, title });
  }
  return {
    titles: Array.from(titles),
    subjects: Array.from(subjects),
    data: dataList
  };
}
export default function AdvancedNoti() {
  const [data, setData] = useStorage<Data>(
    "data",
    localStorage.getItem("data")
      ? (JSON.parse(localStorage.getItem("data")) as Data)
      : undefined
  );
  useEffect(() => {
    if (data) return;
    fetchData().then((d) => {
      setData(d);
      localStorage.setItem("data", JSON.stringify(d));
    });
  }, [data]);

  const [selectedTitles, addSelectedTitles, removeSelectedTitles] =
    useSet<string>();
  const [selectedSubjects, addSelectedSubjects, removeSelectedSubjects] =
    useSet<string>();
  const toggleTitle = (title: string) => {
    if (selectedTitles.has(title)) {
      removeSelectedTitles(title);
    } else {
      addSelectedTitles(title);
    }
  };
  const toggleSubject = (subject: string) => {
    if (selectedSubjects.has(subject)) {
      removeSelectedSubjects(subject);
    } else {
      addSelectedSubjects(subject);
    }
  };

  return (
    <div
      className={styles.vancedNotiContainer}
      onClick={(e) => e.stopPropagation()}>
      <div className={styles.vancedNotiFilterBar}>
        {data?.titles.map((title) => (
          <button
            key={title}
            className={styles.vancedNotiFilterBtn}
            aria-selected={selectedTitles.has(title)}
            onClick={() => toggleTitle(title)}>
            {title}
          </button>
        ))}
      </div>
      <div className={styles.vancedSaperator} />
      <div className={styles.vancedNotiFilterBar}>
        {data?.subjects.map((subject) => (
          <button
            key={subject}
            className={styles.vancedNotiFilterBtn}
            aria-selected={selectedSubjects.has(subject)}
            onClick={() => toggleSubject(subject)}>
            {subject}
          </button>
        ))}
      </div>
      <div className={styles.vancedSaperator} />
      <div className={styles.vancedNotiList}>
        {data?.data.map(
          (d, i) =>
            (selectedSubjects.size == 0 || selectedSubjects.has(d.subject)) &&
            (selectedTitles.size == 0 || selectedTitles.has(d.title)) && (
              <div
                key={i}
                onClick={() => eval(d.listener)}
                className={styles.vancedNotiCard}>
                <p style={{ fontWeight: "bold" }}>
                  <span style={{ color: "#205D9E" }}>{d.title}</span>{" "}
                  {d.subject}
                </p>
                <p style={{ fontSize: "1.2em", fontWeight: 500 }}>{d.text}</p>
                <p style={{ fontWeight: "lighter", fontSize: "0.85em" }}>
                  {d.day}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
