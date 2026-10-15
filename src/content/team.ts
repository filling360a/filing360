/**
 * Real people only. Add a member here and the /team page goes live (it stays
 * noindexed while this list is empty). Photos go in /public/images/team/.
 */
export type TeamMember = {
  name: string;
  role: string;
  /** e.g. "FCA", "ACS", "LLB" */
  qualifications?: string;
  /** ICAI / ICSI / Bar Council membership number — shown publicly for trust. */
  membershipNo?: string;
  experienceYears?: number;
  bio: string;
  expertise?: string[];
  photo?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [];
