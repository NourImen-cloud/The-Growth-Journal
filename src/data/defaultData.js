export const initialData = {
  profile: {
    name: "Divya",
    subtitle: "Focus today, shine tomorrow. ♡",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    theme: "lavender",
  },

  todayGoal: {
    completedHours: 6.0,
    targetHours: 8.0,
    percentage: 75,
    quote: "Discipline is choosing between what you want now and what you want most. ♡",
  },

  todaySchedule: [
    { id: "1", time: "07:00 AM", title: "Morning Routine & Tea", duration: "45 mins", category: "Routine", color: "#C084FC", completed: true },
    { id: "2", time: "08:00 AM", title: "English - Vocabulary & Speaking", duration: "1.5 hrs", category: "Focus", color: "#A855F7", completed: true },
    { id: "3", time: "10:00 AM", title: "Reading: Atomic Habits", duration: "1 hr", category: "Study", color: "#EC4899", completed: true },
    { id: "4", time: "11:30 AM", title: "Cozy Break & Walk", duration: "30 mins", category: "Break", color: "#F472B6", completed: true },
    { id: "5", time: "02:00 PM", title: "Lunch & Relax", duration: "1 hr", category: "Break", color: "#FB923C", completed: false },
    { id: "6", time: "03:00 PM", title: "English - Essay Writing", duration: "1 hr", category: "Skill", color: "#8B5CF6", completed: false },
    { id: "7", time: "04:30 PM", title: "Flashcard Revision", duration: "45 mins", category: "Review", color: "#E879F9", completed: false },
    { id: "8", time: "06:00 PM", title: "Gentle Yoga / Sunset Walk", duration: "40 mins", category: "Health", color: "#34D399", completed: false },
  ],

  weeklyOverview: [
    { day: "Mon", hours: 5.5 },
    { day: "Tue", hours: 6.0 },
    { day: "Wed", hours: 4.5 },
    { day: "Thu", hours: 7.2 },
    { day: "Fri", hours: 6.5 },
    { day: "Sat", hours: 5.0 },
    { day: "Sun", hours: 6.8 },
  ],

  quickNotes: [
    "Don't stop until you're proud ♡",
    "Consistency is the true magic wand",
    "Small steps every day yield big results ✨",
    "Progress, not perfection",
    "Hydrate and stretch every hour!",
  ],

  monthlyFocusList: [
    {
      id: "nov-2026",
      month: "November",
      year: 2026,
      skill: "English Mastery",
      icon: "Languages",
      themeColor: "#9333EA",
      goal: "Master everyday conversational fluency, natural cadence, and write weekly reflective essays.",
      quote: "Language is the roadmap of a culture. It tells you where its people come from and where they are going.",
      targetHours: 40,
      completedHours: 29.5,
      milestones: [
        { id: "m1", title: "Complete 10 English podcast episodes with written summaries", done: true },
        { id: "m2", title: "Record 4 speaking logs to analyze pronunciation & tone", done: true },
        { id: "m3", title: "Write and polish 3 introspective essays", done: true },
        { id: "m4", title: "Memorize & integrate 50 advanced vocabulary words", done: false },
        { id: "m5", title: "Hold 2 conversations entirely in English with a speaking partner", done: false },
      ],
      finalAssessment: {
        status: "In Progress",
        selfRating: 4.5,
        strengths: "Natural spoken transition phrases improved significantly. Great daily listening consistency.",
        growthAreas: "Expand vocabulary with more nuanced adjectives and idiomatic expressions.",
        carryForward: "Transition speaking confidence into December's Public Speaking challenge!",
      },
    },
    {
      id: "dec-2026",
      month: "December",
      year: 2026,
      skill: "Public Speaking",
      icon: "Mic",
      themeColor: "#EC4899",
      goal: "Overcome stage hesitation, structure compelling speech hooks, and present without notes.",
      quote: "Speech is power: speech is to persuade, to convert, to compel.",
      targetHours: 35,
      completedHours: 4.0,
      milestones: [
        { id: "m201", title: "Study 5 classic TED talks and dissect their opening hooks", done: false },
        { id: "m202", title: "Practice vocal variety and diaphragmatic breathing daily", done: false },
        { id: "m203", title: "Deliver a 5-minute lightning talk in front of peers or camera", done: false },
        { id: "m204", title: "Draft a signature 10-minute keynote speech", done: false },
      ],
      finalAssessment: {
        status: "Upcoming",
        selfRating: 0,
        strengths: "",
        growthAreas: "",
        carryForward: "",
      },
    },
    {
      id: "jan-2027",
      month: "January",
      year: 2027,
      skill: "Python & Data Structures",
      icon: "Code",
      themeColor: "#3B82F6",
      goal: "Solidify computer science fundamentals, master recursion and dynamic programming.",
      quote: "First, solve the problem. Then, write the code.",
      targetHours: 50,
      completedHours: 0,
      milestones: [
        { id: "m301", title: "Build 5 core data structure implementations from scratch", done: false },
        { id: "m302", title: "Solve 40 LeetCode / HackerRank problems", done: false },
        { id: "m303", title: "Build an automated web scraper script", done: false },
      ],
      finalAssessment: {
        status: "Upcoming",
        selfRating: 0,
        strengths: "",
        growthAreas: "",
        carryForward: "",
      },
    },
  ],

  habits: [
    { id: "h1", name: "English practice", icon: "Languages", category: "Skill", streak: 16, bestStreak: 25, color: "#9333EA" },
    { id: "h2", name: "Reading (20 pages)", icon: "BookOpen", category: "Mind", streak: 22, bestStreak: 30, color: "#EC4899" },
    { id: "h3", name: "Morning Exercise", icon: "Activity", category: "Health", streak: 9, bestStreak: 14, color: "#10B981" },
    { id: "h4", name: "Studying AI & Tech", icon: "Sparkles", category: "Learning", streak: 6, bestStreak: 18, color: "#3B82F6" },
    { id: "h5", name: "Journaling & Gratitude", icon: "Feather", category: "Mind", streak: 24, bestStreak: 24, color: "#F59E0B" },
    { id: "h6", name: "Sleeping by 11 PM", icon: "Moon", category: "Wellness", streak: 12, bestStreak: 19, color: "#6366F1" },
  ],

  habitHistory: {
    // Generate dates for current month
  },

  skillsData: {
    english: {
      title: "English Mastery",
      speaking: [
        { id: "sp1", title: "Morning Monologue: What makes a day meaningful", date: "Nov 23, 2026", duration: "03:45", notes: "Worked on eliminating 'um' and practicing rising/falling intonation. Felt fluid and expressive!" },
        { id: "sp2", title: "Book Reflection: Atomic Habits Chapter 4", date: "Nov 19, 2026", duration: "05:12", notes: "Articulated the concept of habit cue and craving with accurate terminology." },
        { id: "sp3", title: "Self-Introduction & Future Goals rehearsal", date: "Nov 14, 2026", duration: "04:30", notes: "Kept good eye contact with camera and clear pronunciation on consonant clusters." },
      ],
      writing: [
        { id: "wr1", title: "The Quiet Luxury of Slow Mornings", date: "Nov 21, 2026", words: 580, excerpt: "When we protect the first hour of our day from digital noise, we reclaim our autonomy to think clearly...", status: "Published" },
        { id: "wr2", title: "Why Deliberate Practice Beats Passive Talent", date: "Nov 15, 2026", words: 740, excerpt: "Talent is merely the starting line; the willingness to return to the uncomfortable edge of skill is what builds mastery...", status: "Reviewed" },
        { id: "wr3", title: "Letter to My Future Self: Who I Am Becoming", date: "Nov 08, 2026", words: 890, excerpt: "I hope you still look at autumn leaves with awe, and that the quiet discipline of these months bore sweet fruit...", status: "Personal" },
      ],
      listening: [
        { id: "ls1", title: "The Mel Robbins Podcast: Mindset & Resilience", host: "Mel Robbins", duration: "44 min", date: "Nov 24, 2026", keyTakeaway: "You don't need motivation; you need clarity and friction-free starting steps." },
        { id: "ls2", title: "Huberman Lab: The Science of Focus & Flow", host: "Andrew Huberman", duration: "52 min", date: "Nov 18, 2026", keyTakeaway: "Resting the eyes on a distant horizon resets optical strain and mental alertness." },
        { id: "ls3", title: "TED Radio Hour: The Power of Storytelling", host: "Manoush Zomorodi", duration: "38 min", date: "Nov 10, 2026", keyTakeaway: "People connect to vulnerability and lessons learned, not flawless resumes." },
      ],
      reading: [
        { id: "rd1", title: "Atomic Habits", author: "James Clear", totalPages: 320, pagesRead: 275, rating: 5, status: "Currently Reading" },
        { id: "rd2", title: "Show Your Work!", author: "Austin Kleon", totalPages: 224, pagesRead: 224, rating: 5, status: "Completed" },
        { id: "rd3", title: "The Art of Learning", author: "Josh Waitzkin", totalPages: 288, pagesRead: 190, rating: 4.5, status: "Currently Reading" },
        { id: "rd4", title: "Deep Work", author: "Cal Newport", totalPages: 304, pagesRead: 304, rating: 5, status: "Completed" },
      ],
      vocabulary: [
        { id: "vc1", word: "Serendipity", phonetic: "/ˌser.ənˈdɪp.ə.ti/", definition: "The occurrence of events by chance in a happy or beneficial way.", example: "Finding this peaceful cafe was absolute serendipity.", category: "Aesthetic", mastered: true },
        { id: "vc2", word: "Eloquent", phonetic: "/ˈel.ə.kwənt/", definition: "Fluent or persuasive in speaking or writing.", example: "She gave an eloquent presentation about personal reinvention.", category: "Speaking", mastered: true },
        { id: "vc3", word: "Tenacity", phonetic: "/təˈnæs.ə.ti/", definition: "The quality or fact of being able to grip something firmly; determination.", example: "Her tenacity carried her through difficult exam seasons.", category: "Mindset", mastered: true },
        { id: "vc4", word: "Ephemeral", phonetic: "/ɪˈfem.ər.əl/", definition: "Lasting for a very short time; fleeting.", example: "Fame may be ephemeral, but genuine character lasts.", category: "Literature", mastered: false },
        { id: "vc5", word: "Resilience", phonetic: "/rɪˈzɪl.jəns/", definition: "The capacity to recover quickly from difficulties.", example: "Growth is rooted in emotional resilience and self-compassion.", category: "Psychology", mastered: true },
        { id: "vc6", word: "Catharsis", phonetic: "/kəˈθɑː.sɪs/", definition: "The process of releasing strong or repressed emotions through art or writing.", example: "Journaling provided a gentle catharsis after a demanding week.", category: "Writing", mastered: false },
      ],
    },
  },

  journalEntries: [
    {
      id: "j1",
      date: "2026-11-24",
      title: "Finding Joy in Small Increments",
      mood: "Peaceful 🌸",
      prompts: {
        learn: "I learned how speech transitions like 'furthermore' and 'on the other hand' change the rhythm of speaking.",
        challenge: "Waking up on time felt heavy because of the cold morning, but tea and warm lighting helped.",
        proud: "I completed my speaking audio recording in one take without pausing to delete it!",
        improve: "Remember to drink water before each study session and step away from the screen every 45 mins.",
      },
      tags: ["Consistency", "Mindset", "English"],
      gratitude: "Grateful for cozy cinnamon tea, rainy afternoon, and quiet focus.",
    },
    {
      id: "j2",
      date: "2026-11-23",
      title: "Overcoming Self-Doubt While Reading Aloud",
      mood: "Inspired ✨",
      prompts: {
        learn: "It's normal to stumble. Native speakers stumble too; what matters is pacing and confidence.",
        challenge: "Wanted to abandon the essay draft halfway through, fearing it wasn't insightful enough.",
        proud: "Pushed through the messy middle and ended up with 600 thoughtful words.",
        improve: "Don't edit while drafting. Let the thoughts flow first, polish later.",
      },
      tags: ["Writing", "OvercomingFear"],
      gratitude: "Grateful for supportive friends and a safe space to practice without judgment.",
    },
    {
      id: "j3",
      date: "2026-11-22",
      title: "The Magic of 20 Focused Minutes",
      mood: "Productive ☕",
      prompts: {
        learn: "Starting is 80% of the friction. Once the Pomodoro timer starts ticking, momentum kicks in.",
        challenge: "Distractions from phone notifications.",
        proud: "Put my phone in another room and completed 4 solid Pomodoro blocks.",
        improve: "Prepare tomorrow's study notebook the night before so there is zero start friction.",
      },
      tags: ["Productivity", "Pomodoro"],
      gratitude: "Grateful for energy, a warm blanket, and fresh stationery.",
    },
  ],

  achievements: [
    { id: "ach1", title: "30 Days of English Practice", description: "Maintained daily language immersion for a full month.", icon: "🏆", category: "Language", unlocked: true, unlockedDate: "Nov 20, 2026", color: "#FDE047" },
    { id: "ach2", title: "Read First English Novel", description: "Finished reading an entire book in English from cover to cover.", icon: "📖", category: "Reading", unlocked: true, unlockedDate: "Nov 15, 2026", color: "#F472B6" },
    { id: "ach3", title: "Delivered Keynote Speech", description: "Presented a 10-minute talk with clarity and poise.", icon: "🎤", category: "Speaking", unlocked: true, unlockedDate: "Nov 10, 2026", color: "#C084FC" },
    { id: "ach4", title: "Completed Technical Course", description: "Completed all modules and practical exercises.", icon: "🎓", category: "Tech", unlocked: true, unlockedDate: "Nov 02, 2026", color: "#60A5FA" },
    { id: "ach5", title: "Habit Streak Champion", description: "Hit a 21-day continuous streak across 3 or more daily routines.", icon: "🔥", category: "Habits", unlocked: true, unlockedDate: "Nov 23, 2026", color: "#FB923C" },
    { id: "ach6", title: "Vocabulary Virtuoso", description: "Mastered 50 new words and used them in daily sentences.", icon: "✨", category: "Language", unlocked: false, progress: "38/50 words", color: "#A78BFA" },
    { id: "ach7", title: "100 Hours of Deep Work", description: "Logged 100 high-focus hours in the growth journal.", icon: "⏳", category: "Milestone", unlocked: false, progress: "72/100 hrs", color: "#34D399" },
    { id: "ach8", title: "Storyteller's Quill", description: "Penned 10 thoughtful daily journal reflections.", icon: "🪶", category: "Writing", unlocked: false, progress: "6/10 entries", color: "#E879F9" },
  ],

  visionBoard: {
    dreams: [
      { id: "vd1", title: "Fluent Public Speaking", description: "Speak on international stages with grace, authenticity, and humor.", category: "Skills", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80", tapeColor: "purple" },
      { id: "vd2", title: "Study & Live Abroad", description: "Experience morning walks in European libraries and historic cafes.", category: "Life", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80", tapeColor: "pink" },
      { id: "vd3", title: "Build My Own Creative Studio", description: "A warm, sunlit workspace filled with plants, books, and code.", category: "Career", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80", tapeColor: "yellow" },
    ],
    readingWishlist: [
      { id: "bk1", title: "Steal Like an Artist", author: "Austin Kleon", status: "Next Up", cover: "🎨" },
      { id: "bk2", title: "The Courage to Be Disliked", author: "Ichiro Kishimi", status: "Want to read", cover: "🌿" },
      { id: "bk3", title: "Atomic Habits", author: "James Clear", status: "Reading", cover: "⚡" },
      { id: "bk4", title: "Klara and the Sun", author: "Kazuo Ishiguro", status: "Wishlist", cover: "☀️" },
      { id: "bk5", title: "Show Your Work!", author: "Austin Kleon", status: "Completed", cover: "✨" },
    ],
    bucketList: [
      { id: "bc1", item: "Visit a traditional Japanese tea ceremony in Kyoto", done: false },
      { id: "bc2", item: "Write and publish my first personal mini-book or guide", done: false },
      { id: "bc3", item: "Deliver an impromptu 5-minute speech without trembling", done: true },
      { id: "bc4", item: "Spend a whole week reading in a quiet mountain cabin", done: false },
      { id: "bc5", item: "Maintain a 100-day daily journaling streak", done: false },
    ],
    affirmations: [
      { id: "af1", text: "I am patient with my progress. Beautiful things take time to bloom. 🌸", author: "Divya" },
      { id: "af2", text: "Consistency is more valuable than sporadic intensity. ♡", author: "Growth Mindset" },
      { id: "af3", text: "Every expert was once a beginner who refused to quit. ✨", author: "Self Reminder" },
    ],
  },
};
