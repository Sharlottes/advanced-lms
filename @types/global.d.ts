interface Data {
  titles: string[];
  subjects: string[];
  data: NotiData[];
}
interface NotiData {
  listener: string;
  subject: string;
  day: string;
  text: string;
  title: string;
}
