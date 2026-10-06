/**
 * Attendance Analyzer — Central SDG Goals & Preferred Clubs Data
 * 
 * Contains our relevant United Nations Sustainable Development Goals (SDGs)
 * directly aligned with our 2 preferred campus clubs:
 * CSA (BYC Campus) & Anvaya (Central Campus).
 */

const SDG_DATA = {
  // Our 4 Relevant UN Sustainable Development Goals
  goals: [
    {
      id: 'sdg-1',
      number: 1,
      name: 'No Poverty',
      color: '#E5243B',
      bgColor: 'rgba(229, 36, 59, 0.12)',
      borderColor: 'rgba(229, 36, 59, 0.35)',
      clubAffiliation: 'CSA (BYC Campus)',
      image: 'assets/sdg1.png',
      whyRelevant: 'Directly supported through CSA (BYC Campus). Provides emergency financial relief, exam fee subsidies, and living assistance to economically disadvantaged students.'
    },
    {
      id: 'sdg-4',
      number: 4,
      name: 'Quality Education',
      color: '#C5192D',
      bgColor: 'rgba(197, 25, 45, 0.12)',
      borderColor: 'rgba(197, 25, 45, 0.35)',
      clubAffiliation: 'CSA (BYC Campus)',
      image: 'assets/sdg4.png',
      whyRelevant: 'Directly supported through CSA (BYC Campus). Empowers students with textbook lending banks, educational sponsorships, and tutoring for poor children.'
    },
    {
      id: 'sdg-10',
      number: 10,
      name: 'Reduced Inequalities',
      color: '#DD1367',
      bgColor: 'rgba(221, 19, 103, 0.12)',
      borderColor: 'rgba(221, 19, 103, 0.35)',
      clubAffiliation: 'Anvaya (Central Campus)',
      image: 'assets/sdg10.png',
      whyRelevant: 'Directly supported through Anvaya (Central Campus). Bridges socioeconomic divides by championing inclusivity, mutual student aid, and equal access.'
    },
    {
      id: 'sdg-11',
      number: 11,
      name: 'Sustainable Cities & Communities',
      color: '#FD9D24',
      bgColor: 'rgba(253, 157, 36, 0.12)',
      borderColor: 'rgba(253, 157, 36, 0.35)',
      clubAffiliation: 'Anvaya (Central Campus)',
      image: 'assets/sdg11.png',
      whyRelevant: 'Directly supported through Anvaya (Central Campus). Fosters student civic action, local community engagement, and sustainable rural village projects.'
    }
  ],

  // 2 Preferred Campus Clubs
  clubs: [
    {
      id: 'csa',
      name: 'CSA',
      fullName: 'Centre for Social Action',
      campus: 'BYC Campus (Bannerghatta Road)',
      badge: 'BYC Campus',
      tagline: 'Child Welfare & Student Financial Aid',
      color: '#10b981',
      badgeBg: '#10b981',
      badgeColor: '#ffffff',
      lightBg: 'rgba(16, 185, 129, 0.12)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      sdgTarget: 'SDG 1 & SDG 4',
      description: 'Student financial aid & child education support.'
    },
    {
      id: 'anvaya',
      name: 'Anvaya',
      fullName: 'Anvaya Community Social Engagement',
      campus: 'Central Campus (Hosur Road)',
      badge: 'Central Campus',
      tagline: 'Community Social Engagement & Youth Empowerment',
      color: '#6366f1',
      badgeBg: '#6366f1',
      badgeColor: '#ffffff',
      lightBg: 'rgba(99, 102, 241, 0.12)',
      borderColor: 'rgba(99, 102, 241, 0.35)',
      sdgTarget: 'SDG 10 & SDG 11',
      description: 'Community social outreach & student volunteerism.'
    }
  ],

  policyRules: {
    minDisbursementThreshold: 1000,
    currentPledgePct: 10,
    targetPledgePctRange: '30% – 40%+',
    distributionType: 'Equal Split',
    updateIntervalMonths: '2 to 3 months',
    refundPolicy: 'Strictly Non-Refundable (Voluntary gratuity)',
    adsAvailable: false
  }
};

// Global attachment for browsers and modules
if (typeof window !== 'undefined') {
  window.SDG_DATA = SDG_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SDG_DATA };
}
