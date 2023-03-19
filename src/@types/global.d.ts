interface LoginState {
  id: string;
  password: string;
}

type DetailType =
  | "title"
  | "submit_method"
  | "created_at"
  | "ended_at"
  | "points"
  | "late_allowed"
  | "points_showed"
  | "description";
