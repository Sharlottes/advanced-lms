import React, { useEffect, useState } from "react";

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
    const reg = listener?.match(/^(\w+)\((.+)\);$/);
    let seq;
    if (!reg) seq = null;
    else if (reg[1] == "goSubjectPage") seq = reg[2].split(",")[1];
    else seq = reg[2];
    const id = seq ? +seq.slice(1, -1) : seq;

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
    dataList.push({ id, subject, day, text, title });
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
    const noticeCnt = document.getElementById("notice_cnt");
    console.log(data);
    if (!noticeCnt && data) return;
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

  const [category, setCategory] = useState<
    "title" | "subject" | "date" | undefined
  >("date");
  const categoryToLabel = {
    title: "제목",
    subject: "과목",
    date: "날짜"
  };
  const dataList = data
    ? category
      ? Object.groupBy(data.data, (data) => {
          switch (category) {
            case "title":
              return data.title;
            case "subject":
              return data.subject || "기타";
            case "date":
              const fullDate = data.day.match(/(\d{2})\.(\d{2})/);
              if (fullDate) return `${fullDate[1]}월 ${fullDate[2]}일`;
              const date = data.day.match(/\d일 전/);
              if (date) return `${date[0]}`;
              if (data.day.startsWith("어제")) return "어제";
              return "오늘";
          }
        })
      : data.data
    : [];
  const isValidData = (data: NotiData) =>
    (selectedSubjects.size == 0 || selectedSubjects.has(data.subject)) &&
    (selectedTitles.size == 0 || selectedTitles.has(data.title));

  return (
    <div
      className={styles.vancedNotiContainer}
      onClick={(e) => e.stopPropagation()}>
      <div className={styles.vancedNotiFilterBar}>
        {Object.keys(categoryToLabel).map((key) => (
          <button
            key={key}
            className={styles.vancedNotiFilterBtn}
            aria-selected={category === key}
            onClick={() =>
              setCategory((p) => (p === key ? undefined : (key as any)))
            }>
            {categoryToLabel[key]}
          </button>
        ))}
      </div>
      <div className={styles.vancedSaperator} />
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
      {Array.isArray(dataList) ? (
        <div className={styles.vancedNotiList}>
          {dataList.map(
            (d, i) => isValidData(d) && <NotiDataCard key={i} {...d} />
          )}
        </div>
      ) : (
        Object.entries(dataList).map(
          ([cate, data]) =>
            data.some(isValidData) && (
              <div key={cate} style={{ marginTop: "16px" }}>
                <h3>{cate}</h3>
                <div className={styles.vancedSaperator} />
                <div className={styles.vancedNotiList}>
                  {data.map(
                    (d, i) => isValidData(d) && <NotiDataCard key={i} {...d} />
                  )}
                </div>
              </div>
            )
        )
      )}
    </div>
  );
}

function NotiDataCard(data: NotiData) {
  return (
    <div
      onClick={() =>
        (document.location.href = `/ilos/mp/notification_connect.acl?NOTIFIER_SEQ=${data.id}`)
      }
      className={styles.vancedNotiCard}>
      <p style={{ fontWeight: "bold" }}>
        <span style={{ color: "#205D9E" }}>{data.title}</span> {data.subject}
      </p>
      <p style={{ fontSize: "1.2em", fontWeight: 500, flex: 1 }}>{data.text}</p>
      <p
        style={{
          fontWeight: "lighter",
          fontSize: "0.85em"
        }}>
        {data.day}
      </p>
    </div>
  );
}
