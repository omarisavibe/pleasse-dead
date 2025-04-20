// --- START OF REFINED SCRIPT ---
(function() { // IIFE to encapsulate scope
    'use strict'; // Enable strict mode

    document.addEventListener('DOMContentLoaded', () => {
        // --- DOM Elements ---
        const DOMElements = {
            htmlElement: document.documentElement,
            butterAmountInput: document.getElementById('butter-amount'),
            butterUnitSelect: document.getElementById('butter-unit'),
            startExperimentBtn: document.getElementById('start-experiment-btn'),
            butterWarning: document.getElementById('butter-warning'),
            cookieSelectionSection: document.getElementById('cookie-selection-section'),
            recipeDisplaySection: document.getElementById('recipe-display-section'),
            recipeContent: document.getElementById('recipe-content'),
            cookieOptions: document.querySelectorAll('.cookie-option'), // Keep as NodeList for iteration
            cookieOptionsContainer: document.getElementById('cookie-options-container'), // Added for delegation
            stuffedEasterEgg: document.getElementById('stuffed-easter-egg'),
            chocolateRecommendation: document.getElementById('chocolate-recommendation'),
            langToggleButton: document.getElementById('lang-toggle'),
            unitToggleButton: document.getElementById('unit-toggle')
        };

        // --- State Variables ---
        const state = {
            currentLanguage: 'en', // Default language
            currentUnitSystemEN: 'metric', // 'metric' or 'imperial' (Only for EN display)
            baseButterGrams: 0,
            selectedCookieType: null
        };

        // --- Configuration Constants ---
        const CONFIG = {
            GRAMS_PER_CUP_BUTTER: 226.8,
            GRAMS_PER_CUP_FLOUR: 125,
            GRAMS_PER_CUP_GRAN_SUGAR: 200,
            GRAMS_PER_CUP_BROWN_SUGAR: 213, // Packed
            GRAMS_PER_TSP_SALT: 6,
            GRAMS_PER_TSP_BAKING_SODA: 4.8,
            GRAMS_PER_TSP_BAKING_POWDER: 4,
            GRAMS_PER_LARGE_EGG: 50,
            GRAMS_PER_TSP_VANILLA: 4.2,
            GRAMS_PER_CUP_CHOC_CHIPS: 170,
            GRAMS_PER_TBSP_MILK_POWDER: 7,
            MIN_BUTTER_GRAMS: 100, // Minimum required butter
            DEFAULT_UNIT_EN: 'metric', // Default unit system for English
        };

        // --- Base Recipes & Language Strings - GEN Z TAKEOVER ---
        const baseRecipes = {
             classic: {
                baseButter: 284, yieldPerBase: 30,
                ingredients: { granulatedSugar: [200, 'sugar'], lightBrownSugar: [200, 'sugar'], largeEggs: [100, 'egg'], vanillaExtract: [8.4, 'vanilla'], allPurposeFlour: [420, 'flour'], tableSalt: [6, 'salt'], bakingPowder: [4, 'bakingPowder'], bakingSoda: [2.4, 'bakingSoda'], chocolateChips: [454, 'chocolate'], prepWater: [9.4, 'water'] },
                notes: 'classicNotes', prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick'], steps: 'classicSteps'
             },
            thick: {
                 baseButter: 284, yieldPerBase: 10, cookieSizeGrams: 140,
                ingredients: { granulatedSugar: [100, 'sugar'], lightBrownSugar: [200, 'sugar'], toastedMilkPowder: [15, 'milkPowder'], largeEggs: [100, 'egg'], vanillaExtract: [8.4, 'vanilla'], allPurposeFlour: [420, 'flour'], tableSalt: [6, 'salt'], bakingPowder: [5, 'bakingPowder'], chocolateChips: [567, 'chocolate'], prepWater: [9.4, 'water'] },
                 notes: 'thickNotes', prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick', 'toastMilkPowder'], steps: 'thickSteps'
            },
            thin: {
                baseButter: 284, yieldPerBase: 42,
                ingredients: { granulatedSugar: [300, 'sugar'], lightBrownSugar: [200, 'sugar'], largeEggs: [100, 'egg'], vanillaExtract: [8.4, 'vanilla'], allPurposeFlour: [420, 'flour'], tableSalt: [6, 'salt'], bakingSoda: [7.2, 'bakingSoda'], chocolateChips: [340, 'chocolate'], prepWater: [9.4, 'water'] },
                notes: 'thinNotes', prepTech: ['brownButter', 'hydrateButter', 'chillButterThin'], steps: 'thinSteps'
            }
        };

        const langStrings = {
           en: {
                 // Toggles & Units
                 toggleArabic: 'عربي version pls',
                 toggleEnglish: 'Back to English ig',
                 unitMetric: 'Metric (grams, the one that makes sense) 🤓',
                 unitImperial: 'Imperial (cups?? 🗽🦅 wtf is a cup)',
                 unitGrams: 'grams (for the ✨precise✨ ones)', // Used in AR input select
                 cups: 'cups (for the ✨chaotic✨ ones)', // Used in AR input select & display
                 // Butter Input
                 butterVarTitle: "Okay STEP 1: Butter Business 🧈 SPILL",
                 butterVarDesc: "Alright team, gather 'round. Real experiments need... like... numbers. How much unsalted butter we throwin' into this delicious void? 🤔 Spill it.",
                 grams: 'grams',
                 //cups: 'cups', // Defined above
                 butterWarning: "bruh. 💀 enter a real amount. Minimum 100g or like, half a cup. pls fix.",
                 beginExperiment: "LET'S COOK (metaphorically) 🔥",
                 // Cookie Selection
                 phenotypeTitle: "Step 2: Choose Your Fighter™ 🥊🍪",
                 phenotypeDesc: "Aight, what timeline are we manifesting? Pick your final cookie form:",
                 thinTitle: 'Crispy Snappy Bois™ ✨', thinDesc: 'Flat kings. Max C R O N C H. Spreads faster than my wifi signal.',
                 classicTitle: 'The OG Balanced Baddie 😎', classicDesc: 'That perfect chewy middle, crisp edge combo. The ppl pleaser fr.',
                 thickTitle: '👑 THICCUMS Maximums 👑', thickDesc: 'Soft like a cloud made of dough. Obscenely decadent. Zero spacial awareness. Pure emotional support cookie.',
                 // Recipe Display
                 recipeTitle: '{cookieName}: The Deets™ 👇',
                 prepTitle: 'Prep School: Nerd Sesh 🤓⚗️',
                 ingredientsTitle: 'The Loot List 💰 (What you need)',
                 approxYield: 'Makes roughly:',
                 cookies: 'cookies? maybe more? idk.',
                 cookie: 'sad singular cookie 🧍',
                 largeCookies: 'absolute U N I T cookies 🏋️',
                 largeCookie: 'singular U N I T cookie 🏋️',
                 stepsTitle: 'The Actual Instructions (Try not to F*** it up 🙏)',
                 proTipsTitle: 'Pro Gamer Moves / Brain Dump 🧠💥',
                 // Ingredient Names (Ensure keys match baseRecipes.ingredients keys)
                 unsaltedButter: 'Unsalted Butter (the bougie kind)',
                 granulatedSugar: 'White Sugar (the basic one)',
                 lightBrownSugar: 'Light Brown Sugar (squish it down, assert dominance)',
                 toastedMilkPowder: 'Toasted Milk Powder (if u wanna be ~extra~)',
                 largeEggs: 'Large Eggs (pretend they\'re room temp, even if they aren\'t 🤫)',
                 vanillaExtract: 'Vanilla Extract (smells good juice)',
                 allPurposeFlour: 'A.P. Flour (spoon it gently, no packing allowed 🙅)',
                 tableSalt: 'Salt (essential flavor dust)',
                 bakingPowder: 'Baking Powder (check expiry? nahhh jk pls do)',
                 bakingSoda: 'Baking Soda (also check expiry?? maybe??)',
                 chocolateChips: 'Choc Chips/Chunks (Target Kualety MILK ftw, ignore other opinions)',
                 prepWater: 'Water or Milk (H₂O for the dough-o💧)',
                 // Prep Techniques
                 prepTechTitle_brownButter: 'How To: Brown Butter Like a Pro (aka Liquid Gold Factory) 🏆🏭',
                 prepTechDesc_brownButter: `Maillard Reaction = fancy word for making butter taste NUTS (literally). 🔥<br>1. Chop butter, chuck in light pan, medium heat. See foam? That's water peacing out ✌️. Swirl pan like you're trying to hypnotize it.<br>2. Keep swirling/heating. Brown bits sink, smell AMAZING (like toasted nuts/caramel?). 5-10 mins maybe. Don't wander off!<br>3. YEET immediately (all the bits!) into a heatproof bowl. Stops cooking. Burnt butter = sad times. 😥`,
                 prepTechTitle_hydrateButter: 'Side Quest: Butter Hydration 💦 (Optional!)',
                 prepTechDesc_hydrateButter: `Browning stole water (rude). Adding calculated amount back *after* browning *before* chilling MIGHT make it chewier? Idk, science! 🧪 Stir gently. Worth a shot?`,
                 prepTechTitle_chillButterClassicThick: 'Freeze Frame! Chill For Creaming 🥶🧊',
                 prepTechDesc_chillButterClassicThick: `Why? Melted butter fat = sad, floppy cookies. Chilling rebuilds the fat crystals so they can trap air with sugar (makes fluff!).<br>1. Let hot butter cool off a bit (5-10min). Let it see the world.<br>2. Fridge time! Till it's solid but still kinda squishy (like cold butter, duh). Not a rock. ~1-2 hrs. Aim for ~60-65°F / 16-18°C. CRITICAL for Classic/THICC boys.`,
                 prepTechTitle_chillButterThin: 'Coolio Mode: Chill For Reverse Creaming 😎❄️',
                  prepTechDesc_chillButterThin: `Thin Bois need cool (not cold!) butter to coat flour first. Like putting on a fat raincoat.<br>1. Cool browned butter to room temp-ish. Quick fridge blast (~30-60 min) till just barely solid but easily chopped. ~65-68°F / 18-20°C is the vibe.`,
                 prepTechTitle_toastMilkPowder: 'Level Up! Toast Milk Powder (Extra Flavor DLC) ✨🚀',
                 prepTechDesc_toastMilkPowder: `Deepens nutty/malty taste REAL fast. Another Maillard W. Big difference in THICC kings.<br>1. Spread powder THIN (parchment or DRY skillet).<br>2. Oven: ~250°F/120°C for 10-15 min, stir often. Skillet: Med-low heat, stir NON-STOP. Like, really, don't stop.<br>3. Watch it! Goes gold quick. Burning = game over. ☠️<br>4. Cool 100% before use. Don't be impatient.`,
                 // Notes & Steps
                 classicNotes: `🔑: 1:1 sugars, both powders, TRUE 5-MIN CREAMING (set a timer!). Butter temp (60-65°F/16-18°C) = Law. Chilling is not optional if u want the best texture, okay? Okay. 🤝`,
                 classicSteps: `1. **PREP:** Dry stuff whisked. Sheets lined. Butter = chilly-pliable, eggs = room temp (or close enough lol).\n2. **CREAMING (The Main Event):** Beat the CHILLED butter & sugars med-high for a **full 5 minutes**. No cheating. Should look pale & fluffy af. Scrape scrape scrape.\n3. **WET STUFF:** Low speed. Eggs go in one @ a time. Mix *just* till combined. Overmixing = Sadge. Vanilla slips in last.\n4. **DRY STUFF:** Lowest speed. Slowly add flour mix. Stop AS SOON as it's *mostly* mixed. A few streaks are fine. Finish by hand maybe?\n5. **FOLD GENTLY:** Choc chips in. Pretend the dough has feelings.\n6. **CHILL (Pls do it):** Cover dough. Fridge 30-60 mins absolute MIN. Up to 48h for DEEP flavor development. Fat firms up, flour drinks.\n7. **SCOOP N' BAKE:** Oven 375°F/190°C. Scoop ~2 Tbsp balls. Space 'em out (they need personal space). Bake 10-12 min (edges golden, middle soft/puffy). Rotate pan once maybe.\n8. **COOLING ZONE:** 🚨 IMPORTANT: Let cookies sit ON the hot pan 5 mins!! They finish cooking. Then move to wire rack. Be patient ffs.`,
                 thickNotes: `THICC STRATEGY: We fight spread! 💪 How? HIGH brown sugar, NO soda, MANDATORY **L O N G** chill. Cream moderately (too much air = collapse). Toasted milk powder = *chef's kiss*. Embrace the gooey center. BIG COOKIE ENERGY ONLY. 👑`,
                 thickSteps: `1. **PREP:** Dry stuff whisked (incl. toasted milk powder). Sheets lined. Butter = chilly-pliable, eggs = pretending room temp.\n2. **CREAM (Moderate!):** Butter & sugars med speed ~2-3 min. Goal: combined & creamy. NOT light/fluffy like classic. Avoid too much air.\n3. **WET STUFF:** Low speed. Eggs 1 @ a time, just combined. Vanilla in.\n4. **DRY STUFF:** Low speed. Add flour in waves. Mix till *almost* combined. We hate gluten development here. 😤\n5. **FOLD (Maximum Effort):** Add ungodly amount of choc chips. Use hands/strong spatula to fold in the last bits of flour. Dough = DENSE AF. Do not overmix.\n6. **THE MANDATORY CHILL:** Shape into **LARGE** balls (like, 4-6oz / 113-170g). Roll TALL, not flat. Wrap TIGHT. Fridge MINIMUM 4 hours. Ideal = 12-72 hours. DO. NOT. FUDGE. THIS. STEP. PERIODT.\n7. **BAKE FROM COLD:** Oven 350°F/180°C. Put COLD dough balls far apart. DO NOT FLATTEN. Bake 18-25 min (depends on CHONK). Edges look set, center looks kinda underbaked/gooey AF (target ~175-185°F / 79-85°C if you have a thermometer like a nerd). Rotate pan once.\n8. **COOLING PROTOCOL (Handle w/ Care!):** 🚨 LET SIT ON PAN FOR 10-15 MINUTES. They are delicate little giants. Move GENTLY to rack. Best slightly warm. Molten core = pain.`,
                  thinNotes: `CRISPY CODE: Max Spread + Minimum Gluten = Win ✨. HIGH white sugar, HIGH soda (alkaline = brown/spread). Reverse cream hack is key. **NO CHILL ZONE**. Bake till they shatter. Small scoops, wide berths. Trust the process. 🙏`,
                  thinSteps: `1. **PREP:** Line sheets. Butter = cool but squishy (65-68°F/18-20°C), chopped small. Eggs = room temp-ish. Whisk eggs & vanilla in separate bowl like a pro.\n2. **REVERSE CREAM TIME:** In mixer: flour, sugars, salt, soda. Quick blend. Add cool butter bits. Mix LOW till looks like wet sand/crumbs (butter coating flour = goal achieved ✅). Takes a few mins.\n3. **WET MEETS DRY:** Low speed. Sloooowly drizzle in egg/vanilla mix. Mix JUST till it *barely* forms a dough. Might look crumbly first. OVERMIXING IS THE ENEMY.\n4. **FOLD (Bare Minimum):** Gently add fine chopped/MINI choc chips. Fewest strokes possible.\n5. **SCOOP & BAKE ASAP:** 💨 NO CHILLING ALLOWED!! Oven 350°F/175°C. Scoop TINY (~1 Tbsp) balls. Leave TONS of space (3+ inches!!). They SPREAD like CRAZY.\n6. **BAKE TILL CRISPY:** Bake 12-16 min till FLAT and golden brown edge-to-center. Rotate pan once. Slightly overbaking is kinda the point here.\n7. **COOL FULLY FOR CRONCH:** On pan 5-10 min (wait till they're movable!). Then rack to cool 100%. CRISPINESS APPEARS AS THEY COOL. Magic! 🪄`,
                 // Easter Egg & Recs
                 stuffedTitle: '🤫 WHOA Secret Level Alert! 🎮✨',
                 stuffedCongrats: "YOOOO, Absolute Unit chooser! 👑 You get the DLC: ✨Stuffing Mode Activated!✨ Let's get WEIRD.",
                 stuffedHowTo: 'Da Plan: Flatten chonky dough ball, poke a hole (gently!), spoon in ~1 tsp Nutella / THAT Pistachio Cream (u know the one 😉), carefully wrap dough around, pinch seal, bake maybe +1-2 mins. Easy? Ish?',
                 pistachioTipTitle: 'Pistachio Spread: A Public Service Announcement 📢 pistachio wars',
                 pistachioTipDesc: "Listen up: Most pistachio spread is watery trash 🗑️. Wanna taste pure, unadulterated pistachio bliss? LIQUID GOLD? ✨ It's 'ASM Foods Pistachio Cream'. Dangerously good. You've been warned. (Not sponsored... unless? 👀)",
                 pistachioTipLink: 'Linky link (Egypt)',
                 chocoTipTitle: 'Chocolate Chip Sermon 🧐 listen up heathens',
                 chocoTipDesc: "OKAY BUT FR. Most choc chips < mid. You want that melty, dreamy, makes-u-cry-happy vibe? Like Galaxy/Dairy Milk but *actually good* (& #BoycottFriendly ❤️🇵🇸)? Find 'Target Kualety Dropsy' **MILK** Choc. The underrated GOAT. Secret tech unlocked.",
                 chocoTipLink: 'Find the supplier connect (FB Link)',
                 chocoTipMilk: '🚨🚨 Make SURE it\'s **MILK** choc. The dark one is... fine. But MILK is endgame. TRUST.',
                 // Conclusion
                 conclusionTitle: 'We Did It Joe! 🎉 Mission Success? (You Decide lol)',
                 conclusionDesc: 'Hypothesis: Brown butter reigns supreme. Outcome: OBVIOUSLY YES. ✅ Got pics? Share the proof on Insta or it didn\'t happen! Flex on \'em! 💪',
                 conclusionTag: 'Tag the creator maybe? ->',
                 conclusionGoForth: 'Go bake more chaos. You\'re the main character, act like it. 💅✨',
                 footerText: 'Made w/ science™, butter🧈, anxiety spirals😰 & code magic✨',
                 // Error Messages
                 error_recipe_display: 'Whoops! 😵‍💫 Could not display recipe.',
                 error_recipe_calculation: 'Math is hard 🫠 Failed to calculate recipe.',
                 error_missing_steps: 'Uh oh, steps went missing? Tell the dev maybe? 🤷‍♀️',
                 error_try_again: 'Maybe try refreshing or selecting again?',
            },
             ar: { // ARABIC - Applying similar chaotic energy with Egyptian colloquialisms
                 toggleArabic: 'قلبّ عربي يا شبح',
                 toggleEnglish: 'رجّع انجليزي يسطا',
                 unitMetric: 'متري (جرامات واللي يفهم بقى) 🤓', // Not used directly by toggle button in AR
                 unitImperial: 'إمبريالي (كوبايات؟ إيه الهبل دا 🗽🦅)', // Not used directly by toggle button in AR
                 unitGrams: 'جرامات (للناس الـ✨دقيقة✨)', // For input select
                 cups: 'كوبايات (للناس الـ✨عشوائية✨)', // For input select & display
                 // Butter Input
                 butterVarTitle: "يلا بينا الخطوة 1: حوار الزبدة 🧈 وريني اللي عندك",
                 butterVarDesc: "تمام يا جماعة، ركزوا معايا. التجارب اللي بجد عايزة... يعني... أرقام. كام جرام زبدة طرية هنرميهم في الفراغ اللذيذ دا؟ 🤔 احكيلي.",
                 grams: 'جرام',
                 // cups: 'كوباية', // Defined above
                 butterWarning: "يادي النيلة. 💀 دخل رقم بجد. أقل حاجة 100 جرام أو نص كوباية طيب. صلحها بالله عليك.",
                 beginExperiment: "يلا نطبخ (مجازًا يعني) 🔥",
                 // Cookie Selection
                 phenotypeTitle: "خطوة 2: اختار البطل بتاعك™ 🥊🍪",
                 phenotypeDesc: "أولًا، إيه الـ mood اللي طالعين بيه؟ اختار الكائن الكوكي النهائي:",
                 thinTitle: 'المقرمشين المنطلقين™ ✨', thinDesc: 'ملوك الفلات. قرمشة لا نهائية. بيتفرد أسرع من النت عندي.',
                 classicTitle: 'الأصلي الكيوت المتوازن 😎', classicDesc: 'الميكس المثالي بين طري جوة وقرمشة برة. بتاع الشعب الصراحة fr.',
                 thickTitle: '👑 أسياد التُخن والتكبيسة 👑', thickDesc: 'ناعم زي سحابة عجين. دلع مقرف من كتر حلاوته. واخد راحته فالمساحة. الكوكي الحضن.',
                 // Recipe Display
                 recipeTitle: '{cookieName}: الكلام ع إيه™ 👇',
                 prepTitle: 'كورس التحضير: فقرة الفزلكة 🤓⚗️',
                 ingredientsTitle: 'ليستة الغنائم 💰 (الحاجات المطلوبة)',
                 approxYield: 'بتعمل حوالي:',
                 cookies: 'كوكيز؟ يمكن أكتر؟ معرفش.',
                 cookie: 'كوكي واقفة لوحدها حزينة 🧍',
                 largeCookies: 'كوكيز ضخمة كدا مشفتهاش 🏋️',
                 largeCookie: 'كوكي ضخمة لوحدها برضه 🏋️',
                 stepsTitle: 'الخطوات الأصلية (حاول متبوظهاش الله يباركلك 🙏)',
                 proTipsTitle: 'حركات المحترفين / دش دماغي 🧠💥',
                 // Ingredient Names (Ensure keys match baseRecipes.ingredients keys)
                 unsaltedButter: 'زبدة طرية (النوع الأنتيكة)',
                 granulatedSugar: 'سكر أبيض (العادي بتاعنا)',
                 lightBrownSugar: 'سكر بني فاتح (دُكه لتحت، افرض سيطرتك)',
                 toastedMilkPowder: 'بودرة لبن محمصة (لو عايز تتمنظر ~بالشياكة~)',
                 largeEggs: 'بيض كبير (اعمل نفسك جايبهم بحرارة الغرفة حتى لو لأ 🤫)',
                 vanillaExtract: 'فانيليا سايلة (عصير ريحته حلوة)',
                 allPurposeFlour: 'دقيق أ.غ (بالملعقة براحة، بلاش كبس 🙅)',
                 tableSalt: 'ملح (غبار الطعم الأساسي)',
                 bakingPowder: 'بيكنج بودر (تشوف تاريخه؟ لا طبعًا بهزر شوفه)',
                 bakingSoda: 'بيكنج صودا (تشوف تاريخه برضه؟ يمكن؟)',
                 chocolateChips: 'شوكليت شيبس/قطع (Target Kualety لبن وبس، تجاهل أي رأي تاني)',
                 prepWater: 'مية أو لبن (أكسجين العجين أو كدا💧)',
                 // Prep Techniques
                 prepTechTitle_brownButter: 'الطريقة: تحمير الزبدة باحتراف (مصنع الدهب السايل يعني) 🏆🏭',
                 prepTechDesc_brownButter: `ميلارد دا = كلمة شيك عشان تخلي طعم الزبدة مكسرااات (بمعنى الكلمة). 🔥<br>١. قطع الزبدة، ارميها فطاسة فاتحة، نار وسط. شفت رغوة؟ دي الميه بتخلع ✌️. لف الطاسة كأنك بتحاول تنوّمها.<br>٢. كمّل لف وتسخين. الحتت البني بتنزل تحت وريحتها بتبقى تجنننن (زي مكسرات متحمصة/كراميل؟). ٥-١٠ دقايق يمكن. متروحش في حتة!<br>٣. ارمي فوراً (كل الحتت!) في طبق يستحمل الحرارة. عشان توقف السوا. زبدة محروقة = نهاية حزينة. 😥`,
                 prepTechTitle_hydrateButter: 'مهمة جانبية: ترطيب الزبدة 💦 (مش إجباري!)',
                 prepTechDesc_hydrateButter: `التحمير سرق المية (قلة ذوق). لو رجعنا الكمية المظبوطة *بعد* التحمير *قبل* التبريد يمكن تبقى امضغ؟ معرفش، علم! 🧪 قلب بالراحة. نجرب؟`,
                 prepTechTitle_chillButterClassicThick: 'ستووب! برّد عشان الخفق 🥶🧊',
                 prepTechDesc_chillButterClassicThick: `ليه؟ دهن الزبدة السايح = كوكيز حزينة فلات. التبريد بيبني كريستالات الدهن تاني عشان تعرف تحبس هوا مع السكر (يدي هشاشة!).<br>١. سيب الزبدة السخنة تبرد شوية (٥-١٠ دقايق). خليها تشوف الدنيا.<br>٢. وقت التلاجة! لحد ما تجمد بس لسه بتتبطط شوية (زي الزبدة السقعانة العادية). مش قالب طوب. ~١-٢ ساعة. الهدف ~١٦-١٨°م / ٦٠-٦٥°ف. أساسي جدًا للكلاسيك/التخان.`,
                 prepTechTitle_chillButterThin: 'مود الروقان: برّد عشان الخفق العكسي 😎❄️',
                  prepTechDesc_chillButterThin: `الأولاد الرقاق عايزين زبدة باردة (مش تلج!) عشان تغلف الدقيق الأول. زي ما تكون بتلبسه بالطو دهن.<br>١. برّد الزبدة المحمرة لدرجة حرارة الغرفة تقريبًا. خبطة تلاجة سريعة (~٣٠-٦٠ دقيقة) لحد ما تبقى يا دوب جامدة بس سهل تتقطع. مزاجها يبقى ~١٨-٢٠°م / ٦٥-٦٨°ف.`,
                 prepTechTitle_toastMilkPowder: 'علي الليفل! حمّص بودرة اللبن (نكهة إضافية مجانية) ✨🚀',
                 prepTechDesc_toastMilkPowder: `بتغمق طعم الجوز/المالت أوي. فوز تاني لميلارد. فرق شاسع فالملوك التخان.<br>١. افرد البودرة رفيع أوي (صينية أو طاسة ناشفة).<br>٢. فرن: ~١٢٠°م/٢٥٠°ف حوالي ١٠-١٥ دقيقة، قلب كتير. طاسة: نار وسط لهادية، قلب من غييييير ما تقف. بجد متقفش.<br>٣. خليك باصص عليها! بتلون دهبي بسرعة. اتحرقت = الجيم خلص. ☠️<br>٤. برّدها ١٠٠% قبل الاستخدام. متستعجلش.`,
                 // Notes & Steps
                 classicNotes: `🔑: سكر ١:١، البودرتين، خفق ٥ دقايق مظبوطييين (شغّل تايمر!). حرارة الزبدة (١٦-١٨°م) = قانون دولة. التبريد مش اختياري لو عايز القوام الصح، اتفقنا؟ اتفقنا. 🤝`,
                 classicSteps: `١. **جهّز:** اخلط النواشف. جهّز الصواني. الزبدة = باردة-بتتفعص، البيض = شبه حرارة الغرفة ههه.\n٢. **الخفق (فقرة الحفلة):** اضرب الزبدة الباردة والسكر ع سرعة وسط-عالية **٥ دقايق كاملة**. من غير غش. لازم يبقى لونها فاتح وهشة فشخ. اكحت كويس.\n٣. **السوايل:** سرعة بطيئة. البيض يدخل واحدة ورا واحدة. اخلط *يا دوب* يختلط. زيادة خلط = حزن. الفانيليا بتتزحلق آخر حاجة.\n٤. **النواشف:** أبطأ سرعة. نزّل الدقيق حبة حبة. وقّف أول ما *أغلبه* يختلط. كام خط عادي. كمل بإيدك يمكن؟\n٥. **قلّب بالراحة:** نزل الشوكولاتة. اعمل كأن العجينة عندها مشاعر.\n٦. **برّد (بليز اعملها):** غطي العجينة. تلاجة ٣٠-٦٠ دقيقة أقل أقل حاجة. لحد ٤٨ ساعة لطعم في عالم تاني. الدهن يمسك، الدقيق يشرب.\n٧. **شكّل واخبز:** فرن ١٩٠°م/٣٧٥°ف. شكّل كور ~٢ م ك. سيب مسافة (عايزين مساحة شخصية). اخبز ١٠-١٢ دقيقة (الأطراف دهبي، النص طري/منفوش). لف الصينية مرة يمكن.\n٨. **منطقة التبريد:** 🚨 مهم: سيب الكوكيز ع الصينية السخنة ٥ دقايق!! بتكمل سوا. بعدين انقل ع رف سلك. اصبر بقى الله يهديك.`,
                 thickNotes: `استراتيجية التُخن: بنحارب التفلطح! 💪 إزاي؟ سكر بني كتير، مفيش صودا، تبريد طوييييييل **إلزامي**. اخفق بالهداوة (هوا كتير = انهيار). بودرة لبن محمصة = بوسة الشيف 💋. حب النص الطري شوية. طاقة الكوكي الضخمة فقط. 👑`,
                 thickSteps: `١. **جهّز:** اخلط النواشف (مع بودرة اللبن المحمصة). جهّز الصواني. الزبدة = باردة-بتتفعص، البيض = بيتظاهر بحرارة الغرفة.\n٢. **اخفق (بالهداوة!):** زبدة وسكر سرعة وسط ~٢-٣ دقيقة. الهدف: مختلط وكريمي. مش فاتح/هش زي الكلاسيك. بلاش هوا كتير.\n٣. **السوايل:** سرعة بطيئة. البيض ١ ورا ١، يا دوب يتخلطوا. نزل الفانيليا.\n٤. **النواشف:** سرعة بطيئة. نزّل الدقيق دفعات. اخلط لحد ما يبقى *شبه* اتخلط. بنكره الجلوتين هنا. 😤\n٥. **قلّب (بأقصى قوة):** حط كمية شوكولاتة مهولة. استخدم إيدك/سباتيولا متينة عشان تدخل آخر حبة دقيق. العجينة = تقيلة فشخ. متخلطش زيادة.\n٦. **التبريد الإلزامي الأبدي:** شكّل كور **كبييييرة** (قد ١١٣-١٧٠جم). خلّيها طويلة مش مبططة. غلفها جاااامد. تلاجة أقل شيء ٤ ساعات. الأفضل = ١٢-٧٢ ساعة. إيـــاااااك. تــفــكّـــس. للــخــطــوة. دي. أبدًا.\n٧. **اخبز ساقع:** فرن ١٨٠°م/٣٥٠°ف. حط كور العجين الساقعة بعيد عن بعض. متـــبـــطـــطـــش. اخبز ١٨-٢٥ دقيقة (حسب التخن). الأطراف شكلها استوت، النص شكله ني شوية/عجينة لزجة كدا (الهدف ~٧٩-٨٥°م / ١٧٥-١٨٥°ف لو عندك ترمومتر زي الدحيحة). لف الصينية مرة.\n٨. **بروتوكول التبريد (بالراحة عليها!):** 🚨 سيبها ع الصينية ١٠ لـ ١٥ دقيقة. دي عيال عملاقة هفّة. انقلها بالراحة عالرف. أحسن وهي دافية شوية. قلبها سايح = وجع.`,
                  thinNotes: `شفرة القرمشة: أقصى تفلطح + أقل جلوتين = كسبت ✨. سكر أبيض كتير، صودا كتير (قلوي = بنيان/تفلطح). حيلة الخفق العكسي هي الحل. **ممنوع التبريد**. اخبز لحد ما تتكسر. كور صغيرة، أماكن واسعة. ثق فالعملية. 🙏`,
                  thinSteps: `١. **جهّز:** بطّن الصواني. الزبدة = باردة بس لينة (١٨-٢٠°م / ٦٥-٦٨°ف)، مقطعة صغير. البيض = شبه حرارة الغرفة. اضرب البيض والفانيليا ف طبق لوحده زي المحترفين.\n٢. **وقت الخفق العكسي:** فالعجانة: دقيق، سكر، ملح، صودا. خلطة سريعة. حط حتت الزبدة الباردة. اخلط على الواطي لحد ما يبقى شكله زي رمل مبلول/فتات (الزبدة غلفت الدقيق = الهدف تحقق ✅). بياخد كام دقيقة.\n٣. **السوايل مع النواشف:** سرعة واطية. سرسب خليط البيض/فانيليا ببطء. اخلط يا دوب لحد ما *بالعافية* تلم عجينة. ممكن شكلها يبقى بايظ فالأول. زيادة الخلط هو العدو الأول.\n٤. **قلّب (أقل ما يمكن):** بالراحة ضيف شوكولاتة مفرومة ناعم/صغنونة. أقل تقليبات ممكنة.\n٥. **شكّل واخبز فورًاااا:** 💨 ممنوع التبريد!! فرن ١٧٥°م/٣٥٠°ف. شكّل كور صغنونة (~١ م ك). سيب مسااااافة كبيرة (٣+ بوصة!!). بيتفردوا بجنووون.\n٦. **اخبز لحد القرمشة:** اخبز ١٢-١٦ دقيقة لحد ما تبقى فلات ولونها دهبي من الحرف للحرف. لف الصينية مرة. لو زودت الخبز سيكا دا المطلوب هنا أصلاً.\n٧. **برّد نهااائياً للقرمشة:** ع الصينية ٥-١٠ دقايق (استنى يمسكوا نفسهم!). بعدين عالرف يبردوا ١٠٠%. القرمشة بتظهر لما يبردوا خاااالص. سحر! 🪄`,
                 // Easter Egg & Recs
                 stuffedTitle: '🤫 هيهيهي ليفل سري طلعلك! 🎮✨',
                 stuffedCongrats: 'يااااااا وحش الوحوش اللي اختار التخين! 👑 ليك تحديث إضافي: ✨مود الحشو اتفعل!✨ يلا نعمل حاجات غريبة.',
                 stuffedHowTo: 'الخطة كالآتي: بطّط كورة العجين التخينة، اخرمها خرم (بالراحة!)، احشي ~م ص نوتيلا / كريمة الفستق إياها (عارفها أكيد 😉)، لمّ العجين بحذر، اقفل الأطراف، اخبز يمكن زيادة دقيقة ولا اتنين. سهلة؟ إلى حد ما؟',
                 pistachioTipTitle: 'زبدة الفستق: إعلان للصالح العام 📢 حروب الفستق',
                 pistachioTipDesc: "اسمعوني طيب: أغلب زبدة الفستق اللي فالوق دي زبالة مايصة 🗑️. عايز تدوق نعيم الفستق الصافي؟ الدهب السايل؟ ✨ يبقى 'كريمة فستق ASM Foods'. إدمان خطير. حذرت أهو. (مش إعلان... إلا لو؟ 👀)",
                 pistachioTipLink: 'دوس ع اللينك دا (مصر)',
                 chocoTipTitle: 'موعظة الشوكولاتة الأسبوعية 🧐 اسمعوا يا كفرة',
                 chocoTipDesc: "طيب والله بجد. أغلب الشوكليت شيبس أقل من عادي. عايز الإحساس الدايب الخرافي اللي بيعيط من السعادة؟ زي جلاكسي/ديري ميلك بس *أحلى فعلاً* (و #مقاطعة عشان المبادئ ❤️🇵🇸)؟ لازم تلاقي 'Target Kualety Dropsy' **باللبن**. دي الجوهرة المجهولة. سر الأسرار.",
                 chocoTipLink: 'شوف كونكت التاجر (لينك فيسبوك)',
                 chocoTipMilk: '🚨🚨🚨 اتأكد ١٠٠٪ إنها **باللبن**. الغامقة... يعني عادي. بس اللبن دي آخر ليفل فاللعبة. اسمع كلامي.',
                 // Conclusion
                 conclusionTitle: 'خلصانة بشياكة! 🎉 نجحت المهمة؟ (انت اللي تقرر ههه)',
                 conclusionDesc: 'الفرضية: الزبدة البنية جبارة. النتيجة: طبعاً أيوه. ✅ صورت؟ نزّل صور دليل عالإنستا وإلا كأنك معملتش حاجة! وريهم شغلك! 💪',
                 conclusionTag: 'منشن العبد لله يمكن؟ ->',
                 conclusionGoForth: 'روح اخبز فوضى أكتر. انت البطل فالقصة، عيش الدور. 💅✨',
                 footerText: 'اتعملت بالعلم™، زبدة🧈، نوبات قلق😰 وسحر الأكواد✨',
                 // Error Messages
                 error_recipe_display: 'لا مؤاخذة! 😵‍💫 معرفتش أعرض الوصفة.',
                 error_recipe_calculation: 'الحسابات صعبة 🫠 فشلت في حساب الوصفة.',
                 error_missing_steps: 'يا نهار أبيض، الخطوات ضاعت؟ بلغ الباشمهندس يمكن؟ 🤷‍♂️',
                 error_try_again: 'جرب تعمل ريفريش أو تختار تاني كدا؟',
            }
        };

        // --- Helper Functions ---

        /**
         * Get translation string for the current language.
         * @param {string} key - The key for the language string.
         * @returns {string} The translated string or the key itself if not found.
         */
        const T = (key) => langStrings[state.currentLanguage]?.[key] || key;

        /**
         * Shows a warning message.
         * @param {string} messageKey - The language string key for the warning.
         */
        const showWarning = (messageKey) => {
            DOMElements.butterWarning.textContent = T(messageKey);
            DOMElements.butterWarning.style.display = 'block';
            // Optional: Scroll to the input field if it's far away
            // DOMElements.butterAmountInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            DOMElements.butterAmountInput.focus(); // Focus input for correction
        };

        /**
         * Hides the warning message.
         */
        const hideWarning = () => {
            DOMElements.butterWarning.style.display = 'none';
        };

        /**
         * Validates butter input and returns amount in grams.
         * @returns {number} Butter amount in grams, or 0 if invalid.
         */
        function getValidatedButterGrams() {
            hideWarning(); // Hide previous warnings
            const amount = parseFloat(DOMElements.butterAmountInput.value);
            const unit = DOMElements.butterUnitSelect.value;

            if (isNaN(amount) || amount <= 0) {
                showWarning('butterWarning');
                return 0;
            }

            let grams = (unit === 'cups') ? amount * CONFIG.GRAMS_PER_CUP_BUTTER : amount;

            if (grams < CONFIG.MIN_BUTTER_GRAMS) {
                showWarning('butterWarning');
                return 0;
            }

            return grams;
        }

        /**
         * Calculates the scaled recipe based on butter input and cookie type.
         * @param {number} butterInGrams - User's butter input in grams.
         * @param {string} cookieType - 'classic', 'thick', or 'thin'.
         * @returns {object|null} Scaled recipe data or null if invalid type.
         */
        function calculateScaledRecipe(butterInGrams, cookieType) {
            const base = baseRecipes[cookieType];
            if (!base || !base.baseButter || base.baseButter <= 0 || typeof base.ingredients !== 'object') {
                console.error(`Invalid or incomplete base recipe for type: ${cookieType}`);
                return null;
            }

            const scalingFactor = butterInGrams / base.baseButter;
            const scaledIngredients = {};
            let totalDoughWeight = 0;

            for (const key in base.ingredients) {
                // Ensure the base ingredient structure is valid
                if (!Array.isArray(base.ingredients[key]) || base.ingredients[key].length < 2 || typeof base.ingredients[key][0] !== 'number') {
                     console.warn(`Skipping invalid ingredient format in base recipe: ${cookieType}.${key}`);
                     continue;
                }
                const ingredientGrams = base.ingredients[key][0] * scalingFactor;
                scaledIngredients[key] = {
                    grams: ingredientGrams,
                    unitType: base.ingredients[key][1]
                };
                totalDoughWeight += ingredientGrams; // Sum grams for thick yield calc
            }

            let yieldValue;
            if (cookieType === 'thick' && base.cookieSizeGrams && base.cookieSizeGrams > 0) {
                // Yield based on target weight for thick cookies
                yieldValue = Math.max(1, Math.round(totalDoughWeight / base.cookieSizeGrams)); // Ensure at least 1
            } else if (base.yieldPerBase && typeof base.yieldPerBase === 'number') {
                // Yield based on base recipe yield estimate
                yieldValue = Math.max(1, Math.round(base.yieldPerBase * scalingFactor)); // Ensure at least 1
            } else {
                 console.warn(`Missing or invalid yield information for cookie type: ${cookieType}. Defaulting yield to 0.`);
                yieldValue = 0; // Default if no yield info
            }

            return {
                ingredients: scaledIngredients,
                yield: yieldValue,
                notesKey: base.notes,
                stepsKey: base.steps,
                prepTechKeys: Array.isArray(base.prepTech) ? base.prepTech : [], // Ensure it's an array
                isThick: cookieType === 'thick'
            };
        }

        /**
         * Converts grams to a human-readable Imperial approximation (cups, tsp, etc.).
         * Improved fraction handling and formatting.
         * @param {number} grams - Amount in grams.
         * @param {string} unitType - Type of ingredient ('flour', 'sugar', 'salt', etc.).
         * @returns {string} Formatted Imperial string.
         */
        function formatImperial(grams, unitType) {
            // Helper for formatting fractions
            const formatFraction = (decimal) => {
                const tolerance = 0.08; // Allow slight variation for common fractions
                 if (Math.abs(decimal) < 0.05) return ''; // Ignore tiny fractions below ~1/16
                 if (Math.abs(decimal - 1/8) < tolerance) return '⅛';
                 if (Math.abs(decimal - 1/4) < tolerance) return '¼';
                 if (Math.abs(decimal - 1/3) < tolerance) return '⅓';
                 if (Math.abs(decimal - 3/8) < tolerance) return '⅜';
                 if (Math.abs(decimal - 1/2) < tolerance) return '½';
                 if (Math.abs(decimal - 5/8) < tolerance) return '⅝';
                 if (Math.abs(decimal - 2/3) < tolerance) return '⅔';
                 if (Math.abs(decimal - 3/4) < tolerance) return '¾';
                 if (Math.abs(decimal - 7/8) < tolerance) return '⅞';
                 // Fallback for less common fractions (e.g., 1/5, 1/6) - show decimal if no close match
                 return decimal.toFixed(1); // e.g., "0.2" instead of trying odd fractions
            };

             // Helper to format whole numbers and fractions
            const formatMixedNumber = (value, unitSingular, unitPlural) => {
                 if (value < 0.05 && (unitSingular.includes('tsp') || unitSingular.includes('Tbsp'))) return `~pinch ${unitSingular.split(' ')[1] || ''}`.trim();
                 if (value < 0.01) return `0 ${unitPlural}`; // If essentially zero

                 const whole = Math.floor(value + 0.01); // Add small epsilon for rounding near whole numbers
                 const fractional = value - whole;
                 let amountStr = "";

                 if (whole > 0) {
                     amountStr += `${whole}`;
                 }

                 const fractionStr = formatFraction(fractional);

                // Only add fraction string if it's meaningful and not just a fallback decimal '0.0'
                if (fractionStr && fractionStr !== '0.0') {
                    if (whole > 0 && fractionStr.length > 0) amountStr += " "; // Space between whole and fraction
                     amountStr += fractionStr;
                 }

                 if (amountStr === "") { // Case where it's purely fractional (less than 1)
                     amountStr = formatFraction(value);
                      if (!amountStr || amountStr === '0.0') { // Handle cases that resolve to nothing or 0.0 fractionally
                        // Decide if pinch is appropriate based on unit type (small volumes)
                        if (value < 0.1 && (unitSingular.includes('tsp') || unitSingular.includes('Tbsp'))) {
                             return `~pinch ${unitSingular.split(' ')[1] || ''}`.trim();
                         } else {
                            return `${value.toFixed(1)} ${unitPlural}`; // Show small decimal for larger units
                         }
                      }
                 }

                // Pluralization based on whether the value is effectively > 1
                 const unit = Math.abs(value - 1) < 0.05 ? unitSingular : unitPlural; // Use singular if value is very close to 1

                return `${amountStr} ${unit}`;
             };

            // Use CONFIG constants for conversions
             switch (unitType) {
                case 'butter':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_BUTTER, 'cup butter', 'cups butter');
                 case 'sugar': // Covers granulatedSugar, lightBrownSugar implicitly if base recipe uses 'sugar' type
                 case 'granulatedSugar':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_GRAN_SUGAR, 'cup sugar', 'cups sugar');
                case 'lightBrownSugar':
                     return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_BROWN_SUGAR, 'cup brown sugar', 'cups brown sugar');
                 case 'flour':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_FLOUR, 'cup flour', 'cups flour');
                case 'chocolate':
                     const cupsChoc = grams / CONFIG.GRAMS_PER_CUP_CHOC_CHIPS;
                     // If less than ~1/4 cup, consider showing Tbsp (approx 16 Tbsp/cup)
                     if (cupsChoc < 0.25 && cupsChoc > 0.02) {
                         const tbspChoc = cupsChoc * 16;
                         return formatMixedNumber(tbspChoc, 'Tbsp choc', 'Tbsp choc');
                     }
                    return formatMixedNumber(cupsChoc, 'cup choc chips', 'cups choc chips');
                case 'salt':
                     return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_SALT, 'tsp salt', 'tsps salt');
                 case 'bakingSoda':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_BAKING_SODA, 'tsp baking soda', 'tsps baking soda');
                 case 'bakingPowder':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_BAKING_POWDER, 'tsp baking powder', 'tsps baking powder');
                 case 'vanilla':
                     return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_VANILLA, 'tsp vanilla', 'tsps vanilla');
                 case 'prepWater': // Treat water/milk hydration similarly (approx 5g/tsp)
                     return formatMixedNumber(grams / 4.9, 'tsp water/milk', 'tsps water/milk');
                 case 'milkPowder':
                    const tbspMilk = grams / CONFIG.GRAMS_PER_TBSP_MILK_POWDER;
                     return formatMixedNumber(tbspMilk, 'Tbsp milk powder', 'Tbsp milk powder'); // Always Tbsp
                 case 'egg':
                    // Calculate number of eggs, ensuring at least 1 if grams > 0, handle pluralization
                     const numEggs = Math.max(grams > 0 ? 1 : 0, Math.round(grams / CONFIG.GRAMS_PER_LARGE_EGG));
                    return `${numEggs} large ${numEggs === 1 ? 'egg' : 'eggs'}`;
                 default:
                     console.warn("Unknown unitType for Imperial formatting:", unitType, "- defaulting to grams.");
                     return `${Math.round(grams)} g`; // Fallback to grams if type is unknown
             }
        }


        /**
         * Formats an ingredient amount for display based on language and unit system.
         * @param {number} grams - Ingredient amount in grams.
         * @param {string} unitType - Type of ingredient ('flour', 'sugar', etc.).
         * @returns {string} HTML formatted string for the amount.
         */
        function formatIngredientAmount(grams, unitType) {
             // Always calculate metric for primary display or AR display
             const metricAmount = Math.round(grams);
             let metricText;

             if (metricAmount === 0 && grams > 0.1) { // Handle small amounts that round to 0 but are present
                 metricText = `~<1 ${T('grams')}`; // Indicate a small amount
             } else if (metricAmount === 0 && grams <= 0.1) {
                 metricText = `0 ${T('grams')}`; // Show 0 if truly negligible or zero
             } else {
                 metricText = `${metricAmount} ${T('grams')}`;
             }


            if (state.currentLanguage === 'en') {
                 if (state.currentUnitSystemEN === 'metric') {
                    return metricText;
                 } else {
                    // Convert to imperial ONLY for display if selected
                     return formatImperial(grams, unitType);
                 }
            } else { // Arabic - Always show grams, add cups optionally IF relevant
                let cupsText = '';
                const cupTypes = ['butter', 'sugar', 'flour', 'chocolate', 'granulatedSugar', 'lightBrownSugar'];
                 if (cupTypes.includes(unitType)) {
                    const cupEq =
                        unitType === 'butter' ? CONFIG.GRAMS_PER_CUP_BUTTER :
                        unitType === 'flour' ? CONFIG.GRAMS_PER_CUP_FLOUR :
                        unitType === 'granulatedSugar' ? CONFIG.GRAMS_PER_CUP_GRAN_SUGAR :
                        unitType === 'lightBrownSugar' ? CONFIG.GRAMS_PER_CUP_BROWN_SUGAR :
                         unitType === 'chocolate' ? CONFIG.GRAMS_PER_CUP_CHOC_CHIPS :
                         CONFIG.GRAMS_PER_CUP_GRAN_SUGAR; // Fallback just in case

                    if (cupEq > 0) { // Avoid division by zero
                        const cupsValue = (grams / cupEq);
                         // Only show cups if it's a reasonable amount (e.g., >= ~1/8 cup)
                         if (cupsValue >= 0.1) {
                             // Use formatImperial's logic (via formatMixedNumber) for consistent fraction formatting
                             const cupsFormatted = formatMixedNumber(cupsValue, T('cups'), T('cups')); // Get "X cups" string
                             // Extract the amount part (remove the unit word "cups")
                             const cupAmountStr = cupsFormatted.replace(T('cups'), '').trim();

                            if (cupAmountStr && !cupAmountStr.startsWith('~pinch') && cupAmountStr !== '0') { // Don't show pinch or zero as cups
                                cupsText = ` <span class="unit-cups">(${cupAmountStr} ${T('cups')})</span>`;
                             }
                        }
                    }
                 }
                 // Prioritize showing Grams clearly in AR, append optional cups
                 return `<span class="unit-g">${metricText}</span>${cupsText}`;
            }
        }

        /**
         * Renders the calculated recipe into the DOM.
         * @param {object} recipeData - The scaled recipe object from calculateScaledRecipe.
         */
        function displayRecipe(recipeData) {
             if (!recipeData || typeof recipeData.ingredients !== 'object') {
                console.error("Cannot display recipe: recipeData is null or invalid.");
                 // Show user friendly error
                 DOMElements.recipeContent.innerHTML = `<h2 class="warning">${T('error_recipe_display')}</h2> <p>${T('error_try_again')}</p>`;
                 DOMElements.recipeDisplaySection.style.display = 'block';
                 DOMElements.recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 return;
             }

            // --- Get Translated Texts ---
            const cookieName = T(`${state.selectedCookieType}Title`);
             const yieldNum = recipeData.yield;
            let yieldLabelKey = yieldNum === 1 ? 'cookie' : 'cookies'; // Default
            if (state.selectedCookieType === 'thick') {
                yieldLabelKey = yieldNum === 1 ? 'largeCookie' : 'largeCookies';
             }
            const yieldText = `${yieldNum} ${T(yieldLabelKey)}`;
            const recipeTitleText = T('recipeTitle').replace('{cookieName}', cookieName);
            const approxYieldText = T('approxYield');
            const ingredientsTitleText = T('ingredientsTitle');
            const prepTitleText = T('prepTitle');
            const stepsTitleText = T('stepsTitle');
            const proTipsTitleText = T('proTipsTitle');


            // --- Build Ingredients List (More Safely) ---
            const ingredientsList = document.createElement('ul');
             Object.entries(recipeData.ingredients).forEach(([key, item]) => {
                const ingredientNameText = T(key) || key; // Get translated name text (fallback to key)
                const formattedAmountHtml = formatIngredientAmount(item.grams, item.unitType); // Get amount HTML

                const li = document.createElement('li');
                const strong = document.createElement('strong');
                strong.innerHTML = formattedAmountHtml; // Amount might have HTML spans
                li.appendChild(strong);
                 // Append name as a text node for safety after the strong tag
                 li.appendChild(document.createTextNode(` ${ingredientNameText}`));
                 ingredientsList.appendChild(li);
            });

            // --- Build Prep Techniques HTML ---
            let prepTechHtml = `<h3 class="prep-tech-title">${prepTitleText}</h3>`;
            if (recipeData.prepTechKeys && recipeData.prepTechKeys.length > 0) {
                 recipeData.prepTechKeys.forEach(key => {
                     const titleKey = `prepTechTitle_${key}`;
                     const descKey = `prepTechDesc_${key}`;
                     const titleText = T(titleKey);
                     const descText = T(descKey);
                     // Check BOTH title and description exist and were translated
                     if (titleText !== titleKey && descText !== descKey) {
                         prepTechHtml += `
                            <div class="pro-tip note">
                                <h4>${titleText}</h4>
                                <p>${descText}</p> {/* Assuming descText may contain <br> etc */}
                            </div>`;
                     } else {
                         console.warn(`Missing translation for prep technique title or desc: ${key} (Lang: ${state.currentLanguage})`);
                     }
                 });
            }


             // --- Build Steps HTML (Improved formatting resilience) ---
             let stepsHtml = `<h3 class="steps-title">${stepsTitleText}</h3><ol>`;
             const stepsString = T(recipeData.stepsKey);
             if (stepsString && stepsString !== recipeData.stepsKey) { // Check if translation exists
                 const stepsArray = stepsString.split('\n');
                 stepsArray.forEach(stepText => {
                    const trimmedStep = stepText.trim();
                     if (trimmedStep) {
                         // Basic safe formatting: Find **bold** text. Sanitize slightly.
                         let formattedStepHtml = trimmedStep
                            .replace(/^\s*\d+\.?\s*/, '') // Remove leading numbers/dots/spaces
                            .replace(/</g, "<").replace(/>/g, ">") // Basic tag sanitization
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Apply bold AFTER sanitization

                         stepsHtml += `<li>${formattedStepHtml}</li>`; // Use innerHTML because of <strong>
                     }
                 });
             } else {
                 console.warn(`Missing translation for steps: ${recipeData.stepsKey} (Lang: ${state.currentLanguage})`);
                 stepsHtml += `<li>${T('error_missing_steps')}</li>`; // Add placeholder error
             }
             stepsHtml += `</ol>`;

             // --- Build Notes HTML ---
             let notesHtml = '';
             const notesString = T(recipeData.notesKey);
             if (notesString && notesString !== recipeData.notesKey) {
                 notesHtml = `
                    <div class="pro-tip">
                        <h4>${proTipsTitleText}</h4>
                        <p>${notesString}</p> {/* Assuming notesString might have simple HTML like <br> */}
                     </div>`;
             } else {
                 console.warn(`Missing translation for notes: ${recipeData.notesKey} (Lang: ${state.currentLanguage})`);
             }

             // --- Construct final structure in the DOM ---
             // Clear previous content
             DOMElements.recipeContent.innerHTML = '';

             // Create and append elements (more robust than one innerHTML call)
             const h2 = document.createElement('h2');
             h2.textContent = recipeTitleText;
             DOMElements.recipeContent.appendChild(h2);

             const pYield = document.createElement('p');
             pYield.className = 'recipe-yield';
             pYield.textContent = `${approxYieldText} ${yieldText}`;
             DOMElements.recipeContent.appendChild(pYield);

             // Inject Prep Tech HTML (already built string)
             const prepDiv = document.createElement('div');
             prepDiv.innerHTML = prepTechHtml;
             DOMElements.recipeContent.appendChild(prepDiv);

             // Inject Ingredients Title and List
             const h3Ingredients = document.createElement('h3');
             h3Ingredients.className = 'ingredients-title';
             h3Ingredients.textContent = ingredientsTitleText;
             DOMElements.recipeContent.appendChild(h3Ingredients);
             DOMElements.recipeContent.appendChild(ingredientsList); // Append the <ul> we built

             // Inject Steps HTML (already built string)
             const stepsDiv = document.createElement('div');
             stepsDiv.innerHTML = stepsHtml;
             DOMElements.recipeContent.appendChild(stepsDiv);

             // Inject Notes HTML (already built string)
             const notesDiv = document.createElement('div');
             notesDiv.innerHTML = notesHtml;
             DOMElements.recipeContent.appendChild(notesDiv);


             // --- Show/Hide Sections AFTER updating content ---
             DOMElements.stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
             DOMElements.chocolateRecommendation.style.display = 'block';
             DOMElements.recipeDisplaySection.style.display = 'block';


             // --- Apply language updates to dynamic sections ---
             // Update static text within these revealed sections if they have data-attributes
             updateLanguageContent(DOMElements.recipeDisplaySection); // Apply to static parts within recipe display
             if (recipeData.isThick) {
                 updateLanguageContent(DOMElements.stuffedEasterEgg);
             }
             updateLanguageContent(DOMElements.chocolateRecommendation);


             // --- Smooth scroll to the displayed recipe section ---
              // Use a small delay to ensure the layout is stable before scrolling
             setTimeout(() => {
                DOMElements.recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }, 100); // 100ms delay, adjust if needed
         }


        /**
         * Updates text content based on the current language. Applies to ALL elements with data-attributes within the parent.
         * @param {Element} [parentElement=document.body] - The container element to update.
         */
         function updateLanguageContent(parentElement = document.body) {
            // Find all elements with translation data-attributes within the parent
             const elements = parentElement.querySelectorAll('[data-en], [data-ar]'); // Select elements with either attribute for broader update

            elements.forEach(el => {
                const langKey = state.currentLanguage; // 'en' or 'ar'
                 const translation = el.dataset[langKey]; // Get translation from data-* attribute

                if (translation !== undefined) {
                    // Update based on element type
                    if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
                         el.placeholder = translation;
                     } else if (el.tagName === 'OPTION') {
                         // Update option text content
                         el.textContent = translation;
                     } else if (el.tagName === 'TEXTAREA' && el.placeholder !== undefined) {
                        el.placeholder = translation;
                    } else if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'P' || el.tagName === 'SPAN' || el.tagName === 'STRONG' || el.tagName === 'DIV' || el.tagName === 'FOOTER' || el.tagName === 'LABEL' || el.tagName === 'LI') {
                         // Use innerHTML for elements that might contain child HTML (like <strong>, <br>)
                         // Ensure the translation itself is reasonably safe if allowing HTML.
                         el.innerHTML = translation;
                    } else {
                         // Fallback for other simple text elements like <title> (if targeted)
                        el.textContent = translation;
                     }
                } else {
                     // Optional: Warn if translation is missing for the *current* language
                     // console.warn(`Missing translation for lang "${langKey}" in element:`, el);
                 }
            });

             // === Update elements WITHOUT data attributes (like toggle buttons & select options) ===
             // These only need updating when the whole body is targeted
             if (parentElement === document.body) {
                // Update Language Toggle Button Text
                DOMElements.langToggleButton.textContent = T(state.currentLanguage === 'en' ? 'toggleArabic' : 'toggleEnglish');

                // Update Butter Unit Select Options text based on current language
                 const butterUnitOptions = DOMElements.butterUnitSelect.options;
                 for (let i = 0; i < butterUnitOptions.length; i++) {
                     const option = butterUnitOptions[i];
                     // The option's value ('grams' or 'cups') is used as the key for translation
                     option.textContent = T(option.value);
                 }

                 // Update Unit Toggle Button visuals (text and visibility)
                updateUnitButtonVisuals();
            }
             // === Set Page Direction ===
             // Always set direction based on current language
             DOMElements.htmlElement.setAttribute('dir', state.currentLanguage === 'ar' ? 'rtl' : 'ltr');
             DOMElements.htmlElement.setAttribute('lang', state.currentLanguage); // Also update lang attribute

             // Apply a class to the body for language-specific styling if needed
             document.body.classList.remove('lang-en', 'lang-ar');
             document.body.classList.add(`lang-${state.currentLanguage}`);
        }


        /** Updates unit toggle button text/visibility and butter select visibility based on language */
         function updateUnitButtonVisuals() {
             if (state.currentLanguage === 'en') {
                // Update EN unit toggle button text based on current EN system state
                 DOMElements.unitToggleButton.textContent = T(state.currentUnitSystemEN === 'metric' ? 'unitImperial' : 'unitMetric');
                 // Show the unit toggle button for EN
                DOMElements.unitToggleButton.style.display = 'inline-block';
                 // Hide the butter unit <select> element if EN & Imperial is selected
                 // Show it if EN & Metric is selected
                 DOMElements.butterUnitSelect.style.display = state.currentUnitSystemEN === 'imperial' ? 'none' : 'inline-block';
                 // If hiding the select, make sure the input reflects 'cups' conceptually
                 // Note: Validation always uses grams, this is just for user perception.
                 if (state.currentUnitSystemEN === 'imperial') {
                     // Maybe update placeholder or label if needed? For now, just hiding select.
                 }

             } else { // Arabic Mode
                 // ARABIC: Hide the separate Metric/Imperial toggle button entirely
                DOMElements.unitToggleButton.style.display = 'none';
                 // ARABIC: Always show the grams/cups <select> for butter input
                DOMElements.butterUnitSelect.style.display = 'inline-block';
             }
        }

         /** Handles language toggle */
         function handleLanguageToggle() {
            // 1. Toggle the language state
            state.currentLanguage = (state.currentLanguage === 'en') ? 'ar' : 'en';

            // 2. Reset EN unit system to default when switching TO English
             if (state.currentLanguage === 'en') {
                 state.currentUnitSystemEN = CONFIG.DEFAULT_UNIT_EN;
             }

             // 3. Update ALL language content on the page first based on the new state
             updateLanguageContent(); // Target document.body implicitly, which also updates button visuals

             // 4. Re-display recipe (if one is currently active) using the NEW language translations & unit formats
             if (state.selectedCookieType && state.baseButterGrams > 0) {
                const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);
                 if (scaledRecipe) {
                    // displayRecipe will now use the updated state.currentLanguage and T() helper
                    displayRecipe(scaledRecipe);
                 } else {
                    console.error("Error recalculating recipe on language toggle.");
                    // Clear or show error in recipe display area
                     DOMElements.recipeContent.innerHTML = `<h2 class="warning">${T('error_recipe_calculation')}</h2>`;
                     DOMElements.recipeDisplaySection.style.display = 'block';
                 }
             }
             // Button visuals are updated as part of updateLanguageContent() when called on body.
             console.log(`Language switched to: ${state.currentLanguage}`);
        }

        /** Handles unit system toggle (for English only) */
         function handleUnitToggle() {
            // Guard clause: This toggle only works when the language is English
            if (state.currentLanguage !== 'en') {
                 console.log("Unit toggle ignored in non-English language.");
                return;
             }

             // 1. Toggle the English unit system state
             state.currentUnitSystemEN = (state.currentUnitSystemEN === 'metric') ? 'imperial' : 'metric';
             console.log(`English unit system toggled to: ${state.currentUnitSystemEN}`);

            // 2. Update button visuals (text/visibility) & potentially the butter input select visibility
            updateUnitButtonVisuals();

             // 3. Re-display the recipe with new unit formatting IF a recipe is active
             if (state.selectedCookieType && state.baseButterGrams > 0) {
                const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);
                if (scaledRecipe) {
                    // displayRecipe uses state.currentUnitSystemEN to format amounts
                    displayRecipe(scaledRecipe);
                 } else {
                    console.error("Error recalculating recipe on unit toggle.");
                    DOMElements.recipeContent.innerHTML = `<h2 class="warning">${T('error_recipe_calculation')}</h2>`;
                     DOMElements.recipeDisplaySection.style.display = 'block';
                 }
             }
        }


        /** Handles the click on the "Start Experiment" button */
         function handleStartExperiment() {
            console.log("Start Experiment Clicked");
            const butterGrams = getValidatedButterGrams();
             if (butterGrams > 0) {
                 state.baseButterGrams = butterGrams; // Store the valid amount
                 console.log(`Base butter set to: ${state.baseButterGrams}g`);

                 // Reveal cookie selection, hide recipe sections initially
                 DOMElements.cookieSelectionSection.style.display = 'block';
                 DOMElements.recipeDisplaySection.style.display = 'none';
                 DOMElements.stuffedEasterEgg.style.display = 'none';
                 DOMElements.chocolateRecommendation.style.display = 'none';

                // Reset any previous cookie selection visual state
                 if (DOMElements.cookieOptions) { // Check if NodeList exists
                     DOMElements.cookieOptions.forEach(opt => opt.classList.remove('selected'));
                 }
                state.selectedCookieType = null; // Clear selected type state

                 // Scroll smoothly down to the selection area
                 DOMElements.cookieSelectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.log("Butter validation failed.");
                // If butterGrams is 0, the validation function already showed the warning.
            }
        }

         /** Handles clicking on a cookie type option using event delegation */
        function handleCookieSelection(event) {
            // Find the closest ancestor which is a cookie option
            const selectedOption = event.target.closest('.cookie-option');

            // If the click wasn't inside a relevant option, ignore it
             if (!selectedOption) return;

             console.log("Cookie Option Clicked:", selectedOption.dataset.cookieType);

            // Pre-condition check: Must have entered a valid butter amount first
            if (state.baseButterGrams <= 0) {
                 console.log("Butter amount not set, showing warning.");
                showWarning('butterWarning'); // Remind user to enter butter amount
                 // Scroll back up to the butter input?
                 DOMElements.butterAmountInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 return;
            }

            // Update visuals: Deselect all siblings, then select the clicked one
             if (DOMElements.cookieOptions) {
                DOMElements.cookieOptions.forEach(opt => opt.classList.remove('selected'));
             }
             selectedOption.classList.add('selected');

             // Get the selected cookie type from the data attribute
            const newCookieType = selectedOption.dataset.cookieType;
            if (!newCookieType || !baseRecipes[newCookieType]) { // Also check if type exists in recipes
                console.error("Clicked cookie option has invalid or missing 'data-cookie-type':", newCookieType);
                 // Show user friendly error maybe?
                 return;
             }
            state.selectedCookieType = newCookieType; // Update state
             console.log(`Selected cookie type: ${state.selectedCookieType}`);

            // Calculate the recipe based on stored butter amount and new type
             const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);

            // Display the recipe (or handle calculation errors)
             if (scaledRecipe) {
                 displayRecipe(scaledRecipe);
             } else {
                console.error(`Failed to calculate recipe for selected type: ${state.selectedCookieType}`);
                 // Show an error message in the recipe display area
                 DOMElements.recipeContent.innerHTML = `<h2 class="warning">${T('error_recipe_calculation')}</h2> <p>${T('error_try_again')}</p>`;
                DOMElements.recipeDisplaySection.style.display = 'block';
                 // No need to scroll here, error appears where recipe would be
             }
        }


        // --- Event Listeners ---
         console.log("Attaching event listeners...");

        if (DOMElements.startExperimentBtn) {
            DOMElements.startExperimentBtn.addEventListener('click', handleStartExperiment);
        } else { console.error("Start Experiment button not found!"); }

        // Instantly hide warning on user input/change for butter
        if (DOMElements.butterAmountInput) {
             DOMElements.butterAmountInput.addEventListener('input', hideWarning);
         }
        if (DOMElements.butterUnitSelect) {
            DOMElements.butterUnitSelect.addEventListener('change', hideWarning);
        }

        // Use event delegation for cookie selection clicks on their container
        // Make sure you have a container div with id="cookie-options-container" around your .cookie-option divs in HTML
         if (DOMElements.cookieOptionsContainer) {
            DOMElements.cookieOptionsContainer.addEventListener('click', handleCookieSelection);
         } else { console.error("Cookie options container not found for event delegation!"); }


        // Language and Unit toggle listeners
         if (DOMElements.langToggleButton) {
            DOMElements.langToggleButton.addEventListener('click', handleLanguageToggle);
         } else { console.error("Language toggle button not found!"); }

        if (DOMElements.unitToggleButton) {
             DOMElements.unitToggleButton.addEventListener('click', handleUnitToggle);
        } else { console.error("Unit toggle button not found!"); }


        // --- Initial Page Setup ---
         console.log("Running initial setup...");
         updateLanguageContent(); // Apply initial language texts and button states based on default state
         console.log("Gen Z Cookie Calculator Initialized successfully! ✨");

    }); // End DOMContentLoaded

 }()); // End IIFE
// --- END OF REFINED SCRIPT ---
