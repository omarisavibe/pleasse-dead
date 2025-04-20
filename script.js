// --- State & Constants ---
// (Same as V4)
let currentLanguage = 'en';
let currentUnitSystem = 'metric';
let baseButterGrams = 0;
let selectedCookieType = null;
const GRAMS_PER_CUP_BUTTER = 226.8;
const GRAMS_PER_CUP_FLOUR = 125;
const GRAMS_PER_CUP_GRAN_SUGAR = 200;
const GRAMS_PER_CUP_BROWN_SUGAR = 213; // Packed
const GRAMS_PER_TSP_SALT = 6;
const GRAMS_PER_TSP_BAKING_SODA = 4.8;
const GRAMS_PER_TSP_BAKING_POWDER = 4;
const GRAMS_PER_TBSP = 15;
const GRAMS_PER_LARGE_EGG = 50;
const GRAMS_PER_TSP_VANILLA = 4.2;
const GRAMS_PER_CUP_CHOC_CHIPS = 170;
const GRAMS_PER_TBSP_MILK_POWDER = 7;
const GRAMS_PER_TSP_WATER = 4.9;


// --- Base Recipes (Using keys matching langStrings) ---
 const baseRecipes = {
     classic: {
        baseButter: 284, yieldPerBase: 30, cookieSizeDescKey: 'yieldClassic',
        ingredients: { unsaltedButter:[284,'butter'], granulatedSugar:[200,'sugar'], lightBrownSugar:[200,'sugar'], largeEggs:[100,'egg'], vanillaExtract:[8.4,'vanilla'], allPurposeFlour:[420,'flour'], tableSalt:[6,'salt'], bakingPowder:[4,'bakingPowder'], bakingSoda:[2.4,'bakingSoda'], chocolateChips:[454,'chocolate'], prepWater:[9.4,'water'] },
        prepTechKeys: ['brownButter', 'hydrateButter', 'chillButterClassicThick'],
        stepsKey: 'classicSteps',
        whyItWorksKey: 'classicWhyItWorks'
     },
     thick: {
        baseButter: 284, yieldPerBase: 10, cookieSizeGrams: 140, cookieSizeDescKey: 'yieldThick',
        ingredients: { unsaltedButter:[284,'butter'], granulatedSugar:[100,'sugar'], lightBrownSugar:[200,'sugar'], toastedMilkPowder:[15,'milkPowder'], largeEggs:[100,'egg'], vanillaExtract:[8.4,'vanilla'], allPurposeFlour:[420,'flour'], tableSalt:[6,'salt'], bakingPowder:[5,'bakingPowder'], chocolateChips:[567,'chocolate'], prepWater:[9.4,'water'] },
        prepTechKeys: ['brownButter', 'hydrateButter', 'toastMilkPowder', 'chillButterClassicThick'],
        stepsKey: 'thickSteps',
        whyItWorksKey: 'thickWhyItWorks'
     },
     thin: {
        baseButter: 284, yieldPerBase: 42, cookieSizeDescKey: 'yieldThin',
        ingredients: { unsaltedButter:[284,'butter'], granulatedSugar:[300,'sugar'], lightBrownSugar:[200,'sugar'], largeEggs:[100,'egg'], vanillaExtract:[8.4,'vanilla'], allPurposeFlour:[420,'flour'], tableSalt:[6,'salt'], bakingSoda:[7.2,'bakingSoda'], chocolateChips:[340,'chocolate'], prepWater:[9.4,'water'] },
        prepTechKeys: ['brownButter', 'hydrateButter', 'chillButterThin'],
        stepsKey: 'thinSteps',
        whyItWorksKey: 'thinWhyItWorks'
     }
 };

// --- Language Strings (V4 English + USER PROVIDED ARABIC) ---
const langStrings = {
    en: {
         // --- Meta, Toggles, Header, Input, Selection ---
         pageTitle: "Omar's Brown Butter Cookie Lab 🍪🧪", toggleArabic: 'عربي', toggleEnglish: 'English', unitMetric: 'Metric (g)', unitImperial: 'Imperial (vol)', unitGrams: 'Grams (g)', unitCups: 'Cups (vol)',
         headerTitle: "The Brown Butter Cookie Compendium 🍪", headerDesc: "Your Official Lab Manual for Achieving Cookie Perfection: Classic, Thick & Gooey, and Thin & Crispy Editions! 🔥", scrollPrompt: "Scroll to Begin Experiment 👇",
         butterInputTitle: "<i class='fa-solid fa-vial-circle-check'></i> Experiment Setup: The Butter Constant", butterInputDesc: "Alright, Scientist! First things first. How much of that glorious unsalted butter 🧈 are we dedicating to science today? Punch in the deets below. No skimping!", butterLabel: 'Butter Amount', grams: 'grams', cups: 'cups', butterWarningMsg: "Hold up! ✋ Need at least 100g (~1/2 cup) butter for valid results!", butterButton: "Calibrate & Proceed! <i class='fas fa-arrow-right'></i>",
         selectionTitle: "<i class='fa-solid fa-clipboard-question'></i> Hypothesis Selection: Choose Your Destiny", selectionDesc: "Three paths lie before you, each leading to a different dimension of cookie texture. Choose your fighter! 👇", thinSelectTitle: "Phenotype T: The Snappy Cracker ✨", thinSelectDesc: "Max spread, max crisp. Think delicate lace meets satisfying *snap*.", classicSelectTitle: "Phenotype C: The Balanced OG 👌", classicSelectDesc: "The icon. Chewy middle, crispy edges. The ultimate crowd-pleaser.", thickSelectTitle: "Phenotype G: The Gooey Behemoth 🤩", thickSelectDesc: "Absolute unit. Soft, dense, pure indulgent goo. Zero apologies.",
         // --- Recipe Display ---
         recipeTitle: "Lab Report: Protocol {cookieName}", prepTitle: "<i class='fa-solid fa-flask-vial'></i> Phase 1: Foundational Preps (Don't Skip!)", ingredientsTitle: "<i class='fa-solid fa-list-check'></i> Reagent Checklist (Calculated Just For You!)", approxYield: "Projected Outcome: 📊", yieldThin: "{yieldNum} thin & crispy specimens (~1-Tbsp scoops)", yieldClassic: "{yieldNum} balanced cookies (~2-Tbsp scoops)", yieldThick: "{yieldNum} gooey behemoths (~4-6oz / 113-170g each!)", stepsTitle: "<i class='fa-solid fa-person-hiking'></i> Phase 2: The Experiment (Let's Bake!)", whyItWorksTitle: "<i class='fa-solid fa-brain'></i><i class='fa-solid fa-lightbulb'></i> The Grand Synthesis: WHY This Recipe Works!",
         // --- Ingredient Names & Notes ---
         unsaltedButter: 'Unsalted Butter', granulatedSugar: 'Granulated Sugar', lightBrownSugar: 'Light Brown Sugar (packed)', toastedMilkPowder: 'Toasted Non-Fat Dry Milk Powder', largeEggs: 'Large Eggs (room temp)', vanillaExtract: 'Pure Vanilla Extract', allPurposeFlour: 'All-Purpose Flour (spooned & leveled)', tableSalt: 'Table Salt (NaCl)', bakingPowder: 'Baking Powder (Double-Acting, Fresh!)', bakingSoda: 'Baking Soda (NaHCO₃, Fresh!)', chocolateChips: 'Chocolate Chips/Chunks (High Quality)', prepWater: 'Hydration Liquid (H₂O/Milk)', ingredientButterNote: "(See Prep below - crucial!)",
         // --- Preparatory Techniques ---
         prepTechTitle_brownButter: 'Module 1: Achieve Liquid Gold Status (Browning Butter)', prepTechDesc_brownButter: `Okay, listen up! Brown butter isn't just melted butter, it's **TRANSFORMED** butter. We're talking Maillard reaction magic ✨, same science that makes steak crusty and toast toasty. Heating the milk solids (protein + lactose) in the fat creates *hundreds* of new, complex flavor molecules – nutty, caramelly, butterscotchy goodness. This is non-negotiable baseline flavor!<br>1. **Setup:** Dice your <strong>{butterAmount} {butterUnit}</strong> unsalted butter (even pieces = even melting). Use a *light-colored* pan – trust me, you NEED to see the color change.<br>2. **The Melt & Sputter:** Medium heat. It'll melt, then get **LOUD** and foamy (that's water boiling off, bye-bye H₂O 👋). Swirl the pan or stir gently with a heatproof spatula so nothing burns.<br>3. **The Magic Show:** Foam calms down. Milk solids drop to the bottom. **NOW PAY ATTENTION!** Keep swirling/stirring constantly. Watch those solids go from pale yellow → golden → **toasty hazelnut brown**. The *smell* changes dramatically – from just butter to *OMG-what-is-that-amazing-nutty-aroma*. Usually takes 5-10 mins.<br>4. **ACTION STATION!** The *second* it hits that perfect deep amber/light brown and smells intoxicatingly nutty, **PULL IT OFF THE HEAT**. Immediately pour *everything* (liquid gold + brown bits) into a heatproof bowl. Why the rush? The line between perfectly browned and tragically burnt is thinner than my patience waiting for cookies to cool. 😉`,
         prepTechTitle_hydrateButter: 'Module 2: Strategic Rehydration (Optional, Recommended!)', prepTechDesc_hydrateButter: `Science fact: Browning yeets about 15-20% of the water out of your butter. Adding a tiny bit back *after* browning but *before* chilling is a pro move. Why? Helps balance dough moisture, potentially making cookies chewier and easier to handle. It's like giving your butter a little drink after its workout.<br>- Let browned butter cool for a minute or two (still hot!). Gently whisk in <strong>{waterAmount} {waterUnit}</strong> water or milk. Mix till it's incorporated. Easy peasy.`,
         prepTechTitle_chillButterClassicThick: 'Module 3a: The Chill Factor (Classic/Thick - Structure is Key!)', prepTechDesc_chillButterClassicThick: `Okay, *why* chill for these guys? Browning liquefies the butter's fat crystals. Without those crystals, you can't properly cream butter and sugar to trap air (which = lift!). We need to rebuild that structure, fam! 🥶<br>1. **Cool Down:** Let your browned/hydrated butter hang out at room temp for 15-20 mins. Then, into the fridge it goes.<br>2. **The Goal:** Chill until it's solid but still *pliable*. Think cool, slightly stiff Play-Doh, NOT a brick. The sweet spot is **60-65°F (16-18°C)**. This lets sugar crystals physically cut into the fat during creaming, creating those essential air pockets. This temp is *CRITICAL* for the Classic/Thick method. Takes about 1-2 hours. Check it!`,
         prepTechTitle_chillButterThin: 'Module 3b: The Chill Factor (Thin - Prep for Reverse Creaming!)', prepTechDesc_chillButterThin: `For the Thin & Crispy method (Reverse Creaming), we need butter cool enough to *coat* the flour, not melt into it immediately. This fat barrier is key to minimizing gluten for that snappy texture.<br>1. **Cool Down:** Browned/hydrated butter cools to room temp, then gets a short stint in the fridge.<br>2. **The Goal:** Needs to be just solid enough to cut into small pieces easily, but still cool and pliable. Think slightly firmer than typical room temp butter, maybe **65-68°F (18-20°C)**. You want it to break apart and mix into the flour like coarse sand. Takes about 30-60 mins.`,
         prepTechTitle_toastMilkPowder: 'Module 4: Flavor Booster (Toasting Milk Powder - If Applicable!)', prepTechDesc_toastMilkPowder: `This is like a cheat code for nutty/malty flavor! 🤫 Toasting the dry milk powder (just lactose + milk proteins) kicks off *more* Maillard & caramelization, concentrating those delicious notes without extra fat. Adds serious depth, especially noticeable in the Thick cookies.<br>1. **Setup:** Spread <strong>{milkPowderAmount} {milkPowderUnit}</strong> Non-Fat Dry Milk Powder thinly in a **DRY** skillet (best for control) or on a parchment-lined baking sheet.<br>2. **Heat It Up:** Skillet: Medium-low heat. Stir **CONSTANTLY** with a whisk/spatula. Don't walk away! Oven: Maybe 300°F (150°C), stirring every couple of mins (skillet is faster IMO).<br>3. **Sensory Cues:** It'll clump a bit, turn golden brown, and smell amazing (nutty/toasted). **WATCH IT!** It goes from perfect to burnt in seconds.<br>4. **Stop & Cool:** As soon as it hits that nice even golden-brown, yank it off the heat and into a cool bowl. Let it cool completely before using.`,
         // --- Steps ---
         classicSteps: `1. **Dry Team Assemble!** In a bowl, whisk the <strong>{flourAmount} {flourUnit}</strong> flour, <strong>{saltAmount} {saltUnit}</strong> salt, <strong>{bpAmount} {bpUnit}</strong> baking powder, & <strong>{bsAmount} {bsUnit}</strong> baking soda like you mean it. Even leavening = happy cookies. Set aside. Parchment paper on baking sheets - no exceptions!\n2. **Creaming Power Hour!** Mixer bowl (paddle): Combine that perfectly chilled **({chilledButterAmount} {chilledButterUnit})** brown butter + sugars (<strong>{granSugarAmount} {granSugarUnit}</strong> gran, <strong>{brownSugarAmount} {brownSugarUnit}</strong> brown). Med-high speed for **5 FULL MINUTES**. Set a timer! You're looking for *significantly* lighter color (pale tan), fluffy texture, and increased volume. Scrape that bowl! This step is *all about* incorporating air. 💨\n3. **Wet Ingredients In!** Low speed. Add **{eggAmount} {eggUnit}** room temp eggs, ONE AT A TIME, mixing *just* till the yolk vanishes. Don't kill the air bubbles! Add **{vanillaAmount} {vanillaUnit}</strong> vanilla with the last egg. *Pro Tip: Room temp eggs emulsify way better.*\n4. **Dry Meets Wet (Gently!):** Lowest speed. Add dry mix in 3-4 batches. Mix **ONLY** until flour streaks *mostly* disappear. STOP MIXING! Seriously. A few streaks are fine. Finish by hand w/ spatula if needed. Overmixing = Sad, tough cookies. 💔\n5. **Chocolate Fold-In:** Bowl off mixer. Dump in <strong>{chocoAmount} {chocoUnit}</strong> chocolate. Gently fold with spatula. Be nice to the dough!\n6. **The Waiting Game (Chill):** Cover bowl tightly. Fridge for **at least 30-60 mins**. Why? Fat solidifies (less spread!), flour hydrates (better texture!), flavor deepens (magic!). 24-48 hrs = *peak* flavor dimension. Patience, grasshopper.\n7. **Bake Off! 🔥** Preheat 375°F (190°C). Scoop ~2 Tbsp balls onto sheets, ~2 inches apart. Center rack, one sheet at a time. Bake 10-12 mins. Edges golden & set, centers soft & puffy. Rotate sheet halfway through!\n8. **Crucial Cool Down:** Let cookies chill on the *hot* baking sheet for **5 mins**. This finishes cooking the center gently (carryover magic!). Then, carefully move to wire rack to cool completely. They crisp up as they cool!`,
         thickSteps: `1. **Dry Team Assemble!** Whisk <strong>{flourAmount} {flourUnit}</strong> flour, <strong>{tmPowderAmount} {tmPowderUnit}</strong> *toasted* milk powder (yesss!), <strong>{saltAmount} {saltUnit}</strong> salt, & <strong>{bpAmount} {bpUnit}</strong> baking powder. Parchment on sheets. Ready!\n2. **Creaming (Chill Mode):** Combine chilled brown butter **({chilledButterAmount} {chilledButterUnit})** + sugars (<strong>{granSugarAmount} {granSugarUnit}</strong> gran, <strong>{brownSugarAmount} {brownSugarUnit}</strong> brown). Medium speed for just **2-3 mins**. We want it creamy, but *not* super fluffy like the classic. Too much air makes 'em collapse later. Scrape it down.\n3. **Wet Ingredients:** Low speed. Eggs **({eggAmount} {eggUnit})** one by one, *just* combined. Vanilla **({vanillaAmount} {vanillaUnit})** in. Done.\n4. **Dry Mix (Barely!):** Lowest speed. Add dry mix in 4-5 portions. Mix until *almost* combined. Stop when you still see a few flour streaks! Minimal gluten = maximum tenderness. 💪\n5. **CHOCOLATE AVALANCHE! 🍫** Add that glorious mountain of <strong>{chocoAmount} {chocoUnit}</strong> chocolate. Use a sturdy spatula (or your hands, no judgment) to fold/press it all together. Incorporate the last bits of flour now. Dough will be THICKKKK. Don't overwork it!\n6. **MANDATORY HIBERNATION (Chill):** Non-negotiable! Divide dough into **BIG** bois (target: **~{cookieWeightGrams}g / ~{cookieWeightOz}oz** each). Roll into TALL balls (think cylinders, not discs!). Wrap 'em tight. Fridge for **MINIMUM 4 hours**. Honestly? 12-72 hours is where the real magic happens (flavor + structure). DO. NOT. RUSH. THIS. ❄️\n7. **Bake From The Deep Freeze:** Preheat 350°F (180°C). Place COLD dough balls far apart on sheets (4-6 max). **DO NOT FLATTEN!** Optional flex: press extra chocolate chunks on top. Bake 18-25 mins (size matters!). Look for puffed shape, set golden edges, centers still visibly soft/gooey/underbaked. (Internal temp goal: 175-185°F / 79-85°C). Rotate sheet halfway!\n8. **Extended Cooling Protocol:** Let 'em cool on the baking sheet for **10-15 MINUTES**. They're fragile babies when hot! Gently transfer to wire rack. Best enjoyed warm (but let 'em cool below burn-your-tongue temp!).`,
         thinSteps: `1. **Prep Station Ready!** Line sheets with parchment (essential!). Cut your cool, pliable brown butter **({cooledButterAmount} {cooledButterUnit})** into smallish (~½ inch) cubes. Whisk eggs **({eggAmount} {eggUnit})** + vanilla **({vanillaAmount} {vanillaUnit})** in a small bowl. Mise en place! ✨\n2. **Reverse Creaming Time!** Mixer bowl (paddle): Combine <strong>{flourAmount} {flourUnit}</strong> flour, sugars (<strong>{granSugarAmount} {granSugarUnit}</strong> gran, <strong>{brownSugarAmount} {brownSugarUnit}</strong> brown), <strong>{saltAmount} {saltUnit}</strong> salt, & <strong>{bsAmount} {bsUnit}</strong> baking soda. Quick mix on low. Add the cool butter cubes. Mix on low speed (2-4 mins) until it looks like **coarse, damp sand or fine crumbs**. Goal: Coat flour in fat *before* water hits it. Science! 🔬\n3. **Wet Meets Dry (Quickly!):** Mixer still on low. Slowly stream in the egg/vanilla mix. Mix **JUST** until a dough *barely* comes together. It might look messy/crumbly first - that's OKAY. **DO NOT OVERMIX!** This is key for tenderness!\n4. **Chocolate Integration (Tiny Bits!):** Add <strong>{chocoAmount} {chocoUnit}</strong> *finely chopped* chocolate or *mini* chocolate chips. Fold gently with spatula. Minimal strokes. Small pieces = better spread.\n5. **GO GO GO! (No Chill Zone!):** Chilling is the enemy here! Preheat 350°F (175°C). Immediately scoop small (~1 Tbsp) portions onto sheets. Leave TONS of space (3-4 inches MINIMUM). These babies SPREAD! 쫙쫙!\n6. **Bake for the SNAP!** Bake one sheet at a time, 12-16 mins. You want thin, lacy, and **uniformly golden brown** edge-to-center. They might puff a bit then deflate - totally normal. Rotate sheet halfway. Being slightly *overbaked* is actually GOOD for max crisp here.\n7. **Cooling is CRITICAL for Crisp:** Let cookies set on the sheet for 5-10 mins (till movable). Gently transfer to wire rack. Cool **COMPLETELY**. The *snap* only develops when fully cool and sugars recrystallize. Patience yields crispness!`,
         // --- Why It Works ---
         classicWhyItWorks: `Okay, so why is the Classic... well, *classic*? It's all about **BALANCE**, baby! ⚖️ Here's the breakdown:<div class="sub-point"><strong><i class="fa-solid fa-cubes-stacked"></i> Sugar Ratio (1:1 Granulated:Brown):</strong> This is the sweet spot! Granulated sugar is all about **spread** (melts easily) and **crisp edges** (recrystallizes hard). Brown sugar brings the **chew** and **moisture** (thanks, molasses!) plus depth of flavor and a little tang (acidity) that reacts with baking soda. Equal parts gives you the best of both worlds – not too flat, not too cakey.</div><div class="sub-point"><strong><i class="fa-solid fa-temperature-low"></i> Fat (Chilled Brown Butter):</strong> We browned it for *flavor*, but we chill it for *structure*. That **60-65°F (16-18°C)** temp is **NON-NEGOTIABLE!** Why? Solid-but-pliable fat is essential for the **creaming method**. Sugar crystals gotta physically cut into that butter to trap air bubbles. Too warm = greasy spread monster. Too cold = dense brick. This trapped air gives the cookie lift!</div><div class="sub-point"><strong><i class="fa-solid fa-rocket"></i> Leavening (Baking Powder + Soda):</strong> Double trouble! **Baking soda** needs an acid (hi, brown sugar!) to make CO₂ bubbles. It also makes the dough more alkaline, which boosts **browning** (Maillard yeah!) and encourages **spread**. **Baking powder** has its *own* acid, providing extra *lift* without as much spread, especially when it heats up (double-acting ftw). Using both gives moderate spread AND lift for that perfect profile. The recipe leans slightly more on powder for structure, but the soda gives necessary spread/browning.</div><div class="sub-point"><strong><i class="fa-solid fa-link"></i> Eggs & Flour:** Eggs bind everything together, add moisture, fat (yolk!), and structure when their proteins cook. Room temp = better emulsion! All-purpose flour provides the main structure via gluten, but we mix it *minimally* to keep it tender, not tough. The amount is balanced for moderate spread.</div><div class="sub-point"><strong><i class="fa-solid fa-person-running"></i> Technique (Creaming & Chilling):** That **5-minute creaming** isn't a suggestion, it's an *order*! Maximize that air incorporation! The **chill time** lets the fat firm up (controlling spread) and the flour fully hydrate (better texture/flavor). It all works together for that perfect chewy-crisp bite! 👌</div>`,
         thickWhyItWorks: `Engineering the **Thick & Gooey Behemoth** is basically declaring WAR on spread! 💥 We want height, softness, and that molten core. Here’s the battle plan:<div class="sub-point"><strong><i class="fa-solid fa-cubes-stacked"></i> Sugar Ratio (1:2 Granulated:Brown):</strong> We flip the script! **Way more brown sugar** means way more molasses. Molasses is *hygroscopic* (it grabs onto water like your clingy friend), keeping the cookie super moist and chewy, resisting drying out. Less granulated sugar means **less spread driver**. SCIENCE!</div><div class="sub-point"><strong><i class="fa-solid fa-puzzle-piece"></i> Toasted Milk Powder:** This ain't just for flavor (though that nutty depth is 🔥). Milk powder proteins/sugars absorb a bit more free water, potentially making the dough slightly thicker (higher viscosity) and contributing to that satisfying chew. Every little bit helps in the anti-spread campaign!</div><div class="sub-point"><strong><i class="fa-solid fa-ban"></i> Leavening (Baking Powder ONLY):** We ditch the baking soda *entirely*. No soda = no extra alkalinity boost encouraging spread. We rely **solely on baking powder** for vertical *lift* (puff!), not horizontal spread. Powder puffs, soda spreads – remember that mantra!</div><div class="sub-point"><strong><i class="fa-solid fa-temperature-low"></i> Fat & Chilling (MANDATORY & LONG):** Chilled brown butter provides structure for moderate creaming (we don't want *too* much air or it might collapse). But the **LONG, COLD chill (4+ hours, ideally 12-72!)** is the *real* MVP. It makes the butter rock solid, so it melts SUPER slowly in the oven, preventing spread. It also fully hydrates the flour, binding up water that could cause steam/spread. Baking COLD is key! ❄️</div><div class="sub-point"><strong><i class="fa-solid fa-shield-halved"></i> Physical Barriers (Flour Ratio & Chocolate Overload):** Compared to the *spread-inducing* granulated sugar, there's relatively more flour, giving more structure. AND THEN THE CHOCOLATE! That **massive** amount (<strong>{chocoAmount} {chocoUnit}!</strong>) isn't just for flavor – the chunks literally act as **physical roadblocks**, getting in the way of the dough trying to flatten out. They add bulk and help maintain that thick structure.</div><div class="sub-point"><strong><i class="fa-solid fa-hourglass-half"></i> Technique (Moderate Creaming & Underbake):** We cream *less* than the classic to avoid incorporating *too much* air, which could weaken the structure. And the *underbake* is crucial for gooeyness – pulling it when the center is still soft ensures that moist, decadent texture after carryover cooking. Absolute unit achieved. 🤩</div>`,
         thinWhyItWorks: `Alright party people, time for the **Thin & Crispy Cracker!** This is all about maximizing **SPREAD** and achieving that satisfying **SNAP!** 🫰 Forget height, we want LACE. Here's the physics:<div class="sub-point"><strong><i class="fa-solid fa-cubes-stacked"></i> Sugar Ratio (3:2 Granulated:Brown):** High **granulated sugar** is king here. It melts readily, lowering dough viscosity and making it flow like lava (okay, maybe not *that* dramatic). As it cools, it recrystallizes into a hard, brittle, glassy structure – that's your *snap*! Brown sugar adds some flavor depth and prevents *pure* brittleness, but it takes a backseat.</div><div class="sub-point"><strong><i class="fa-solid fa-flask-vial"></i> Leavening (Baking Soda ONLY - High Amount!):** We use a hefty dose of **baking soda** and *no* baking powder. Why? Soda makes the dough alkaline. Alkalinity = 1) Faster, deeper **browning** (Maillard magic on hyperdrive 🔥). 2) Weakens gluten structure. Both of these encourage the dough to **SPREAD** more readily. We're basically chemically encouraging flatness!</div><div class="sub-point"><strong><i class="fa-solid fa-hand-sparkles"></i> Mixing Method (Reverse Creaming!):** This is the **secret weapon** for tenderness/snap! Mixing the cool butter with the dry ingredients *first* coats the flour particles in fat. This **waterproofs** the flour (kinda!), making it hard for water (from the eggs) to get in and develop much gluten. Weak gluten network = tender structure that *snaps* easily instead of chewing. ✨</div><div class="sub-point"><strong><i class="fa-solid fa-person-running"></i> Fat State & NO CHILLING:** Using cool, pliable butter for reverse creaming allows it to coat the flour effectively. Then, **NO CHILLING!** We bake it immediately while the fat is relatively soft. This allows the fat to melt *fast* in the oven, contributing to rapid, maximum spread. Chilling would defeat the whole purpose!</div><div class="sub-point"><strong><i class="fa-solid fa-minimize"></i> Chocolate Form Factor (Tiny Pieces):** Using *less* chocolate overall, and making sure it's finely chopped or mini chips, is key. Large chunks would act like boulders, blocking the spread. We want minimal interference for that lacy, even thinness.</div><div class="sub-point"><strong><i class="fa-solid fa-stopwatch"></i> Baking & Cooling (Thorough & Complete):** Bake these longer and more thoroughly than chewy cookies until uniformly golden brown. This drives off moisture. The **complete cooling** on a wire rack is where the magic happens – moisture evaporates, sugars crystallize fully, and *snap* is born! Don't judge 'em hot! 😉</div>`,
         // --- Easter Egg & Recs ---
         stuffedTitle: "<i class='fa-solid fa-crown'></i> LEVEL UP: Legendary Gooeymancer Status! 🏆", stuffedCongrats: "Habibi! You picked the Thick & Gooey path – BIG BRAIN MOVE! 🧠 Your reward? Unlocking the forbidden technique... STUFFING! 🤯", stuffedHowTo: "How-To: Flatten a dough ball (like you're squashing a tiny enemy 💥). Poke a hole. Add ~1 tsp of liquid gold (Nutella, Pistachio Cream). Wrap dough around it like a secret burrito 🌯. Seal TIGHTLY. Bake per protocol, maybe +1-2 mins for extra meltiness. ⏳",
         pistachioTipTitle: "<i class='fa-solid fa-seedling'></i> Top-Secret Pistachio Intel:", pistachioTipDesc: "Fam, listen up. Forget basic pistachio paste. You want that *scream-in-your-face* PISTACHIO flavor? 🗣️ ASM Foods Pistachio Cream. No cap. It's the one. Trust.", pistachioTipLink: "Acquire Specimen (Egypt Link)",
         chocoTipTitle: "<i class='fa-solid fa-chocolate'></i> Chocolate Particle Analysis:", chocoTipDesc: "Real talk: For that perfect melt & nostalgic Galaxy/Dairy Milk vibe (but better 'cause #Boycott 💪), you gotta use 'Target Kualety Dropsy' MILK Chocolate. It just hits different. 💯", chocoTipLink: "Source Link (FB)", chocoTipMilk: "⚠️ **CRITICAL:** Make SURE it's the MILK chocolate one! The dark stuff is a whole different experiment!",
         // --- Conclusion & Footer ---
         conclusionTitle: "<i class='fa-solid fa-flag-checkered'></i> Experiment Complete! Results & Bragging Rights", conclusionDesc: "YOU DID IT! You conquered cookie science! 🥳 Now, show off your masterpiece. Did it work? Was it glorious? Spill the tea (or... the cookie crumbs?). 📸", conclusionTag: "Tag the Lab Chief on Insta! 👇", conclusionGoForth: "Go forth and continue your delicious research! Lab dismissed! 🧑‍🔬",
         footerText: "Cookie Compendium v4.0 | Fueled by <i class='fa-solid fa-mug-hot' style='color: #795548;'></i> & <i class='fa-solid fa-heart' style='color: #e53935;'></i> for Brown Butter.", consoleLogHint: "P.S. Real scientists check the console log... just sayin' 😉",
    },
    ar:
    // --- USER PROVIDED ARABIC TRANSLATIONS START ---
    {
         // --- General UI ---
         pageTitle: "مختبر عمر لكوكيز الزبدة البنية 🍪🧪", // Mokhtabar Omar le Cookies ez-Zebda el-Bonneya
         toggleArabic: "عربي", // (Correct, no change needed)
         toggleEnglish: "English", // (Correct, no change needed)
         unitMetric: "متري (جرام)", // Metri (gram)
         unitImperial: "أمريكي (حجم)", // Amreeki (Hagm) - Using "Amreeki" as it's common for volume measures like cups
         unitGrams: "جرامات (g)", // Gramat (g)
         unitCups: "أكواب (vol)", // Akwab (vol)

         // --- Header ---
         headerTitle: "موسوعة كوكيز الزبدة البنية 🍪", // Mawsoo'et Cookies ez-Zebda el-Bonneya
         headerDesc: "دليل معملك الرسمي للوصول لعظمة الكوكيز: نسخة الكلاسيك، والتخينة الغُوي، والرفيعة المقرمشة! 🔥", // Daleel Ma'malak er-Rasmi lel-wosool le 'Azamet el-Cookies: Noskhet el-Classic, wel-Tekheena el-Ghooey, wel-Rofayya'a el-Me'armesha!
         scrollPrompt: "انزل تحت عشان تبدأ التجربة 👇", // Enzel taht 'ashan tebda' et-tagroba

         // --- Butter Input ---
         butterInputTitle: "<i class='fa-solid fa-vial-circle-check'></i> تجهيز التجربة: ثابت الزبدة", // Tagheez et-Tagroba: Thabet ez-Zebda
         butterInputDesc: "تمام يا عالِم! 🧑‍🔬 أول حاجة وأهم حاجة. هنخصص قد إيه من الزبدة العظيمة غير المملحة 🧈 دي للعلم النهاردة؟ اكتب التفاصيل تحت. مفيش بخل!", // Tamam ya 'Alem! Awwel haga wa ahamm haga. Hanekhasses add eih men ez-zebda el-'azima gheir el-memallahah di lel-'elm en-naharda? Ekteb et-tafaseel taht. Mafish bokhl!
         butterLabel: "كمية الزبدة", // Kemmeyet ez-Zebda
         grams: "جرام", // Gram
         cups: "كوب", // Kob
         butterWarningMsg: "استنى بس! ✋ محتاجين عالأقل 100 جرام (حوالي نص كوب) زبدة عشان النتائج تكون مظبوطة!", // Estanna bass! Mohtageen 'al a'al 100 gram (hawali noss kob) zebda 'ashan en-natayeg tekoon mazboota!
         butterButton: "ظبط وكمل! <i class='fas fa-arrow-left'></i>", // Zabbat we Kammel! (Corrected arrow for RTL)

         // --- Selection ---
         selectionTitle: "<i class='fa-solid fa-clipboard-question'></i> اختيار الفرضية: اختار مصيرك", // Ekhteyar el-Faradeyya: Ekhtar Maseerak
         selectionDesc: "قدامك تلات طرق، كل واحد بيودي لبُعد مختلف من قوام الكوكيز. اختار اللي يناسبك! 👇", // Oddamak talat toroo', kol wahed beyewaddi le bo'd mokhtalef men qawam el-cookies. Ekhtar elli yenasbak!
         thinSelectTitle: "النمط ر: المقرمشة الكرسبي ✨", // En-Namat R (Rofayya'a): el-Me'armesha el-Crispy
         thinSelectDesc: "أقصى فردة، أقصى قرمشة. تخيل دانتيل رقيق مع قضمة *مقرمشة* ترضي غرورك.", // Aqsa farda, aqsa armasha. Takhayyal dantelle raqeeq ma'a adda *me'armesha* terdi ghorourak.
         classicSelectTitle: "النمط ك: الكلاسيك المتوازنة 👌", // En-Namat K (Classic): el-Classic el-Motawazena
         classicSelectDesc: "الأيقونة. طرية من النص ومقرمشة من الأطراف. اللي بترضي كل الأذواق.", // El-Ayqouna. Tareyya men en-noss we me'armesha men el-atraf. Elli betardi kol el-azwaaq.
         thickSelectTitle: "النمط غ: العملاقة الغُوي 🤩", // En-Namat Gh (Ghooey): el-'Emlaqa el-Ghooey
         thickSelectDesc: "حاجة وحش بجد. طرية، كثيفة، متعة غُوي صافية. ومن غير أي اعتذار.", // Haga wahsh be-gad. Tareyya, kaseefa, mot'et ghooey safya. We men gheir ay e'tezar.

         // --- Recipe Display ---
         recipeTitle: "تقرير المعمل: بروتوكول {cookieName}", // Taqreer el-Ma'mal: Protocol {cookieName}
         prepTitle: "<i class='fa-solid fa-flask-vial'></i> المرحلة 1: التجهيزات الأساسية (ماتفوتهاش!)", // El-Marhala 1: et-Tagheezaat el-Asaseyya (Matfawethash!)
         ingredientsTitle: "<i class='fa-solid fa-list-check'></i> قائمة المكونات (محسوبة عشانك مخصوص!)", // Qa'emet el-Mokawwenat (Mahsooba 'ashanak makhsoos!)
         approxYield: "النتيجة المتوقعة: 📊", // En-Nateega el-Motawaqqa'a:
         yieldThin: "{yieldNum} قطعة رفيعة ومقرمشة (بمغرفة ~1 معلقة كبيرة)", // {yieldNum} qet'a rofayya'a we me'armesha (be-maghrafet ~1 ma'la'a kebeera)
         yieldClassic: "{yieldNum} كوكيز متوازنة (بمغرفة ~2 معلقة كبيرة)", // {yieldNum} cookies motawazena (be-maghrafet ~2 ma'la'a kebeera)
         yieldThick: "{yieldNum} عمالقة غُوي (وزن الواحدة ~113-170 جرام / ~4-6 أونصة!)", // {yieldNum} 'amalqa ghooey (wazn el-wahda ~113-170 gram / ~4-6 Ounce!)
         stepsTitle: "<i class='fa-solid fa-person-hiking'></i> المرحلة 2: التجربة (يلا نخبز!)", // El-Marhala 2: et-Tagroba (Yalla Nekhbez!)
         whyItWorksTitle: "<i class='fa-solid fa-brain'></i><i class='fa-solid fa-lightbulb'></i> الخلاصة النهائية: ليه الوصفة دي بتنجح!", // El-Kholasa en-Neha'eyya: Leh el-Wasfa di Betengah!

         // --- Ingredients ---
         unsaltedButter: "زبدة غير مملحة", // Zebda Gheir Memallahah
         granulatedSugar: "سكر حبيبات (أبيض)", // Sokkar Hobaybat (Abyad)
         lightBrownSugar: "سكر بني فاتح (مكبوس)", // Sokkar Bonni Fateh (Makboos)
         toastedMilkPowder: "بودرة لبن مجفف خالي الدسم محمصة", // Bodret Laban Mogaffaf Khali ed-Dasam Mohammasa
         largeEggs: "بيض كبير (بدرجة حرارة الغرفة)", // Beid Kebeer (be-daraget hararet el-ghorfa)
         vanillaExtract: "خلاصة فانيليا طبيعية", // Kholaset Vanilla Tabee'eyya
         allPurposeFlour: "دقيق متعدد الأغراض (متعاير بالمعلقة ومتساوي)", // Deqeeq Mot'added el-Aghrad (met'ayer bel-ma'la'a we metsawy)
         tableSalt: "ملح طعام (NaCl)", // Malh Ta'am (NaCl)
         bakingPowder: "بيكنج بودر (مفعول مزدوج، طازة!)", // Baking Powder (Maf'ool Mozdaweg, Taza!)
         bakingSoda: "بيكنج صودا (NaHCO₃، طازة!)", // Baking Soda (NaHCO₃, Taza!)
         chocolateChips: "قطع أو حبيبات شوكولاتة (نوع عالي الجودة)", // Qeta' aw Hobaybat Shokolata (Noa' 'Aly el-Gawda)
         prepWater: "سائل الترطيب (مياه/لبن - H₂O)", // Sa'el et-Tarteeb (Mayah/Laban - H₂O)
         ingredientButterNote: "(شوف التجهيز تحت - خطوة مهمة!)", // (Shoof et-tagheez taht - Khatwa mohemma!)

         // --- Prep Techniques ---
         prepTechTitle_brownButter: "المرحلة 1: الوصول لمستوى الذهب السايل (تحمير الزبدة)", // El-Marhala 1: el-Wosool le Mostawa ed-Dahab es-Sayel (Tahmeer ez-Zebda)
         prepTechDesc_brownButter: "بص، ركز معايا! الزبدة البنية مش مجرد زبدة سايحة، دي زبدة **اتحولت**! بنتكلم عن سحر تفاعل ميلارد ✨، نفس العلم اللي بيخلي الستيك مقرمش والتوست محمص. تسخين المواد الصلبة في اللبن (بروتين + لاكتوز) جوه الدهون بيخلق *مئات* من جزيئات النكهة الجديدة المعقدة – طعم مكسراتي، كراميلي، زي التوفي كده. دي نكهة أساسية مينفعش نستغنى عنها!<br>1. **التجهيز:** قطع <strong>{butterAmount} {butterUnit}</strong> زبدة غير مملحة لمكعبات (قطع متساوية = دوبان متساوي). استخدم طاسة *لونها فاتح* – صدقني، لازم تشوف تغيير اللون.<br>2. **الدوبان والطرقعة:** نار متوسطة. هتسيح، بعدين هتعمل **صوت عالي** ورغوة (دي الماية بتتبخر، باي باي يا H₂O 👋). هز الطاسة أو قلب بمعلقة سيليكون عشان مفيش حاجة تتحرق.<br>3. **العرض السحري:** الرغوة هتهدى. المواد الصلبة هتنزل تحت. **ركززززز كويس دلوقتي!** استمر في هز الطاسة أو التقليب باستمرار. راقب المواد الصلبة دي وهي بتتحول من أصفر باهت ← دهبي ← **بني بندقي محمص**. الـ*ريحة* بتتغير تماماً – من مجرد زبدة لـ *يا نهار أبيض-إيه-ريحة-المكسرات-الرهيبة-دي*. عادة بتاخد 5-10 دقايق.<br>4. **وقت الأكشن!** أول ما توصل للون الكهرماني الغامق/البني الفاتح المثالي ده وريحتها تبقى مكسراتية تجنن، **شيلها فوراً من ع النار**. صب *كل حاجة* (الدهب السايل + الحتت البنية) في طبق بيستحمل الحرارة. ليه السرعة دي؟ الخط الفاصل بين التحمير المثالي والحرق المأساوي أرفع من صبري وأنا مستني الكوكيز تبرد. 😉",
         prepTechTitle_hydrateButter: "المرحلة 2: الترطيب الاستراتيجي (اختياري، بس يُفضل!)", // El-Marhala 2: et-Tarteeb el-Estrateegy (Ekhteyari, bass yofaddal!)
         prepTechDesc_hydrateButter: "حقيقة علمية: تحمير الزبدة بيطير حوالي 15-20% من الماية اللي فيها. إضافة شوية ماية صغيرين *بعد* التحمير بس *قبل* التبريد حركة محترفين. ليه؟ بيساعد على توازن رطوبة العجينة، وممكن يخلي الكوكيز طرية أكتر وسهلة في التعامل. كأنك بتدي الزبدة بتاعتك شوية ماية تشربها بعد التمرين.<br>- سيب الزبدة البنية تبرد دقيقة أو اتنين (لسة سخنة!). بالراحة، اضرب بالويسك <strong>{waterAmount} {waterUnit}</strong> ماية أو لبن. اخلط لحد ما يمتزجوا. سهلة خالص.",
         prepTechTitle_chillButterClassicThick: "المرحلة 3أ: عامل التبريد (الكلاسيك/التخينة - القوام هو الأساس!)", // El-Marhala 3A: 'Amel et-Tabreed (Classic/Tekheena - el-Qawam howa el-Asas!)
         prepTechDesc_chillButterClassicThick: "تمام، *ليه* بنبرد الأنواع دي؟ التحمير بيسيح بلورات الدهن في الزبدة. من غير البلورات دي، مش هتقدر تعمل كريمينج (خفق) للزبدة والسكر صح عشان تحبس الهوا (اللي = رفع!). لازم نعيد بناء القوام ده يا جماعة! 🥶<br>1. **التهدئة:** سيب الزبدة المحمرة/المترطبة تبرد في درجة حرارة الغرفة 15-20 دقيقة. بعدين، تدخل التلاجة.<br>2. **الهدف:** بردها لحد ما تكون صلبة بس لسه *طرية*. فكر في صلصال بارد ومتماسك شوية، مش قالب طوب. الدرجة المثالية هي **16-18 درجة مئوية (60-65 فهرنهايت)**. ده بيسمح لبلورات السكر إنها تقطع في الدهن فعلياً أثناء الخفق، وتعمل فقاعات الهوا الأساسية دي. الحرارة دي *مهمة جداً* لطريقة الكلاسيك/التخينة. بتاخد حوالي ساعة لساعتين. تابعها!",
         prepTechTitle_chillButterThin: "المرحلة 3ب: عامل التبريد (الرفيعة - تجهيز للكريمنج العكسي!)", // El-Marhala 3B: 'Amel et-Tabreed (el-Rofayya'a - Tagheez lel-Creaming el-'Aksy!)
         prepTechDesc_chillButterThin: "بالنسبة لطريقة الرفيعة المقرمشة (الكريمنج العكسي)، محتاجين الزبدة تكون باردة كفاية عشان *تغلف* الدقيق، مش تسيح جواه علطول. حاجز الدهن ده أساسي عشان نقلل الجلوتين ونوصل للقوام المقرمش ده.<br>1. **التهدئة:** الزبدة المحمرة/المترطبة تبرد لدرجة حرارة الغرفة، بعدين تدخل التلاجة فترة قصيرة.<br>2. **الهدف:** لازم تكون صلبة كفاية بس عشان تتقطع لحتت صغيرة بسهولة، بس لسه باردة وطرية. فكر فيها كأنها أمتن شوية من الزبدة العادية بدرجة حرارة الغرفة، يمكن **18-20 درجة مئوية (65-68 فهرنهايت)**. أنت عايزها تتكسر وتتخلط مع الدقيق زي الرمل الخشن. بتاخد حوالي 30-60 دقيقة.",
         prepTechTitle_toastMilkPowder: "المرحلة 4: معزز النكهة (تحميص بودرة اللبن - لو بتستخدمها!)", // El-Marhala 4: Mo'azzez en-Nakha (Tahmees Bodret el-Laban - Law betestakhdemha!)
         prepTechDesc_toastMilkPowder: "دي زي شفرة سرية لنكهة المكسرات/المولت! 🤫 تحميص بودرة اللبن المجفف (اللي هي بس لاكتوز + بروتينات لبن) بيبدأ *كمان* تفاعل ميلارد وتكرمل، ويركز النكهات اللذيذة دي من غير دهون زيادة. بيضيف عمق خطير، بالذات في الكوكيز التخينة.<br>1. **التجهيز:** افرد <strong>{milkPowderAmount} {milkPowderUnit}</strong> بودرة لبن مجفف خالي الدسم طبقة رفيعة في طاسة **ناشفة** (أحسن للتحكم) أو على صينية عليها ورقة زبدة.<br>2. **التسخين:** الطاسة: نار متوسطة لهادية. قلب **باستمرار** بويسك/معلقة. متسبهاش وتمشي! الفرن: ممكن 150 درجة مئوية (300 فهرنهايت)، مع التقليب كل كام دقيقة (الطاسة أسرع بصراحة).<br>3. **علامات حسية:** هتكلكع شوية، لونها هيبقى دهبي، وريحتها هتبقى تحفة (مكسرات/محمصة). **خلي بالك!** بتتحول من مثالية لمحروقة في ثواني.<br>4. **وقف وتبريد:** أول ما توصل للون الدهبي الحلو المتساوي ده، شيلها من ع النار فوراً وحطها في طبق بارد. سيبها تبرد تماماً قبل الاستخدام.",

         // --- Steps ---
         classicSteps: "1. **تجميع فريق الجافين!** في طبق، اخلط بالويسك <strong>{flourAmount} {flourUnit}</strong> دقيق، <strong>{saltAmount} {saltUnit}</strong> ملح، <strong>{bpAmount} {bpUnit}</strong> بيكنج بودر، و <strong>{bsAmount} {bsUnit}</strong> بيكنج صودا كأنك داخل حرب. توزيع متساوي لعوامل الرفع = كوكيز سعيدة. سيبه على جنب. ورق زبدة على الصواني - مفيش استثناءات!<br>2. **ساعة قوة الكريمينج!** طبق الميكسر (مضرب الكف): اخلط الزبدة البنية المبردة تماماً دي **({chilledButterAmount} {chilledButterUnit})** + السكر (<strong>{granSugarAmount} {granSugarUnit}</strong> أبيض، <strong>{brownSugarAmount} {brownSugarUnit}</strong> بني). سرعة متوسطة لعالية لمدة **5 دقايق كاملة**. شغل تايمر! أنت بتدور على لون *أفتح بكتير* (بيج فاتح)، قوام هش، وحجم أكبر. اكحت جوانب الطبق! الخطوة دي *كلها* عن إدخال الهوا. 💨<br>3. **دخول المكونات السايلة!** سرعة بطيئة. ضيف **{eggAmount} {eggUnit}** بيض بدرجة حرارة الغرفة، واحدة واحدة، واخلط *لحد بس* ما الصفار يختفي. متقتلش فقاعات الهوا! ضيف <strong>{vanillaAmount} {vanillaUnit}</strong> فانيليا مع آخر بيضة. *نصيحة محترفين: البيض بدرجة حرارة الغرفة بيعمل مستحلب أحسن بكتير.*<br>4. **الجاف يقابل السايل (بالراحة!):** أبطأ سرعة. ضيف خليط الجافين على 3-4 دفعات. اخلط **فقط** لحد ما خطوط الدقيق *معظمها* تختفي. وقف خلط! بجد. شوية خطوط دقيق عادي. كمل بإيدك بمعلقة لو محتاج. الخلط الزيادة = كوكيز حزينة وناشفة. 💔<br>5. **إضافة الشوكولاتة بالتقليب:** شيل الطبق من الميكسر. ارمي <strong>{chocoAmount} {chocoUnit}</strong> شوكولاتة. قلب بالراحة بالمعلقة. خليك حنين ع العجينة!<br>6. **لعبة الانتظار (التبريد):** غطي الطبق كويس. تلاجة لمدة **30-60 دقيقة عالأقل**. ليه؟ الدهن بيتجمد (فردة أقل!)، الدقيق بيترطب (قوام أحسن!)، النكهة بتتعمق (سحر!). 24-48 ساعة = *أقصى* بُعد للنكهة. الصبر مفتاح الفرج يا معلم.<br>7. **الخبيز! 🔥** سخن الفرن 190°م (375°ف). اغرف كور بحجم ~2 معلقة كبيرة على الصواني، وسيب مسافة ~2 بوصة. رف أوسط، صينية واحدة كل مرة. اخبز 10-12 دقيقة. الأطراف دهبية ومتماسكة، النص طري ومنفوخ. لف الصينية في نص الوقت!<br>8. **تبريد حاسم:** سيب الكوكيز تبرد على الصينية *السخنة* لمدة **5 دقايق**. ده بيكمل تسوية النص بالراحة (سحر التسوية المتبقية!). بعدين، انقلها بحرص لشبكة تبريد عشان تبرد تماماً. بتقرمش وهي بتبرد!",
         thickSteps: "1. **تجميع فريق الجافين!** اخلط بالويسك <strong>{flourAmount} {flourUnit}</strong> دقيق، <strong>{tmPowderAmount} {tmPowderUnit}</strong> بودرة اللبن *المحمصة* (أيوووه!)، <strong>{saltAmount} {saltUnit}</strong> ملح، و <strong>{bpAmount} {bpUnit}</strong> بيكنج بودر. ورق زبدة على الصواني. جاهزين!<br>2. **الكريمينج (وضع التبريد):** اخلط الزبدة البنية المبردة **({chilledButterAmount} {chilledButterUnit})** + السكر (<strong>{granSugarAmount} {granSugarUnit}</strong> أبيض، <strong>{brownSugarAmount} {brownSugarUnit}</strong> بني). سرعة متوسطة لمدة **2-3 دقايق بس**. عايزينها كريمي، بس *مش* هشة أوي زي الكلاسيك. هوا زيادة بيخليهم يهبطوا بعدين. اكحت الجوانب.<br>3. **المكونات السايلة:** سرعة بطيئة. البيض **({eggAmount} {eggUnit})** واحدة واحدة، *لحد بس* ما يتخلطوا. الفانيليا **({vanillaAmount} {vanillaUnit})** تدخل. خلصنا.<br>4. **خليط الجافين (يا دوبك!):** أبطأ سرعة. ضيف خليط الجافين على 4-5 مرات. اخلط لحد ما يكون *شبه* متجانس. وقف وأنت لسه شايف شوية خطوط دقيق! أقل جلوتين = أقصى طراوة. 💪<br>5. **انهيار الشوكولاتة! 🍫** ضيف جبل الشوكولاتة العظيم ده <strong>{chocoAmount} {chocoUnit}</strong>. استخدم معلقة قوية (أو إيدك، محدش هيحكم عليك) عشان تقلب/تضغط كله مع بعض. دخل آخر شوية دقيق دلوقتي. العجينة هتبقى تخينة أويييي. متشتغلش فيها زيادة!<br>6. **بيات شتوي إجباري (التبريد):** مفيهوش نقاش! قسم العجينة لكور **كبيرة** (الهدف: **~{cookieWeightGrams} جرام / ~{cookieWeightOz} أونصة** للواحدة). كورهم على شكل كور عالية (فكر في أسطوانات، مش أقراص!). لفهم كويس. تلاجة لمدة **4 ساعات عالأقل**. بصراحة؟ 12-72 ساعة هي اللي بيحصل فيها السحر الحقيقي (نكهة + قوام). أوعى. تستعجل. الخطوة. دي. ❄️<br>7. **الخبز من التجميد العميق:** سخن الفرن 180°م (350°ف). حط كور العجين الباردة بعيد عن بعض على الصواني (4-6 بالكتير). **متبططهمش!** حركة اختيارية: اغرز قطع شوكولاتة زيادة فوق. اخبز 18-25 دقيقة (الحجم بيفرق!). دور على شكل منفوخ، أطراف دهبية متماسكة، والنص لسه باين عليه طري/غُوي/مش مستوي كفاية. (الحرارة الداخلية المستهدفة: 79-85°م / 175-185°ف). لف الصينية في نص الوقت!<br>8. **بروتوكول التبريد الممتد:** سيبهم يبردوا على صينية الخبز لمدة **10-15 دقيقة**. بيبقوا زي الأطفال الهشين وهم سخنين! انقلهم بالراحة لشبكة تبريد. أحسن حاجة تتاكل دافية (بس سيبها تبرد عن درجة حرق اللسان!).",
         thinSteps: "1. **محطة التجهيز جاهزة!** بطن الصواني بورق زبدة (ضروري!). قطع زبدتك البنية الباردة والطرية **({cooledButterAmount} {cooledButterUnit})** لمكعبات صغيرة (~ نص بوصة). اخلط البيض **({eggAmount} {eggUnit})** + الفانيليا **({vanillaAmount} {vanillaUnit})** في طبق صغير. كله جاهز! ✨<br>2. **وقت الكريمينج العكسي!** طبق الميكسر (مضرب الكف): اخلط <strong>{flourAmount} {flourUnit}</strong> دقيق، السكر (<strong>{granSugarAmount} {granSugarUnit}</strong> أبيض، <strong>{brownSugarAmount} {brownSugarUnit}</strong> بني)، <strong>{saltAmount} {saltUnit}</strong> ملح، و <strong>{bsAmount} {bsUnit}</strong> بيكنج صودا. خلطة سريعة على البطيء. ضيف مكعبات الزبدة الباردة. اخلط على سرعة بطيئة (2-4 دقايق) لحد ما يبقى شكلها زي **الرمل الخشن المبلول أو الفتافيت الناعمة**. الهدف: تغليف الدقيق بالدهن *قبل* ما الماية توصله. علم يا حبيبي علم! 🔬<br>3. **السايل يقابل الجاف (بسرعة!):** الميكسر لسه على البطيء. صب خليط البيض/الفانيليا بالراحة. اخلط **لحد بس** ما العجينة *يا دوبك* تلم. ممكن تبان منعكشة/مفرولة في الأول - ده عادي. **متخلطش زيادة!** ده مفتاح الطراوة!<br>4. **دمج الشوكولاتة (قطع صغيرة!):** ضيف <strong>{chocoAmount} {chocoUnit}</strong> شوكولاتة *مفرومة ناعم* أو *ميني* شيبس. قلب بالراحة بالمعلقة. أقل تقليبات ممكنة. القطع الصغيرة = فردة أحسن.<br>5. **يلا بينا علطول! (منطقة ممنوع التبريد!):** التبريد هو العدو هنا! سخن الفرن 175°م (350°ف). فوراً اغرف كور صغيرة (~1 معلقة كبيرة) على الصواني. سيب مساااااافة كبيرة (3-4 بوصة عالأقل). الحاجات دي بتفرش! 쫙쫙!<br>6. **اخبز عشان القرمشة!** اخبز صينية واحدة كل مرة، 12-16 دقيقة. أنت عايزها رفيعة، زي الدانتيل، ولونها **دهبي بني متساوي** من الأطراف للنص. ممكن تنفخ شوية بعدين تهبط - طبيعي جداً. لف الصينية في نص الوقت. إنها تكون *مستوية زيادة* شوية ده كويس عشان توصل لأقصى قرمشة هنا.<br>7. **التبريد حاسم للقرمشة:** سيب الكوكيز تتماسك على الصينية 5-10 دقايق (لحد ما تقدر تحركها). انقلها بالراحة لشبكة تبريد عشان تبرد **تماماً**. الـ*قرمشة* مش بتظهر غير لما تبرد تماماً والسكريات تتبلور تاني. الصبر بينتج قرمشة!",

         // --- Why It Works ---
         classicWhyItWorks: "تمام، ليه بقى الكلاسيك... هي *الكلاسيك*؟ الموضوع كله **توازن** يا باشا! ⚖️ ادي التفاصيل:<br><div class='sub-point'><strong><i class='fa-solid fa-cubes-stacked'></i> نسبة السكر (1 أبيض : 1 بني):</strong> دي أحسن تظبيطة! السكر الأبيض مسؤول عن **الفردة** (بيدوب بسهولة) و**الأطراف المقرمشة** (بيتبلور تاني ناشف). السكر البني بيجيب **المضغة** و**الرطوبة** (شكراً يا دبس السكر!) وعمق النكهة وشوية **مزازة** (حموضة) بتتفاعل مع البيكنج صودا. كميات متساوية بتديك أحسن ما في الاتنين – لا مفرودة زيادة ولا شبه الكيكة زيادة.</div><br><div class='sub-point'><strong><i class='fa-solid fa-temperature-low'></i> الدهن (زبدة بنية مبردة):</strong> حمرناها عشان *النكهة*، بس بردناها عشان *القوام*. درجة حرارة **١٦-١٨°م (٦٠-٦٥°ف)** دي **مفهاش نقاش!** ليه؟ الدهن الصلب بس الطري أساسي لـ**طريقة الكريمينج**. بلورات السكر لازم تقطع في الزبدة دي عشان تحبس فقاعات الهوا. دافية زيادة = وحش فردة مزيت. باردة زيادة = قالب طوب. الهوا المحبوس ده بيدي الكوكيز الرفع!</div><br><div class='sub-point'><strong><i class='fa-solid fa-rocket'></i> عوامل الرفع (بيكنج بودر + صودا):</strong> مشكلة مزدوجة! **البيكنج صودا** محتاجة حمض (أهلاً يا سكر بني!) عشان تعمل فقاعات CO₂. كمان بتخلي العجينة قلوية أكتر، وده بيعزز **التحمير** (ميلارد يا جدعان!) وبيشجع **الفردة**. **البيكنج بودر** فيه الحمض *بتاعه*، وبيدي *رفع* زيادة من غير فردة بنفس القدر، خصوصاً لما يسخن (مفعول مزدوج يكسب). استخدام الاتنين بيدي فردة متوسطة ورفع للقوام المثالي ده. الوصفة بتعتمد أكتر شوية ع البودر للقوام، بس الصودا بتدي الفردة/التحمير اللازمين.</div><br><div class='sub-point'><strong><i class='fa-solid fa-link'></i> البيض والدقيق:** البيض بيربط كل حاجة ببعض، يضيف رطوبة، دهن (الصفار!)، وقوام لما بروتيناته تستوي. درجة حرارة الغرفة = مستحلب أحسن! الدقيق متعدد الأغراض بيدي القوام الأساسي عن طريق الجلوتين، بس بنخلطه *يا دوبك* عشان يفضل طري، مش ناشف. الكمية متوازنة عشان فردة متوسطة.</div><br><div class='sub-point'><strong><i class='fa-solid fa-person-running'></i> الطريقة (الكريمينج والتبريد):** الـ**5 دقايق كريمينج** دول مش اقتراح، ده *أمر*! زود حبس الهوا ده لأقصى درجة! **وقت التبريد** بيخلي الدهن يتماسك (يتحكم في الفردة) والدقيق يترطب بالكامل (قوام/نكهة أحسن). كله بيشتغل مع بعض عشان القضمة الطرية المقرمشة المثالية دي! 👌</div>",
         thickWhyItWorks: "هندسة **العملاقة التخينة والغُوي** دي كأنك بتعلن الحرب على الفردة! 💥 عايزين ارتفاع، طراوة، والقلب الدايب ده. ادي خطة المعركة:<br><div class='sub-point'><strong><i class='fa-solid fa-cubes-stacked'></i> نسبة السكر (1 أبيض : 2 بني):</strong> قلبنا المعادلة! **سكر بني أكتر بكتيييير** يعني دبس سكر أكتر بكتير. دبس السكر *شرِه للماء* (بيمسك في الماية زي صاحبك اللزقة)، بيحافظ على الكوكيز رطبة جداً وطرية، وبتقاوم النشفان. سكر أبيض أقل يعني **محرك فردة أضعف**. علم!</div><br><div class='sub-point'><strong><i class='fa-solid fa-puzzle-piece'></i> بودرة اللبن المحمصة:** دي مش بس للنكهة (مع إن عمق المكسرات ده 🔥). بروتينات/سكريات بودرة اللبن بتمتص شوية ماية حرة زيادة، وده ممكن يخلي العجينة أتخن شوية (لزوجة أعلى) ويساهم في المضغة المرضية دي. كل فتفوتة بتساعد في حملة مقاومة الفردة!</div><br><div class='sub-point'><strong><i class='fa-solid fa-ban'></i> عوامل الرفع (بيكنج بودر فقط):** استغنينا عن البيكنج صودا *تماماً*. مفيش صودا = مفيش تعزيز قلوية زيادة يشجع الفردة. بنعتمد **حصرياً على البيكنج بودر** للـ*رفع* الرأسي (النفشة!)، مش الفردة الأفقية. البودر بينفش، الصودا بتفرش – افتكر الشعار ده!</div><br><div class='sub-point'><strong><i class='fa-solid fa-temperature-low'></i> الدهن والتبريد (إجباري وطويل):** الزبدة البنية المبردة بتدي قوام لكريمينج متوسط (مش عايزين هوا *زيادة عن اللزوم* وإلا ممكن تهبط). بس **التبريد الطويل والبارد (4+ ساعات، والأمثل 12-72!)** هو الـ*بطل الحقيقي*. بيخلي الزبدة قالب طوب، فبتسيح ببطء شديد في الفرن، وتمنع الفردة. كمان بيرطب الدقيق بالكامل، ويحبس الماية اللي ممكن تسبب بخار/فردة. الخبز بارد هو المفتاح! ❄️</div><br><div class='sub-point'><strong><i class='fa-solid fa-shield-halved'></i> حواجز مادية (نسبة الدقيق وكمية الشوكولاتة المهولة):** مقارنة بالسكر الأبيض اللي *بيسبب الفردة*، فيه دقيق أكتر نسبياً، وده بيدي قوام أكتر. و بعدين الشوكولاتة! الكمية **الضخمة** دي (<strong>{chocoAmount} {chocoUnit}!</strong>) مش بس للنكهة – القطع الكبيرة حرفياً بتشتغل كـ**حواجز مادية**، بتقف في طريق العجينة وهي بتحاول تفرد. بتضيف حجم وبتساعد في الحفاظ على القوام التخين ده.</div><br><div class='sub-point'><strong><i class='fa-solid fa-hourglass-half'></i> الطريقة (كريمينج متوسط وعدم تسوية كاملة):** بنعمل كريمينج *أقل* من الكلاسيك عشان نتجنب إدخال هوا *زيادة عن اللزوم*، اللي ممكن يضعف القوام. والـ*عدم تسوية كاملة* ده أساسي للغُوي – إنك تطلعها والنص لسه طري بيضمن القوام الرطب والفاخر ده بعد التسوية المتبقية. تم تحقيق العملاقة بنجاح. 🤩</div>",
         thinWhyItWorks: "يلا بينا يا جماعة، وقت **المقرمشة الرفيعة الكرسبي!** دي كلها عن زيادة **الفردة** لأقصى درجة وتحقيق **القرمشة** المرضية دي! 🫰 انسى الارتفاع، عايزين دانتيل. ادي الفيزياء:<br><div class='sub-point'><strong><i class='fa-solid fa-cubes-stacked'></i> نسبة السكر (3 أبيض : 2 بني):** **السكر الأبيض** العالي هو الملك هنا. بيدوب بسهولة، يقلل لزوجة العجينة ويخليها تتدفق زي الحمم البركانية (أوكي، يمكن مش *للدرجة* دي). ولما يبرد، بيتبلور تاني لقوام صلب، هش، زجاجي – هي دي الـ*قرمشة* بتاعتك! السكر البني بيضيف شوية عمق نكهة وبيمنع الهشاشة *الصافية*، بس دوره ثانوي.</div><br><div class='sub-point'><strong><i class='fa-solid fa-flask-vial'></i> عوامل الرفع (بيكنج صودا فقط - كمية كبيرة!):** بنستخدم جرعة محترمة من **البيكنج صودا** و*مفيش* بيكنج بودر. ليه؟ الصودا بتخلي العجينة قلوية. القلوية = 1) **تحمير** أسرع وأغمق (سحر ميلارد على سرعة فائقة 🔥). 2) تضعيف بنية الجلوتين. الاتنين دول بيشجعوا العجينة إنها **تفرد** بسهولة أكبر. إحنا كيميائياً بنشجع التبطيط!</div><br><div class='sub-point'><strong><i class='fa-solid fa-hand-sparkles'></i> طريقة الخلط (كريمنج عكسي!):** ده **السلاح السري** للطراوة/القرمشة! خلط الزبدة الباردة مع المكونات الجافة *الأول* بيغلف جزيئات الدقيق بالدهن. ده بيعمل **عزل مائي** للدقيق (نوعاً ما!)، بيصعب على الماية (من البيض) إنها تدخل وتكون جلوتين كتير. شبكة جلوتين ضعيفة = قوام طري *بيقرمش* بسهولة بدل ما يمضغ. ✨</div><br><div class='sub-point'><strong><i class='fa-solid fa-person-running'></i> حالة الدهن وعدم التبريد:** استخدام زبدة باردة وطرية للكريمينج العكسي بيسمحلها تغلف الدقيق بفاعلية. بعدين، **مفيش تبريد!** بنخبزها فوراً والدهن لسه طري نسبياً. ده بيسمح للدهن يدوب *بسرعة* في الفرن، ويساهم في فردة سريعة وقصوى. التبريد هيبوظ الهدف كله!</div><br><div class='sub-point'><strong><i class='fa-solid fa-minimize'></i> شكل الشوكولاتة (قطع صغيرة جداً):** استخدام شوكولاتة *أقل* بشكل عام، والتأكد إنها مفرومة ناعم أو ميني شيبس، هو الأساس. القطع الكبيرة هتشتغل زي الصخور، وتمنع الفردة. عايزين أقل تدخل ممكن عشان الرفع المتساوي الشبيه بالدانتيل ده.</div><br><div class='sub-point'><strong><i class='fa-solid fa-stopwatch'></i> الخبز والتبريد (كامل وشامل):** اخبز دي أطول وبشكل أكمل من الكوكيز الطرية لحد ما لونها يبقى دهبي بني متساوي. ده بيطير الرطوبة. الـ**تبريد الكامل** على شبكة سلك هو اللي بيحصل فيه السحر – الرطوبة بتتبخر، السكريات بتتبلور بالكامل، والـ*قرمشة* بتتولد! متتخدعش وهي سخنة! 😉</div>",

         // --- Stuffed Bonus ---
         stuffedTitle: "<i class='fa-solid fa-crown'></i> ليفل الوحش: مرحلة ساحر الغُوي الأسطوري! 🏆", // Level el-Wahsh: Marhalet Saher el-Ghooey el-Ostoury!
         stuffedCongrats: "حبيبي! اخترت طريق التخينة والغُوي – دماغ عالية! 🧠 مكافئتك؟ فتح التكنيك المحرم... الحشو! 🤯", // Habibi! Ekhtart tareeq et-tekheena wel-ghooey – demagh 'alya! Mokafa'tak? Fath et-technique el-moharram... el-Hashw!
         stuffedHowTo: "الطريقة: بطط كورة عجين (كأنك بتفعص عدو صغير 💥). اعمل حفرة. ضيف ~1 معلقة صغيرة دهب سايل (نوتيلا، كريمة فستق). لف العجينة حواليها زي ساندوتش سري 🌯. اقفل كويس أوي. اخبز حسب البروتوكول، ممكن +1-2 دقيقة عشان دوبان زيادة. ⏳", // Et-Tareeqa: Battat koret 'ageen (ke'annak betef'as 'adow soghayyar 💥)... (rest follows English structure)
         pistachioTipTitle: "<i class='fa-solid fa-seedling'></i> معلومات فستق سرية للغاية:", // Ma'loomat Fostoq Serreya lel-Ghaya:
         pistachioTipDesc: "يا وحوش، ركزوا معايا. انسوا زبدة الفستق العادية. عايزين طعم الفستق اللي *يصحي الميتين*؟ 🗣️ كريمة فستق ASM Foods. من الآخر. هي دي. اسمعوا مني.", // Ya wehoosh, rakkezu ma'aya. Ensu zebdet el-fostoq el-'adeyya. 'Ayzeen ta'm el-fostoq elli *yesahhi el-mayyeteen*? 🗣️ Kiremet Fostoq ASM Foods. Men el-akher. Heya di. Esma'u menni.
         pistachioTipLink: "هات العينة (لينك مصر)", // Haat el-'Ayyena (Link Masr)
         chocoTipTitle: "<i class='fa-solid fa-chocolate'></i> تحليل جزيئات الشوكولاتة:", // Tahleel Gozay'aat esh-Shokolata:
         chocoTipDesc: "كلام بجد: عشان توصل للدوبان المثالي والإحساس النوستالجي بتاع جلاكسي/ديري ميلك (بس أحسن عشان #مقاطعة 💪)، لازم تستخدم شوكولاتة 'Target Kualety Dropsy' باللبن. بتفرق جامد. 💯", // Kalam be-gad: 'Ashan tewsal lel-dawaban el-methali wel-ehsas en-nostalgy beta' Galaxy/Dairy Milk (bass ahsan 'ashan #Moqat'a 💪), lazem testakhdem shokolatet 'Target Kualety Dropsy' bel-laban. Betefre' gamed. 💯
         chocoTipLink: "لينك المصدر (فيسبوك)", // Link el-Masdar (Facebook)
         chocoTipMilk: "⚠️ **ضروري جداً:** اتأكد إنها النوع اللي باللبن! الغامقة تجربة تانية خالص!", // ⚠️ **Daroury Geddan:** Et'akked ennaha en-noa' elli bel-laban! El-gham'a tagroba tanya khales!

         // --- Conclusion ---
         conclusionTitle: "<i class='fa-solid fa-flag-checkered'></i> التجربة اكتملت! النتائج وحقوق التفاخر", // Et-Tagroba Ektamalet! en-Natayeg we Hoqooq et-Tafakhor
         conclusionDesc: "عملتها! قهرت علم الكوكيز! 🥳 دلوقتي، استعرض تحفتك الفنية. نجحت؟ كانت عظيمة؟ احكي لنا (أو... فرفت الكوكيز؟). 📸", // 'Amaltaha! Qahart 'elm el-cookies! 🥳 Delwaqty, esta'red tohfetak el-fanneyya. Negahet? Kanet 'azima? Ehkeelna (aw... farfatet el-cookies?). 📸
         conclusionTag: "اعمل تاج لرئيس المعمل على انستا! 👇", // E'mel tag le-Ra'ees el-Ma'mal 'ala Insta! 👇
         conclusionGoForth: "انطلق وكمل بحثك اللذيذ! المعمل انتهى! 🧑‍🔬", // Entaleq we kammel bahthak el-lazeez! El-ma'mal entaha! 🧑‍🔬

         // --- Footer ---
         footerText: "موسوعة الكوكيز نسخة 4.0 | بدعم من <i class='fa-solid fa-mug-hot' style='color: #795548;'></i> و <i class='fa-solid fa-heart' style='color: #e53935;'></i> للزبدة البنية.", // Mawsoo'et el-Cookies Noskha 4.0 | Be-da'm men <i class='fa-solid fa-mug-hot' style='color: #795548;'></i> we <i class='fa-solid fa-heart' style='color: #e53935;'></i> lel-Zebda el-Bonneya.
         consoleLogHint: "ملحوظة: العلماء الحقيقيون بيبصوا على الكونسول لوج... بقول بس 😉" // Malhoza: El-'Olama' el-haqi'eyyoon beybosso 'ala el-console log... ba'ool bass 😉
    }
    // --- USER PROVIDED ARABIC TRANSLATIONS END ---
};


// --- Functions ---
// (showSection, getBaseButterInGrams, calculateScaledRecipe, formatIngredient, formatMarkdown - unchanged from V4 draft)
 function showSection(sectionElement) { /* ... */ }
 function getBaseButterInGrams() { /* ... */ }
 function calculateScaledRecipe(butterInGrams, cookieType) { /* ... */ }
 function formatIngredient(grams, unitType, lang, unitSystem) { /* ... */ }
 function formatMarkdown(text) { /* ... */ }

// Display recipe (UPDATED FOR V4 to populate WhyItWorks)
function displayRecipe(recipeData) {
    if (!recipeData) return;

    const lang = currentLanguage;
    const units = currentUnitSystem;
    const T = (key, replacements = {}) => {
        let str = langStrings[lang]?.[key] || langStrings['en']?.[key] || key; // Fallback to EN then key
        for (const placeholder in replacements) {
            str = str.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
        }
        return str.replace('{heartIcon}', '<i class="fas fa-heart" style="color: #e53935;"></i>');
    };

    const cookieName = T(`${selectedCookieType}SelectTitle`);
    const yieldNum = recipeData.yield;
    const yieldDesc = T(recipeData.cookieSizeDescKey, { yieldNum: yieldNum });

    // --- Populate Containers ---
    dynamicRecipeTitle.innerHTML = T('recipeTitle', { cookieName: cookieName });
    dynamicYieldInfo.innerHTML = `${T('approxYield')} ${yieldDesc}`;

    // Prep Techniques
    prepTechniquesContainer.innerHTML = '';
    const butterGrams = recipeData.ingredients.unsaltedButter.grams;
    const prepReplacements = {
         butterAmount: formatIngredient(butterGrams, 'butter', lang, units).split(' ')[0],
         butterUnit: formatIngredient(butterGrams, 'butter', lang, units).split(' ').slice(1).join(' '),
         waterAmount: formatIngredient(recipeData.ingredients.prepWater.grams, 'water', lang, units).split(' ')[0],
         waterUnit: formatIngredient(recipeData.ingredients.prepWater.grams, 'water', lang, units).split(' ').slice(1).join(' '),
         milkPowderAmount: recipeData.ingredients.toastedMilkPowder ? formatIngredient(recipeData.ingredients.toastedMilkPowder.grams, 'milkPowder', lang, units).split(' ')[0] : 'N/A',
         milkPowderUnit: recipeData.ingredients.toastedMilkPowder ? formatIngredient(recipeData.ingredients.toastedMilkPowder.grams, 'milkPowder', lang, units).split(' ').slice(1).join(' ') : '',
     };
    recipeData.prepTechKeys.forEach(key => {
         const title = T(`prepTechTitle_${key}`);
         let iconClass = 'fa-cogs';
         if (key.includes('brownButter')) iconClass = 'fa-fire-alt';
         if (key.includes('hydrate')) iconClass = 'fa-tint';
         if (key.includes('chill')) iconClass = 'fa-snowflake';
         if (key.includes('toast')) iconClass = 'fa-bread-slice';
         const description = T(`prepTechDesc_${key}`, prepReplacements);
         prepTechniquesContainer.innerHTML += `<div class="pro-tip note">
                                                <h4><i class="fas ${iconClass}"></i> ${title}</h4>
                                                <div>${formatMarkdown(description)}</div> <!-- Wrap description in div -->
                                             </div>`;
     });

    // Ingredients
    ingredientListContainer.innerHTML = '';
    const formattedButter = formatIngredient(butterGrams, 'butter', lang, units);
    const butterNote = T('ingredientButterNote') ? `<i class="note-inline">${T('ingredientButterNote')}</i>` : '';
    ingredientListContainer.innerHTML += `<li><strong>${formattedButter}</strong> ${T('unsaltedButter')} ${butterNote}</li>`;
    for (const key in recipeData.ingredients) {
        if (key === 'unsaltedButter') continue;
        const item = recipeData.ingredients[key];
        const ingredientName = T(key);
        const formattedAmount = formatIngredient(item.grams, item.unitType, lang, units);
        ingredientListContainer.innerHTML += `<li><strong>${formattedAmount}</strong> ${ingredientName}</li>`;
    }

    // Steps
    stepsContainer.innerHTML = '';
    const stepsReplacements = {
        // Calculate all needed amounts for steps
         chocoAmount: recipeData.ingredients.chocolateChips ? formatIngredient(recipeData.ingredients.chocolateChips.grams, 'chocolate', lang, units).split(' ')[0] : 'N/A',
         chocoUnit: recipeData.ingredients.chocolateChips ? formatIngredient(recipeData.ingredients.chocolateChips.grams, 'chocolate', lang, units).split(' ').slice(1).join(' ') : '',
         // Add other necessary step replacements from V2/V3 calculation logic
         // ... (ensure all placeholders like {flourAmount}, {bpAmount} etc. are calculated here)
     };
     // Example adding flour amount:
     stepsReplacements.flourAmount = formatIngredient(recipeData.ingredients.allPurposeFlour.grams, 'flour', lang, units).split(' ')[0];
     stepsReplacements.flourUnit = formatIngredient(recipeData.ingredients.allPurposeFlour.grams, 'flour', lang, units).split(' ').slice(1).join(' ');
      // ... add all other ingredients needed in steps following this pattern ...
       // Butter specific for steps
       stepsReplacements.chilledButterAmount = formatIngredient(recipeData.ingredients.unsaltedButter.grams, 'butter', lang, units).split(' ')[0];
       stepsReplacements.chilledButterUnit = formatIngredient(recipeData.ingredients.unsaltedButter.grams, 'butter', lang, units).split(' ').slice(1).join(' ');
       stepsReplacements.cooledButterAmount = stepsReplacements.chilledButterAmount;
       stepsReplacements.cooledButterUnit = stepsReplacements.chilledButterUnit;
        // Thick cookie weight
       stepsReplacements.cookieWeightGrams = baseRecipes.thick.cookieSizeGrams ? Math.round(baseRecipes.thick.cookieSizeGrams * (butterGrams / baseRecipes.thick.baseButter) ) : '140'; // Scale target weight too
       stepsReplacements.cookieWeightOz = baseRecipes.thick.cookieSizeGrams ? (stepsReplacements.cookieWeightGrams / 28.35).toFixed(1) : '5';

    const stepsString = T(recipeData.stepsKey, stepsReplacements);
    const stepsArray = stepsString.split('<br>'); // Split on <br> for better paragraphing in steps
    stepsArray.forEach(step => {
        if (step.trim()) {
             stepsContainer.innerHTML += `<li>${formatMarkdown(step.replace(/^\d+\.\s*/, ''))}</li>`;
         }
     });


    // Why It Works Section (Using new container)
    whyItWorksContainer.innerHTML = ''; // Clear previous
    const whyItWorksZone = document.querySelector('.why-it-works-zone'); // Get the wrapper div
    if (recipeData.whyItWorksKey) {
        // Pass necessary replacements (like calculated chocolate amount)
         const whyWorksReplacements = {
             chocoAmount: stepsReplacements.chocoAmount,
             chocoUnit: stepsReplacements.chocoUnit
             // Add any other needed placeholders
         };
        const whyItWorksText = T(recipeData.whyItWorksKey, whyWorksReplacements);
        // Split into sub-points based on the <div class="sub-point"> tag
        const points = whyItWorksText.split('<div class="sub-point">').slice(1);
        if (points.length > 0) {
             points.forEach(pointText => {
                whyItWorksContainer.innerHTML += `<div class="sub-point">${formatMarkdown(pointText.replace('</div>','').replace(/<br>/g,'\n'))}</div>`; // Format markdown within each point
            });
        } else {
             whyItWorksContainer.innerHTML = `<p>${formatMarkdown(whyItWorksText.replace(/<br>/g,'\n'))}</p>`; // Fallback
        }
        if(whyItWorksZone) whyItWorksZone.style.display = 'block'; // Show the zone
    } else {
        if(whyItWorksZone) whyItWorksZone.style.display = 'none'; // Hide if no content key
    }

    // Hide the separate science zone now
    const scienceZone = document.querySelector('.science-zone');
    if (scienceZone) scienceZone.style.display = 'none';

    // --- Show/Hide Easter Egg & Recommendations ---
    stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
    chocolateRecommendation.style.display = 'block';

    updateLanguageContent(recipeContentCard);

    // --- Display Logic ---
    recipeDisplaySection.style.display = 'block';
    setTimeout(() => {
        recipeDisplaySection.classList.add('visible');
        const titleElement = document.getElementById('dynamic-recipe-title');
         if(titleElement){
             const yOffset = -100;
             const y = titleElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
             window.scrollTo({ top: y, behavior: 'smooth' });
         } else {
              recipeContentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
    }, 50);
}

// --- Language and Unit Switching ---
// (Unchanged from V3 logic - relies on T() helper and re-calling displayRecipe)
 function updateLanguageContent(parentElement = document.body) { /* ... V3 logic ... */ }
 function updateUnitButtonDisplay() { /* ... V3 logic ... */ }
 function toggleLanguage() { /* ... V3 logic ... */ }
 function toggleUnits() { /* ... V3 logic ... */ }

// --- Event Listeners & Initial Setup ---
// (Unchanged from V3)
 startExperimentBtn.addEventListener('click', () => { /* ... */ });
 butterAmountInput.addEventListener('input', () => { /* ... */ });
 butterUnitSelect.addEventListener('change', () => { /* ... */ });
 cookieOptions.forEach(option => { /* ... */ });
 langToggleButton.addEventListener('click', toggleLanguage);
 unitToggleButton.addEventListener('click', toggleUnits);
 window.addEventListener('load', () => { /* ... V3 load listener ... */ });
 updateLanguageContent();
 updateUnitButtonDisplay();
 const sections = document.querySelectorAll('.content-section');
 const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
 const observerCallback = (entries, observer) => { /* ... V3 observerCallback ... */ };
 const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
 sections.forEach(section => { sectionObserver.observe(section); });
