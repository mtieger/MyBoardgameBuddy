/**
 * rules.js — High Frontier 4 All Rules Database
 * Proof of concept: core base rules + Module 0 (Politics) rules.
 *
 * Each rule object:
 *   id         {string}        Rulebook reference (e.g. "A1", "O2", "F4c")
 *   section    {string}        Display section label (same as id, kept separate for grouping)
 *   title      {string}        Human-readable rule title
 *   text       {string}        Full rule text as written in the rulebook
 *   modules    {number[]}      Module numbers required for this rule to apply.
 *                              Empty array = always active (base game, no modules needed).
 *   scenarios  {string[]}      Scenario names this rule applies to, or ["all"].
 *   variants   {string[]}      Variant names required for this rule, or [].
 *   supersedes {string|null}   ID of the rule this rule replaces when active, or null.
 */

const RULES_DB = [

  // ── CORE BASE RULES (always active) ─────────────────────────────────────

  {
    id: "A1",
    section: "A1",
    title: "Core Overview",
    text: "Players, representing the spacefaring factions of Earth, bid for patents (space technology cards) and boost them into Low Earth Orbit (LEO) to be assembled into Rockets and their Cargos. Water in LEO is used both as commodity currency and as rocket propellant, and each water container there is called one Aqua. Once loaded with Fuel Tanks (FTs) of water, Rockets fly to promising industrial and science Sites (planets, asteroids, etc.). If prospecting succeeds, a Claim is made. A Claim can be upgraded to a Factory to produce useful new equipment. By extracting water from a Site, FTs are produced both for water propellant and as money (\"Aqua\") if shipped back to LEO.\na. Core Game Victory. At the end of 48 years (48 Turns per player), the winner is the player with the highest victory point (VP) total.\nb. Sunspot Cycles. Each Turn in High Frontier is one year, and the length of a game is measured in Sunspot Cycles of 12 years. Thus the standard Core Game is 4 Sunspot Cycles; Core Game plus Modules 1 and/or 2 is 5 Sunspot Cycles; Core Game plus Modules 1, 2, and Futures is 7 Sunspot Cycles.",
    modules: [],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "A2",
    section: "A2",
    title: "Metarules",
    text: "Terms being defined are listed in bold, or italicized if defined elsewhere. Capitalized terms are defined in the glossary.\nb. Sequential Processes are presented in the order listed in the sequence of play, introduced by a simple overview followed by specific bullets.\nc. The Golden Rule. If the text on a card, scenario, tutorial, or variant contradicts these rules, that text prevails.\nd. The Modular Rule. Rules in blue font are modular rules that are ignored unless playing with the relevant Module. Rules in the Modules supersede these core rules. If a conflict occurs between Modules, use the publication date as the final arbiter.",
    modules: [],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "D1",
    section: "D1",
    title: "Player Turn",
    text: "You may do either or both of the following on your Turn, in any order: move your Rocket and/or perform an Operation. Except during movement or an Operation, you may perform any number of free actions.\na. Movement (H). You may move your Rocket once per Turn. Some Modules allow multiple Spacecraft; if so, you may move each of them once per Turn.\nb. Operation (I). You may perform one Operation per Turn.\nc. Free Actions (G). You may perform any number of free actions on your Turn, including the same free action multiple times.",
    modules: [],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "D2",
    section: "D2",
    title: "Advance Sunspot Cycle",
    text: "The 1st Player advances the Sunspot Cube clockwise, which may trigger a threshold:\na. Event Threshold. If the cube crosses an \"event\" threshold, make an Event Roll (K2) and resolve the event (applied to all players, starting with the 1st Player).\nb. Seniority Threshold. If the cube crosses the \"SENIORITY\" threshold, remove a Seniority Disk. If no disks remain, the game immediately ends with scoring per M2. Player order can change if using Module 0 (O6b).",
    modules: [],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "F4c",
    section: "F4c",
    title: "Thruster Fuel Compatibility",
    text: "A Spacecraft may be fueled with any type of Fuel, but it cannot expend Fuel in a Burn or use an afterburner (H3a) if the color of the activated thrust triangle is of a higher grade than the color of the Wet Mass Chit.\n• A dirt thruster can be activated with any color Wet Mass Chit.\n• A water thruster can be activated with a blue or gold Wet Mass Chit.\n• An isotope thruster can only activate with a gold Wet Mass Chit.",
    modules: [],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "I1",
    section: "I1",
    title: "Income Operation",
    text: "Once per Turn, as your Operation, you may receive 1 Aqua as income from the bank. (Module 0: this operation is replaced by the Fundraise Operation, O2b.)",
    modules: [],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "B6a",
    section: "B6a",
    title: "Faction Privilege",
    text: "Each Crew card has a Faction Privilege listed below its rad-hardness. This Ability is active in the core game except during Anarchy (K2e). Privileges include: Blink Telescope, Dharma Refuel, Felonious, Launch Fees, Marketeer, Mooncable, Open Source FINAO, Powersat, Secretary-General, Scrum Troubleshooters, Skunkworks, and Taxes (see glossary). All faction privileges are assumed to be the result of space facilities in LEO. If Module 2 is used, these space facilities are Home Bernals, and faction privileges are disabled until this space station is Anchored in a Home Orbit.",
    modules: [],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  // ── MODULE 0 — POLITICS ───────────────────────────────────────────────────

  {
    id: "O",
    section: "O",
    title: "Module 0 — Politics (Overview)",
    text: "In this Module, Factions elect representatives from their population as delegates into 7 different Ideologies, each with its own Law.\na. The Assembly is the hexagonal area on the placard where Factions use elected delegates to manipulate policy and gain advantages through Laws.\nb. Ideologies include freedom, honor, unity, authority, equality, individuality, and (in the center) centrist.\nc. Economic vs. Political Pull. You gain delegate cubes by fundraising, building Colonies, or exomigration (2A6). You are limited to 7 cubes, which can be used either as Factories or as delegates.\nd. Active Law. A gold star on the assembly indicates which Law is currently active.\ne. Anarchy. Delegates can be killed by the anarchy event (K2e).",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "O1",
    section: "O1",
    title: "Political Assembly Setup",
    text: "In addition to core setup (C), find the assembly placard and set up the assembly as follows:\na. Active Law (gold star) is placed into the starting centrist ideology.\nb. Starting Delegate. Each player adds one cube into the Ideology of their player color.",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "O2",
    section: "O2",
    title: "Delegates & Fundraise Operation",
    text: "The new fundraise operation gives you 1 Aqua, adds 1 cube into the assembly, and moves one cube in the assembly. It replaces the income operation (I1).\na. Delegates are any cube of a player color in the assembly. You are component-limited to 7 cubes (I7f). You cannot use your big cube as a delegate (Module 1).\nb. Fundraise Operation replaces the income operation (I1). Performed in 3 steps:\n• Receive 1 Aqua as income.\n• You may elect a delegate from your Reserve into your faction ideology (B6b) or an Ideology where you already have a delegate.\n• You may move any one of your delegates to an adjacent Ideology.\nc. Representation. If you build a Colony (G3c) or exomigrate (2A6c), you may immediately place one of your cubes as a delegate into the Ideology indicated by the politics of the Crew or Colonist used.",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: "I1",
  },

  {
    id: "O3",
    section: "O3",
    title: "Law Activation",
    text: "After any game effect that places, removes, or moves a delegate, perform a vote tally then activation:\na. Vote Tally. Check if any Ideology has equal to or more delegates than the Active Law's Ideology. If so, the active player must move the Active Law into the Ideology with the most delegates. If tied with the current Ideology, the Active Law may stay.\nb. Activation. Immediately following a vote tally that moves the Active Law into a new Ideology, the Law of that Ideology becomes active and may be used by any Faction on their Turn.",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "O4",
    section: "O4",
    title: "Lobby (free action)",
    text: "As a once-per-turn free action, pay 1 Aqua and Decommission 1 of your delegates in an inactive Ideology to use its Law throughout your Turn.\na. Centrist Law (O5g) may be lobbied only during the pad explosion/space debris event (K2c).\nb. Anarchy/War. Laws may be lobbied during Anarchy (K2e) or War. Payment is waived during War.",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "O5",
    section: "O5",
    title: "Laws",
    text: "Every Ideology has an associated Law. When active (O3b), its effect applies to all players:\na. Free Trade Act (freedom). You may sell two cards for 5 Aqua total with a free market operation (I3).\nb. Paleoconservative Directive (honor). During a fundraise operation, your income equals the number of glory chits you hold anywhere.\nc. UN General Assembly (unity). Every other Ideology with 2+ delegates also has its Law activated, but no player may lobby any Laws.\nd. Martial Law (authority). Once per Turn, right after the vote tally of a fundraise operation, you may Discard an opponent's delegate. Martial law prevents changing the 1st Player at cycle end (O6b).\ne. Research Grants (equality). When initiating a research auction (I2), you must skip the auction and instead pay 1 Aqua to take the top card of any patent deck, without bonus supports (I2g) or academia hand limit (I2a).\nf. Freedom To Roam Treaty (individuality). You may treat an opponent's Factory or Bernal as your own for On-Site Operations, factory-assist, Promotions, or Space Elevators without the owner's permission.\ng. Mishap Insurance (centrist). During a pad explosion/space debris event (K2c), any Faction with a delegate here gains Aquas equal to the Mass of their decommissioned card. A player may lobby this after the Event Roll to claim insurance.",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "O6",
    section: "O6",
    title: "12-Year Legacy",
    text: "Whenever a seniority disk is removed, the 1st Player adds it to an Ideology of their choice in the circular legacy spot. Legacy votes count only during the final vote and cannot be moved or removed.\na. Final Vote. Placing the final seniority disk into the assembly ends the game. The 1st Player performs a vote tally (O3a) counting both delegates and legacy votes. The final Active Law affects scoring per O7.\nb. Term Limits Baton Pass. Except during active martial law (O5d), the 1st Player must assign another player as the new 1st Player at the end of each cycle.",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

  {
    id: "O7",
    section: "O7",
    title: "Political Scoring",
    text: "After the final vote (O6a), if there is no current Anarchy or War, apply the following endgame VP bonus based on the final Active Law:\na. Freedom. +1 VP per Factory cube.\nb. Honor. +1 VP per glory chit held in your Spacecraft Stack or on your playmat.\nc. Unity. +1 VP for each Ideology you have at least one delegate in.\nd. Authority. +1 VP per Claim disk.\ne. Equality. +1 VP per Colony dome (including on Bernals).\nf. Individuality. +1 VP per wood or plastic token on Sites with Hazardous lander burns.\ng. Centrist. No VP changes.",
    modules: [0],
    scenarios: ["all"],
    variants: [],
    supersedes: null,
  },

];

/**
 * buildSessionRulebook(gameConfig)
 *
 * Returns the subset of RULES_DB that applies to a specific game session,
 * with superseded rules removed.
 *
 * @param {object}   gameConfig
 * @param {number[]} gameConfig.modules  - Active module numbers, e.g. [0, 1, 2]
 * @param {string}   gameConfig.scenario - Active scenario name, e.g. "Standard Game"
 * @param {string[]} gameConfig.variants - Active variant names, e.g. ["Quick Start"]
 * @returns {object[]} Filtered, supersession-resolved rule array
 */
function buildSessionRulebook({ modules = [], scenario = "", variants = [] } = {}) {
  const moduleSet  = new Set(modules);
  const variantSet = new Set(variants);

  // Step 1 — keep rules whose module, scenario, and variant requirements are all satisfied.
  const active = RULES_DB.filter(rule => {
    // Module check: rule applies if it has no module requirements (core),
    // or every required module is present in the active set.
    const moduleMatch =
      rule.modules.length === 0 ||
      rule.modules.every(m => moduleSet.has(m));

    // Scenario check: rule applies if it targets "all" scenarios,
    // or explicitly lists the current scenario.
    const scenarioMatch =
      rule.scenarios.includes("all") ||
      rule.scenarios.includes(scenario);

    // Variant check: rule applies if it has no variant requirements,
    // or every required variant is currently active.
    const variantMatch =
      rule.variants.length === 0 ||
      rule.variants.every(v => variantSet.has(v));

    return moduleMatch && scenarioMatch && variantMatch;
  });

  // Step 2 — collect the set of rule IDs that are superseded by any active rule.
  const supersededIds = new Set(
    active
      .map(rule => rule.supersedes)
      .filter(id => id !== null)
  );

  // Step 3 — remove any rule whose id has been superseded.
  return active.filter(rule => !supersededIds.has(rule.id));
}

// Expose on window so inline onclick attributes can always reach it,
// regardless of whether the browser treats this script as module scope.
window.buildSessionRulebook = buildSessionRulebook;
