/** Public facts are limited to the user's brief and sources listed in docs/SOURCES.md. */
export const site = {
  name: 'Match & Design',
  legalName: 'Match & Design Bilişim A.Ş.',
  language: 'en',
  eduscopeUrl: 'https://scheduler.com.tr',
  // Public contact address specified by the user on 27 October 2026.
  contactEmail: 'furkan@matchanddesign.com',
  contactSubject: 'An allocation problem — Match & Design',
} as const;

export const EDUSCOPE_URL = site.eduscopeUrl;
export const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(site.contactSubject)}`;

export const navigation = [
  { label: 'Approach', href: '/approach/' },
  { label: 'Applications', href: '/work/' },
  { label: 'Market Design', href: '/market-design/' },
  { label: 'About', href: '/about/' },
] as const;
