// localStorageHelper.js
// Handles client-side state persistence for Annai Therasa Home Admin Dashboard

const SEED_DONATIONS = [
  {
    id: 'don_1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '9876543210',
    pan: 'ABCDE1234F',
    amount: 10000,
    frequency: 'one-time',
    paymentMethod: 'upi',
    date: '2026-07-02T10:15:30.000Z',
    campaignId: 'camp_education',
    campaignName: 'Vidya Scholarship (Education)',
  },
  {
    id: 'don_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@yahoo.com',
    phone: '9823456789',
    pan: 'FGHIJ5678K',
    amount: 2500,
    frequency: 'monthly',
    paymentMethod: 'card',
    date: '2026-07-05T14:30:00.000Z',
    campaignId: 'camp_healthcare',
    campaignName: 'Rural Mobile Clinics (Healthcare)',
  },
  {
    id: 'don_3',
    name: 'Amit Patel',
    email: 'amit.patel@outlook.com',
    phone: '9812345670',
    pan: 'KLMNO9012P',
    amount: 5000,
    frequency: 'one-time',
    paymentMethod: 'netbank',
    date: '2026-07-06T18:45:00.000Z',
    campaignId: 'camp_livelihood',
    campaignName: 'Women Livelihood Center (Livelihood)',
  },
  {
    id: 'don_4',
    name: 'Sneha Reddy',
    email: 'sneha.r@gmail.com',
    phone: '9890123456',
    pan: '',
    amount: 1000,
    frequency: 'monthly',
    paymentMethod: 'upi',
    date: '2026-07-08T09:00:00.000Z',
    campaignId: 'camp_environment',
    campaignName: 'Green Villages (Solar Grid)',
  },
  {
    id: 'don_5',
    name: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    phone: '9834567890',
    pan: 'PQRST3456U',
    amount: 25000,
    frequency: 'one-time',
    paymentMethod: 'netbank',
    date: '2026-07-09T11:20:00.000Z',
    campaignId: 'camp_general',
    campaignName: 'General Fund',
  },
  {
    id: 'don_6',
    name: 'Anjali Gupta',
    email: 'anjali.g@gmail.com',
    phone: '9765432109',
    pan: 'ASDGH7890J',
    amount: 1500,
    frequency: 'one-time',
    paymentMethod: 'upi',
    date: '2026-07-10T16:40:00.000Z',
    campaignId: 'camp_education',
    campaignName: 'Vidya Scholarship (Education)',
  }
];

const SEED_QUERIES = [
  {
    id: 'qry_1',
    name: 'Subhash Chandra',
    email: 's.chandra@tcs.com',
    subject: 'CSR Funding / Sponsorship Opportunities',
    message: 'Greetings. Our corporate CSR board is interested in sponsoring a new digital lab/computer center in a rural Tamil Nadu secondary school. Could you provide us with a detailed proposal and budget breakdown? We need to verify your Ministry of Corporate Affairs registration. Thank you.',
    date: '2026-07-08T11:05:00.000Z',
    status: 'Pending',
    category: 'CSR Sponsorship',
    reply: ''
  },
  {
    id: 'qry_2',
    name: 'Meera Nair',
    email: 'meera.nair@gmail.com',
    subject: 'Volunteering for Medical Clinics',
    message: 'Hello, I am a certified nurse practitioner based in Chennai. I would love to volunteer for your mobile medical clinics and weekend treatment camps. Please let me know the calendar of operations and the registration/onboarding process.',
    date: '2026-07-09T08:14:00.000Z',
    status: 'Replied',
    category: 'Volunteering',
    reply: 'Hello Meera, thank you for reaching out to us. We would be absolutely thrilled to have your expertise onboard. Our next mobile medical clinic is scheduled for July 18th in Kanchipuram district. I have emailed you our volunteer onboarding details and code of conduct. Looking forward to working together!'
  },
  {
    id: 'qry_3',
    name: 'Karthik Raja',
    email: 'karthik.raja@yahoo.co.in',
    subject: 'Tax Receipt Issue (80G Exemption)',
    message: 'Dear Sir, I completed a donation of Rs. 2,500 online on July 8th. I received the generic payment success notification, but I have not yet received the official Section 80G tax-deductible receipt. Can you check if my PAN ABCDE1234F is registered and resend the email? Thank you.',
    date: '2026-07-10T07:22:00.000Z',
    status: 'Pending',
    category: 'Tax Receipt',
    reply: ''
  },
  {
    id: 'qry_4',
    name: 'Lakshmi Prasad',
    email: 'lakshmi.p@live.in',
    subject: 'General School Kit Costs',
    message: 'How much does it cost to fully support study kits (bags, textbooks, stationery) for a classroom of 30 rural children? Do you support modular school grants where we can track the children progress?',
    date: '2026-07-11T05:30:00.000Z',
    status: 'Pending',
    category: 'General',
    reply: ''
  }
];

const SEED_CAMPAIGNS = [
  {
    id: 'camp_education',
    name: 'Vidya Scholarship (Education)',
    target: 500000,
    raised: 331500, // Pre-seeded sum + Rajesh (10k) + Anjali (1.5k)
    category: 'Education',
    description: 'Providing textbooks, study materials, and school fees to children in need.'
  },
  {
    id: 'camp_healthcare',
    name: 'Rural Mobile Clinics (Healthcare)',
    target: 350000,
    raised: 212500, // Pre-seeded sum + Priya (2.5k)
    category: 'Healthcare',
    description: 'Running mobile diagnostic health checkups and distributing medicines.'
  },
  {
    id: 'camp_livelihood',
    name: 'Women Livelihood Center (Livelihood)',
    target: 250000,
    raised: 185000, // Pre-seeded sum + Amit (5k)
    category: 'Livelihood',
    description: 'Vocational training courses in tailoring, handicrafts, and basic technology.'
  },
  {
    id: 'camp_environment',
    name: 'Green Villages (Solar Grid)',
    target: 400000,
    raised: 121000, // Pre-seeded sum + Sneha (1k)
    category: 'Environment',
    description: 'Installing solar street lamps and environmental support systems in grids.'
  },
  {
    id: 'camp_general',
    name: 'General Fund',
    target: 200000,
    raised: 125000, // Pre-seeded sum + Vikram (25k)
    category: 'General',
    description: 'Flexible funds used to maintain office operations and urgent outreach.'
  }
];

const SEED_GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Media' },
  { id: 'education', label: 'Education' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'community', label: 'Community' },
  { id: 'environment', label: 'Environment' }
];

const SEED_GALLERY_ITEMS = [
  {
    id: 1,
    src: '/images/hero.png',
    category: 'education',
    title: 'Vidya Scholarship Distribution 2025',
    date: 'Jan 2026',
    description: 'Distribution of scholarships and textbooks to students at the regional community hall.'
  },
  {
    id: 2,
    src: '/images/medical.png',
    category: 'healthcare',
    title: 'Mobile Medical Van Diagnostics',
    date: 'Dec 2025',
    description: 'Arogya health outreach checking senior citizens in the interior villages.'
  },
  {
    id: 3,
    src: '/images/women.png',
    category: 'community',
    title: 'Tailoring & Craft Training Seminar',
    date: 'Nov 2025',
    description: 'Vocational training lab helping local women create artisan textiles.'
  },
  {
    id: 4,
    src: '/images/green.png',
    category: 'environment',
    title: 'Afforestation Drive & Tree Guard Fitment',
    date: 'Oct 2025',
    description: 'Youth volunteers securing native saplings to restore local water levels.'
  },
  {
    id: 5,
    src: '/images/hero.png',
    category: 'education',
    title: 'Rural Computer Center Opening',
    date: 'Sep 2025',
    description: 'First digital classroom set up with desktop systems in district high school.'
  },
  {
    id: 6,
    src: '/images/medical.png',
    category: 'healthcare',
    title: 'Free Cataract Detection Camps',
    date: 'Aug 2025',
    description: 'Doctors conducting high-precision ocular tests for rural farmers.'
  },
  {
    id: 7,
    src: '/images/women.png',
    category: 'community',
    title: 'Micro-Finance & Self-Help Group Meet',
    date: 'Jul 2025',
    description: 'Advisory panel training graduates on business budget sheets.'
  },
  {
    id: 8,
    src: '/images/green.png',
    category: 'environment',
    title: 'Solar Streetlight Commissioning',
    date: 'Jun 2025',
    description: 'First set of clean-energy solar lamp posts installed along main village road.'
  }
];

const SEED_SERVICES = [
  {
    id: 'special-ed',
    category: 'education',
    title: 'Special Education & Rehabilitation',
    shortDesc: 'Tailored learning programs and physical therapy for intellectually impaired residents.',
    longDesc: 'Our Special Education initiative focuses on the holistic development of our residents. We provide individualized education plans (IEP), speech therapy, and physiotherapy. Our goal is to improve their cognitive abilities, motor skills, and daily functional independence.',
    metric: '50+ Residents Supported',
    image: '/images/hero.png',
    icon: 'BookOpen',
    subProjects: ['Speech & Language Therapy', 'Physiotherapy Sessions', 'Activity-Based Learning', 'Basic Life Skills Training'],
    impactTestimony: '"My son has shown incredible improvement in his communication and daily routines since joining the home." — Parent of a resident.'
  },
  {
    id: 'health-care',
    category: 'healthcare',
    title: 'Comprehensive Medical Care',
    shortDesc: '24/7 medical supervision, psychiatric consultations, and nutritional support.',
    longDesc: 'Ensuring the physical and mental well-being of our residents is our top priority. We offer round-the-clock nursing care, regular psychiatric evaluations, and specialized nutritional diets to cater to the unique health needs of the intellectually impaired and handicapped.',
    metric: '100% Health Monitored',
    image: '/images/medical.png',
    icon: 'Activity',
    subProjects: ['Routine Health Checkups', 'Psychiatric Consultations', 'Medication Management', 'Dietary & Nutritional Care'],
    impactTestimony: '"The continuous medical attention and tailored diet have significantly improved the overall health of the residents." — Visiting Physician.'
  },
  {
    id: 'vocational',
    category: 'livelihood',
    title: 'Vocational & Craft Training',
    shortDesc: 'Skill-building in handicrafts, tailoring, and eco-friendly product creation.',
    longDesc: 'To foster self-esteem and a sense of accomplishment, we conduct vocational training tailored to the abilities of our residents. Activities include making paper bags, weaving mats, tailoring, and creating eco-friendly crafts, helping them contribute meaningfully.',
    metric: '30+ Actively Engaged',
    image: '/images/women.png',
    icon: 'Heart',
    subProjects: ['Paper Bag Making', 'Handloom & Mat Weaving', 'Candle Making', 'Basic Tailoring'],
    impactTestimony: '"Seeing them joyfully create these beautiful crafts and take pride in their work is truly heartwarming." — Vocational Trainer.'
  },
  {
    id: 'advocacy',
    category: 'community',
    title: 'Community Advocacy & Support',
    shortDesc: 'Raising awareness, securing disability certificates, and fighting for equal rights.',
    longDesc: 'We actively advocate for the rights of the disabled community. Our team assists families in navigating government procedures to secure disability certificates, disability pensions, and access to state-sponsored schemes, ensuring they receive their rightful benefits.',
    metric: '200+ Families Assisted',
    image: '/images/hero.png',
    icon: 'Shield',
    subProjects: ['Disability Certification Drives', 'Pension Application Assistance', 'Awareness Campaigns', 'Legal Rights Workshops'],
    impactTestimony: '"Annai Therasa Home guided us through the complex process of securing my daughter\'s disability pension." — Grateful Mother.'
  }
];

export const initializeDatabase = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem('ponnar_donations')) {
    localStorage.setItem('ponnar_donations', JSON.stringify(SEED_DONATIONS));
  }
  if (!localStorage.getItem('ponnar_queries')) {
    localStorage.setItem('ponnar_queries', JSON.stringify(SEED_QUERIES));
  }
  if (!localStorage.getItem('ponnar_campaigns')) {
    localStorage.setItem('ponnar_campaigns', JSON.stringify(SEED_CAMPAIGNS));
  }
  if (!localStorage.getItem('ponnar_gallery_categories')) {
    localStorage.setItem('ponnar_gallery_categories', JSON.stringify(SEED_GALLERY_CATEGORIES));
  }
  if (!localStorage.getItem('ponnar_gallery_items')) {
    localStorage.setItem('ponnar_gallery_items', JSON.stringify(SEED_GALLERY_ITEMS));
  }
  
  // Force update the services data to reflect the new Annai Therasa Home mission
  localStorage.removeItem('ponnar_services');
  if (!localStorage.getItem('ponnar_services')) {
    localStorage.setItem('ponnar_services', JSON.stringify(SEED_SERVICES));
  }
};

export const getDonations = () => {
  initializeDatabase();
  const data = localStorage.getItem('ponnar_donations');
  return data ? JSON.parse(data) : [];
};

export const getQueries = () => {
  initializeDatabase();
  const data = localStorage.getItem('ponnar_queries');
  return data ? JSON.parse(data) : [];
};

export const getCampaigns = () => {
  initializeDatabase();
  const data = localStorage.getItem('ponnar_campaigns');
  return data ? JSON.parse(data) : [];
};

export const addDonation = (donation) => {
  initializeDatabase();
  const donations = getDonations();
  const newDonation = {
    id: 'don_' + Date.now(),
    date: new Date().toISOString(),
    ...donation,
  };
  
  // Append donation
  donations.unshift(newDonation);
  localStorage.setItem('ponnar_donations', JSON.stringify(donations));

  // Update campaign progress
  const campaigns = getCampaigns();
  const updatedCampaigns = campaigns.map(camp => {
    if (camp.id === donation.campaignId) {
      return {
        ...camp,
        raised: camp.raised + Number(donation.amount)
      };
    }
    return camp;
  });
  localStorage.setItem('ponnar_campaigns', JSON.stringify(updatedCampaigns));

  return newDonation;
};

export const addQuery = (query) => {
  initializeDatabase();
  const queries = getQueries();
  
  // Try to determine category based on message/subject
  let category = 'General';
  const text = ((query.subject || '') + ' ' + (query.message || '')).toLowerCase();
  if (text.includes('volunteer') || text.includes('help') || text.includes('join')) {
    category = 'Volunteering';
  } else if (text.includes('csr') || text.includes('corporate') || text.includes('sponsor')) {
    category = 'CSR Sponsorship';
  } else if (text.includes('tax') || text.includes('receipt') || text.includes('80g') || text.includes('pan')) {
    category = 'Tax Receipt';
  }

  const newQuery = {
    id: 'qry_' + Date.now(),
    date: new Date().toISOString(),
    status: 'Pending',
    category,
    reply: '',
    ...query,
  };

  queries.unshift(newQuery);
  localStorage.setItem('ponnar_queries', JSON.stringify(queries));
  return newQuery;
};

export const replyToQuery = (queryId, replyText) => {
  initializeDatabase();
  const queries = getQueries();
  const updated = queries.map(q => {
    if (q.id === queryId) {
      return {
        ...q,
        status: 'Replied',
        reply: replyText
      };
    }
    return q;
  });
  localStorage.setItem('ponnar_queries', JSON.stringify(updated));
  return updated.find(q => q.id === queryId);
};

export const updateCampaignGoal = (campaignId, newTarget) => {
  initializeDatabase();
  const campaigns = getCampaigns();
  const updated = campaigns.map(c => {
    if (c.id === campaignId) {
      return {
        ...c,
        target: Number(newTarget)
      };
    }
    return c;
  });
  localStorage.setItem('ponnar_campaigns', JSON.stringify(updated));
  return updated;
};

// --- Gallery Categories ---
export const getGalleryCategories = () => {
  initializeDatabase();
  const data = localStorage.getItem('ponnar_gallery_categories');
  return data ? JSON.parse(data) : [];
};

export const addGalleryCategory = (category) => {
  initializeDatabase();
  const categories = getGalleryCategories();
  const newCategory = { ...category }; // Ensure id and label exist
  categories.push(newCategory);
  localStorage.setItem('ponnar_gallery_categories', JSON.stringify(categories));
  return newCategory;
};

export const updateGalleryCategory = (id, updatedCategory) => {
  initializeDatabase();
  const categories = getGalleryCategories();
  const updated = categories.map(c => c.id === id ? { ...c, ...updatedCategory } : c);
  localStorage.setItem('ponnar_gallery_categories', JSON.stringify(updated));
  return updated;
};

export const deleteGalleryCategory = (id) => {
  initializeDatabase();
  const categories = getGalleryCategories();
  const updated = categories.filter(c => c.id !== id);
  localStorage.setItem('ponnar_gallery_categories', JSON.stringify(updated));
  return updated;
};

// --- Gallery Items ---
export const getGalleryItems = () => {
  initializeDatabase();
  const data = localStorage.getItem('ponnar_gallery_items');
  return data ? JSON.parse(data) : [];
};

export const addGalleryItem = (item) => {
  initializeDatabase();
  const items = getGalleryItems();
  const maxId = items.reduce((max, i) => (i.id > max ? i.id : max), 0);
  const newItem = { ...item, id: maxId + 1 };
  items.unshift(newItem); // Add to the top
  localStorage.setItem('ponnar_gallery_items', JSON.stringify(items));
  return newItem;
};

export const updateGalleryItem = (id, updatedItem) => {
  initializeDatabase();
  const items = getGalleryItems();
  const updated = items.map(i => i.id === id ? { ...i, ...updatedItem } : i);
  localStorage.setItem('ponnar_gallery_items', JSON.stringify(updated));
  return updated;
};

export const deleteGalleryItem = (id) => {
  initializeDatabase();
  const items = getGalleryItems();
  const updated = items.filter(i => i.id !== id);
  localStorage.setItem('ponnar_gallery_items', JSON.stringify(updated));
  return updated;
};

// --- Services ---
export const getServices = () => {
  initializeDatabase();
  const data = localStorage.getItem('ponnar_services');
  return data ? JSON.parse(data) : [];
};

export const addService = (service) => {
  initializeDatabase();
  const services = getServices();
  const newService = { ...service, id: 'srv_' + Date.now() };
  services.push(newService);
  localStorage.setItem('ponnar_services', JSON.stringify(services));
  return newService;
};

export const updateService = (id, updatedService) => {
  initializeDatabase();
  const services = getServices();
  const updated = services.map(s => s.id === id ? { ...s, ...updatedService } : s);
  localStorage.setItem('ponnar_services', JSON.stringify(updated));
  return updated;
};

export const deleteService = (id) => {
  initializeDatabase();
  const services = getServices();
  const updated = services.filter(s => s.id !== id);
  localStorage.setItem('ponnar_services', JSON.stringify(updated));
  return updated;
};

