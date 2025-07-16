export interface ICVScreeningReportResponse {
  id: number,
  full_name: string,
  position: string,
  score: number,
  format_and_structure_score: number,
  suitability_score: number,
  experiences_score: number,
  profile_summary_score: number,
  work_experience_score: number,
  education_score: number,
  skills_score: number,
  certifications_score: number,
  projects_score: number,
  achievements_score: number,
  strengths: Array<string>;
  weaknesses: Array<string>;
  opportunities: Array<string>;
  threats: Array<string>;
  revisions: Array<{
    label: string;
    detail: string;
  }>;
}

export interface IGoogleAuthResponse {
  key: string;
  user: {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
  };
}

export interface IRegisterResponse {
  message: string;
  user: { username: string; email: string };
  token: string;
}

export interface ISchedule {
  id: number;
  start_time: string;
  end_time: string;
  booked_sessions: number;
  remaining_capacity: number;
}

export interface IScheduleResponse {
  status: number;
  message: string;
  date: string;
  start_time: string;
  end_time: string;
  posisi: string;
  jenis_wawancara: string;
  booking_code: string;
}

export interface IInterview {
  id: number;
  date: string;
  booking_code: string;
  tier: string;
  final_score: number | null;
  status: "Pending" | "Scheduled" | "Completed" | "Cancelled";
  tingkatan: string;
  jenis_wawancara: string;
  posisi: string;
  industri: string;
  nama_perusahaan: string;
  detail_pekerjaan: string;
  skor_keseluruhan: 90;
  summary: string;
  domisili_saat_ini: string;
  kekuatan: string;
  kelemahan: string;
  tools: string;
  pendidikan: string;
  pengalaman_relevan: string;
  portofolio: string;
  sertifikasi: string;
  years_of_experience: number;
  user_profile: number;
  schedule: number;
}

export interface GladiaResponse {
  id: string;
  url: string;
}

export type HeygenInitiateSessionResponse = {
  message: string;
  token: string; // for send or stop task
  session_id: string; // for send or stop task
  livekit_connection: {
    server_url: string;
    token: string;
  };
};
