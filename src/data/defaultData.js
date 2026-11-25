export const initialData = {
  profile: {
    name: "My Journal",
    subtitle: "A little space to track who you're becoming. ♡",
    avatar: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23F3E8FF'/><circle cx='28' cy='30' r='14' fill='%23EBD5C3' stroke='%238A6B56' stroke-width='2.5'/><circle cx='28' cy='30' r='8' fill='%23F8B4C0'/><circle cx='72' cy='30' r='14' fill='%23EBD5C3' stroke='%238A6B56' stroke-width='2.5'/><circle cx='72' cy='30' r='8' fill='%23F8B4C0'/><circle cx='50' cy='54' r='32' fill='%23FDF3E7' stroke='%238A6B56' stroke-width='2.5'/><ellipse cx='34' cy='60' rx='6' ry='4' fill='%23FFAEC0' opacity='0.6'/><ellipse cx='66' cy='60' rx='6' ry='4' fill='%23FFAEC0' opacity='0.6'/><circle cx='40' cy='50' r='3' fill='%234A3B32'/><circle cx='41' cy='49' r='1' fill='%23FFFFFF'/><circle cx='60' cy='50' r='3' fill='%234A3B32'/><circle cx='61' cy='49' r='1' fill='%23FFFFFF'/><ellipse cx='50' cy='59' rx='9' ry='7' fill='%23FFFFFF' stroke='%23B08D79' stroke-width='1.5'/><ellipse cx='50' cy='56' rx='3.5' ry='2.5' fill='%235A3E2F'/><path d='M50 58.5v3m-3 0q3 2 6 0' stroke='%235A3E2F' stroke-width='1.5' stroke-linecap='round'/><path d='M44 80l-6-5q4 5 0 10l6-5z' fill='%23C084FC' stroke='%237E22CE' stroke-width='1.2'/><path d='M56 80l6-5q-4 5 0 10l-6-5z' fill='%23C084FC' stroke='%237E22CE' stroke-width='1.2'/><circle cx='50' cy='80' r='3' fill='%23DDD6FE' stroke='%237E22CE' stroke-width='1.2'/></svg>",
    theme: "lavender",
  },

  todayGoal: {
    completedHours: 0.0,
    targetHours: 4.0,
    percentage: 0,
    quote: "Every master was once a beginner. Take your very first step today. ♡",
  },

  todaySchedule: [],

  weeklyOverview: [
    { day: "Mon", hours: 0 },
    { day: "Tue", hours: 0 },
    { day: "Wed", hours: 0 },
    { day: "Thu", hours: 0 },
    { day: "Fri", hours: 0 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 },
  ],

  quickNotes: [
    "Don't stop until you're proud ♡",
    "Consistency is the true magic wand ♡",
    "Small steps every day yield big results",
    "Progress, not perfection 🌸",
  ],

  monthlyFocusList: [
    {
      id: "focus-month-1",
      month: "November",
      year: 2026,
      skill: "English & Communication",
      icon: "Languages",
      themeColor: "#9333EA",
      goal: "Set your learning objective for this month (e.g. conversational fluency, daily essays, or coding algorithms).",
      quote: "Language is the roadmap of a culture. It tells you where its people come from and where they are going.",
      targetHours: 30,
      completedHours: 0,
      milestones: [
        { id: "m1", title: "Complete 10 listening practice sessions with notes", done: false },
        { id: "m2", title: "Record 4 spoken self-reflections to build confidence", done: false },
        { id: "m3", title: "Write and polish 2 essay reflections", done: false },
        { id: "m4", title: "Learn and integrate 30 new expressions into daily use", done: false },
      ],
      finalAssessment: {
        status: "In Progress",
        selfRating: 0,
        strengths: "",
        growthAreas: "",
        carryForward: "",
      },
    },
  ],

  habits: [
    { id: "h1", name: "English practice", icon: "Languages", category: "Skill", streak: 0, bestStreak: 0, color: "#9333EA" },
    { id: "h2", name: "Reading (20 pages)", icon: "BookOpen", category: "Mind", streak: 0, bestStreak: 0, color: "#EC4899" },
    { id: "h3", name: "Morning Exercise", icon: "Activity", category: "Health", streak: 0, bestStreak: 0, color: "#10B981" },
    { id: "h4", name: "Studying AI & Tech", icon: "Sparkles", category: "Learning", streak: 0, bestStreak: 0, color: "#3B82F6" },
    { id: "h5", name: "Journaling & Gratitude", icon: "Feather", category: "Mind", streak: 0, bestStreak: 0, color: "#F59E0B" },
    { id: "h6", name: "Sleeping by 11 PM", icon: "Moon", category: "Wellness", streak: 0, bestStreak: 0, color: "#6366F1" },
  ],

  habitHistory: {},

  skillsData: {
    english: {
      title: "Skill Studio",
      speaking: [],
      writing: [],
      listening: [],
      reading: [
        { id: "rd1", title: "Atomic Habits", author: "James Clear", totalPages: 320, pagesRead: 0, rating: 5, status: "Want to read" },
      ],
      vocabulary: [
        { id: "vc1", word: "Serendipity", phonetic: "/ˌser.ənˈdɪp.ə.ti/", definition: "The occurrence of events by chance in a happy or beneficial way.", example: "Starting this growth journal was pure serendipity.", category: "Aesthetic", mastered: false },
        { id: "vc2", word: "Eloquent", phonetic: "/ˈel.ə.kwənt/", definition: "Fluent or persuasive in speaking or writing.", example: "She gave an eloquent presentation about personal reinvention.", category: "Speaking", mastered: false },
        { id: "vc3", word: "Resilience", phonetic: "/rɪˈzɪl.jəns/", definition: "The capacity to recover quickly from difficulties.", example: "Growth is rooted in emotional resilience and self-compassion.", category: "Psychology", mastered: false },
      ],
    },
  },

  journalEntries: [],

  achievements: [
    { id: "ach1", title: "30 Days of Habit Practice", description: "Maintain daily routine immersion for a full month.", icon: "🏆", category: "Habits", unlocked: false, progress: "0/30 days", color: "#FDE047" },
    { id: "ach2", title: "Read First Complete Book", description: "Finish reading an entire book from cover to cover.", icon: "📖", category: "Reading", unlocked: false, progress: "0/1 book", color: "#F472B6" },
    { id: "ach3", title: "Delivered Spoken Reflection", description: "Record and review a spoken monologue with poise.", icon: "🎤", category: "Speaking", unlocked: false, progress: "0/1 recording", color: "#C084FC" },
    { id: "ach4", title: "Completed Technical Module", description: "Complete all exercises of a targeted skill module.", icon: "🎓", category: "Tech", unlocked: false, progress: "In progress", color: "#60A5FA" },
    { id: "ach5", title: "First 7-Day Habit Streak", description: "Hit a 7-day continuous streak in any daily routine.", icon: "🔥", category: "Habits", unlocked: false, progress: "0/7 days", color: "#FB923C" },
    { id: "ach6", title: "Vocabulary Explorer (30 Words)", description: "Master 30 new words or concepts in your studio.", icon: "💎", category: "Language", unlocked: false, progress: "0/30 words", color: "#A78BFA" },
    { id: "ach7", title: "First Deep Work Hours Logged", description: "Log your first 10 deep focus hours in the journal.", icon: "⏳", category: "Milestone", unlocked: false, progress: "0/10 hrs", color: "#34D399" },
    { id: "ach8", title: "First Journal Reflection Penned", description: "Document your very first evening inquiry reflection.", icon: "🪶", category: "Writing", unlocked: false, progress: "0/1 entry", color: "#E879F9" },
  ],

  visionBoard: {
    dreams: [
      { id: "vd1", title: "Master My Core Skills", description: "Speak with effortless poise and build projects that make me proud.", category: "Skills", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80", tapeColor: "purple" },
      { id: "vd2", title: "A Peaceful Sunlit Workspace", description: "A quiet space filled with warm tea, plants, books, and deep work.", category: "Life", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80", tapeColor: "pink" },
    ],
    readingWishlist: [
      { id: "bk1", title: "Atomic Habits", author: "James Clear", status: "Want to read", cover: "⚡" },
      { id: "bk2", title: "Show Your Work!", author: "Austin Kleon", status: "Wishlist", cover: "💡" },
      { id: "bk3", title: "Deep Work", author: "Cal Newport", status: "Wishlist", cover: "🌿" },
    ],
    bucketList: [
      { id: "bc1", item: "Complete my first 30-day consistency streak", done: false },
      { id: "bc2", item: "Deliver an impromptu 5-minute speech without notes", done: false },
      { id: "bc3", item: "Spend an entire quiet weekend reading in nature", done: false },
      { id: "bc4", item: "Write and publish my first personal essay", done: false },
    ],
    affirmations: [
      { id: "af1", text: "I am patient with my progress. Beautiful things take time to bloom. 🌸", author: "Growth Mindset" },
      { id: "af2", text: "Consistency is more valuable than sporadic intensity. ♡", author: "Daily Reminder" },
    ],
  },
};
