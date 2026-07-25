import type { Profile, ProfileId } from "./types";

export const PROFILES: Record<ProfileId, Profile> = {
  rmitScholar: {
    id: "rmitScholar",
    name: "RMIT Scholar",
    metrics: { performance: 4, stress: 3, wellbeing: 2, missedOpps: 3 },
    meaning:
      "You are building a strong academic foundation, but your career preparation and real-world experience are being left behind. Recruiters value grades, but they also want to see what you have done outside the classroom.",
    keyInsight:
      "Strong grades matter, but employers also value practical experience and career readiness.",
    advice:
      "Try shifting 2–3 hours from self-studying into career preparation or networking each week. You do not need to study less — you need to make sure your knowledge is being translated into career action.",
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
      "Your week is ruled by assignments and submissions with little time to breathe, rest, or think about your future. This pattern is not sustainable and is likely costing you opportunities you do not even know exist.",
    keyInsight:
      "Career preparation is often overlooked because it has no immediate deadline.",
    advice:
      "Cut assignment hours by planning ahead so you are not cramming at the last minute. Redirect even 2–3 hours into rest or career preparation. A well-rested student produces better work in less time.",
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
      "You are spending so much time on academics that networking, career preparation, and work experience are getting very little attention. You are academically capable but professionally invisible.",
    keyInsight: "Strategic planning shouldn't stop academics, apply it to your career too.",
    advice:
      "Keep your study and assignment balance but find 3–4 hours to add networking or career preparation. Attend one industry event or career workshop this week instead of an extra revision session.",
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
      "You are out in the real world gaining hands-on experience and building practical skills that most of your peers do not have yet. However, if you keep this up without recovery time, your performance at work and at university will both start to decline.",
    keyInsight:
      "Work experience only becomes career capital when you reflect on and communicate what you've learned.",
    advice:
      "Try reducing work hours by 2–3 hours and putting that time into rest and wellbeing. You are building great experience — protect your ability to sustain it by looking after yourself.",
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
      "You are doing a lot: study, assignments, and work are all competing for your time, but your well-being score is very low, and your stress is at its limit. Doing everything at 60% is less effective than doing fewer things at 100%.",
    keyInsight: "Constantly juggling commitments can lead to burnout.",
    advice:
      "You need to make a hard decision about what to cut. Consider reducing either work hours or assignment prep time and putting at least 5–6 hours back into rest and wellbeing. You cannot pour from an empty cup.",
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
      "You are ambitious, career-driven, and already operating like someone who means business. However, you are building a strong future but at a personal cost that may catch up with you.",
    keyInsight: "Sustainable performance requires recovery, not just effort.",
    advice:
      "Protect at least 6–8 hours of genuine rest and recovery each week. You do not need to slow down — you need to be sustainable. Even the most successful people schedule recovery time.",
    deltas: [{ block: "restWellbeing", hours: 7 }],
  },
  careerClimber: {
    id: "careerClimber",
    name: "Career Climber",
    metrics: { performance: 4, stress: 3, wellbeing: 3, missedOpps: 1 },
    meaning:
      "You are laser-focused on your career transition, and it is paying off. Your performance is high, and you are missing very few opportunities. You have found your direction and are actively working toward it.",
    keyInsight: "Small, consistent career actions compound over time.",
    advice:
      "You are doing well — the main thing to watch is not burning out on career preparation alone. Add a small amount of networking to complement your preparation work, and make sure rest is not being sacrificed.",
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
      "You invest heavily in relationships and connections. Your stress is low, your wellbeing is good, and you are missing very few opportunities. However, academic performance may be at risk if study and assignment hours are too low.",
    keyInsight: "Networks create opportunities when relationships are genuine and purposeful.",
    advice:
      "Make sure self-studying and assignments are getting enough hours to keep your academic standing strong. Even shifting 3–4 hours from networking into study will protect your GPA without losing your networking momentum.",
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
      "You are actively combining career preparation, networking, and work experience into a powerful package. Your performance is high, and almost no opportunities are slipping past you.",
    keyInsight: "Career growth shouldn't come at the expense of wellbeing or academics.",
    advice:
      "The main risk is that rest is being squeezed. Make sure you are getting enough recovery time to sustain this level of activity. Even 1–2 extra hours of rest per week can significantly improve your focus and output.",
    deltas: [{ block: "restWellbeing", hours: 2 }],
  },
  rechargeChampion: {
    id: "rechargeChampion",
    name: "Recharge Champion",
    metrics: { performance: 3, stress: 1, wellbeing: 4, missedOpps: 3 },
    meaning:
      "You understand that rest is not a waste of time; it is what makes everything else work better. However, career preparation and networking are not getting enough attention, which means opportunities are passing you by while you recharge.",
    keyInsight: "Recovery improves the quality of every other activity.",
    advice:
      "You do not need to give up rest — you need to redirect some of it into career preparation. Try swapping 3–4 hours of leisure time for a career workshop, a CV review, or a networking event. Rest smart, not just more.",
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
      "Rest and personal wellbeing are your priority above everything else. However, this comes at a high cost; performance is low and you are missing more opportunities than any other profile. You are recharged but going nowhere fast.",
    keyInsight: "Too much rest can sometimes indicate avoidance rather than recovery.",
    advice:
      "You need to make a meaningful shift toward career preparation and networking. Even moving 8–10 hours from rest into career-focused activities will dramatically change your trajectory without destroying your wellbeing.",
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
      "You have found a genuinely healthy balance between rest, study, work, and career preparation. Your stress is low, your wellbeing is good, and your performance is strong. You are one of the few profiles that is both sustainable and career-ready at the same time.",
    keyInsight: "Consistency often outperforms periods of intense effort followed by burnout.",
    advice:
      "You are in a strong position — the main upgrade is to push career preparation slightly higher. Even 2–3 more hours on career prep per week will take you from balanced to truly ahead of the curve.",
    deltas: [{ block: "careerPrep", hours: 2 }],
  },
  campusConnector: {
    id: "campusConnector",
    name: "Campus Connector",
    metrics: { performance: 3, stress: 2, wellbeing: 4, missedOpps: 2 },
    meaning:
      "You are a natural community builder; you invest in people, show up for events, and are well-known around campus. Your well-being is high, and your stress is low. However, academic and career preparation hours may be too low to support your long-term goals.",
    keyInsight: "Social capital becomes valuable when converted into opportunities and learning.",
    advice:
      "Try channelling some of your social energy into professional networking rather than purely campus socialising. And protect at least 15–18 hours for study and assignments to keep your academic performance on track.",
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
      "You combine networking, leadership, and career preparation in a way that creates real value for the people around you and for your own career. You are visible, connected, and purposeful.",
    keyInsight: "Community-building is a highly transferable professional skill.",
    advice:
      "Consider adding some work experience to your week if you have not already. Practical real-world experience alongside your strong community presence will make your graduate profile very competitive.",
    deltas: [{ block: "workExperience", hours: 3 }],
  },
  timeManagementArchitect: {
    id: "timeManagementArchitect",
    name: "Time Management Architect",
    metrics: { performance: 4, stress: 2, wellbeing: 4, missedOpps: 2 },
    meaning:
      "You distribute your time deliberately and intentionally. Nothing is neglected, and nothing dominates. You are operating with a level of self-awareness that most students do not develop until much later.",
    keyInsight: "Success comes from conscious trade-offs, not perfect balance.",
    advice:
      "The only upgrade available to you is to push career preparation slightly higher while trimming from self-studying. You are already doing everything right — the question is whether you can sharpen your focus just a little more in the areas with the highest career return.",
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
      "Your time is spread across many areas without a clear dominant focus. This is common in earlier years of university and reflects someone who is still exploring. The risk is that without direction, the weeks pass without meaningful progress.",
    keyInsight: "Exploration is valuable early on but should gradually lead to focus.",
    advice:
      "Pick one or two areas to invest in more deliberately this semester. If you are unsure where to focus, career preparation and networking tend to have the highest long-term return. Start there and see where it leads.",
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
      "You are attempting to do everything at once, and your week is packed. This may look impressive, but your stress is very high, and your well-being is suffering. You are strategic in your thinking but overcommitted in your execution.",
    keyInsight: 'The ability to say "no" is as important as the ability to say "yes."',
    advice:
      "You need to make a deliberate choice to do less. Identify your lowest-priority block and cut it by 5–8 hours. Redirect that time into rest. Doing five things sustainably is more valuable than doing seven things at the edge of burnout.",
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
