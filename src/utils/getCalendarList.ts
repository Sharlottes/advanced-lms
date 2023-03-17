export const getCalendarList = async () => {
  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList"
  );
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
};
