interface Data {
  titles: string[];
  subjects: string[];
  data: NotiData[];
}
interface NotiData {
  id: string | null;
  subject: string;
  day: string;
  text: string;
  title: string;
}
