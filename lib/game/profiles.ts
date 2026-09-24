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
      "You are building a strong academic foundation, and that commitment shows. Career preparation and real-world experience are getting less of your time right now. Employers value grades, and they also like to see what you have explored outside the classroom.",
    keyInsight:
      "Strong grades matter, but employers also value practical experience and career readiness.",
    advice:
      "If it fits your week, you could try moving 2–3 hours from self-studying into career preparation or networking. It is not about studying less, but about turning what you know into career action.",
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
      "Your week is shaped by assignments and submissions, leaving little room to breathe, rest, or think about what comes next. Busy periods happen to everyone, but if this becomes your usual rhythm it can be hard to sustain.",
    keyInsight:
      "Career preparation is often overlooked because it has no immediate deadline.",
    advice:
      "Planning a little further ahead might ease the last-minute pressure. If you free up even 2–3 hours, you could give some of it back to rest or to your career. A rested mind often produces better work in less time.",
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
      "You are putting a lot of care into your academics, so networking, career preparation, and work experience are getting less attention for now. You are clearly capable; the opportunity is to let more people see what you can do.",
    keyInsight: "Strategic planning shouldn't stop at academics; apply it to your career too.",
    advice:
      "You could keep your study balance and look for 3–4 hours for networking or career preparation. Swapping one extra revision session for an industry event or career workshop is a good place to start.",
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
      "You are out in the real world gaining hands-on experience and building practical skills that many of your peers are still developing. Work can be a necessity as well as a choice, so it is worth making sure you also have time to recover.",
    keyInsight:
      "Work experience only becomes career capital when you reflect on and communicate what you've learned.",
    advice:
      "If your situation allows, giving 2–3 hours back to rest and wellbeing could help you sustain this pace. You are building great experience, and looking after yourself protects it.",
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
      "You are juggling a lot: study, assignments, and work are all competing for your time, and your stress is running high. It is a lot to carry, and spreading yourself this thin can make each part harder than it needs to be.",
    keyInsight: "Constantly juggling commitments can lead to burnout.",
    advice:
      "It may help to look at which commitments are truly fixed and which have some flexibility. If you can ease off one of them, even a few extra hours of rest and wellbeing can make a real difference. You cannot pour from an empty cup.",
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
      "You are ambitious, career-driven, and already operating like someone who means business. You are building a strong future; the thing to watch is how much it is asking of you personally.",
    keyInsight: "Sustainable performance requires recovery, not just effort.",
    advice:
      "You could try protecting 6–8 hours of genuine rest and recovery each week. It is not about slowing down but about keeping your pace sustainable. Many successful people schedule recovery time the same way they schedule work.",
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
      "You are clearly focused on your career, and it is paying off. Your performance is high and you are making the most of the opportunities around you. You have found a direction and are actively working toward it.",
    keyInsight: "Small, consistent career actions compound over time.",
    advice:
      "You are doing well. You might add a little networking to complement your preparation work, and keep an eye on making sure rest still has its place.",
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
      "You invest a lot in relationships and connections. Your stress is low, your wellbeing is good, and you are catching lots of opportunities. It is worth checking that study and assignments still have enough room to keep your academics on track.",
    keyInsight: "Networks create opportunities when relationships are genuine and purposeful.",
    advice:
      "You could make sure self-studying and assignments get the hours they need. Moving 3–4 hours from networking into study could protect your grades without losing your momentum.",
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
      "You are combining career preparation, networking, and work experience into a powerful package. Your performance is high, and you are making the most of the opportunities that come your way.",
    keyInsight: "Career growth shouldn't come at the expense of wellbeing or academics.",
    advice:
      "Rest may be getting squeezed. Even 1–2 extra hours of recovery a week could help your focus and help you keep this up.",
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
      "You understand that rest is not a waste of time; it is what makes everything else work better. Career preparation and networking are getting less of your attention at the moment, so some opportunities may pass by while you recharge.",
    keyInsight: "Recovery improves the quality of every other activity.",
    advice:
      "You do not need to give up rest. When you feel ready, you could try redirecting a few hours into a career workshop, a CV review, or a networking event.",
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
      "Rest and personal wellbeing are at the centre of your week, so performance and new opportunities are taking a back seat for now. We understand that prioritizing your wellbeing may be what you need right now. As you regain your energy, the next step is to channel that renewed strength into meaningful action and get back on track.",
    keyInsight:
      "Rest is essential. Over time, balancing it with action helps you move toward your goals.",
    advice:
      "There is no need to rush. When you feel ready, you could start small, perhaps a few hours a week on career preparation or networking, and build from there at your own pace.",
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
      "You have found a healthy balance between rest, study, work, and career preparation. Your stress is low, your wellbeing is good, and your performance is strong. You are both sustainable and career-ready at the same time.",
    keyInsight: "Consistency often outperforms periods of intense effort followed by burnout.",
    advice:
      "You are in a strong position. If you want to go further, 2–3 more hours of career preparation per week could move you from balanced to ahead of the curve.",
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
      "You are a natural community builder; you invest in people, show up for events, and are well-known around campus. Your wellbeing is high and your stress is low. It is worth checking that study and career preparation have enough room to support your longer-term goals.",
    keyInsight: "Social capital becomes valuable when converted into opportunities and learning.",
    advice:
      "You could channel some of your social energy into professional networking as well as campus life, and keep around 15–18 hours for study and assignments.",
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
      "You combine networking, student engagement, and career preparation in a way that creates real value for the people around you and for your own career. You are visible, connected, and purposeful.",
    keyInsight: "Community-building is a highly transferable professional skill.",
    advice:
      "If you have not already, you might add some work experience to your week. Real-world experience alongside your community presence would make your graduate profile very competitive.",
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
      "You distribute your time deliberately and intentionally. Nothing is neglected, and nothing dominates. You are showing a level of self-awareness that many people take years to develop.",
    keyInsight: "Success comes from conscious trade-offs, not perfect balance.",
    advice:
      "You are already in a great place. If you want to fine-tune, you could shift a little time from self-studying to career preparation, the area with the highest long-term return.",
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
      "Your time is spread across many areas without one clear focus. This is common earlier in university and reflects someone who is still exploring, which is valuable. Over time, a little more direction can help each week add up to progress.",
    keyInsight: "Exploration is valuable early on but should gradually lead to focus.",
    advice:
      "You could pick one or two areas to invest in more deliberately this semester. If you are unsure where to start, career preparation and networking tend to have a strong long-term return.",
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
      "You are trying to do a bit of everything, and your week is packed. That takes real drive, but your stress is high and your wellbeing is feeling it. Your thinking is strategic; your schedule may just be asking too much of you.",
    keyInsight: 'The ability to say "no" is as important as the ability to say "yes."',
    advice:
      "It might help to pick the commitment that matters least to you right now and scale it back, giving that time to rest instead. Doing a few things sustainably is often more rewarding than doing everything at the edge of burnout.",
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
