/** Independent primary sources checked 27 October 2026. These are examples from the field, not company projects. */
export const science = {
  title: 'The Science of Allocation',
  description: 'How matching theory and market design shape real allocation decisions, from school places and medical training to donor exchange and scarce resources.',
  headline: ['The science', 'of allocation.'],
  intro: 'Who gets a place, a position or a scarce resource? Matching theory and market design turn that question into something we can study—and improve.',
  sources: {
    nobel: { number: '01', name: 'NobelPrize.org', title: '2012 Economic Sciences Prize · official announcement', href: 'https://www.nobelprize.org/prizes/economic-sciences/2012/press-release/' },
    nrmp: { number: '02', name: 'NRMP', title: 'How the matching algorithm works', href: 'https://www.nrmp.org/intro-to-the-match/how-matching-algorithm-works/' },
    roth: { number: '03', name: 'NobelPrize.org', title: 'Alvin E. Roth · collaborations in school choice and kidney exchange', href: 'https://www.nobelprize.org/prizes/economic-sciences/2012/roth/biographical/' },
    bc: { number: '04', name: 'Boston College', title: 'Matching design and the first four-way liver exchange · 2023', href: 'https://www.bc.edu/bc-web/sites/bc-news/articles/2023/fall/boston-college-researchers-enable-first-four-way-liver-exchange.html' },
    inonu: { number: '05', name: 'İnönü University', title: 'Eight-way liver exchange · 15 June 2026', href: 'https://www.inonu.edu.tr/inuhaber/haber/11585/%40INUHABERMerkezi' },
    auctions: { number: '06', name: 'NobelPrize.org', title: 'Auction design in practice · 2020 Economic Sciences Prize', href: 'https://www.nobelprize.org/prizes/economic-sciences/2020/press-release/' },
  },
  concepts: [
    { number: '01', title: 'Matching theory', question: 'Who can be matched with whom?', body: 'Studies how people and opportunities can be matched when preferences, eligibility and capacity all matter.' },
    { number: '02', title: 'Market design', question: 'Which rules make the process work?', body: 'Designs the institution around the allocation: how people participate, what information they provide, how priorities are applied and how decisions are made. Many of these settings do not use prices.' },
    { number: '03', title: 'Optimization', question: 'What can be achieved within the rules?', body: 'Finds feasible allocations under real constraints and compares them against explicit objectives, such as capacity use or workload balance.' },
  ],
  applications: [
    { number: '01', title: 'School choice', subject: 'Students × school places', body: 'Families express preferences. Schools have limited seats and admission priorities. Matching mechanisms consider these inputs together to determine placements.', source: 'roth' },
    { number: '02', title: 'Medical training', subject: 'Applicants × residency positions', body: 'Applicants and training programs rank each other. Matching mechanisms bring both sides’ preferences into a coordinated placement process.', source: 'nrmp' },
    { number: '03', title: 'Donor exchange', subject: 'Patient–donor pairs × compatibility', body: 'A willing donor may be unable to donate to their intended recipient. Exchanges across pairs can create compatible opportunities that are unavailable within each pair.', source: 'bc' },
    { number: '04', title: 'Auctions & spectrum', subject: 'Bidders × scarce rights', body: 'Auction formats determine how bids become allocations and payments. Spectrum auctions show how research can shape the rules for allocating scarce public resources.', source: 'auctions' },
  ],
} as const;
export type ScienceSourceKey = keyof typeof science.sources;
