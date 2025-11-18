'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Users, Target, TrendingUp, Award, BookOpen, CheckCircle, FileText, Video, Download, MessageSquare, BarChart3, PieChart, Activity, Globe, Zap, Droplets, Leaf, Sun, Wind, Building, DollarSign, Shield, Lightbulb, Timer, Star, AlertCircle, ChevronRight } from 'lucide-react'

interface Session {
  id: string
  title: string
  time: string
  duration: string
  type: 'plenary' | 'workshop' | 'clinic' | 'deep-dive'
  mentor: string
  focus: string
  week: number
  day: string
  objectives: string[]
  deliverables: string[]
  materials: string[]
  mandatory?: string[]
  attendance?: number
  rating?: number
}

interface Project {
  id: string
  name: string
  description: string
  focus: string
  progress: number
  milestones: {
    title: string
    description: string
    completed: boolean
    dueDate: string
  }[]
  team: {
    name: string
    role: string
    avatar: string
  }[]
  technical: {
    category: string
    specs: string[]
  }[]
  kpis: {
    metric: string
    target: string
    current: string
  }[]
  color: string
  sdgs: number[]
}

interface Mentor {
  id: string
  name: string
  title: string
  expertise: string[]
  sessions: number
  avatar: string
  bio: string
  availability: string[]
  rating: number
}

interface Resource {
  id: string
  title: string
  type: 'document' | 'video' | 'template' | 'tool'
  category: string
  description: string
  url: string
  size?: string
  duration?: string
}

const sessions: Session[] = [
  // Week 1
  { 
    id: '1.1', 
    title: 'Kick-off & ProDoc Deconstruction', 
    time: 'Monday @ 7 PM', 
    duration: '2 hours',
    type: 'plenary', 
    mentor: 'All Mentors', 
    focus: 'Introduction to the intensive 6-week journey. Detailed walkthrough of the ProDoc structure, explaining its purpose as a blueprint for funding and implementation.', 
    week: 1, 
    day: 'Monday',
    objectives: [
      'Understand the 6-week program structure and expectations',
      'Deconstruct the ProDoc template section by section',
      'Learn the funding evaluation criteria used by UNESCO',
      'Set personal and team goals for the program'
    ],
    deliverables: [
      'Signed team commitment agreement',
      'Completed ProDoc familiarity assessment',
      'Week 1 personal objectives set'
    ],
    materials: [
      'ProDoc Template (UNESCO Format)',
      'Funding Criteria Guidelines',
      'Program Timeline & Milestones',
      'Team Collaboration Tools Setup'
    ],
    attendance: 100,
    rating: 4.8
  },
  { 
    id: '1.2', 
    title: 'Cultural Context & Needs Assessment', 
    time: 'Wednesday @ 7 PM', 
    duration: '2.5 hours',
    type: 'workshop', 
    mentor: 'Dr. Khaled Elnoby', 
    focus: 'How to conduct a stakeholder analysis, map community power structures, and translate cultural needs into project objectives. Introduction to participatory needs assessment methodologies.', 
    week: 1, 
    day: 'Wednesday',
    objectives: [
      'Master stakeholder mapping techniques',
      'Learn participatory needs assessment methods',
      'Understand cultural context integration',
      'Practice community engagement strategies'
    ],
    deliverables: [
      'Stakeholder mapping matrix',
      'Needs assessment methodology selection',
      'Cultural integration framework'
    ],
    materials: [
      'Stakeholder Analysis Toolkit',
      'Participatory Rural Appraisal Guide',
      'Cultural Context Assessment Framework',
      'Community Engagement Best Practices'
    ],
    attendance: 95,
    rating: 4.9
  },
  { 
    id: '1.3', 
    title: 'Project-Specific Context Clinic', 
    time: 'Thursday @ 7 PM', 
    duration: '3 hours',
    type: 'clinic', 
    mentor: 'Dr. Khaled', 
    focus: '1-on-1 breakout rooms. Cultivania: Formalizing their Siwan community knowledge. Smart Hydroponics: Identifying target users in Kharga beyond "households." SALT: Defining a specific community/waste stream to ground their concept.', 
    week: 1, 
    day: 'Thursday', 
    mandatory: ['Cultivania', 'Smart Hydroponics', 'SALT'],
    objectives: [
      'Solidify project scope and boundaries',
      'Define specific target communities',
      'Establish baseline data requirements',
      'Create context validation plans'
    ],
    deliverables: [
      'Refined project scope document',
      'Target community profiles',
      'Baseline data collection plan',
      'Context validation checklist'
    ],
    materials: [
      'Project Scope Templates',
      'Community Profiling Tools',
      'Baseline Data Collection Guidelines',
      'Validation Framework Checklist'
    ],
    attendance: 100,
    rating: 4.7
  },
  
  // Week 2
  { 
    id: '2.1', 
    title: 'The Water Pillar: Technical Validation', 
    time: 'Monday @ 7 PM', 
    duration: '2.5 hours',
    type: 'deep-dive', 
    mentor: 'Dr. Peter Nasr', 
    focus: 'Principles of water system design for arid regions. Water quality testing parameters. Sizing and efficiency calculations for pumps and desalination units. Introduction to water balance modeling.', 
    week: 2, 
    day: 'Monday',
    objectives: [
      'Understand arid region water system design',
      'Master water quality testing protocols',
      'Learn pump and desalination sizing calculations',
      'Create water balance models'
    ],
    deliverables: [
      'Water system design calculations',
      'Quality testing parameter matrix',
      'Equipment sizing documentation',
      'Water balance model draft'
    ],
    materials: [
      'Arid Region Water Systems Manual',
      'Water Quality Testing Protocols',
      'Pump Sizing Calculators',
      'Water Balance Modeling Tools'
    ],
    attendance: 92,
    rating: 4.8
  },
  { 
    id: '2.2', 
    title: 'The Food Pillar: Sustainable Agriculture', 
    time: 'Wednesday @ TBD', 
    duration: '2 hours',
    type: 'deep-dive', 
    mentor: 'Dr. Alaa Elsadek', 
    focus: 'Principles of hydroponics, aquaponics, and salt-tolerant agriculture. Metrics for measuring yield, nutritional value, and resource efficiency (crop per drop).', 
    week: 2, 
    day: 'Wednesday',
    objectives: [
      'Master hydroponic and aquaponic system design',
      'Learn salt-tolerant agriculture principles',
      'Understand yield and nutrition metrics',
      'Calculate resource efficiency ratios'
    ],
    deliverables: [
      'Agricultural system design specifications',
      'Yield calculation models',
      'Nutrition assessment framework',
      'Resource efficiency benchmarks'
    ],
    materials: [
      'Hydroponics Design Handbook',
      'Salt-Tolerant Crop Database',
      'Yield Calculation Tools',
      'Resource Efficiency Metrics Guide'
    ],
    attendance: 88,
    rating: 4.6
  },
  { 
    id: '2.3', 
    title: 'Clinic: Desalination & Brine Management', 
    time: 'Thursday @ 7 PM', 
    duration: '3 hours',
    type: 'clinic', 
    mentor: 'Dr. Peter Nasr', 
    focus: 'Deep dive into RO vs. thermal desalination trade-offs. Chemical composition of brine. Review of brine disposal, dilution, and valorization technologies.', 
    week: 2, 
    day: 'Thursday', 
    mandatory: ['Cultivania'],
    objectives: [
      'Compare desalination technology options',
      'Analyze brine chemical composition',
      'Evaluate brine management strategies',
      'Design valorization pathways'
    ],
    deliverables: [
      'Desalination technology comparison matrix',
      'Brine composition analysis report',
      'Management strategy selection',
      'Valorization technology assessment'
    ],
    materials: [
      'Desalination Technology Comparison',
      'Brine Analysis Protocols',
      'Management Strategy Guidelines',
      'Valorization Technology Catalog'
    ],
    attendance: 100,
    rating: 4.9
  },
  { 
    id: '2.4', 
    title: 'Building Your Results Framework (KPIs)', 
    time: 'Sunday @ TBD', 
    duration: '2.5 hours',
    type: 'workshop', 
    mentor: 'All Mentors', 
    focus: 'How to create SMART (Specific, Measurable, Achievable, Relevant, Time-bound) performance indicators for each WEFEC pillar. Setting baselines, milestones, and targets for Annex A.', 
    week: 2, 
    day: 'Sunday',
    objectives: [
      'Master SMART KPI development',
      'Learn baseline setting methodologies',
      'Create milestone frameworks',
      'Design target setting protocols'
    ],
    deliverables: [
      'SMART KPI matrix for all pillars',
      'Baseline assessment methodology',
      'Milestone framework document',
      'Target setting guidelines'
    ],
    materials: [
      'SMART KPI Development Guide',
      'Baseline Assessment Tools',
      'Milestone Planning Templates',
      'Target Setting Framework'
    ],
    attendance: 95,
    rating: 4.7
  },
  
  // Week 3
  { 
    id: '3.1', 
    title: 'The Energy & Ecosystems Pillar', 
    time: 'Sunday @ 3 PM', 
    duration: '3 hours',
    type: 'deep-dive', 
    mentor: 'Dr. Dina & Dr. Yasmine', 
    focus: 'Energy load calculations for pilots. Sizing solar PV systems. Principles of Environmental Impact Assessment (EIA). Defining positive/negative externalities. SDG alignment.', 
    week: 3, 
    day: 'Sunday',
    objectives: [
      'Master energy load calculation methods',
      'Learn solar PV system sizing',
      'Understand EIA principles',
      'Map SDG alignment strategies'
    ],
    deliverables: [
      'Energy load calculation report',
      'Solar PV sizing specifications',
      'EIA scoping document',
      'SDG alignment matrix'
    ],
    materials: [
      'Energy Load Calculation Tools',
      'Solar PV Sizing Guide',
      'EIA Implementation Manual',
      'SDG Mapping Framework'
    ],
    attendance: 90,
    rating: 4.8
  },
  { 
    id: '3.2', 
    title: 'Risk Assessment & Mitigation Matrix', 
    time: 'Wednesday @ TBD', 
    duration: '2.5 hours',
    type: 'workshop', 
    mentor: 'Dr. Yasmine & Dr. Dina', 
    focus: 'A practical workshop where each team populates a Risk Matrix (Annex C) for their project, identifying technical, financial, social, and environmental risks and proposing concrete mitigation measures.', 
    week: 3, 
    day: 'Wednesday',
    objectives: [
      'Identify project risk categories',
      'Master risk assessment methodologies',
      'Develop mitigation strategies',
      'Create risk monitoring frameworks'
    ],
    deliverables: [
      'Comprehensive risk matrix',
      'Risk assessment methodology',
      'Mitigation strategy portfolio',
      'Risk monitoring plan'
    ],
    materials: [
      'Risk Assessment Framework',
      'Risk Matrix Templates',
      'Mitigation Strategy Guide',
      'Risk Monitoring Tools'
    ],
    attendance: 93,
    rating: 4.7
  },
  { 
    id: '3.3', 
    title: 'Clinic: From Concept to Proof-of-Concept', 
    time: 'Thursday @ 7 PM', 
    duration: '3 hours',
    type: 'clinic', 
    mentor: 'Dr. Dina', 
    focus: 'Deconstructing the "Bio-Energy & Storage" concept. How to design a lab-scale experiment to validate a single technical pathway. Defining a clear scope for a testable prototype.', 
    week: 3, 
    day: 'Thursday', 
    mandatory: ['SALT'],
    objectives: [
      'Deconstruct complex technical concepts',
      'Design lab-scale validation experiments',
      'Define prototype scope boundaries',
      'Create testing protocols'
    ],
    deliverables: [
      'Technical concept deconstruction',
      'Lab experiment design',
      'Prototype scope document',
      'Testing protocol framework'
    ],
    materials: [
      'Concept Deconstruction Tools',
      'Lab Design Guidelines',
      'Prototype Planning Templates',
      'Testing Protocol Standards'
    ],
    attendance: 100,
    rating: 4.9
  },
  
  // Week 4
  { 
    id: '4.1', 
    title: 'The Business Model Canvas (BMC)', 
    time: 'Monday @ 7 PM', 
    duration: '2.5 hours',
    type: 'workshop', 
    mentor: 'Dr. Khaled Elnoby', 
    focus: 'A deep dive into the 9 blocks of the BMC. Each team will start populating their canvas live, focusing on Value Proposition and Customer Segments.', 
    week: 4, 
    day: 'Monday',
    objectives: [
      'Master the 9 BMC building blocks',
      'Develop compelling value propositions',
      'Define precise customer segments',
      'Create business model hypotheses'
    ],
    deliverables: [
      'Completed BMC draft',
      'Value proposition statements',
      'Customer segment profiles',
      'Business model hypothesis list'
    ],
    materials: [
      'Business Model Canvas Templates',
      'Value Proposition Design Guide',
      'Customer Segment Analysis Tools',
      'Business Model Validation Framework'
    ],
    attendance: 94,
    rating: 4.8
  },
  { 
    id: '4.2', 
    title: 'Revenue Streams & Cost Structure', 
    time: 'Wednesday @ 7 PM', 
    duration: '2.5 hours',
    type: 'workshop', 
    mentor: 'Dr. Khaled Elnoby', 
    focus: 'Brainstorming and validating potential revenue models (B2B, B2C, subscription, etc.). How to estimate key costs (CAPEX vs. OPEX).', 
    week: 4, 
    day: 'Wednesday',
    objectives: [
      'Identify viable revenue models',
      'Learn cost structure analysis',
      'Master CAPEX/OPEX estimation',
      'Create financial assumptions'
    ],
    deliverables: [
      'Revenue model portfolio',
      'Cost structure analysis',
      'CAPEX/OPEX estimates',
      'Financial assumptions document'
    ],
    materials: [
      'Revenue Model Catalog',
      'Cost Analysis Templates',
      'Financial Estimation Tools',
      'Business Model Financial Guide'
    ],
    attendance: 91,
    rating: 4.6
  },
  { 
    id: '4.3', 
    title: 'Clinic: Financial Modeling & BoQ', 
    time: 'Thursday @ 7 PM', 
    duration: '3 hours',
    type: 'clinic', 
    mentor: 'Business Mentor', 
    focus: 'How to build a simple P&L projection. Creating a detailed Bill of Quantities (BoQ) for the pilot phase to justify the seed funding request in Annex F.', 
    week: 4, 
    day: 'Thursday', 
    mandatory: ['Smart Hydroponics', 'Cultivania'],
    objectives: [
      'Build P&L projection models',
      'Create detailed Bill of Quantities',
      'Justify seed funding requirements',
      'Develop financial scenarios'
    ],
    deliverables: [
      'P&L projection model',
      'Detailed BoQ document',
      'Seed funding justification',
      'Financial scenario analysis'
    ],
    materials: [
      'Financial Modeling Templates',
      'BoQ Creation Guidelines',
      'Funding Justification Framework',
      'Scenario Analysis Tools'
    ],
    attendance: 100,
    rating: 4.8
  },
  
  // Week 5
  { 
    id: '5.1', 
    title: 'Project Management & Gantt Charts', 
    time: 'Monday @ 7 PM', 
    duration: '2 hours',
    type: 'workshop', 
    mentor: 'Organizer/PM Expert', 
    focus: 'How to break down the pilot into actionable tasks. Creating a realistic project timeline with dependencies using a Gantt chart format for Annex B.', 
    week: 5, 
    day: 'Monday',
    objectives: [
      'Master work breakdown structures',
      'Create Gantt chart timelines',
      'Identify task dependencies',
      'Develop project schedules'
    ],
    deliverables: [
      'Work breakdown structure',
      'Gantt chart timeline',
      'Dependency matrix',
      'Project schedule document'
    ],
    materials: [
      'WBS Creation Guide',
      'Gantt Chart Templates',
      'Dependency Management Tools',
      'Project Planning Software'
    ],
    attendance: 89,
    rating: 4.5
  },
  { 
    id: '5.2', 
    title: 'Vendor Identification & Procurement', 
    time: 'Wednesday @ TBD', 
    duration: '2 hours',
    type: 'workshop', 
    mentor: 'Technical Mentors', 
    focus: 'How to identify and vet potential suppliers for key technologies. Basics of a procurement plan (Annex G).', 
    week: 5, 
    day: 'Wednesday',
    objectives: [
      'Master supplier identification methods',
      'Learn vendor vetting processes',
      'Create procurement plans',
      'Develop supplier relationships'
    ],
    deliverables: [
      'Supplier identification matrix',
      'Vendor vetting framework',
      'Procurement plan document',
      'Supplier relationship strategy'
    ],
    materials: [
      'Supplier Identification Guide',
      'Vendor Vetting Templates',
      'Procurement Planning Tools',
      'Supplier Management Framework'
    ],
    attendance: 87,
    rating: 4.4
  },
  { 
    id: '5.3', 
    title: 'Peer Review & Synergy Session', 
    time: 'Thursday @ 7 PM', 
    duration: '3 hours',
    type: 'plenary', 
    mentor: 'Facilitator/All', 
    focus: 'Part 1 (Peer Review): Teams provide structured feedback on each other\'s draft ProDoc sections. Part 2 (Synergy): Facilitated discussion to identify potential collaborations between the projects.', 
    week: 5, 
    day: 'Thursday',
    objectives: [
      'Provide constructive peer feedback',
      'Identify collaboration opportunities',
      'Improve ProDoc quality',
      'Build team synergies'
    ],
    deliverables: [
      'Peer review feedback reports',
      'Collaboration opportunity matrix',
      'ProDoc improvement plans',
      'Synergy implementation roadmap'
    ],
    materials: [
      'Peer Review Framework',
      'Feedback Collection Tools',
      'Collaboration Assessment Guide',
      'Synergy Planning Templates'
    ],
    attendance: 96,
    rating: 4.9
  },
  
  // Week 6
  { 
    id: '6.1', 
    title: 'From ProDoc to Pitch: Communicating for Impact at a UNESCO Event', 
    time: 'Monday @ 7 PM', 
    duration: '2.5 hours',
    type: 'workshop', 
    mentor: 'Pitch Coach/Organizer', 
    focus: 'Distilling the ProDoc into a compelling 10-slide pitch deck. Crafting a powerful narrative. Specific module on tailoring the message for policymakers and UN officials (SDG language, human story).', 
    week: 6, 
    day: 'Monday',
    objectives: [
      'Master pitch deck creation',
      'Craft compelling narratives',
      'Tailor messages for policymakers',
      'Integrate SDG language effectively'
    ],
    deliverables: [
      '10-slide pitch deck draft',
      'Narrative framework',
      'Policymaker messaging guide',
      'SDG integration strategy'
    ],
    materials: [
      'Pitch Deck Templates',
      'Narrative Crafting Guide',
      'Policymaker Communication Toolkit',
      'SDG Language Reference'
    ],
    attendance: 98,
    rating: 4.9
  },
  { 
    id: '6.2', 
    title: 'Final Mock Jury Panel', 
    time: 'Wednesday @ 7 PM', 
    duration: '4 hours',
    type: 'plenary', 
    mentor: 'All Mentors', 
    focus: 'Critical Session. Each team presents their final 7-minute pitch. Mentors adopt specific roles (Investor, Technical Expert, Impact Officer) to provide a realistic, high-pressure Q&A experience.', 
    week: 6, 
    day: 'Wednesday',
    objectives: [
      'Practice high-pressure pitching',
      'Handle challenging Q&A sessions',
      'Refine presentation skills',
      'Prepare for jury evaluation'
    ],
    deliverables: [
      'Final pitch presentation',
      'Q&A handling strategies',
      'Presentation refinement notes',
      'Jury evaluation preparation'
    ],
    materials: [
      'Pitch Evaluation Criteria',
      'Q&A Preparation Guide',
      'Presentation Best Practices',
      'Jury Simulation Framework'
    ],
    attendance: 100,
    rating: 5.0
  },
]

const projects: Project[] = [
  {
    id: 'cultivania',
    name: 'Cultivania',
    description: 'Sustainable agriculture initiative in Siwa Oasis integrating traditional knowledge with modern desalination technology to create year-round farming opportunities.',
    focus: 'Desalination & Brine Management',
    progress: 15,
    milestones: [
      { title: 'Context Analysis', description: 'Complete Siwan community cultural assessment and stakeholder mapping', completed: true, dueDate: 'Week 1' },
      { title: 'Technical Validation', description: 'Validate RO desalination specifications for oasis environment', completed: false, dueDate: 'Week 2' },
      { title: 'Brine Management Plan', description: 'Develop comprehensive brine valorization strategy', completed: false, dueDate: 'Week 3' },
      { title: 'Business Model', description: 'Create sustainable business model for smallholder farmers', completed: false, dueDate: 'Week 4' }
    ],
    team: [
      { name: 'Dr. Ahmed Mohamed', role: 'Project Lead', avatar: '👨‍🌾' },
      { name: 'Fatma Ali', role: 'Community Coordinator', avatar: '👩‍💼' },
      { name: 'Youssef Hassan', role: 'Technical Engineer', avatar: '👨‍🔧' },
      { name: 'Mariam Khalid', role: 'Agriculture Expert', avatar: '👩‍🌾' }
    ],
    technical: [
      { category: 'Desalination', specs: ['RO System: 50,000 L/day', 'Energy Recovery: 95%', 'Brine Concentration: 60,000 ppm'] },
      { category: 'Agriculture', specs: ['Greenhouse Area: 2,000 m²', 'Crop Types: Date Palms, Olives, Vegetables', 'Water Efficiency: 85%'] },
      { category: 'Energy', specs: ['Solar PV: 100 kW', 'Battery Storage: 200 kWh', 'Backup Generator: 50 kVA'] }
    ],
    kpis: [
      { metric: 'Water Production', target: '50,000 L/day', current: '0 L/day' },
      { metric: 'Crop Yield Increase', target: '300%', current: '0%' },
      { metric: 'Farmer Income', target: '+200%', current: '0%' },
      { metric: 'CO2 Reduction', target: '500 tons/year', current: '0 tons/year' }
    ],
    color: 'bg-green-500',
    sdgs: [2, 6, 8, 13, 15]
  },
  {
    id: 'smart-hydroponics',
    name: 'Smart Hydroponics',
    description: 'IoT-enabled hydroponic farming system for Kharga Oasis households, optimizing water use and enabling fresh food production in desert conditions.',
    focus: 'Water-Efficient Agriculture',
    progress: 20,
    milestones: [
      { title: 'User Identification', description: 'Define and profile target user segments in Kharga', completed: true, dueDate: 'Week 1' },
      { title: 'System Design', description: 'Complete hydroponic system technical specifications', completed: false, dueDate: 'Week 2' },
      { title: 'IoT Integration', description: 'Develop smart monitoring and control systems', completed: false, dueDate: 'Week 3' },
      { title: 'Business Model', description: 'Create scalable B2C/B2B revenue models', completed: false, dueDate: 'Week 4' }
    ],
    team: [
      { name: 'Karim Samir', role: 'CEO', avatar: '👨‍💼' },
      { name: 'Nadia Farouk', role: 'CTO', avatar: '👩‍💻' },
      { name: 'Omar Tarek', role: 'Agriculture Specialist', avatar: '👨‍🌾' },
      { name: 'Layla Ahmed', role: 'Marketing Lead', avatar: '👩‍🎨' }
    ],
    technical: [
      { category: 'Hydroponics', specs: ['NFT System: 500 m²', 'Water Recirculation: 95%', 'Growing Cycles: 12/year'] },
      { category: 'IoT System', specs: ['Sensors: 50 units', 'Data Points: 200/hour', 'Automation: 80%'] },
      { category: 'Energy', specs: ['Solar Panels: 30 kW', 'LED Lighting: 15 kW', 'Climate Control: Automated'] }
    ],
    kpis: [
      { metric: 'Water Savings', target: '90% vs traditional', current: '0%' },
      { metric: 'Yield per m²', target: '40 kg/m²/year', current: '0 kg/m²/year' },
      { metric: 'Household Served', target: '200 families', current: '0 families' },
      { metric: 'ROI Timeline', target: '18 months', current: 'N/A' }
    ],
    color: 'bg-blue-500',
    sdgs: [2, 9, 11, 12, 13]
  },
  {
    id: 'salt',
    name: 'SALT (Sustainable Alternative Living Technologies)',
    description: 'Bio-energy and storage system converting organic waste streams into renewable energy and value-added products for desert communities.',
    focus: 'Bio-Energy & Storage',
    progress: 10,
    milestones: [
      { title: 'Concept Definition', description: 'Finalize waste stream selection and technology pathway', completed: true, dueDate: 'Week 1' },
      { title: 'Lab Validation', description: 'Complete lab-scale experiment and data collection', completed: false, dueDate: 'Week 3' },
      { title: 'Prototype Design', description: 'Design pilot-scale bio-energy system', completed: false, dueDate: 'Week 4' },
      { title: 'Impact Assessment', description: 'Complete environmental and social impact analysis', completed: false, dueDate: 'Week 5' }
    ],
    team: [
      { name: 'Dr. Mahmoud Reda', role: 'Lead Researcher', avatar: '👨‍🔬' },
      { name: 'Sara Gamil', role: 'Energy Engineer', avatar: '👩‍🔧' },
      { name: 'Hassan Ali', role: 'Waste Management Expert', avatar: '👨‍💼' },
      { name: 'Amina Said', role: 'Environmental Specialist', avatar: '👩‍🌍' }
    ],
    technical: [
      { category: 'Bio-Energy', specs: ['Biogas Production: 100 m³/day', 'Power Generation: 50 kW', 'Digestate: 2 tons/day'] },
      { category: 'Waste Processing', specs: ['Input Capacity: 5 tons/day', 'Processing Time: 30 days', 'Efficiency: 85%'] },
      { category: 'Storage', specs: ['Biogas Storage: 500 m³', 'Thermal Storage: 100 kWh', 'Battery Backup: 20 kWh'] }
    ],
    kpis: [
      { metric: 'Waste Processed', target: '1,825 tons/year', current: '0 tons/year' },
      { metric: 'Energy Generated', target: '438,000 kWh/year', current: '0 kWh/year' },
      { metric: 'CO2 Offset', target: '300 tons/year', current: '0 tons/year' },
      { metric: 'Revenue from Byproducts', target: '$50,000/year', current: '$0/year' }
    ],
    color: 'bg-purple-500',
    sdgs: [7, 9, 11, 12, 13]
  }
]

const mentors: Mentor[] = [
  { 
    id: 'khaled', 
    name: 'Dr. Khaled Elnoby', 
    title: 'Cultural Context & Business Development Expert',
    expertise: ['Cultural Context Integration', 'Business Model Development', 'Stakeholder Analysis', 'Community Engagement'], 
    sessions: 4, 
    avatar: '👨‍🏫',
    bio: '15+ years experience in sustainable development projects across North Africa. Specializes in bridging traditional knowledge with modern business practices.',
    availability: ['Mon/Wed/Fri 2-5 PM', 'Flexible for urgent consultations'],
    rating: 4.9
  },
  { 
    id: 'peter', 
    name: 'Dr. Peter Nasr', 
    title: 'Water Systems & Desalination Specialist',
    expertise: ['Water System Design', 'Desalination Technologies', 'Hydrology', 'Water Quality Management'], 
    sessions: 2, 
    avatar: '👨‍🔬',
    bio: 'PhD in Environmental Engineering with 20 years of experience in water treatment systems for arid regions. Published author on sustainable desalination.',
    availability: ['Tue/Thu 3-6 PM', 'Weekend consultations available'],
    rating: 4.8
  },
  { 
    id: 'alaa', 
    name: 'Dr. Alaa Elsadek', 
    title: 'Sustainable Agriculture & Food Systems Expert',
    expertise: ['Sustainable Agriculture', 'Hydroponics', 'Food Security', 'Crop Science'], 
    sessions: 1, 
    avatar: '👩‍🌾',
    bio: 'Agricultural scientist specializing in desert farming techniques. Expert in hydroponic systems and salt-tolerant crop development.',
    availability: ['Mon/Wed 10 AM-2 PM', 'Field visits possible'],
    rating: 4.7
  },
  { 
    id: 'dina', 
    name: 'Dr. Dina', 
    title: 'Energy Systems & Environmental Impact Expert',
    expertise: ['Energy Systems', 'Environmental Impact Assessment', 'Renewable Energy', 'Sustainability Metrics'], 
    sessions: 2, 
    avatar: '👩‍🔬',
    bio: 'Environmental engineer with expertise in renewable energy integration and comprehensive impact assessment for sustainable projects.',
    availability: ['Thu/Fri 1-4 PM', 'Evening sessions by appointment'],
    rating: 4.8
  },
  { 
    id: 'yasmine', 
    name: 'Dr. Yasmine', 
    title: 'Risk Assessment & SDG Alignment Specialist',
    expertise: ['Risk Assessment', 'SDG Alignment', 'Project Evaluation', 'Impact Measurement'], 
    sessions: 2, 
    avatar: '👩‍💼',
    bio: 'International development consultant with extensive experience in SDG project design and comprehensive risk management frameworks.',
    availability: ['Tue/Thu 9 AM-12 PM', 'Virtual sessions preferred'],
    rating: 4.9
  }
]

const resources: Resource[] = [
  {
    id: '1',
    title: 'UNESCO ProDoc Template 2024',
    type: 'document',
    category: 'Templates',
    description: 'Official UNESCO Project Document template with section-by-section guidelines',
    url: '/templates/unesco-prodoc-2024.docx',
    size: '2.5 MB'
  },
  {
    id: '2',
    title: 'Stakeholder Analysis Toolkit',
    type: 'tool',
    category: 'Assessment Tools',
    description: 'Interactive toolkit for mapping and analyzing project stakeholders',
    url: '/tools/stakeholder-analysis.xlsx',
    size: '1.2 MB'
  },
  {
    id: '3',
    title: 'Desalination Technology Masterclass',
    type: 'video',
    category: 'Technical Training',
    description: 'Comprehensive video series on modern desalination technologies',
    url: '/videos/desalination-masterclass',
    duration: '3.5 hours'
  },
  {
    id: '4',
    title: 'Business Model Canvas Guide',
    type: 'document',
    category: 'Business Development',
    description: 'Step-by-step guide to developing your business model canvas',
    url: '/guides/bmc-guide.pdf',
    size: '5.8 MB'
  },
  {
    id: '5',
    title: 'Risk Assessment Framework',
    type: 'template',
    category: 'Risk Management',
    description: 'Comprehensive template for project risk assessment and mitigation',
    url: '/templates/risk-assessment.xlsx',
    size: '3.1 MB'
  }
]

const prodocMilestones = [
  { week: 1, sections: ['II.2 (Overall Purpose/Relevance)', 'II.3 (Stakeholders)'], status: 'upcoming', details: 'Contextual foundation and stakeholder mapping', weight: 15 },
  { week: 2, sections: ['Technical Methodology (Water/Food)', 'Annex A (Results Framework)'], status: 'upcoming', details: 'Technical validation and performance indicators', weight: 20 },
  { week: 3, sections: ['Annex C (Risk Assessment)', 'Technical Methodology (Energy/Ecosystems)'], status: 'upcoming', details: 'Risk management and environmental considerations', weight: 20 },
  { week: 4, sections: ['Section II.9 (Sustainability)', 'Annex F (Budget)', 'Business Model Canvas'], status: 'upcoming', details: 'Financial viability and business planning', weight: 25 },
  { week: 5, sections: ['Annex B (Timeline)', 'Annex G (Procurement)', 'Peer Review'], status: 'upcoming', details: 'Implementation planning and quality assurance', weight: 10 },
  { week: 6, sections: ['Final ProDoc', 'Pitch Deck', 'UNESCO Showcase Preparation'], status: 'upcoming', details: 'Final deliverables and presentation preparation', weight: 10 }
]

export default function WEFEDashboard() {
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [selectedSession, setSelectedSession] = useState(sessions[0])

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'plenary': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'workshop': return 'bg-green-100 text-green-800 border-green-200'
      case 'clinic': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'deep-dive': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'plenary': return <Users className="w-4 h-4" />
      case 'workshop': return <BookOpen className="w-4 h-4" />
      case 'clinic': return <Target className="w-4 h-4" />
      case 'deep-dive': return <TrendingUp className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getSDGColor = (sdg: number) => {
    const colors = {
      1: 'bg-red-500', 2: 'bg-yellow-500', 3: 'bg-green-500', 4: 'bg-red-600',
      5: 'bg-orange-500', 6: 'bg-blue-400', 7: 'bg-yellow-400', 8: 'bg-red-500',
      9: 'bg-orange-400', 10: 'bg-red-700', 11: 'bg-yellow-600', 12: 'bg-amber-600',
      13: 'bg-green-600', 14: 'bg-blue-500', 15: 'bg-green-700', 16: 'bg-blue-600',
      17: 'bg-blue-700'
    }
    return colors[sdg as keyof typeof colors] || 'bg-gray-500'
  }

  const totalSessions = sessions.length
  const completedSessions = sessions.filter(s => s.week < 1).length
  const totalAttendance = sessions.reduce((sum, s) => sum + (s.attendance || 0), 0) / sessions.length
  const averageRating = sessions.reduce((sum, s) => sum + (s.rating || 0), 0) / sessions.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-8 h-8 text-blue-600" />
                WEFE Trail in Motion
              </h1>
              <p className="text-slate-600 mt-1">6-Week Intensive Mentorship & ProDoc Development Program</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Phase 0: Mentor Alignment Complete
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Activity className="w-4 h-4 mr-1" />
                  Week 1 In Progress
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-slate-600">Program Progress</p>
                <p className="text-2xl font-bold text-slate-900">Day 3 of 42</p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="transform -rotate-90 w-16 h-16">
                  <circle cx="32" cy="32" r="28" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                  <circle cx="32" cy="32" r="28" stroke="#3b82f6" strokeWidth="8" fill="none" 
                    strokeDasharray={`${(3/42) * 176} 176`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">7%</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="progress">ProDoc Progress</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Enhanced Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10" />
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Total Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">6 Weeks</div>
                  <p className="text-xs text-slate-600 mt-1">42 Days Intensive</p>
                  <Progress value={7} className="mt-2 h-1" />
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -mr-10 -mt-10" />
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Total Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{totalSessions}</div>
                  <p className="text-xs text-slate-600 mt-1">3-4 per week</p>
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -mr-10 -mt-10" />
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Finalist Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">3</div>
                  <p className="text-xs text-slate-600 mt-1">UNESCO Ready</p>
                  <div className="flex -space-x-2 mt-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white" />
                    <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-full -mr-10 -mt-10" />
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Expert Mentors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">5+</div>
                  <p className="text-xs text-slate-600 mt-1">Domain Experts</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-slate-600">4.8 avg rating</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Program Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Program Transformation Journey
                  </CardTitle>
                  <CardDescription>From concepts to fundable, UNESCO-ready projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                        <h4 className="font-semibold text-blue-900">Foundation Building</h4>
                      </div>
                      <p className="text-sm text-blue-800">Context analysis, stakeholder mapping, needs assessment</p>
                      <div className="mt-2 text-xs text-blue-700">Weeks 1-2 • Technical validation</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                        <h4 className="font-semibold text-green-900">Technical Development</h4>
                      </div>
                      <p className="text-sm text-green-800">System design, risk assessment, energy planning</p>
                      <div className="mt-2 text-xs text-green-700">Weeks 3-4 • Business modeling</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                        <h4 className="font-semibold text-purple-900">Implementation Planning</h4>
                      </div>
                      <p className="text-sm text-purple-800">Project management, procurement, timeline creation</p>
                      <div className="mt-2 text-xs text-purple-700">Week 5 • Quality assurance</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                        <h4 className="font-semibold text-orange-900">Showcase Preparation</h4>
                      </div>
                      <p className="text-sm text-orange-800">Pitch development, jury simulation, final refinement</p>
                      <div className="mt-2 text-xs text-orange-700">Week 6 • UNESCO ready</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Live Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">Session Attendance</span>
                        <span className="text-sm text-slate-600">{totalAttendance.toFixed(1)}%</span>
                      </div>
                      <Progress value={totalAttendance} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">Average Rating</span>
                        <span className="text-sm text-slate-600">{averageRating.toFixed(1)}/5.0</span>
                      </div>
                      <Progress value={(averageRating / 5) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">ProDoc Completion</span>
                        <span className="text-sm text-slate-600">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Active Participants</span>
                      <span className="font-medium text-slate-900">24/25</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-slate-600">Mentor Hours</span>
                      <span className="font-medium text-slate-900">142/180</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Methodology */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-purple-600" />
                  Weekly Structure & Methodology
                </CardTitle>
                <CardDescription>Rapid iteration with blended learning approaches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Plenary Sessions</h4>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Foundational knowledge</li>
                      <li>• All teams together</li>
                      <li>• 2-3 hours duration</li>
                      <li>• Interactive workshops</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900">Technical Deep Dives</h4>
                    </div>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Pillar-specific expertise</li>
                      <li>• Expert-led sessions</li>
                      <li>• 2-2.5 hours duration</li>
                      <li>• Hands-on applications</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-orange-900">Project Clinics</h4>
                    </div>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Team-specific guidance</li>
                      <li>• Breakout sessions</li>
                      <li>• 3 hours duration</li>
                      <li>• Mandatory attendance</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">Weekly Deliverables</h4>
                    </div>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Draft ProDoc sections</li>
                      <li>• Asynchronous review</li>
                      <li>• Mentor feedback</li>
                      <li>• Iterative improvement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Week:</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((week) => (
                    <button
                      key={week}
                      onClick={() => setSelectedWeek(week)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        selectedWeek === week
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Week {week}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {sessions.filter(s => s.week === selectedWeek).length} sessions
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {sessions.filter(s => s.week === selectedWeek).reduce((sum, s) => sum + parseInt(s.duration), 0)} total hours
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {sessions
                .filter(session => session.week === selectedWeek)
                .map((session) => (
                  <Card key={session.id} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={getSessionTypeColor(session.type)}>
                              {getSessionTypeIcon(session.type)}
                              <span className="ml-1 capitalize">{session.type.replace('-', ' ')}</span>
                            </Badge>
                            <span className="text-sm text-slate-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.time} • {session.duration}
                            </span>
                            {session.mandatory && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Mandatory for {session.mandatory.join(', ')}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <CardDescription className="mt-1">
                            Lead: <span className="font-medium">{session.mentor}</span>
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {session.attendance && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">{session.attendance}%</span>
                            </div>
                          )}
                          {session.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-slate-600">{session.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-700">{session.focus}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-900 text-sm mb-2 flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            Learning Objectives
                          </h5>
                          <ul className="text-xs text-blue-800 space-y-1">
                            {session.objectives.slice(0, 3).map((obj, idx) => (
                              <li key={idx}>• {obj}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-green-900 text-sm mb-2 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Deliverables
                          </h5>
                          <ul className="text-xs text-green-800 space-y-1">
                            {session.deliverables.slice(0, 3).map((del, idx) => (
                              <li key={idx}>• {del}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h5 className="font-medium text-purple-900 text-sm mb-2 flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            Materials
                          </h5>
                          <ul className="text-xs text-purple-800 space-y-1">
                            {session.materials.slice(0, 3).map((mat, idx) => (
                              <li key={idx}>• {mat}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Enhanced Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-slate-700">Select Project:</span>
              <div className="flex gap-2">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      selectedProject.id === project.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-4 h-4 ${selectedProject.color} rounded-full`} />
                        {selectedProject.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{selectedProject.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{selectedProject.progress}% Complete</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">Overall Progress</h4>
                      <span className="text-sm text-slate-600">{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} className="h-2" />
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Key Milestones</h4>
                    <div className="space-y-3">
                      {selectedProject.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                            milestone.completed ? 'bg-green-500' : 'bg-slate-400'
                          }`}>
                            {milestone.completed ? '✓' : idx + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-slate-900">{milestone.title}</h5>
                            <p className="text-sm text-slate-600 mt-1">{milestone.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">{milestone.dueDate}</Badge>
                              {milestone.completed && <Badge className="text-xs bg-green-100 text-green-800">Completed</Badge>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Section */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Project Team</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProject.team.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="text-2xl">{member.avatar}</div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{member.name}</p>
                            <p className="text-xs text-slate-600">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SDGs */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">SDG Alignment</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.sdgs.map((sdg) => (
                        <div key={sdg} className={`w-10 h-10 ${getSDGColor(sdg)} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                          {sdg}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Specifications */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Technical Specs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedProject.technical.map((tech, idx) => (
                      <div key={idx} className="space-y-2">
                        <h5 className="font-medium text-slate-900 text-sm">{tech.category}</h5>
                        <div className="space-y-1">
                          {tech.specs.map((spec, sidx) => (
                            <div key={sidx} className="flex items-center gap-2 text-xs text-slate-600">
                              <ChevronRight className="w-3 h-3 text-blue-500" />
                              {spec}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">KPIs & Targets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedProject.kpis.map((kpi, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-900">{kpi.metric}</span>
                          <Badge variant="outline" className="text-xs">{kpi.target}</Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-600">
                          <span>Current: {kpi.current}</span>
                          <span>Target: {kpi.target}</span>
                        </div>
                        <Progress value={0} className="h-1" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ProDoc Timeline */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    ProDoc Development Timeline
                  </CardTitle>
                  <CardDescription>Weekly deliverables and completion weights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prodocMilestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                            milestone.status === 'completed' ? 'bg-green-500' : 
                            milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-400'
                          }`}>
                            {milestone.week}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900">Week {milestone.week}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{milestone.weight}% weight</Badge>
                              <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                                {milestone.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{milestone.details}</p>
                          <div className="space-y-1">
                            {milestone.sections.map((section, sidx) => (
                              <div key={sidx} className="flex items-center gap-2 text-sm">
                                <div className={`w-2 h-2 rounded-full ${
                                  milestone.status === 'completed' ? 'bg-green-500' : 'bg-slate-300'
                                }`} />
                                <span className="text-slate-700">{section}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Statistics */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">15%</div>
                      <p className="text-sm text-slate-600 mt-1">ProDoc Complete</p>
                    </div>
                    <Progress value={15} className="h-3" />
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">3</div>
                        <p className="text-xs text-slate-600">Sections Done</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-slate-600">17</div>
                        <p className="text-xs text-slate-600">In Progress</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {projects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-900">{project.name}</span>
                          <span className="text-sm text-slate-600">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Final Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Final Deliverables for UNESCO Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Complete ProDoc</h4>
                        <p className="text-sm text-blue-700">Professional documentation</p>
                      </div>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        All sections completed
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Technical validation included
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Financial modeling complete
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Risk assessment thorough
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Polished Pitch Deck</h4>
                        <p className="text-sm text-green-700">10-slide compelling presentation</p>
                      </div>
                    </div>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Powerful narrative crafted
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        SDG language integrated
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Human stories featured
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Visual impact optimized
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900">UNESCO Showcase Ready</h4>
                        <p className="text-sm text-purple-700">High-impact event preparation</p>
                      </div>
                    </div>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Mock jury practice
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Q&A preparation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Policy brief ready
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Media kit prepared
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-5xl mb-3">{mentor.avatar}</div>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.title}</CardDescription>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                      <span className="text-sm text-slate-600">({mentor.sessions} sessions)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Expertise Areas</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((area, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-1">Bio</p>
                      <p className="text-xs text-slate-600">{mentor.bio}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-1">Availability</p>
                      <div className="space-y-1">
                        {mentor.availability.map((slot, idx) => (
                          <div key={idx} className="text-xs text-slate-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* New Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {resource.type === 'document' && <FileText className="w-5 h-5 text-blue-600" />}
                        {resource.type === 'video' && <Video className="w-5 h-5 text-purple-600" />}
                        {resource.type === 'template' && <FileText className="w-5 h-5 text-green-600" />}
                        {resource.type === 'tool' && <BarChart3 className="w-5 h-5 text-orange-600" />}
                        <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      {resource.size && <span>Size: {resource.size}</span>}
                      {resource.duration && <span>Duration: {resource.duration}</span>}
                    </div>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}