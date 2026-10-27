/** A complete, strict-preference 2×2 teaching example. No customer data. */
export const preferences = {
  applicants: { A: ['Y', 'X'], B: ['X', 'Y'] },
  mentors: { X: ['A', 'B'], Y: ['A', 'B'] },
} as const;
export type Applicant = keyof typeof preferences.applicants;
export type Mentor = keyof typeof preferences.mentors;
export type Matching = Record<Applicant, Mentor>;
export const initialMatching: Matching = { A: 'X', B: 'Y' };
export const resolvedMatching: Matching = { A: 'Y', B: 'X' };
export interface RankingProfile { applicants: Record<Applicant, readonly Mentor[]>; mentors: Record<Mentor, readonly Applicant[]>; }

export function blockingPairs(matching: Matching, profile: RankingProfile = preferences) {
  const pairs: { applicant: Applicant; mentor: Mentor }[] = [];
  for (const applicant of Object.keys(profile.applicants) as Applicant[]) {
    for (const mentor of profile.applicants[applicant]) {
      const incumbent = (Object.keys(matching) as Applicant[]).find(person => matching[person] === mentor);
      if (!incumbent || matching[applicant] === mentor) continue;
      const applicantPrefers = profile.applicants[applicant].indexOf(mentor) < profile.applicants[applicant].indexOf(matching[applicant]);
      const mentorPrefers = profile.mentors[mentor].indexOf(applicant) < profile.mentors[mentor].indexOf(incumbent);
      if (applicantPrefers && mentorPrefers) pairs.push({ applicant, mentor });
    }
  }
  return pairs;
}

export const phases = [
  { id: 'current', number: '01', title: 'The current matches', text: 'A is matched with X. B is matched with Y. Each person has one partner.', caption: 'Current matching: A–X and B–Y.' },
  { id: 'blocking', number: '02', title: 'A blocking pair appears', text: 'A prefers Y to X. Y prefers A to B. Both would choose to switch to each other.', caption: 'A and Y form a blocking pair: both prefer each other to their current partners.' },
  { id: 'resolved', number: '03', title: 'A different matching', text: 'A–Y and B–X. In this example, no unmatched pair would both prefer to switch.', caption: 'New matching: A–Y and B–X. No blocking pair remains in this example.' },
] as const;
export type Phase = typeof phases[number]['id'];
