document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    // (Same as V3, but grab new containers)
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const butterAmountInput = document.getElementById('butter-amount');
    const butterUnitSelect = document.getElementById('butter-unit');
    const startExperimentBtn = document.getElementById('start-experiment-btn');
    const butterWarning = document.getElementById('butter-warning');
    const cookieSelectionSection = document.getElementById('cookie-selection-section');
    const recipeDisplaySection = document.getElementById('recipe-display-section');
    const recipeContentCard = document.getElementById('recipe-content');
    const dynamicRecipeTitle = document.getElementById('dynamic-recipe-title');
    const dynamicYieldInfo = document.getElementById('dynamic-yield-info');
    const prepTechniquesContainer = document.getElementById('prep-techniques-container');
    const ingredientListContainer = document.getElementById('ingredient-list-container');
    const stepsContainer = document.getElementById('steps-container');
    const whyItWorksContainer = document.getElementById('why-it-works-container'); // New container
    // const scienceDivesContainer = document.getElementById('science-dives-container'); // Keep if using fallback
    const cookieOptions = document.querySelectorAll('.cookie-option');
    const stuffedEasterEgg = document.getElementById('stuffed-easter-egg');
    const chocolateRecommendation = document.getElementById('chocolate-recommendation');
    const langToggleButton = document.getElementById('lang-toggle');
    const unitToggleButton = document.getElementById('unit-toggle');
    const htmlElement = document.documentElement;
    const mainContent = document.getElementById('main-content');
    const headerOverlayImage = document.querySelector('.header-comparison-image-overlay');

    // --- State & Constants ---
    // (Unchanged from V3)
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


    // --- Base Recipes (Add keys for new Why It Works sections) ---
     const baseRecipes = {
         classic: {
            baseButter: 284, yieldPerBase: 30, cookieSizeDescKey: 'yieldClassic',
            ingredients: { /* V2 ingredients */ },
            prepTechKeys: ['brownButter', 'hydrateButter', 'chillButterClassicThick'],
            stepsKey: 'classicSteps',
            whyItWorksKey: 'classicWhyItWorks' // NEW KEY
         },
         thick: {
            baseButter: 284, yieldPerBase: 10, cookieSizeGrams: 140, cookieSizeDescKey: 'yieldThick',
            ingredients: { /* V2 ingredients */ },
            prepTechKeys: ['brownButter', 'hydrateButter', 'toastMilkPowder', 'chillButterClassicThick'],
            stepsKey: 'thickSteps',
            whyItWorksKey: 'thickWhyItWorks' // NEW KEY
         },
         thin: {
            baseButter: 284, yieldPerBase: 42, cookieSizeDescKey: 'yieldThin',
            ingredients: { /* V2 ingredients */ },
            prepTechKeys: ['brownButter', 'hydrateButter', 'chillButterThin'],
            stepsKey: 'thinSteps',
            whyItWorksKey: 'thinWhyItWorks' // NEW KEY
         }
     };

    // --- Language Strings (MASSIVELY EXPANDED WITH OCR SCIENCE & TONE) ---
    const langStrings = {
        en: {
            // --- Meta, Toggles, Header, Input, Selection (Mostly V3 with more emojis/tone) ---
            pageTitle: "Omar's Brown Butter Cookie Lab 🍪🧪",
            toggleArabic: 'عربي', toggleEnglish: 'English', unitMetric: 'Metric (g)', unitImperial: 'Imperial (vol)', unitGrams: 'جرامات (g)', unitCups: 'أكواب (vol)',
            headerTitle: "The Brown Butter Cookie Compendium 🍪", headerDesc: "Your Official Lab Manual for Achieving Cookie Perfection: Classic, Thick & Gooey, and Thin & Crispy Editions! 🔥", scrollPrompt: "Scroll to Begin Experiment 👇",
            butterInputTitle: "<i class='fa-solid fa-vial-circle-check'></i> Experiment Setup: The Butter Constant", butterInputDesc: "Alright, Scientist! First things first. How much of that glorious unsalted butter 🧈 are we dedicating to science today? Punch in the deets below. No skimping!", butterLabel: 'Butter Amount', grams: 'grams', cups: 'cups', butterWarningMsg: "Hold up! ✋ Need at least 100g (~1/2 cup) butter for valid results!", butterButton: "Calibrate & Proceed! <i class='fas fa-arrow-right'></i>",
            selectionTitle: "<i class='fa-solid fa-clipboard-question'></i> Hypothesis Selection: Choose Your Destiny", selectionDesc: "Three paths lie before you, each leading to a different dimension of cookie texture. Choose your fighter! 👇", thinSelectTitle: "Phenotype T: The Snappy Cracker ✨", thinSelectDesc: "Max spread, max crisp. Think delicate lace meets satisfying *snap*.", classicSelectTitle: "Phenotype C: The Balanced OG 👌", classicSelectDesc: "The icon. Chewy middle, crispy edges. The ultimate crowd-pleaser.", thickSelectTitle: "Phenotype G: The Gooey Behemoth 🤩", thickSelectDesc: "Absolute unit. Soft, dense, pure indulgent goo. Zero apologies.",

            // --- Recipe Display ---
            recipeTitle: "Lab Report: Protocol {cookieName}", // Dynamic part
            prepTitle: "<i class='fa-solid fa-flask-vial'></i> Phase 1: Foundational Preps (Don't Skip!)",
            ingredientsTitle: "<i class='fa-solid fa-list-check'></i> Reagent Checklist (Calculated Just For You!)",
            approxYield: "Projected Outcome: 📊",
            yieldThin: "{yieldNum} thin & crispy specimens (~1-Tbsp scoops)", yieldClassic: "{yieldNum} balanced cookies (~2-Tbsp scoops)", yieldThick: "{yieldNum} gooey behemoths (~4-6oz / 113-170g each!)",
            stepsTitle: "<i class='fa-solid fa-person-hiking'></i> Phase 2: The Experiment (Let's Bake!)",
            whyItWorksTitle: "<i class='fa-solid fa-brain'></i><i class='fa-solid fa-lightbulb'></i> The Grand Synthesis: WHY This Recipe Works!", // New Section Title

            // --- Ingredient Names & Notes (Mostly V3) ---
            unsaltedButter: 'Unsalted Butter', granulatedSugar: 'Granulated Sugar', lightBrownSugar: 'Light Brown Sugar (packed)', toastedMilkPowder: 'Toasted Non-Fat Dry Milk Powder', largeEggs: 'Large Eggs (room temp)', vanillaExtract: 'Pure Vanilla Extract', allPurposeFlour: 'All-Purpose Flour (spooned & leveled)', tableSalt: 'Table Salt (NaCl)', bakingPowder: 'Baking Powder (Double-Acting, Fresh!)', bakingSoda: 'Baking Soda (NaHCO₃, Fresh!)', chocolateChips: 'Chocolate Chips/Chunks (High Quality)', prepWater: 'Hydration Liquid (H₂O/Milk)',
            ingredientButterNote: "(See Prep below - crucial!)",

            // --- Preparatory Techniques (ENHANCED with OCR details & tone) ---
            prepTechTitle_brownButter: 'Module 1: Achieve Liquid Gold Status (Browning Butter)',
            prepTechDesc_brownButter: `Okay, listen up! Brown butter isn't just melted butter, it's **TRANSFORMED** butter. We're talking Maillard reaction magic ✨, same science that makes steak crusty and toast toasty. Heating the milk solids (protein + lactose) in the fat creates *hundreds* of new, complex flavor molecules – nutty, caramelly, butterscotchy goodness. This is non-negotiable baseline flavor!<br>
                                     1. **Setup:** Dice your <strong>{butterAmount} {butterUnit}</strong> unsalted butter (even pieces = even melting). Use a *light-colored* pan – trust me, you NEED to see the color change.<br>
                                     2. **The Melt & Sputter:** Medium heat. It'll melt, then get **LOUD** and foamy (that's water boiling off, bye-bye H₂O 👋). Swirl the pan or stir gently with a heatproof spatula so nothing burns.<br>
                                     3. **The Magic Show:** Foam calms down. Milk solids drop to the bottom. **NOW PAY ATTENTION!** Keep swirling/stirring constantly. Watch those solids go from pale yellow → golden → **toasty hazelnut brown**. The *smell* changes dramatically – from just butter to *OMG-what-is-that-amazing-nutty-aroma*. Usually takes 5-10 mins.<br>
                                     4. **ACTION STATION!** The *second* it hits that perfect deep amber/light brown and smells intoxicatingly nutty, **PULL IT OFF THE HEAT**. Immediately pour *everything* (liquid gold + brown bits) into a heatproof bowl. Why the rush? The line between perfectly browned and tragically burnt is thinner than my patience waiting for cookies to cool. 😉`,
            prepTechTitle_hydrateButter: 'Module 2: Strategic Rehydration (Optional, Recommended!)',
            prepTechDesc_hydrateButter: `Science fact: Browning yeets about 15-20% of the water out of your butter. Adding a tiny bit back *after* browning but *before* chilling is a pro move. Why? Helps balance dough moisture, potentially making cookies chewier and easier to handle. It's like giving your butter a little drink after its workout.<br>
                                      - Let browned butter cool for a minute or two (still hot!). Gently whisk in <strong>{waterAmount} {waterUnit}</strong> water or milk. Mix till it's incorporated. Easy peasy.`,
            prepTechTitle_chillButterClassicThick: 'Module 3a: The Chill Factor (Classic/Thick - Structure is Key!)',
            prepTechDesc_chillButterClassicThick: `Okay, *why* chill for these guys? Browning liquefies the butter's fat crystals. Without those crystals, you can't properly cream butter and sugar to trap air (which = lift!). We need to rebuild that structure, fam! 🥶<br>
                                                1. **Cool Down:** Let your browned/hydrated butter hang out at room temp for 15-20 mins. Then, into the fridge it goes.<br>
                                                2. **The Goal:** Chill until it's solid but still *pliable*. Think cool, slightly stiff Play-Doh, NOT a brick. The sweet spot is **60-65°F (16-18°C)**. This lets sugar crystals physically cut into the fat during creaming, creating those essential air pockets. This temp is *CRITICAL* for the Classic/Thick method. Takes about 1-2 hours. Check it!`,
            prepTechTitle_chillButterThin: 'Module 3b: The Chill Factor (Thin - Prep for Reverse Creaming!)',
             prepTechDesc_chillButterThin: `For the Thin & Crispy method (Reverse Creaming), we need butter cool enough to *coat* the flour, not melt into it immediately. This fat barrier is key to minimizing gluten for that snappy texture.<br>
                                             1. **Cool Down:** Browned/hydrated butter cools to room temp, then gets a short stint in the fridge.<br>
                                             2. **The Goal:** Needs to be just solid enough to cut into small pieces easily, but still cool and pliable. Think slightly firmer than typical room temp butter, maybe **65-68°F (18-20°C)**. You want it to break apart and mix into the flour like coarse sand. Takes about 30-60 mins.`,
            prepTechTitle_toastMilkPowder: 'Module 4: Flavor Booster (Toasting Milk Powder - If Applicable!)',
            prepTechDesc_toastMilkPowder: `This is like a cheat code for nutty/malty flavor! 🤫 Toasting the dry milk powder (just lactose + milk proteins) kicks off *more* Maillard & caramelization, concentrating those delicious notes without extra fat. Adds serious depth, especially noticeable in the Thick cookies.<br>
                                         1. **Setup:** Spread <strong>{milkPowderAmount} {milkPowderUnit}</strong> Non-Fat Dry Milk Powder thinly in a **DRY** skillet (best for control) or on a parchment-lined baking sheet.<br>
                                         2. **Heat It Up:** Skillet: Medium-low heat. Stir **CONSTANTLY** with a whisk/spatula. Don't walk away! Oven: Maybe 300°F (150°C), stirring every couple of mins (skillet is faster IMO).<br>
                                         3. **Sensory Cues:** It'll clump a bit, turn golden brown, and smell amazing (nutty/toasted). **WATCH IT!** It goes from perfect to burnt in seconds.<br>
                                         4. **Stop & Cool:** As soon as it hits that nice even golden-brown, yank it off the heat and into a cool bowl. Let it cool completely before using.`,

            // --- Steps (Mostly V3, slightly refined tone) ---
             classicSteps: `1. **Dry Team Assemble!** In a bowl, whisk the <strong>{flourAmount} {flourUnit}</strong> flour, <strong>{saltAmount} {saltUnit}</strong> salt, <strong>{bpAmount} {bpUnit}</strong> baking powder, & <strong>{bsAmount} {bsUnit}</strong> baking soda like you mean it. Even leavening = happy cookies. Set aside. Parchment paper on baking sheets - no exceptions!
                            2. **Creaming Power Hour!** Mixer bowl (paddle): Combine that perfectly chilled **({chilledButterAmount} {chilledButterUnit})** brown butter + sugars (<strong>{granSugarAmount} {granSugarUnit}</strong> gran, <strong>{brownSugarAmount} {brownSugarUnit}</strong> brown). Med-high speed for **5 FULL MINUTES**. Set a timer! You're looking for *significantly* lighter color (pale tan), fluffy texture, and increased volume. Scrape that bowl! This step is *all about* incorporating air. 💨
                            3. **Wet Ingredients In!** Low speed. Add **{eggAmount} {eggUnit}** room temp eggs, ONE AT A TIME, mixing *just* till the yolk vanishes. Don't kill the air bubbles! Add **{vanillaAmount} {vanillaUnit}</strong> vanilla with the last egg. *Pro Tip: Room temp eggs emulsify way better.*
                            4. **Dry Meets Wet (Gently!):** Lowest speed. Add dry mix in 3-4 batches. Mix **ONLY** until flour streaks *mostly* disappear. STOP MIXING! Seriously. A few streaks are fine. Finish by hand w/ spatula if needed. Overmixing = Sad, tough cookies. 💔
                            5. **Chocolate Fold-In:** Bowl off mixer. Dump in <strong>{chocoAmount} {chocoUnit}</strong> chocolate. Gently fold with spatula. Be nice to the dough!
                            6. **The Waiting Game (Chill):** Cover bowl tightly. Fridge for **at least 30-60 mins**. Why? Fat solidifies (less spread!), flour hydrates (better texture!), flavor deepens (magic!). 24-48 hrs = *peak* flavor dimension. Patience, grasshopper.
                            7. **Bake Off! 🔥** Preheat 375°F (190°C). Scoop ~2 Tbsp balls onto sheets, ~2 inches apart. Center rack, one sheet at a time. Bake 10-12 mins. Edges golden & set, centers soft & puffy. Rotate sheet halfway through!
                            8. **Crucial Cool Down:** Let cookies chill on the *hot* baking sheet for **5 mins**. This finishes cooking the center gently (carryover magic!). Then, carefully move to wire rack to cool completely. They crisp up as they cool!`,
             thickSteps: `1. **Dry Team Assemble!** Whisk <strong>{flourAmount} {flourUnit}</strong> flour, <strong>{tmPowderAmount} {tmPowderUnit}</strong> *toasted* milk powder (yesss!), <strong>{saltAmount} {saltUnit}</strong> salt, & <strong>{bpAmount} {bpUnit}</strong> baking powder. Parchment on sheets. Ready!
                           2. **Creaming (Chill Mode):** Combine chilled brown butter **({chilledButterAmount} {chilledButterUnit})** + sugars (<strong>{granSugarAmount} {granSugarUnit}</strong> gran, <strong>{brownSugarAmount} {brownSugarUnit}</strong> brown). Medium speed for just **2-3 mins**. We want it creamy, but *not* super fluffy like the classic. Too much air makes 'em collapse later. Scrape it down.
                           3. **Wet Ingredients:** Low speed. Eggs **({eggAmount} {eggUnit})** one by one, *just* combined. Vanilla **({vanillaAmount} {vanillaUnit})** in. Done.
                           4. **Dry Mix (Barely!):** Lowest speed. Add dry mix in 4-5 goes. Mix until *almost* combined. Stop when you still see a few flour streaks! Minimal gluten = maximum tenderness. 💪
                           5. **CHOCOLATE AVALANCHE! 🍫** Add that glorious mountain of <strong>{chocoAmount} {chocoUnit}</strong> chocolate. Use a sturdy spatula (or your hands, no judgment) to fold/press it all together. Incorporate the last bits of flour now. Dough will be THICKKKK. Don't overwork it!
                           6. **MANDATORY HIBERNATION (Chill):** Non-negotiable! Divide dough into **BIG** bois (target: **~{cookieWeightGrams}g / ~{cookieWeightOz}oz** each). Roll into TALL balls (think cylinders, not discs!). Wrap 'em tight. Fridge for **MINIMUM 4 hours**. Honestly? 12-72 hours is where the real magic happens (flavor + structure). DO. NOT. RUSH. THIS. ❄️
                           7. **Bake From The Deep Freeze:** Preheat 350°F (180°C). Place COLD dough balls far apart on sheets (4-6 max). **DO NOT FLATTEN!** Optional flex: press extra chocolate chunks on top. Bake 18-25 mins (size matters!). Look for puffed shape, set golden edges, centers still visibly soft/gooey/underbaked. (Internal temp goal: 175-185°F / 79-85°C). Rotate sheet halfway!
                           8. **Extended Cooling Protocol:** Let 'em cool on the baking sheet for **10-15 MINUTES**. They're fragile babies when hot! Gently transfer to wire rack. Best enjoyed warm (but let 'em cool below burn-your-tongue temp!).`,
            thinSteps: `1. **Prep Station Ready!** Line sheets with parchment (essential!). Cut your cool, pliable brown butter **({cooledButterAmount} {cooledButterUnit})** into smallish (~½ inch) cubes. Whisk eggs **({eggAmount} {eggUnit})** + vanilla **({vanillaAmount} {vanillaUnit})** in a small bowl. Mise en place! ✨
                           2. **Reverse Creaming Time!** Mixer bowl (paddle): Combine **{flourAmount} {flourUnit}</strong> flour, sugars (<strong>{granSugarAmount} {granSugarUnit}</strong> gran, <strong>{brownSugarAmount} {brownSugarUnit}</strong> brown), <strong>{saltAmount} {saltUnit}</strong> salt, & **{bsAmount} {bsUnit}</strong> baking soda. Quick mix on low. Add the cool butter cubes. Mix on low speed (2-4 mins) until it looks like **coarse, damp sand or fine crumbs**. Goal: Coat flour in fat *before* water hits it. Science! 🔬
                           3. **Wet Meets Dry (Quickly!):** Mixer still on low. Slowly stream in the egg/vanilla mix. Mix **JUST** until a dough *barely* comes together. It might look messy/crumbly first - that's OKAY. **DO NOT OVERMIX!** This is key for tenderness!
                           4. **Chocolate Integration (Tiny Bits!):** Add <strong>{chocoAmount} {chocoUnit}</strong> *finely chopped* chocolate or *mini* chips. Fold gently with spatula. Minimal strokes. Small pieces = better spread.
                           5. **GO GO GO! (No Chill Zone!):** Chilling is the enemy here! Preheat 350°F (175°C). Immediately scoop small (~1 Tbsp) portions onto sheets. Leave TONS of space (3-4 inches MINIMUM). These babies SPREAD! 쫙쫙!
                           6. **Bake for the SNAP!** Bake one sheet at a time, 12-16 mins. You want thin, lacy, and **uniformly golden brown** edge-to-center. They might puff a bit then deflate - totally normal. Rotate sheet halfway. Being slightly *overbaked* is actually GOOD for max crisp here.
                           7. **Cooling is CRITICAL for Crisp:** Let cookies set on the sheet for 5-10 mins (till movable). Gently transfer to wire rack. Cool **COMPLETELY**. The *snap* only develops when fully cool and sugars recrystallize. Patience yields crispness!`,

            // --- NEW: Why It Works Sections (Integrates Science Dives & OCR) ---
            classicWhyItWorks: `Okay, so why is the Classic... well, *classic*? It's all about **BALANCE**, baby! ⚖️ Here's the breakdown:
                            <div class="sub-point"><strong><i class="fa-solid fa-cubes-stacked"></i> Sugar Ratio (1:1 Granulated:Brown):</strong> This is the sweet spot! Granulated sugar is all about **spread** (melts easily) and **crisp edges** (recrystallizes hard). Brown sugar brings the **chew** and **moisture** (thanks, molasses!) plus depth of flavor and a little tang (acidity) that reacts with baking soda. Equal parts gives you the best of both worlds – not too flat, not too cakey.</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-temperature-low"></i> Fat (Chilled Brown Butter):</strong> We browned it for *flavor*, but we chill it for *structure*. That **60-65°F (16-18°C)** temp is **NON-NEGOTIABLE!** Why? Solid-but-pliable fat is essential for the **creaming method**. Sugar crystals gotta physically cut into that butter to trap air bubbles. Too warm = greasy spread monster. Too cold = dense brick. This trapped air gives the cookie lift!</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-rocket"></i> Leavening (Baking Powder + Soda):** Double trouble! **Baking soda** needs an acid (hi, brown sugar!) to make CO₂ bubbles. It also makes the dough more alkaline, which boosts **browning** (Maillard yeah!) and encourages **spread**. **Baking powder** has its *own* acid, providing extra *lift* without as much spread, especially when it heats up (double-acting ftw). Using both gives moderate spread AND lift for that perfect profile. The recipe leans slightly more on powder for structure, but the soda gives necessary spread/browning.</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-link"></i> Eggs & Flour:** Eggs bind everything together, add moisture, fat (yolk!), and structure when their proteins cook. Room temp = better emulsion! All-purpose flour provides the main structure via gluten, but we mix it *minimally* to keep it tender, not tough. The amount is balanced for moderate spread.</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-person-running"></i> Technique (Creaming & Chilling):** That **5-minute creaming** isn't a suggestion, it's an *order*! Maximize that air incorporation! The **chill time** lets the fat firm up (controlling spread) and the flour fully hydrate (better texture/flavor). It all works together for that perfect chewy-crisp bite! 👌</div>`,
            thickWhyItWorks: `Engineering the **Thick & Gooey Behemoth** is basically declaring WAR on spread! 💥 We want height, softness, and that molten core. Here’s the battle plan:
                            <div class="sub-point"><strong><i class="fa-solid fa-cubes-stacked"></i> Sugar Ratio (1:2 Granulated:Brown):** We flip the script! **Way more brown sugar** means way more molasses. Molasses is *hygroscopic* (it grabs onto water like your clingy friend), keeping the cookie super moist and chewy, resisting drying out. Less granulated sugar means **less spread driver**. SCIENCE!</div>
                             <div class="sub-point"><strong><i class="fa-solid fa-puzzle-piece"></i> Toasted Milk Powder:** This ain't just for flavor (though that nutty depth is 🔥). Milk powder proteins/sugars absorb a bit more free water, potentially making the dough slightly thicker (higher viscosity) and contributing to that satisfying chew. Every little bit helps in the anti-spread campaign!</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-ban"></i> Leavening (Baking Powder ONLY):** We ditch the baking soda *entirely*. No soda = no extra alkalinity boost encouraging spread. We rely **solely on baking powder** for vertical *lift* (puff!), not horizontal spread. Powder puffs, soda spreads – remember that mantra!</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-temperature-low"></i> Fat & Chilling (MANDATORY & LONG):** Chilled brown butter provides structure for moderate creaming (we don't want *too* much air or it might collapse). But the **LONG, COLD chill (4+ hours, ideally 12-72!)** is the *real* MVP. It makes the butter rock solid, so it melts SUPER slowly in the oven, preventing spread. It also fully hydrates the flour, binding up water that could cause steam/spread. Baking COLD is key! ❄️</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-shield-halved"></i> Physical Barriers (Flour Ratio & Chocolate Overload):** Compared to the *spread-inducing* granulated sugar, there's relatively more flour, giving more structure. AND THEN THE CHOCOLATE! That **massive** amount (<strong>{chocoAmount} {chocoUnit}!</strong>) isn't just for flavor – the chunks literally act as **physical roadblocks**, getting in the way of the dough trying to flatten out. They add bulk and help maintain that thick structure.</div>
                             <div class="sub-point"><strong><i class="fa-solid fa-hourglass-half"></i> Technique (Moderate Creaming & Underbake):** We cream *less* than the classic to avoid incorporating *too much* air, which could weaken the structure. And the *underbake* is crucial for gooeyness – pulling it when the center is still soft ensures that moist, decadent texture after carryover cooking. Absolute unit achieved. 🤩</div>`,
            thinWhyItWorks: `Alright party people, time for the **Thin & Crispy Cracker!** This is all about maximizing **SPREAD** and achieving that satisfying **SNAP!** 🫰 Forget height, we want LACE. Here's the physics:
                            <div class="sub-point"><strong><i class="fa-solid fa-cubes-stacked"></i> Sugar Ratio (3:2 Granulated:Brown):** High **granulated sugar** is king here. It melts readily, lowering dough viscosity and making it flow like lava (okay, maybe not *that* dramatic). As it cools, it recrystallizes into a hard, brittle, glassy structure – that's your *snap*! Brown sugar adds some flavor depth and prevents *pure* brittleness, but it takes a backseat.</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-flask-vial"></i> Leavening (Baking Soda ONLY - High Amount!):** We use a hefty dose of **baking soda** and *no* baking powder. Why? Soda makes the dough alkaline. Alkalinity = 1) Faster, deeper **browning** (Maillard magic on hyperdrive 🔥). 2) Weakens gluten structure. Both of these encourage the dough to **SPREAD** more readily. We're basically chemically encouraging flatness!</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-hand-sparkles"></i> Mixing Method (Reverse Creaming!):** This is the **secret weapon** for tenderness/snap! Mixing the cool butter with the dry ingredients *first* coats the flour particles in fat. This **waterproofs** the flour (kinda!), making it hard for water (from the eggs) to get in and develop much gluten. Weak gluten network = tender structure that *snaps* easily instead of chewing. ✨</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-person-running"></i> Fat State & NO CHILLING:** Using cool, pliable butter for reverse creaming allows it to coat the flour effectively. Then, **NO CHILLING!** We bake it immediately while the fat is relatively soft. This allows the fat to melt *fast* in the oven, contributing to rapid, maximum spread. Chilling would defeat the whole purpose!</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-minimize"></i> Chocolate Form Factor (Tiny Pieces):** Using *less* chocolate overall, and making sure it's finely chopped or mini chips, is key. Large chunks would act like boulders, blocking the spread. We want minimal interference for that lacy, even thinness.</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-stopwatch"></i> Baking & Cooling (Thorough & Complete):** Bake these longer and more thoroughly than chewy cookies until uniformly golden brown. This drives off moisture. The **complete cooling** on a wire rack is where the magic happens – moisture evaporates, sugars crystallize fully, and *snap* is born! Don't judge 'em hot! 😉</div>`,

             // --- Easter Egg & Recs (Tone enhanced) ---
             stuffedTitle: "<i class='fa-solid fa-crown'></i> LEVEL UP: Legendary Gooeymancer Status! 🏆", stuffedCongrats: "Habibi! You picked the Thick & Gooey path – BIG BRAIN MOVE! 🧠 Your reward? Unlocking the forbidden technique... STUFFING! 🤯", stuffedHowTo: "How-To: Flatten a dough ball (like you're squashing a tiny enemy 💥). Poke a hole. Add ~1 tsp of liquid gold (Nutella, Pistachio Cream). Wrap dough around it like a secret burrito 🌯. Seal TIGHTLY. Bake per protocol, maybe +1-2 mins for extra meltiness. ⏳",
             pistachioTipTitle: "<i class='fa-solid fa-seedling'></i> Top-Secret Pistachio Intel:", pistachioTipDesc: "Fam, listen up. Forget basic pistachio paste. You want that *scream-in-your-face* PISTACHIO flavor? 🗣️ ASM Foods Pistachio Cream. No cap. It's the one. Trust.", pistachioTipLink: "Acquire Specimen (Egypt Link)",
             chocoTipTitle: "<i class='fa-solid fa-chocolate'></i> Chocolate Particle Analysis:", chocoTipDesc: "Real talk: For that perfect melt & nostalgic Galaxy/Dairy Milk vibe (but better 'cause #Boycott 💪), you gotta use 'Target Kualety Dropsy' MILK Chocolate. It just hits different. 💯", chocoTipLink: "Source Link (FB)", chocoTipMilk: "⚠️ **CRITICAL:** Make SURE it's the MILK chocolate one! The dark stuff is a whole different experiment!",

             // --- Conclusion & Footer (Tone enhanced) ---
             conclusionTitle: "<i class='fa-solid fa-flag-checkered'></i> Experiment Complete! Results & Bragging Rights", conclusionDesc: "YOU DID IT! You conquered cookie science! 🥳 Now, show off your masterpiece. Did it work? Was it glorious? Spill the tea (or... the cookie crumbs?). 📸", conclusionTag: "Tag the Lab Chief on Insta! 👇", conclusionGoForth: "Go forth and continue your delicious research! Lab dismissed! 🧑‍🔬",
             footerText: "Cookie Compendium v4.0 | Fueled by <i class='fa-solid fa-mug-hot' style='color: #795548;'></i> & <i class='fa-solid fa-heart' style='color: #e53935;'></i> for Brown Butter.", consoleLogHint: "P.S. Real scientists check the console log... just sayin' 😉",

            // --- ARABIC TRANSLATIONS NEED UPDATING for tone and new sections ---
        },
        ar: {
             // --- PREVIOUS AR TRANSLATIONS - NEED TO BE UPDATED FOR TONE/NEW CONTENT ---
             // Example update:
             whyItWorksTitle: "<i class='fa-solid fa-brain'></i><i class='fa-solid fa-lightbulb'></i> الخلاصة الكبرى: ليه الوصفة دي بتظبط!",
             classicWhyItWorks: `تمام، ليه بقى الكلاسيك... *كلاسيك*؟ الموضوع كله **توازن** يا كبير! ⚖️ ادي الخلاصة:
                            <div class="sub-point"><strong><i class="fa-solid fa-cubes-stacked"></i> نسبة السكر (1:1 حبيبات:بني):</strong> دي الظبطة! السكر الأبيض بتاع **الفرشحة** (بيسيح بسهولة) و**الأطراف المقرمشة** (بيتبلور ناشف). السكر البني بيجيب **الطراوة** و**الرطوبة** (شكراً يا دبس!) وعمق نكهة وشوية مزازة بتتفاعل مع الصودا. نسبة متساوية بتديك أحسن ما في الاتنين – لا سايحة أوي ولا كيكة أوي.</div>
                            <div class="sub-point"><strong><i class="fa-solid fa-temperature-low"></i> الدهون (زبدة بنية مبردة):</strong> حمرناها عشان *الطعم*، وبنبردها عشان *القوام*. درجة حرارة **١٦-١٨°م (٦٠-٦٥°ف)** دي **إجبارية!** ليه؟ الدهون الصلبة-بس-مرنة ضرورية لطريقة **الخفق (الكريمنج)**. بلورات السكر لازم تقطع في الزبدة دي عشان تحبس فقاعات الهوا. سخنة أوي = وحش سايح ومزيت. باردة أوي = طوبة ناشفة. الهوا المحبوس ده بيدي الكوكي ارتفاع!</div>
                             {... Translate other points similarly ...} `,
             // ... Need to translate ALL new/updated EN strings above ...
        }
    };


    // --- Functions ---

    function showSection(sectionElement) { /* ... V3 showSection ... */ }
    function getBaseButterInGrams() { /* ... V3 getBaseButterInGrams ... */ }
    function calculateScaledRecipe(butterInGrams, cookieType) { /* ... V3 calculateScaledRecipe, uses whyItWorksKey now ... */
        const base = baseRecipes[cookieType];
        if (!base) return null;
        const scalingFactor = butterInGrams / base.baseButter;
        const scaledIngredients = {}; let totalDoughWeight = 0;
        for (const key in base.ingredients) {
            const baseGrams = base.ingredients[key][0]; const scaledGrams = baseGrams * scalingFactor;
            scaledIngredients[key] = { grams: scaledGrams, unitType: base.ingredients[key][1] };
            if (key !== 'prepWater') { totalDoughWeight += scaledGrams; }
        }
        let yieldValue;
        if (cookieType === 'thick' && base.cookieSizeGrams) { yieldValue = Math.max(1, Math.round(totalDoughWeight / base.cookieSizeGrams)); }
        else { yieldValue = Math.max(1, Math.round(base.yieldPerBase * scalingFactor)); }
        return { ingredients: scaledIngredients, yield: yieldValue, cookieSizeDescKey: base.cookieSizeDescKey, prepTechKeys: base.prepTechKeys, stepsKey: base.stepsKey, whyItWorksKey: base.whyItWorksKey, isThick: cookieType === 'thick' }; // Return whyItWorksKey
    }
    function formatIngredient(grams, unitType, lang, unitSystem) { /* ... V3 formatIngredient ... */ }

    // Simple Markdown to HTML converter
    function formatMarkdown(text) {
        if (!text) return '';
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>')     // Italic
            .replace(/`([^`]+)`/g, '<code>$1</code>')   // Inline code
            .replace(/\n/g, '<br>');                     // Newlines
    }


    // Display recipe (UPDATED FOR V4)
    function displayRecipe(recipeData) {
        if (!recipeData) return;

        const lang = currentLanguage;
        const units = currentUnitSystem;
        const T = (key, replacements = {}) => { /* ... V3 T() helper ... */ };

        const cookieName = T(`${selectedCookieType}SelectTitle`);
        const yieldNum = recipeData.yield;
        const yieldDesc = T(recipeData.cookieSizeDescKey, { yieldNum: yieldNum });

        // --- Populate Containers ---
        dynamicRecipeTitle.innerHTML = T('recipeTitle', { cookieName: cookieName });
        dynamicYieldInfo.innerHTML = `${T('approxYield')} ${yieldDesc}`;

        // Prep Techniques
        prepTechniquesContainer.innerHTML = '';
        const butterGrams = recipeData.ingredients.unsaltedButter.grams;
        const prepReplacements = { /* ... V2 prepReplacements calculation ... */ }; // Recalculate if needed
        recipeData.prepTechKeys.forEach(key => { /* ... V3 prep technique generation, use formatMarkdown on description... */
             const title = T(`prepTechTitle_${key}`);
              let iconClass = 'fa-cogs';
             if (key.includes('brownButter')) iconClass = 'fa-fire-alt';
             if (key.includes('hydrate')) iconClass = 'fa-tint';
             if (key.includes('chill')) iconClass = 'fa-snowflake';
             if (key.includes('toast')) iconClass = 'fa-bread-slice';
             const description = T(`prepTechDesc_${key}`, prepReplacements);
              prepTechniquesContainer.innerHTML += `<div class="pro-tip note">
                                                     <h4><i class="fas ${iconClass}"></i> ${title}</h4>
                                                     <p>${formatMarkdown(description)}</p> <!-- Use Formatted Markdown -->
                                                  </div>`;
         });

        // Ingredients
        ingredientListContainer.innerHTML = '';
        const formattedButter = formatIngredient(butterGrams, 'butter', lang, units);
        const butterNote = T('ingredientButterNote') ? `<i class="note-inline">${T('ingredientButterNote')}</i>` : '';
        ingredientListContainer.innerHTML += `<li><strong>${formattedButter}</strong> ${T('unsaltedButter')} ${butterNote}</li>`;
        for (const key in recipeData.ingredients) { /* ... V3 ingredient loop ... */ }

        // Steps
        stepsContainer.innerHTML = '';
        const stepsReplacements = { /* ... V2 stepsReplacements calculation ... */ }; // Recalculate if needed
        const stepsString = T(recipeData.stepsKey, stepsReplacements);
        const stepsArray = stepsString.split('\n');
        stepsArray.forEach(step => { /* ... V3 step generation, use formatMarkdown ... */
            if (step.trim()) {
                 stepsContainer.innerHTML += `<li>${formatMarkdown(step.replace(/^\d+\.\s*/, ''))}</li>`; // Use Formatted Markdown
             }
         });

        // Why It Works Section
        whyItWorksContainer.innerHTML = ''; // Clear previous
        if (recipeData.whyItWorksKey) {
            const whyItWorksText = T(recipeData.whyItWorksKey, stepsReplacements); // Use stepsReplacements if needed for context
            // Break down the text by sub-point for better structure (assuming sub-points start with <div class="sub-point"> in langString)
            if (whyItWorksText.includes('<div class="sub-point">')) {
                 const points = whyItWorksText.split('<div class="sub-point">').slice(1); // Split and remove empty first element
                 points.forEach(pointText => {
                    // Re-add the wrapper and format the inner content
                    whyItWorksContainer.innerHTML += `<div class="sub-point">${formatMarkdown(pointText.replace('</div>',''))}</div>`;
                });
            } else {
                // Fallback if no sub-points defined
                 whyItWorksContainer.innerHTML = `<p>${formatMarkdown(whyItWorksText)}</p>`;
             }
             // Show the parent zone
             const whyWorksZone = document.querySelector('.why-it-works-zone');
             if(whyWorksZone) whyWorksZone.style.display = 'block';
        } else {
            // Hide the parent zone if no text
             const whyWorksZone = document.querySelector('.why-it-works-zone');
             if(whyWorksZone) whyWorksZone.style.display = 'none';
        }

        // Hide the separate science zone (content integrated now)
        const scienceZone = document.querySelector('.science-zone');
        if (scienceZone) scienceZone.style.display = 'none';


        // --- Show/Hide Easter Egg & Recommendations ---
        stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
        chocolateRecommendation.style.display = 'block';

        updateLanguageContent(recipeContentCard); // Update static text within dynamic card

        // --- Display Logic ---
        recipeDisplaySection.style.display = 'block';
        setTimeout(() => { /* ... V3 display timeout with scroll ... */ }, 50);
    }

    // --- Language and Unit Switching ---
     function updateLanguageContent(parentElement = document.body) { /* ... V3 updateLanguageContent ... */ }
     function updateUnitButtonDisplay() { /* ... V3 updateUnitButtonDisplay ... */ }
     function toggleLanguage() { /* ... V3 toggleLanguage ... */ }
     function toggleUnits() { /* ... V3 toggleUnits ... */ }

    // --- Event Listeners & Initial Setup ---
    // (Identical to V3)
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

}); // End DOMContentLoaded
