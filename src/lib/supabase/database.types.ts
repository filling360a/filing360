// Mirrors supabase/migrations. Regenerate with:
//   npx supabase gen types typescript --project-id <id> --schema public > src/lib/supabase/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = "admin" | "sales" | "editor" | "hr";
export type JobStatus = "draft" | "open" | "paused" | "closed";
export type EmploymentType = "full_time" | "part_time" | "contract" | "internship";
export type WorkplaceType = "onsite" | "hybrid" | "remote";
export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "interview"
  | "offered"
  | "hired"
  | "rejected"
  | "withdrawn";
export type ApplicationActivityType =
  | "created"
  | "status_changed"
  | "assigned"
  | "rating_changed"
  | "note"
  | "email_sent"
  | "resume_viewed";
export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost" | "spam";
export type LeadPriority = "low" | "normal" | "high" | "urgent";
export type LeadActivityType =
  | "created"
  | "resubmitted"
  | "status_changed"
  | "assigned"
  | "priority_changed"
  | "follow_up_set"
  | "note"
  | "call"
  | "email_sent"
  | "updated";
export type PostStatus = "draft" | "scheduled" | "published" | "archived";

type ProfileRow = {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole | null;
  is_active: boolean;
  job_title: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

type LeadRow = {
  id: string;
  ref: string;
  salutation: string | null;
  name: string;
  email: string | null;
  phone: string;
  city: string | null;
  interest: string | null;
  service_slug: string | null;
  message: string | null;
  source: string;
  page_url: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  status: LeadStatus;
  priority: LeadPriority;
  assigned_to: string | null;
  estimated_value: number | null;
  next_follow_up_at: string | null;
  last_contacted_at: string | null;
  lost_reason: string | null;
  tags: string[];
  submission_count: number;
  consent: boolean;
  ip_hash: string | null;
  user_agent: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

type LeadActivityRow = {
  id: string;
  lead_id: string;
  actor_id: string | null;
  type: LeadActivityType;
  body: string | null;
  meta: Json;
  created_at: string;
};

type EmailLogRow = {
  id: string;
  lead_id: string | null;
  application_id: string | null;
  to_email: string;
  subject: string;
  template: string;
  provider_id: string | null;
  status: "sent" | "failed" | "skipped";
  error: string | null;
  sent_by: string | null;
  created_at: string;
};

type BlogCategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category_id: string | null;
  tags: string[];
  status: PostStatus;
  published_at: string | null;
  author_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  canonical_url: string | null;
  noindex: boolean;
  reading_minutes: number;
  word_count: number;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

type BlogPostRevisionRow = {
  id: string;
  post_id: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  edited_by: string | null;
  created_at: string;
};

type RateLimitHitRow = {
  id: number;
  key: string;
  created_at: string;
};

type JobRow = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  workplace_type: WorkplaceType;
  employment_type: EmploymentType;
  experience_min: number;
  experience_max: number | null;
  salary_min: number | null;
  salary_max: number | null;
  show_salary: boolean;
  openings: number;
  summary: string | null;
  description_html: string;
  responsibilities: string[];
  requirements: string[];
  nice_to_have: string[];
  benefits: string[];
  skills: string[];
  screening_questions: Json;
  status: JobStatus;
  published_at: string | null;
  closes_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

type JobApplicationRow = {
  id: string;
  ref: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  current_city: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  total_experience: number | null;
  current_ctc: number | null;
  expected_ctc: number | null;
  notice_period_days: number | null;
  cover_letter: string | null;
  answers: Json;
  resume_path: string;
  resume_name: string;
  resume_size: number;
  resume_type: string;
  status: ApplicationStatus;
  rating: number | null;
  assigned_to: string | null;
  source: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  consent: boolean;
  ip_hash: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
};

type ApplicationActivityRow = {
  id: string;
  application_id: string;
  actor_id: string | null;
  type: ApplicationActivityType;
  body: string | null;
  meta: Json;
  created_at: string;
};

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Optional<
          ProfileRow,
          "full_name" | "role" | "is_active" | "job_title" | "bio" | "avatar_url" | "created_at" | "updated_at"
        >;
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: Optional<
          LeadRow,
          | "id"
          | "ref"
          | "salutation"
          | "email"
          | "city"
          | "interest"
          | "service_slug"
          | "message"
          | "source"
          | "page_url"
          | "referrer"
          | "utm_source"
          | "utm_medium"
          | "utm_campaign"
          | "utm_term"
          | "utm_content"
          | "gclid"
          | "status"
          | "priority"
          | "assigned_to"
          | "estimated_value"
          | "next_follow_up_at"
          | "last_contacted_at"
          | "lost_reason"
          | "tags"
          | "submission_count"
          | "consent"
          | "ip_hash"
          | "user_agent"
          | "created_by"
          | "created_at"
          | "updated_at"
        >;
        Update: Partial<LeadRow>;
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leads_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_activities: {
        Row: LeadActivityRow;
        Insert: Optional<LeadActivityRow, "id" | "actor_id" | "body" | "meta" | "created_at">;
        Update: Partial<LeadActivityRow>;
        Relationships: [
          {
            foreignKeyName: "lead_activities_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_activities_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      email_logs: {
        Row: EmailLogRow;
        Insert: Optional<
          EmailLogRow,
          "id" | "lead_id" | "application_id" | "provider_id" | "error" | "sent_by" | "created_at"
        >;
        Update: Partial<EmailLogRow>;
        Relationships: [
          {
            foreignKeyName: "email_logs_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "email_logs_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "job_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "email_logs_sent_by_fkey";
            columns: ["sent_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      rate_limit_hits: {
        Row: RateLimitHitRow;
        Insert: Optional<RateLimitHitRow, "id" | "created_at">;
        Update: Partial<RateLimitHitRow>;
        Relationships: [];
      };
      blog_categories: {
        Row: BlogCategoryRow;
        Insert: Optional<BlogCategoryRow, "id" | "description" | "sort_order" | "created_at" | "updated_at">;
        Update: Partial<BlogCategoryRow>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostRow;
        Insert: Optional<
          BlogPostRow,
          | "id"
          | "excerpt"
          | "content_html"
          | "cover_image_url"
          | "cover_image_alt"
          | "category_id"
          | "tags"
          | "status"
          | "published_at"
          | "author_id"
          | "seo_title"
          | "seo_description"
          | "focus_keyword"
          | "canonical_url"
          | "noindex"
          | "reading_minutes"
          | "word_count"
          | "created_by"
          | "updated_by"
          | "created_at"
          | "updated_at"
        >;
        Update: Partial<BlogPostRow>;
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "blog_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_posts_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_posts_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_post_revisions: {
        Row: BlogPostRevisionRow;
        Insert: Optional<BlogPostRevisionRow, "id" | "excerpt" | "edited_by" | "created_at">;
        Update: Partial<BlogPostRevisionRow>;
        Relationships: [
          {
            foreignKeyName: "blog_post_revisions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "blog_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_post_revisions_edited_by_fkey";
            columns: ["edited_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      jobs: {
        Row: JobRow;
        Insert: Optional<
          JobRow,
          | "id"
          | "location"
          | "workplace_type"
          | "employment_type"
          | "experience_min"
          | "experience_max"
          | "salary_min"
          | "salary_max"
          | "show_salary"
          | "openings"
          | "summary"
          | "description_html"
          | "responsibilities"
          | "requirements"
          | "nice_to_have"
          | "benefits"
          | "skills"
          | "screening_questions"
          | "status"
          | "published_at"
          | "closes_at"
          | "created_by"
          | "updated_by"
          | "created_at"
          | "updated_at"
        >;
        Update: Partial<JobRow>;
        Relationships: [
          {
            foreignKeyName: "jobs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "jobs_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      job_applications: {
        Row: JobApplicationRow;
        Insert: Optional<
          JobApplicationRow,
          | "id"
          | "ref"
          | "current_city"
          | "linkedin_url"
          | "portfolio_url"
          | "total_experience"
          | "current_ctc"
          | "expected_ctc"
          | "notice_period_days"
          | "cover_letter"
          | "answers"
          | "status"
          | "rating"
          | "assigned_to"
          | "source"
          | "referrer"
          | "utm_source"
          | "utm_medium"
          | "utm_campaign"
          | "consent"
          | "ip_hash"
          | "user_agent"
          | "created_at"
          | "updated_at"
        >;
        Update: Partial<JobApplicationRow>;
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_applications_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      application_activities: {
        Row: ApplicationActivityRow;
        Insert: Optional<ApplicationActivityRow, "id" | "actor_id" | "body" | "meta" | "created_at">;
        Update: Partial<ApplicationActivityRow>;
        Relationships: [
          {
            foreignKeyName: "application_activities_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "job_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "application_activities_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      check_rate_limit: {
        Args: { p_key: string; p_limit: number; p_window_seconds: number };
        Returns: boolean;
      };
      current_app_role: {
        Args: Record<string, never>;
        Returns: AppRole;
      };
      has_role: {
        Args: { roles: AppRole[] };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: AppRole;
      lead_status: LeadStatus;
      lead_priority: LeadPriority;
      lead_activity_type: LeadActivityType;
      post_status: PostStatus;
      job_status: JobStatus;
      employment_type: EmploymentType;
      workplace_type: WorkplaceType;
      application_status: ApplicationStatus;
      application_activity_type: ApplicationActivityType;
    };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
