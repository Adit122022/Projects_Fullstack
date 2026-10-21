import type { CompanyLeader, FAIRValue } from '@/domain/entities'

export const MOCK_LEADERS: CompanyLeader[] = [
  {
    id: 'leader-prateek',
    name: 'Prateek Bansal',
    role: 'Founder & CEO',
    bio: 'Leading Fairdeal’s vision to transform retail distribution across India, empowering millions of Kirana entrepreneurs with quick commerce technology.',
    linkedinUrl: 'https://www.linkedin.com/in/prateek-bansal-50b432114',
    initials: 'PB',
  },
  {
    id: 'leader-yash',
    name: 'Yash Bansal',
    role: 'Co-Founder & CIO',
    bio: 'Spearheading inventory intelligence, warehouse routing algorithms, and dark-store distribution infrastructure.',
    linkedinUrl: 'https://www.linkedin.com/in/yash-bansal-87b3951b4',
    initials: 'YB',
  },
  {
    id: 'leader-ravi',
    name: 'Ravi Chaurasia',
    role: 'VP – Technology',
    bio: 'Architecting Fairdeal’s high-throughput supply chain platform, real-time driver dispatch, and retailer mobile apps.',
    linkedinUrl: 'https://www.linkedin.com/in/ravi-chaurasia/',
    initials: 'RC',
  },
  {
    id: 'leader-aishwarya',
    name: 'Aishwarya Rana',
    role: 'Head of Operations & Supply Chain',
    bio: 'Scaling dark-store operations, last-mile rider fleet management, and brand partner fulfillment excellence across NCR.',
    linkedinUrl: 'https://www.linkedin.com/in/aishwarya-rana-091550208/',
    initials: 'AR',
  },
]

export const MOCK_FAIR_VALUES: FAIRValue[] = [
  {
    key: 'F',
    title: 'Frugality',
    tagline: 'Doing more with less',
    description:
      'Great businesses are built on doing more with less. From operations to product, we avoid waste, stay lean, and pass on the benefits to our customers. Every rupee saved is a rupee that strengthens the Kirana ecosystem.',
  },
  {
    key: 'A',
    title: 'Accountability',
    tagline: 'Owning our promises',
    description:
      'We say what we’ll do, and we do what we say. Whether it’s a 60-minute delivery promise or an internal deadline, we own our outcomes, learn from our missteps, and never pass the buck.',
  },
  {
    key: 'I',
    title: 'Innovations',
    tagline: 'Built specifically for Bharat',
    description:
      'We don’t borrow playbooks from the West and apply them to Bharat. We rethink last-mile delivery, inventory intelligence, and retail technology from the ground up, built specifically for how India buys and sells.',
  },
  {
    key: 'R',
    title: 'Relationships',
    tagline: 'Growing together with our ecosystem',
    description:
      'At our core, we’re in the relationship business. Kirana owners, suppliers, delivery partners, and our own team — we grow only when our entire ecosystem grows. Empathy, respect, and open communication guide every decision.',
  },
]
