// ── Mock Data for GlobeTrotter ──
// All data is hardcoded until the Django backend is connected.

export const currentUser = {
  id: 1,
  name: "Ajay Panchal",
  email: "ajaypanchal@gmail.com",
  avatar: null,
  language: "en",
  joinedDate: "2026-01-15",
};

export const trips = [
  {
    id: 1,
    name: "Summer in Paris & Rome",
    description: "Celebrating graduation with a two-week sightseeing trip through France and Italy.",
    startDate: "2026-07-15",
    endDate: "2026-07-28",
    coverPhoto: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    isPublic: true,
    publicSlug: "paris-rome-summer",
    status: "upcoming",
    stops: [
      { id: 1, cityId: 1, orderIndex: 1, startDate: "2026-07-15", endDate: "2026-07-21" },
      { id: 2, cityId: 2, orderIndex: 2, startDate: "2026-07-22", endDate: "2026-07-28" },
    ],
    totalBudget: 2400,
    spent: 1850,
  },
  {
    id: 2,
    name: "Tokyo & Kyoto Autumn Tour",
    description: "Leaf peeping, shrine visiting, and eating endless bowls of ramen across Japan.",
    startDate: "2026-10-10",
    endDate: "2026-10-22",
    coverPhoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    isPublic: false,
    publicSlug: null,
    status: "planning",
    stops: [
      { id: 3, cityId: 3, orderIndex: 1, startDate: "2026-10-10", endDate: "2026-10-15" },
      { id: 4, cityId: 4, orderIndex: 2, startDate: "2026-10-16", endDate: "2026-10-22" },
    ],
    totalBudget: 3100,
    spent: 0,
  },
  {
    id: 3,
    name: "Amalfi Coast Getaway",
    description: "A relaxing week along Italy's most stunning coastline.",
    startDate: "2026-09-02",
    endDate: "2026-09-09",
    coverPhoto: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80",
    isPublic: true,
    publicSlug: "amalfi-coast",
    status: "upcoming",
    stops: [
      { id: 5, cityId: 5, orderIndex: 1, startDate: "2026-09-02", endDate: "2026-09-09" },
    ],
    totalBudget: 1850,
    spent: 600,
  },
  {
    id: 4,
    name: "London Weekend",
    description: "Quick 3-day weekend in London visiting museums and pubs.",
    startDate: "2026-04-12",
    endDate: "2026-04-14",
    coverPhoto: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    isPublic: false,
    publicSlug: null,
    status: "completed",
    stops: [
      { id: 6, cityId: 6, orderIndex: 1, startDate: "2026-04-12", endDate: "2026-04-14" },
    ],
    totalBudget: 800,
    spent: 720,
  },
];

export const cities = [
  { id: 1, name: "Paris", country: "France", costIndex: 145.00, popularity: 98, imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Rome", country: "Italy", costIndex: 120.00, popularity: 95, imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Tokyo", country: "Japan", costIndex: 130.00, popularity: 92, imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Kyoto", country: "Japan", costIndex: 110.00, popularity: 88, imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Amalfi", country: "Italy", costIndex: 160.00, popularity: 85, imageUrl: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "London", country: "UK", costIndex: 155.00, popularity: 96, imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Barcelona", country: "Spain", costIndex: 105.00, popularity: 91, imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "New York", country: "USA", costIndex: 170.00, popularity: 97, imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80" },
  { id: 9, name: "Dubai", country: "UAE", costIndex: 140.00, popularity: 89, imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" },
  { id: 10, name: "Bali", country: "Indonesia", costIndex: 55.00, popularity: 90, imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" },
  { id: 11, name: "Istanbul", country: "Turkey", costIndex: 65.00, popularity: 86, imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80" },
  { id: 12, name: "Sydney", country: "Australia", costIndex: 150.00, popularity: 87, imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" },
];

export const activities = [
  { id: 1, cityId: 1, name: "Eiffel Tower Visit", category: "sightseeing", cost: 26.00, durationMins: 120, description: "Iconic iron tower with panoramic views of Paris.", imageUrl: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80" },
  { id: 2, cityId: 1, name: "Louvre Museum", category: "sightseeing", cost: 17.00, durationMins: 240, description: "World's largest art museum — home to the Mona Lisa.", imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80" },
  { id: 3, cityId: 1, name: "Seine River Cruise", category: "adventure", cost: 15.00, durationMins: 60, description: "Scenic boat ride along the Seine past major landmarks.", imageUrl: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&w=600&q=80" },
  { id: 4, cityId: 1, name: "Le Marais Food Tour", category: "food", cost: 45.00, durationMins: 180, description: "Guided walking food tour through the historic Le Marais district.", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" },
  { id: 5, cityId: 2, name: "Colosseum Tour", category: "sightseeing", cost: 16.00, durationMins: 150, description: "Guided tour of Rome's ancient amphitheatre.", imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
  { id: 6, cityId: 2, name: "Vatican Museums", category: "sightseeing", cost: 17.00, durationMins: 210, description: "Art collections spanning centuries including the Sistine Chapel.", imageUrl: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=600&q=80" },
  { id: 7, cityId: 2, name: "Trastevere Food Walk", category: "food", cost: 40.00, durationMins: 180, description: "Taste authentic Roman cuisine in the charming Trastevere neighborhood.", imageUrl: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=600&q=80" },
  { id: 8, cityId: 3, name: "Shibuya Crossing", category: "sightseeing", cost: 0, durationMins: 30, description: "Experience the world's busiest pedestrian crossing.", imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80" },
  { id: 9, cityId: 3, name: "Tsukiji Outer Market", category: "food", cost: 30.00, durationMins: 120, description: "Fresh sushi and street food at Tokyo's famous market.", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80" },
  { id: 10, cityId: 3, name: "TeamLab Borderless", category: "adventure", cost: 32.00, durationMins: 90, description: "Immersive digital art museum with stunning interactive installations.", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80" },
  { id: 11, cityId: 4, name: "Fushimi Inari Shrine", category: "sightseeing", cost: 0, durationMins: 120, description: "Thousands of vermillion torii gates winding up a mountain.", imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=600&q=80" },
  { id: 12, cityId: 4, name: "Bamboo Grove Walk", category: "adventure", cost: 0, durationMins: 60, description: "Walk through the towering bamboo forest of Arashiyama.", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" },
  { id: 13, cityId: 5, name: "Path of the Gods Hike", category: "adventure", cost: 0, durationMins: 300, description: "Stunning coastal hiking trail with sweeping Mediterranean views.", imageUrl: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=600&q=80" },
  { id: 14, cityId: 6, name: "British Museum", category: "sightseeing", cost: 0, durationMins: 180, description: "World-class collection of art and antiquities — free entry.", imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
  { id: 15, cityId: 6, name: "Tower of London", category: "sightseeing", cost: 33.00, durationMins: 150, description: "Historic castle and home to the Crown Jewels.", imageUrl: "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=600&q=80" },
];

export const budgetBreakdown = {
  categories: [
    { name: "Activities", value: 1240, color: "#F59E0B" },
    { name: "Stay", value: 2100, color: "#8B5CF6" },
    { name: "Transport", value: 850, color: "#3B82F6" },
    { name: "Meals", value: 960, color: "#10B981" },
  ],
  dailySpending: [
    { day: "Jul 15", amount: 180 },
    { day: "Jul 16", amount: 120 },
    { day: "Jul 17", amount: 240 },
    { day: "Jul 18", amount: 95 },
    { day: "Jul 19", amount: 310 },
    { day: "Jul 20", amount: 175 },
    { day: "Jul 21", amount: 200 },
    { day: "Jul 22", amount: 280 },
    { day: "Jul 23", amount: 150 },
    { day: "Jul 24", amount: 190 },
    { day: "Jul 25", amount: 320 },
    { day: "Jul 26", amount: 160 },
    { day: "Jul 27", amount: 230 },
    { day: "Jul 28", amount: 100 },
  ],
  monthlyTrend: [
    { month: "Jan", spent: 0 },
    { month: "Feb", spent: 120 },
    { month: "Mar", spent: 340 },
    { month: "Apr", spent: 720 },
    { month: "May", spent: 890 },
    { month: "Jun", spent: 1100 },
    { month: "Jul", spent: 2850 },
    { month: "Aug", spent: 3170 },
  ],
};

export const dashboardStats = {
  totalTrips: trips.length,
  citiesVisited: 8,
  activitiesPlanned: 24,
  totalBudget: trips.reduce((sum, t) => sum + t.totalBudget, 0),
};

export const upcomingActivities = [
  { id: 1, name: "Eiffel Tower Visit", city: "Paris", date: "Jul 16, 2026", cost: 26.00, category: "sightseeing" },
  { id: 2, name: "Louvre Museum", city: "Paris", date: "Jul 17, 2026", cost: 17.00, category: "sightseeing" },
  { id: 3, name: "Seine River Cruise", city: "Paris", date: "Jul 18, 2026", cost: 15.00, category: "adventure" },
  { id: 4, name: "Colosseum Tour", city: "Rome", date: "Jul 23, 2026", cost: 16.00, category: "sightseeing" },
  { id: 5, name: "Vatican Museums", city: "Rome", date: "Jul 24, 2026", cost: 17.00, category: "sightseeing" },
];
