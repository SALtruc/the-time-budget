import type { Profile, ProfileId } from "./types";

// Copy tone: describe the pattern and its trade-offs without judging the
// player, and offer suggestions rather than instructions. Every week has
// context the game can't see (illness, recovery, family, finances).
export const PROFILES: Record<ProfileId, Profile> = {
  rmitScholar: {
    id: "rmitScholar",
    name: "RMIT Scholar",
    metrics: { performance: 4, stress: 3, wellbeing: 2, missedOpps: 3 },
    meaning:
      "You are building a strong academic foundation and performing well in your studies. To strengthen your future career prospects, consider balancing your academic achievements with more real-world experience and career development activities.",
    keyInsight:
      "Strong grades are valuable, and pairing them with practical experience can help you stand out.",
    advice:
      "Set aside 2 to 3 hours each week for career-focused activities such as networking, industry events, extracurricular projects, or internship preparation. It's not about studying less, but about turning your knowledge into career opportunities.",
    reflect: [
      "What are you hoping your grades will open up for you?",
      "Is there one small career step you could take alongside your study this week?",
    ],
    deltas: [
      { block: "selfStudying", hours: -2 },
      { block: "careerPrep", hours: 2 },
    ],
  },
  deadlineWarrior: {
    id: "deadlineWarrior",
    name: "Deadline Warrior",
    metrics: { performance: 3, stress: 5, wellbeing: 1, missedOpps: 4 },
    meaning:
      "Your schedule is heavily focused on assignments and deadlines, leaving limited time for rest or future career planning. While you're getting things done, this pace can make it harder to explore opportunities beyond your immediate priorities.",
    keyInsight:
      "Career preparation is often easy to postpone because it doesn't come with a deadline.",
    advice:
      "Look for ways to spread your workload more evenly and avoid last-minute rushes. Freeing up even 2 to 3 hours a week for rest, networking, or career development can make a meaningful difference. A well-rested student often works more effectively and gets more from their time.",
    reflect: [
      "Is this a typical week for you, or a busy stretch of the semester?",
      "What usually pushes your assignments to the last minute?",
    ],
    deltas: [
      { block: "assignment", hours: -2 },
      { block: "restWellbeing", hours: 2 },
      { block: "careerPrep", hours: 1 },
    ],
  },
  academicStrategist: {
    id: "academicStrategist",
    name: "Academic Strategist",
    metrics: { performance: 4, stress: 4, wellbeing: 2, missedOpps: 3 },
    meaning:
      "You are doing a great job managing your academics and staying focused on your studies. However, career preparation, networking, and practical experience may not be getting the same level of attention.",
    keyInsight:
      "The same planning and discipline that support your academic success can also help you build your career.",
    advice:
      "Maintain your current study habits while setting aside 3 to 4 hours each week for career-focused activities. Consider attending an industry event, career workshop, or networking session to complement your academic achievements and expand your opportunities.",
    reflect: [
      "How could the planning skills you use for study help your career too?",
      "Who is one person in your field you would like to learn from?",
    ],
    deltas: [
      { block: "networking", hours: 2 },
      { block: "careerPrep", hours: 2 },
    ],
  },
  sideHustleHero: {
    id: "sideHustleHero",
    name: "Side Hustle Hero",
    metrics: { performance: 3, stress: 4, wellbeing: 2, missedOpps: 2 },
    meaning:
      "You are gaining valuable real-world experience and developing practical skills alongside your studies. This gives you an advantage, but balancing work, university, and personal wellbeing can be challenging over time.",
    keyInsight:
      "Work experience becomes even more valuable when you take time to reflect on what you've learned and how it supports your future career goals.",
    advice:
      "Consider setting aside 2 to 3 hours each week for rest and recovery. Looking after your wellbeing can help you sustain your performance, make the most of your experience, and continue growing both academically and professionally.",
    reflect: [
      "What skills from your job could you describe in an interview tomorrow?",
      "Where in your week do you get real rest?",
    ],
    deltas: [
      { block: "workExperience", hours: -2 },
      { block: "restWellbeing", hours: 2 },
    ],
  },
  busyBeeProfessional: {
    id: "busyBeeProfessional",
    name: "Busy Bee Professional",
    metrics: { performance: 3, stress: 5, wellbeing: 1, missedOpps: 3 },
    meaning:
      "You are balancing multiple commitments, including study, assignments, and work. While you're managing a lot, this can leave little time to recharge and maintain your wellbeing, making it harder to perform at your best across all areas.",
    keyInsight:
      "When your schedule is constantly full, rest and recovery can easily be overlooked, increasing the risk of burnout.",
    advice:
      "Take a look at your current commitments and identify where you might create more space for yourself. Even setting aside an additional 5 to 6 hours each week for rest, exercise, or activities you enjoy can help you improve your energy, focus, and overall wellbeing.",
    reflect: [
      "Which of your commitments feel essential right now, and which could wait?",
      "Who could you talk to about sharing the load?",
    ],
    deltas: [
      { block: "workExperience", hours: -3 },
      { block: "restWellbeing", hours: 6 },
    ],
  },
  miniCeo: {
    id: "miniCeo",
    name: "Mini CEO",
    metrics: { performance: 4, stress: 5, wellbeing: 1, missedOpps: 2 },
    meaning:
      "You are ambitious, proactive, and already investing in your future through career-focused activities. Your drive is a real strength, but balancing achievement with wellbeing is important to ensure you can maintain that momentum over time.",
    keyInsight:
      "Long-term success comes from balancing effort with recovery and wellbeing.",
    advice:
      "Make time for 6 to 8 hours of genuine rest and recovery each week. You do not need to slow down. By taking care of yourself, you'll be better equipped to stay focused, perform well, and continue progressing toward your goals.",
    reflect: [
      "What are you working towards, and how will you know you have got there?",
      "What does recharging look like for you?",
    ],
    deltas: [{ block: "restWellbeing", hours: 7 }],
  },
  careerClimber: {
    id: "careerClimber",
    name: "Career Climber",
    metrics: { performance: 4, stress: 3, wellbeing: 3, missedOpps: 1 },
    meaning:
      "You are taking a proactive approach to your career and making steady progress toward your goals. Your efforts are paying off, and you are making the most of the opportunities available to you.",
    keyInsight:
      "Small, consistent actions can have a big impact on your career over time.",
    advice:
      "Keep up the great work while making sure your wellbeing stays a priority. Consider adding a little networking to complement your career preparation, and continue making time for rest and recovery along the way.",
    reflect: [
      "Which career action this semester has been most worthwhile for you?",
      "Who could you connect with to take your preparation further?",
    ],
    deltas: [
      { block: "networking", hours: 2 },
      { block: "restWellbeing", hours: 1 },
    ],
  },
  networkingNinja: {
    id: "networkingNinja",
    name: "Networking Ninja",
    metrics: { performance: 3, stress: 2, wellbeing: 4, missedOpps: 1 },
    meaning:
      "You are building meaningful connections and engaging with opportunities to expand your network. This can open doors and create valuable learning opportunities, while also supporting your wellbeing and confidence.",
    keyInsight:
      "Strong networks are built through genuine relationships and consistent engagement.",
    advice:
      "As you continue growing your network, make sure your studies are getting the attention they need. Finding a healthy balance between networking and academics can help you make the most of both.",
    reflect: [
      "Which connections have been most valuable to you so far, and why?",
      "How are your studies feeling this semester?",
    ],
    deltas: [
      { block: "networking", hours: -3 },
      { block: "selfStudying", hours: 3 },
    ],
  },
  opportunityHunter: {
    id: "opportunityHunter",
    name: "Opportunity Hunter",
    metrics: { performance: 4, stress: 3, wellbeing: 3, missedOpps: 1 },
    meaning:
      "You are actively exploring opportunities through career preparation, networking, and real-world experience. This well-rounded approach is helping you build valuable skills and momentum for your future career.",
    keyInsight:
      "Growth is most sustainable when career development, wellbeing, and academics are all working together.",
    advice:
      "You're on a strong path. As you continue taking advantage of new opportunities, make sure you're also setting aside time to rest and recharge. Even small moments of recovery can help you maintain your energy, focus, and performance over time.",
    reflect: [
      "Which opportunity are you most excited about right now?",
      "Is your pace one you could keep up for the whole semester?",
    ],
    deltas: [{ block: "restWellbeing", hours: 2 }],
  },
  rechargeChampion: {
    id: "rechargeChampion",
    name: "Recharge Champion",
    metrics: { performance: 3, stress: 1, wellbeing: 4, missedOpps: 3 },
    meaning:
      "You understand the importance of rest and recovery, and you make time to look after your wellbeing. This is a strength. At the same time, there may be opportunities to dedicate a little more time to career preparation and networking to support your future goals.",
    keyInsight:
      "Taking care of yourself provides the energy and focus needed to make the most of new opportunities.",
    advice:
      "Keep prioritising your wellbeing while setting aside a few hours each week for career-focused activities. Attending a workshop, updating your CV, or connecting with professionals can be a great way to build momentum without sacrificing balance.",
    reflect: [
      "What helps you feel most recharged?",
      "When you have energy to spare, what career step would you like to try first?",
    ],
    deltas: [
      { block: "restWellbeing", hours: -3 },
      { block: "careerPrep", hours: 3 },
    ],
  },
  zenMaster: {
    id: "zenMaster",
    name: "Zen Master",
    metrics: { performance: 2, stress: 1, wellbeing: 5, missedOpps: 5 },
    meaning:
      "You place a strong value on personal wellbeing and maintaining a balanced lifestyle. While this helps you stay refreshed and resilient, career preparation and networking may not currently be receiving as much attention, which could limit your awareness of future opportunities.",
    keyInsight:
      "Wellbeing creates a strong foundation, and combining it with purposeful career action can help you make even greater progress toward your goals.",
    advice:
      "Consider dedicating a little more time each week to career-focused activities, such as networking, skill building, or exploring opportunities that interest you. Small, consistent steps can help you move forward while still maintaining the balance and wellbeing that are important to you.",
    reflect: [
      "What is your main priority this week?",
      "What led you to give so much of your week to rest, and is it what you need right now?",
      "When you feel ready, what is one small step you would like to take?",
    ],
    deltas: [
      { block: "restWellbeing", hours: -8 },
      { block: "careerPrep", hours: 4 },
      { block: "networking", hours: 4 },
    ],
  },
  balancedBattery: {
    id: "balancedBattery",
    name: "Balanced Battery",
    metrics: { performance: 4, stress: 2, wellbeing: 4, missedOpps: 2 },
    meaning:
      "You have found a healthy balance between study, work, wellbeing, and career preparation. You're managing your commitments well while continuing to make steady progress toward your goals.",
    keyInsight:
      "Consistency and balance are powerful foundations for long-term success.",
    advice:
      "You're already in a strong position. Consider investing an extra 2 to 3 hours each week in career preparation to build even more momentum.",
    reflect: [
      "What habits help you keep this balance?",
      "What would you like to be ready for by the end of this year?",
    ],
    deltas: [{ block: "careerPrep", hours: 2 }],
  },
  campusConnector: {
    id: "campusConnector",
    name: "Campus Connector",
    metrics: { performance: 3, stress: 2, wellbeing: 4, missedOpps: 2 },
    meaning:
      "You are highly engaged in campus life and enjoy connecting with people and building community. Your wellbeing is strong, and you're making the most of the social side of university.",
    keyInsight:
      "Relationships can create valuable opportunities when paired with learning and career development.",
    advice:
      "Consider directing some of your networking efforts toward professional connections and career opportunities. At the same time, make sure you're setting aside enough time for study and assignments to support your academic goals.",
    reflect: [
      "Which of your campus activities could connect you with your future industry?",
      "How are your studies feeling this semester?",
    ],
    deltas: [
      { block: "leadership", hours: -3 },
      { block: "networking", hours: 3 },
    ],
  },
  communityBuilder: {
    id: "communityBuilder",
    name: "Community Builder",
    metrics: { performance: 4, stress: 3, wellbeing: 3, missedOpps: 2 },
    meaning:
      "You bring people together, take initiative, and actively engage in opportunities that benefit both your community and your own development. Your strong network and involvement are valuable strengths.",
    keyInsight:
      "Building communities and relationships is a skill that creates value in many careers.",
    advice:
      "If you haven't already, consider gaining more hands-on work experience through internships, projects, or part-time roles. Combining practical experience with your strong people skills can help you stand out even more.",
    reflect: [
      "What have you learned from your community involvement that an employer would value?",
      "What kind of work experience would build on it?",
    ],
    deltas: [{ block: "workExperience", hours: 3 }],
  },
  timeManagementArchitect: {
    id: "timeManagementArchitect",
    name: "Time Management Architect",
    metrics: { performance: 4, stress: 2, wellbeing: 4, missedOpps: 2 },
    meaning:
      "You manage your time thoughtfully across different priorities and have built a balanced, intentional routine. You show a level of self-awareness and discipline that sets you up well for long-term success.",
    keyInsight:
      "Strong outcomes come from making intentional choices about where to invest your time and energy.",
    advice:
      "You're already in a strong position. Consider dedicating a little more time to career preparation activities, such as networking, industry events, or skill-building opportunities, to maximise the impact of your efforts.",
    reflect: [
      "How do you decide what gets your time each week?",
      "Which area would you most like to grow next?",
    ],
    deltas: [
      { block: "selfStudying", hours: -2 },
      { block: "careerPrep", hours: 2 },
    ],
  },
  rmitAllRounder: {
    id: "rmitAllRounder",
    name: "RMIT All-Rounder",
    metrics: { performance: 3, stress: 3, wellbeing: 3, missedOpps: 3 },
    meaning:
      "You're involved in a range of activities and experiences, which is a great way to explore your interests and strengths. As you progress through university, developing a clearer focus can help you make even more meaningful progress toward your goals.",
    keyInsight:
      "Exploration is valuable, especially early on, but over time it's helpful to identify the areas that matter most to you.",
    advice:
      "Choose one or two areas to focus on more intentionally this semester. If you're unsure where to start, career preparation and networking are great ways to explore future opportunities.",
    reflect: [
      "Which activity this week felt the most meaningful to you?",
      "If you could only grow one area this semester, which would it be?",
    ],
    deltas: [
      { block: "careerPrep", hours: 2 },
      { block: "networking", hours: 2 },
    ],
  },
  strategicJuggler: {
    id: "strategicJuggler",
    name: "Strategic Juggler",
    metrics: { performance: 3, stress: 4, wellbeing: 2, missedOpps: 3 },
    meaning:
      "You're balancing a lot of responsibilities and making the most of your time. While this ambition is a strength, a packed schedule can sometimes leave too little room for rest and recovery.",
    keyInsight:
      "Making thoughtful choices about where to invest your time is just as important as taking on new opportunities.",
    advice:
      "Take a look at your current commitments and consider whether there's an activity you can scale back slightly. Creating a little more space for rest can help you maintain your energy, wellbeing, and performance over the long term.",
    reflect: [
      "Which commitments are you doing because you want to, and which because you feel you should?",
      "What would you drop if you had to free up five hours?",
    ],
    // Illustrative only — the actual lowest-priority block varies per player.
    deltas: [
      { block: "assignment", hours: -5 },
      { block: "restWellbeing", hours: 5 },
    ],
  },
};

export function getProfile(id: ProfileId): Profile {
  return PROFILES[id];
}
