document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const butterAmountInput = document.getElementById('butter-amount');
    const butterUnitSelect = document.getElementById('butter-unit');
    const startExperimentBtn = document.getElementById('start-experiment-btn');
    const butterWarning = document.getElementById('butter-warning');
    const cookieSelectionSection = document.getElementById('cookie-selection-section');
    const recipeDisplaySection = document.getElementById('recipe-display-section');
    const recipeContent = document.getElementById('recipe-content');
    const cookieOptions = document.querySelectorAll('.cookie-option');
    const stuffedEasterEgg = document.getElementById('stuffed-easter-egg');
    const chocolateRecommendation = document.getElementById('chocolate-recommendation');
    const langToggleButton = document.getElementById('lang-toggle');
    const unitToggleButton = document.getElementById('unit-toggle');
    const htmlElement = document.documentElement;

    // --- State Variables ---
    let currentLanguage = 'en';
    let currentUnitSystem = 'metric'; // 'metric' or 'imperial' for EN, 'grams' or 'cups' for AR
    let baseButterGrams = 0; // User's input converted to grams
    let selectedCookieType = null;

    // --- Constants ---
    const GRAMS_PER_CUP_BUTTER = 226.8; // Standard density
    const GRAMS_PER_CUP_FLOUR = 125; // Average AP flour
    const GRAMS_PER_CUP_GRAN_SUGAR = 200;
    const GRAMS_PER_CUP_BROWN_SUGAR = 213; // Packed
    const GRAMS_PER_TSP_SALT = 6;
    const GRAMS_PER_TSP_BAKING_SODA = 4.8;
    const GRAMS_PER_TSP_BAKING_POWDER = 4;
    const GRAMS_PER_LARGE_EGG = 50; // Average weight without shell
    const GRAMS_PER_TSP_VANILLA = 4.2;
    const GRAMS_PER_CUP_CHOC_CHIPS = 170; // Approx
    const GRAMS_PER_TBSP_MILK_POWDER = 7; // Approx Non-Fat Dry Milk

    // --- Base Recipes (Based on OCR Text - Using 284g butter base where specified) ---
    // All base amounts in GRAMS for easy scaling
    const baseRecipes = {
        classic: {
            baseButter: 284, // From OCR Text
            yieldPerBase: 30, // Approx. yield for 284g butter recipe
            ingredients: {
                // Name: [Base Grams, Unit Type for Conversion]
                granulatedSugar: [200, 'sugar'],
                lightBrownSugar: [200, 'sugar'],
                largeEggs: [100, 'egg'], // 2 eggs
                vanillaExtract: [8.4, 'vanilla'], // 2 tsp
                allPurposeFlour: [420, 'flour'],
                tableSalt: [6, 'salt'], // 1 tsp
                bakingPowder: [4, 'bakingPowder'], // 1 tsp
                bakingSoda: [2.4, 'bakingSoda'], // 1/2 tsp
                chocolateChips: [454, 'chocolate'],
                prepWater: [9.4, 'water'] // ~2 tsp per 284g base butter for hydration
            },
            notes: 'classicNotes', // Key for language strings
            prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick'],
            steps: 'classicSteps'
        },
        thick: {
            baseButter: 284, // From OCR Text
            yieldPerBase: 10, // Approx. yield for LARGE cookies
            cookieSizeGrams: 140, // Approx size per cookie (4-6oz)
            ingredients: {
                granulatedSugar: [100, 'sugar'],
                lightBrownSugar: [200, 'sugar'],
                toastedMilkPowder: [15, 'milkPowder'], // ~2.5 Tbsp
                largeEggs: [100, 'egg'], // 2 eggs
                vanillaExtract: [8.4, 'vanilla'], // 2 tsp
                allPurposeFlour: [420, 'flour'],
                tableSalt: [6, 'salt'], // 1 tsp
                bakingPowder: [5, 'bakingPowder'], // 1 1/4 tsp (OCR says 1 1/4 tsp)
                // NO Baking Soda
                chocolateChips: [567, 'chocolate'],
                prepWater: [9.4, 'water'] // ~2 tsp hydration
            },
            notes: 'thickNotes',
            prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick', 'toastMilkPowder'],
            steps: 'thickSteps'
        },
        thin: {
            baseButter: 284, // From OCR Text
            yieldPerBase: 42, // Approx. yield for 284g butter recipe
            ingredients: {
                granulatedSugar: [300, 'sugar'], // High granulated
                lightBrownSugar: [200, 'sugar'],
                largeEggs: [100, 'egg'], // 2 eggs
                vanillaExtract: [8.4, 'vanilla'], // 2 tsp
                allPurposeFlour: [420, 'flour'],
                tableSalt: [6, 'salt'], // 1 tsp
                bakingSoda: [7.2, 'bakingSoda'], // 1 1/2 tsp (High soda)
                // NO Baking Powder
                chocolateChips: [340, 'chocolate'], // Less chocolate, mini/chopped
                prepWater: [9.4, 'water'] // ~2 tsp hydration (can be debated for thin, but keeping consistent with OCR hydr.)
            },
            notes: 'thinNotes',
            prepTech: ['brownButter', 'hydrateButter', 'chillButterThin'], // Specific chilling for reverse cream
            steps: 'thinSteps'
        }
    };

    // --- Language Strings ---
    const langStrings = {
        en: {
            // Toggles & Units
            toggleArabic: 'عربي',
            toggleEnglish: 'English',
            unitMetric: 'Switch to Imperial (cups, tsp)',
            unitImperial: 'Switch to Metric (g, ml)',
            unitGrams: 'Grams (g)',
            unitCups: 'Cups (cups)',
            // Butter Input
            egg: 'egg',
            eggs: 'eggs',
            butterVarTitle: 'Step 1: Butter Up! 🧈',
            butterVarDesc: 'Great cookies need the perfect amount of butter. So, how much of this golden goodness are you using? Be precise, chef! 👩‍🍳',
            grams: 'grams',
            cups: 'cups',
            butterWarning: 'Yo, enter a valid butter amount (at least 100g or about 1/2 cup). Don’t leave me hanging! 🙃',
            beginExperiment: 'Let’s Bake! 🍪',
            // Cookie Selection
            phenotypeTitle: 'Step 2: Pick Your Cookie Vibe 🍪',
            phenotypeDesc: 'What kind of cookie are you feeling today? Choose your adventure:',
            thinTitle: 'The Crispy AF Cracker',
            thinDesc: 'So thin, it’s basically a cookie flex. Perfect for dunking or just flexing on your friends. 😎',
            classicTitle: 'The OG Balanced Baddie',
            classicDesc: 'Chewy, crispy, and always down to party. The crowd-pleaser that never misses. 🎉',
            thickTitle: 'The Thicc King',
            thickDesc: 'So gooey, it’ll make your taste buds do a happy dance. Pure indulgence, no cap. 💃',
            // Recipe Display
            recipeTitle: '{cookieName} Recipe',
            prepTitle: 'Prep Like a Pro',
            ingredientsTitle: 'Your Cookie Blueprint 🗺️',
            approxYield: 'You’ll get roughly',
            cookies: 'cookies',
            cookie: 'cookie',
            largeCookies: 'large cookies',
            largeCookie: 'large cookie',
            stepsTitle: 'Let’s Bake, Bestie! 👩‍🍳',
            proTipsTitle: 'Pro Tips from Your Cookie Sensei 🧠',
            // Ingredient Names
            unsaltedButter: 'Homnemade Brown Butter 🧈',
            granulatedSugar: 'White Sugar 🍬',
            lightBrownSugar: 'Light Brown Sugar',
            toastedMilkPowder: 'Toasted Milk Powder (for that extra oomph) 🥛',
            largeEggs: 'Large Eggs (room temp, pls) 🥚',
            vanillaExtract: 'Vanilla Extract',
            allPurposeFlour: 'All-Purpose Flour',
            tableSalt: 'Salt (just a pinch) 🧂',
            bakingPowder: 'Baking Powder (fresh!)',
            bakingSoda: 'Baking Soda (fresh, duh!)',
            chocolateChips: 'Chocolate Chips/Chunks 🍫',
            prepWater: 'Water/Milk (for hydration, like your skin) 💧',
            // Prep Techniques
            prepTechTitle_brownButter: 'Browning Butter 101: Turn that butter into liquid gold! 🧈✨',
            prepTechDesc_brownButter: `the Maillard reaction is here to make your cookies slap. Melt it down, watch those milk solids get toasty, and boom—nutty, butterscotch vibes for days. 
                                       <br>1. Cut butter into pieces in a light-colored saucepan.
                                       <br>2. Melt on medium heat, it’ll foam (water evaporating). Swirl/stir gently.
                                       <br>3. Keep heating & swirling. Milk solids sink and turn golden, then nutty brown (like toasted hazelnuts). Aroma becomes intensely nutty. Takes 5-10 mins.
                                       <br>4. IMMEDIATELY pour into a heatproof bowl (including brown bits) to stop cooking. The line between brown and burnt is thin!`,
            prepTechTitle_hydrateButter: 'Optional: Hydrate Your Butter (like you should hydrate yourself) 💦',
            prepTechDesc_hydrateButter: `Browning evaporates water (~15-20% of butter). Adding a little back *after* browning but *before* chilling helps maintain dough moisture balance, potentially boosting chewiness. Stir in gently until incorporated. (Amount calculated below).`,
            prepTechTitle_chillButterClassicThick: 'Chill Factor: Solidify for Creaming (patience is key) ⏳',
            prepTechDesc_chillButterClassicThick: `Why chill? Browning melts the butter’s fat crystals, essential for creaming (trapping air with sugar for lift). We need to rebuild that structure!
                                                    <br>1. Cool browned (and maybe hydrated) butter slightly (~5-10 min).
                                                    <br>2. Refrigerate until solid but pliable – like cool modeling clay. Not rock hard! (~1-2 hours). Aim for 60-65°F (16-18°C). This state is CRITICAL for the Classic/Thick creaming method.`,
            prepTechTitle_chillButterThin: 'Chill Factor: Cool for Reverse Creaming (keep it cool, fam) ❄️',
            prepTechDesc_chillButterThin: `For Thin/Crispy using reverse creaming, we need the butter cool but still workable to coat the flour.
                                             <br>1. Cool browned (and maybe hydrated) butter to room temp then refrigerate briefly until just solidified but still easy to cut/break apart (~30-60 min). Aim for slightly firmer than room temp, around 65-68°F (18-20°C). It needs to be cool enough to coat flour particles without melting instantly.`,
            prepTechTitle_toastMilkPowder: 'Flavor Amplifier: Toast Milk Powder (extra flavor, extra flex) 🔥',
            prepTechDesc_toastMilkPowder: `Intensifies nutty/malty notes by browning milk sugars/proteins (more Maillard!). Adds depth, especially noticeable in the Thick cookie.
                                             <br>1. Spread Non-Fat Dry Milk Powder thinly on a parchment-lined sheet OR in a dry skillet.
                                             <br>2. Oven: Bake at 250°F (120°C) for 10-15 mins, stirring every 5. Skillet: Heat on medium-low, stirring CONSTANTLY.
                                             <br>3. Watch closely! It turns golden brown and fragrant quickly. Prevent burning.
                                             <br>4. Cool completely before using.`,
            // Notes & Steps
            classicNotes: `Classic balance relies on the 1:1 sugar ratio, combined leavening for moderate lift/spread, and PERFECT creaming. Don’t skimp on chilling or creaming time! Butter temp (60-65°F) is non-negotiable. Trust the process, it’s worth it. 🙌`,
            classicSteps: `   **Prep:** Whisk flour, salt, baking powder, soda. Line baking sheets. Ensure butter is chilled pliable (60-65°F), eggs room temp.
                              **Cream:** Beat chilled brown butter & sugars on med-high speed for a FULL 5 mins until light, fluffy, increased volume (this is key!). Scrape bowl.
                              **Add Wet:** Low speed. Add eggs one by one, mixing *just* until combined. Mix in vanilla with last egg. Don’t overmix!
                              **Add Dry:** Lowest speed. Add flour mix gradually, mixing *only* until streaks disappear. Finish by hand if needed to avoid toughness.
                              **Fold:** Gently fold in chocolate chips with a spatula.
                              **Chill (Recommended):** Cover dough, refrigerate 30-60 mins minimum (up to 48 hrs for deeper flavor). Solidifies fat, hydrates flour.
                              **Scoop & Bake:** Preheat 375°F (190°C). Scoop ~2 Tbsp balls onto sheets, 2 inches apart. Bake 10-12 mins, until edges golden, center soft/puffy. Rotate sheet halfway.
                              **Cool:** Cool on sheet 3-5 mins (critical setting time!), then transfer to wire rack.`,
            thickNotes: `Thickness demands fighting spread! High brown sugar, NO soda, MANDATORY long chill are key. Moderate creaming prevents collapse. Toasted milk powder adds nutty depth and subtle chew. Embrace the underbake for ultimate goo!`,
            thickSteps: `   **Prep:** Whisk flour, toasted milk powder, salt, baking powder. Line sheets. Ensure butter chilled pliable (60-65°F), eggs room temp.
                            **Cream (Moderately):** Beat chilled brown butter & sugars on medium speed ~2-3 mins until combined and creamy (NOT super light/fluffy like classic). Scrape bowl. Avoid over-aerating.
                            **Add Wet:** Low speed. Add eggs one by one, just until combined. Mix in vanilla.
                            **Add Dry:** Lowest speed. Add flour mix in 4-5 additions, mixing until *almost* combined (few streaks ok). Minimizes gluten.
                            **Fold:** Add massive amount of chocolate. Use sturdy spatula/hands to fold, incorporating final flour bits. Dough will be THICK. Do not overmix.
                            **MANDATORY Chill:** Divide dough into LARGE balls (4-6 oz / 113-170g each). Roll tall. Wrap tightly. Refrigerate MINIMUM 4 hours, ideally 12-72 hours. DO NOT SKIP/SHORTEN.
                            **Bake COLD:** Preheat 350°F (180°C). Place COLD dough balls far apart on sheet. Do NOT flatten. Bake 18-25 mins (depends on size). Edges set, center very soft, slightly gooey, maybe underbaked. (Internal temp 175-185°F / 79-85°C is a good target). Rotate sheet halfway.
                            **Cool CAREFULLY:** Cool on sheet 10-15 MINUTES. They are delicate! Transfer gently to wire rack. Best enjoyed warm (but not molten hot!).`,
            thinNotes: `Crispiness = Maximum Spread + Minimum Gluten. High granulated sugar, high baking soda (alkalinity boosts browning/spread), and reverse creaming (coats flour with fat first) are crucial. NO chilling! Bake thoroughly.`,
            thinSteps: `   **Prep:** Line sheets. Ensure butter is cool but pliable (65-68°F / 18-20°C), cut into small pieces. Eggs room temp. Whisk eggs & vanilla in small bowl.
                           **Reverse Cream:** In mixer bowl, combine flour, sugars, salt, baking soda. Mix briefly. Add cool butter pieces. Mix on low until mixture resembles coarse, damp sand/crumbs (butter worked in, coating flour). Takes a few mins.
                           **Combine Wet/Dry:** Mixer on low. Gradually stream in egg/vanilla mixture. Mix *only* until a cohesive-parole dough just forms. It might look crumbly first. DO NOT OVERMIX. Tenderness is key.
                           **Fold:** Gently fold in finely chopped chocolate or mini chips with spatula. Minimal strokes.
                           **Scoop & Bake IMMEDIATELY:** Do NOT chill! Preheat 350°F (175°C). Scoop small portions (~1 Tbsp) onto sheets, leaving PLENTY of space (3+ inches) – they spread a LOT!
                           **Bake for Crispness:** Bake 12-16 mins until spread thin and uniformly golden brown edge-to-center. May look slightly puffy in middle but will flatten on cooling. Rotate sheet halfway. Slight overbaking is OK for crispness.
                           **Cool COMPLETELY:** Cool on sheet 5-10 mins until firm enough to move. Transfer to wire rack to cool completely. Full crispness develops upon cooling as sugars recrystallize.`,
            // Easter Egg & Recs
            stuffedTitle: 'YOU UNLOCKED THE SECRET SAUCE! 🎉',
            stuffedCongrats: 'Congrats, Legend! Choosing the Thick & Gooey path reveals ultimate potential. You can STUFF these behemoths!',
            stuffedHowTo: 'How? Flatten a dough ball slightly, make a dent, add ~1 tsp of Nutella or Pistachio Spread, wrap the dough around it, seal, and bake as directed (maybe add 1-2 min).',
            pistachioTipTitle: 'Pro Pistachio Recommendation:',
            pistachioTipDesc: 'Forget watery imitations! For that INTENSE, straight-up pistachio flavour that tastes like liquid gold, I HIGHLY recommend "ASM Foods Pistachio Cream". It’s ridiculously good. Seriously.',
            pistachioTipLink: 'Check it out here (Egypt Link)',
            chocoTipTitle: 'Chocolate Chip Science:',
            chocoTipDesc: 'Not all chocolate chips are created equal! For that melt-in-your-mouth, nostalgic flavour reminiscent of the good stuff (like Galaxy/Dairy Milk, but BETTER because #Boycott!), hunt down "Dropsy" MILK Chocolate. It’s the sweet secret weapon.',
            chocoTipLink: 'Find them via suppliers like this (Facebook Link)',
            chocoTipMilk: 'Make SURE it’s the MILK chocolate version for maximum deliciousness!',
            // Conclusion
            conclusionTitle: 'Experiment Complete! 🎉',
            conclusionDesc: 'Hypothesis confirmed: Brown butter cookies are superior. If you documented your delicious results, share the evidence!',
            conclusionTag: 'Tag me on Instagram:',
            conclusionGoForth: 'Go forth and bake scientifically!',
            footerText: 'Built with science, butter, and a little bit of code.'
        },
        ar: {
            // Toggles & Units
            toggleArabic: 'عربي',
toggleEnglish: 'English',
unitMetric: 'حوّل للمتري (جم، مل)',
unitImperial: 'حوّل للإمبريالي (كوب، معلقة)',
unitGrams: 'جم (g)',
unitCups: 'كوب (cups)',

// Butter Input
butterVarTitle: 'أول خطوة: الزبدة عالساحة! 🧈',
butterVarDesc: 'الكوكيز الجامدة بتبدأ بزبدة مظبوطة. يعني هتستخدم قد إيه من الدهب السايل ده؟ ما تبخلش، وكن دقيق يا شيف! 👨‍🍳',
grams: 'جرام',
cups: 'كوب',
butterWarning: 'لأ كده ما ينفعش، لازم تدخل كمية زبدة مظبوطة (مش أقل من ١٠٠ جرام أو نص كوب تقريبًا). مش هسيبك تهرب كده! 🙃',
beginExperiment: 'يلا بينا نخبز! 🍪',

// Cookie Selection
phenotypeTitle: 'تاني خطوة: اختار مود الكوكيز بتاعك 🍪',
phenotypeDesc: 'النهارده نفسك في كوكيز عاملة إزاي؟ اختار الطريق اللي على مزاجك:',
thinTitle: 'رفيعة ومقرمشة عالآخر',
thinDesc: 'كأنها شيت من الكوكيز، مقرمشة وبتتكسر بصوت! جامدة للتغميس أو تتفشخر بيها قدام صحابك. 😎',
classicTitle: 'الكلاسيكية اللي الكل بيحبها',
classicDesc: 'طريّة ومقرمشة في نفس الوقت، دايمًا في الموود لأي حفلة. المفضلة للجميع! 🎉',
thickTitle: 'السميكة الجامدة 💪',
thickDesc: 'طرية ولزجة من جوه، بتخلي حاسة التذوق عندك تعمل حفلة. متعة صريحة من غير أي كدب. 💃',

// Recipe Display
recipeTitle: 'وصفة {cookieName}',
prepTitle: 'حضّرها زي الشيفات',
ingredientsTitle: 'المكونات بتاعتك 🗺️',
approxYield: 'هتعمل تقريبًا',
cookies: 'كوكيز',
cookie: 'كوكي',
largeCookies: 'كوكيز كبيرة',
largeCookie: 'كوكي كبيرة',
stepsTitle: 'يلا نخش على الجد 👩‍🍳',
proTipsTitle: 'نصايح من نينجا الكوكيز بتاعك 🧠',

// Ingredient Names
unsaltedButter: 'زبدة بدون ملح',
granulatedSugar: 'سكر عادي',
lightBrownSugar: 'سكر بني فاتح',
egg: 'بيضة',
eggs: 'بيض',
toastedMilkPowder: 'بودرة حليب متحمصة',
largeEggs: 'بيض كبير (بدرجة حرارة الغرفة لو سمحت) 🥚',
vanillaExtract: 'فانيليا سايلة',
allPurposeFlour: 'دقيق عادي متعدد الاستخدام',
tableSalt: 'رشة ملح',
bakingPowder: 'بيكنج بودر',
bakingSoda: 'بيكنج صودا',
chocolateChips: 'شوكولاتة مقطعة (كل ما زادت، أحلى)',
prepWater: 'شوية ميه أو لبن (عشان الترطيب يا ناعم 💧)',

// Prep Techniques
prepTechTitle_brownButter: 'زبدة محمصة 101: خلّيها دهب! 🧈✨',
prepTechDesc_brownButter: `تفاعل ميلارد مش بس للستيك، ده بيخلي الزبدة تطلع نكهات بتخبط في المخ! دوب الزبدة وشوف السحر:
<br>١. قطّع الزبدة وحطها في حلة لونها فاتح.
<br>٢. سيحها على نار متوسطة. هتبدأ ترغى (المية بتتبخر). قلّب أو لفّ الحلة.
<br>٣. كمّل تقليب وتسخين. هتلاقي رواسب اللبن بدأت تتحمص وتاخد لون دهبي ثم بني كأنها بندق محمص. الريحة؟ خرافية. بياخد من ٥ لـ ١٠ دقايق.
<br>٤. أول ما يبقى لونها مظبوط، صبها فورًا في طبق حراري (بكل الرواسب البنية دي) عشان توقف التسوية. لو استنيت زيادة، هتتحرق.`,

prepTechTitle_hydrateButter: 'اختياري: رجّع شوية رطوبة للزبدة 💦',
prepTechDesc_hydrateButter: `لما بنحمّر الزبدة، شوية مية بيطيروا (حوالي ١٥-٢٠٪). ممكن نرجّع شوية مية أو لبن بعد التحمير وقبل ما تبرد، عشان العجينة تفضل مظبوطة. قلبهم كويس مع الزبدة وخلاص. الكمية محسوبة ومكتوبة تحت.`,

prepTechTitle_chillButterClassicThick: 'تبريد الزبدة: عشان الخفق يشتغل ⏳',
prepTechDesc_chillButterClassicThick: `ليه بنبرد؟ لأن الزبدة وهي سايحة مش هتخفق كويس مع السكر. لازم نبني الهيكل من تاني!
<br>١. سيب الزبدة تبرد شوية (٥-١٠ دقايق).
<br>٢. بعدين حطها في التلاجة لحد ما تبقى نشفة بس لينة، كأنها صلصال بارد. مش حجر! (بياخد حوالي ١-٢ ساعة). خليها حوالي ١٦-١٨ درجة مئوية.`,

prepTechTitle_chillButterThin: 'تبريد للكوكيز الرفيعة: لازم تكون باردة بس لسه طرية ❄️',
prepTechDesc_chillButterThin: `لو هتعمل كوكيز رفيعة بخفق عكسي، الزبدة لازم تكون باردة ومش سايحة، عشان تغلف الدقيق.
<br>١. بعد التحمير (ولو زوّدنا شوية رطوبة)، سيبها تهدى لحرارة الغرفة، وبعدين حطها في التلاجة شوية.
<br>٢. الهدف إنها تبقى متماسكة بس سهلة التقطيع أو الكسر. حوالي ٣٠-٦٠ دقيقة في التلاجة. عايزينها تكون حوالي ١٨-٢٠ درجة مئوية.`,

prepTechTitle_toastMilkPowder: 'سوبر باور: حمس بودرة الحليب 🔥',
prepTechDesc_toastMilkPowder: `بتزود نكهة الكوكيز وتديها طعم جوزي ومالتي كده، خصوصًا في السميكة. تفاعل ميلارد بيشتغل هنا برضو!
<br>١. افرد بودرة الحليب بطبقة خفيفة على صينية عليها ورق زبدة أو في طاسة ناشفة.
<br>٢. في الفرن: ١٢٠ درجة مئوية لـ ١٠-١٥ دقيقة، وقلّب كل شوية. في الطاسة: نار هادية وقلب باستمرار.
<br>٣. خلي عينك عليها! هتتحمص بسرعة، ولونها يبقى دهبي وريحتها تحفة.
<br>٤. لازم تبرد تمامًا قبل ما تستخدمها.`,

            // Notes & Steps
     classicNotes: `الكوكي الكلاسيكي بيعتمد على توازن السكر 1:1، ورفع مزدوج علشان يطلع ناشف من بره وطري من جوه. أهم حاجة؟ خفق محترم وتبريد بضمير! الزبدة لازم تبقى بحرارة 16-18°م، وده قانون مش اقتراح. صدق العملية، الطعم هيخطفك! 🙌`,
classicSteps: `١. **التحضيرات:** اخلط الدقيق، الملح، البكينج باودر، والصودا. جهز صواني الخبز بورق زبدة. الزبدة تبقى مرنة وساقعة (مش سايحة)، والبيض بحرارة الغرفة.
٢. **الخفق:** اخفق الزبدة البنية المبردة مع السكر الأبيض والبني على سرعة متوسطة-عالية لمدة ٥ دقايق كاملة. هتشوفه بقى كريمي ومنفوش؟ كمل كده. اكشط الجوانب.
٣. **السوايل:** على سرعة هادية، ضيف البيض واحدة واحدة، بس لحد ما يختفي من الخليط. الفانيليا تدخل مع آخر بيضة. ما تبقاش نشيط زيادة في التقليب!
٤. **المكونات الجافة:** على أقل سرعة ممكنة، ضيف الدقيق على مراحل واخلط بس لحد ما ميظهرش الدقيق. لو حاسس الخليط تقيل، كمل باليد.
٥. **الشوكولاتة:** اقلب حبيبات الشوكولاتة برقة. مش خناقة يا معلم!
٦. **التبريد (مهم جدًا):** غطّي العجين وسيّبه في التلاجة من نص ساعة لساعة (أو لحد يومين لو عايز نكهة تاكل دماغك). التبريد بيريّح العجينة ويخليها تتشكل أحسن.
٧. **الخبز:** سخّن الفرن على 190°م. شكّل كور قد معلقتين كبار، وسيب بينهم مسافة. ادخلهم الفرن 10-12 دقيقة، ولف الصينية في النص. اطراف دهبيّة؟ ممتاز.
٨. **التبريد بعد الخبز:** سيبهم 3-5 دقايق على الصينية، بعدين انقلهم على رف عشان يبردوا ويثبتوا.`,
thickNotes: `عايز كوكي سميك؟ يبقى لازم تمنع الانتشار! سكر بني أكتر، مفيش صودا، وتبريد طويل إجباري. خفق متوسط مش جامد عشان الكوكي ما يهبطش. بودرة اللبن المحمصة بتضيف طعم غني ومضغ خفيف. وسر اللعبة؟ خبز نص سوى!`,
thickSteps: `١. **التحضيرات:** اخلط الدقيق مع بودرة اللبن المحمصة، الملح، والبكينج باودر. حضّر صواني الخبز. الزبدة لازم تكون مرنة وساقعة (16-18°م)، والبيض بحرارة الغرفة.
٢. **الخفق الهادي:** اخفق الزبدة البنية المبردة مع السكر على سرعة متوسطة لـ2-3 دقايق، لحد ما الخليط يبقى كريمي بس مش منفوش أوي. اكشط الجوانب.
٣. **السوايل:** ضيف البيض واحدة واحدة مع الفانيليا، واخلطهم على سرعة واطية. كله بس لحد ما يختفي، مش أكتر.
٤. **المكونات الجافة:** ضيف الدقيق على 4-5 مرات واخلط لحد ما الخليط يبقى شبه متجانس (لو فيه شوية خطوط دقيق، عادي).
٥. **الشوكولاتة:** ضيف كمية محترمة من الشوكولاتة وقلب بملعقة قوية أو بإيدك. العجين هيبقى تقيل جامد، بس ده المطلوب. أوعى تفرط في الخلط.
٦. **تبريد ضروري:** شكّل العجين كور كبيرة (4-6 أونصة) ولفها كويس، وسيبها في التلاجة ٤ ساعات على الأقل (الأفضل 12-72 ساعة). ما تلعبش في الوقت.
٧. **خبز مباشر من التلاجة:** سخّن الفرن على 180°م، حط الكور الباردة زي ما هي (ما تفردهاش)، وسيبها تخبز 18-25 دقيقة حسب حجمها. لازم الحروف تبقى متماسكة والوسط لازج وطري شوية. لف الصينية في النص.
٨. **تبريد بحنية:** سيبهم يهدوا على الصينية ١٠-١٥ دقيقة، وبعدين انقلهم بحذر على رف سلكي. بيتاكلوا وهما دافيين؟ الجنة!`,
thinNotes: `عايز قرمشة؟ يبقى انت في معسكر الانتشار! سكر أبيض زيادة، صودا كتير، وخفق بالعكس (يعني نحط الزبدة في الأول مع الجاف). مفيش تبريد هنا! ادخل فرن على طول.`,
thinSteps: `١. **التحضير:** حضّر الصواني. الزبدة تبقى باردة وطرية (18-20°م)، متقطعة مكعبات. البيض بحرارة الغرفة. اخفق البيض مع الفانيليا لوحدهم.
٢. **الخفق العكسي:** اخلط الدقيق، السكر، الملح، والصودا. بعدين ضيف الزبدة وامزج على سرعة واطية لحد ما يبقى الخليط شبه رمل مبلول.
٣. **السوائل:** على سرعة قليلة، ضيف خليط البيض والفانيليا بالتدريج. استمر لحد ما تتكون عجينة يدوب ملمومة. هتحسها مفتتة شوية، بس دي طبيعتها.
٤. **الشوكولاتة:** قلّب الشوكولاتة المفرومة أو الشيبس الصغير بسرعة وبلطف، بأقل تقليب ممكن.
٥. **الخبز فورًا:** شكّل كور صغيرة (معلقة كبيرة تقريبا)، وسيب مسافة كبيرة بينهم (3+ بوصة!). ادخل الفرن على 175°م من غير ما تبرد.
٦. **قرمشة ذهبية:** اخبز من 12-16 دقيقة لحد ما يبقوا رُقاق ودهبيين بزيادة. لو لسه منتفخين شوية من النص، هيبططوا وهما بيبردوا.
٧. **التبريد:** سيبهم يبردوا على الصينية 5-10 دقايق، بعدين انقلهم على رف سلكي. القرمشة بتبان بعد ما يبردوا تمامًا.`,

// Easter Egg & Recs
stuffedTitle: 'إنت فتّحت السر الخطير! 🎉',
stuffedCongrats: 'مبروك يا كينج! اختيارك للكوكي اللزج السميك بيقول إنك مش عادي. تقدر تحشي الوحوش دي بحاجات خطيرة!',
stuffedHowTo: 'إزاي؟ افرد الكورة شوية، اعمل تجويف، حط جوه معلقة صغيرة نوتيلا أو زبدة فستق، لف العجينة حواليها كويس، واقفلها جامد، وخبزها زي ما هو مكتوب (ممكن تحتاج دقيقتين زيادة).',
pistachioTipTitle: 'ترشيح فستق جامد:',
pistachioTipDesc: 'انسَ الأنواع اللي طعمها باهت أو فيها زيوت! لو عايز طعم فستق فعلي، أنصحك بـ"كريمة الفستق من ASMA Foods". خطيييرة ومركزة.',
pistachioTipLink: 'شوفها هنا (رابط لمصر)',
chocoTipTitle: 'علم الشوكولاتة:',
chocoTipDesc: 'مش أي شوكليت شيبس تنفع! لو بتدور على الطعم الدايب اللي يدوّبك، جرب "Dropsy" باللبن. سلاح سري بجد. (واحنا ضد الشركات العالمية اللي بترعاناش).',
chocoTipLink: 'دور عند موردين زي دول (رابط فيسبوك)',
chocoTipMilk: 'اتأكد إنها النسخة اللبني (MILK) عشان تاخد الطراوة الصح!',
conclusionTitle: 'كده المهمة تمت! 🎉',
conclusionDesc: 'التجربة أثبتت: كوكي الزبدة البنية كسب السباق. لو عملت إنجاز شهي، شاركنا الدليل!',
conclusionTag: 'اعمللي تاج على انستجرام:',
conclusionGoForth: 'يلا انطلق واطبخ بعلم ودماغ!',
footerText: 'اتعمل بالعلم، الزبدة، وكام سطر كود.',
        }
    };

    // --- Functions ---

    // Convert input butter to grams
    function getBaseButterInGrams() {
        const amount = parseFloat(butterAmountInput.value);
        const unit = butterUnitSelect.value;
        if (isNaN(amount) || amount <= 0) return 0;

        let grams = (unit === 'cups') ? amount * GRAMS_PER_CUP_BUTTER : amount;

        // Basic validation (e.g., minimum 100g)
        if (grams < 100) {
            butterWarning.style.display = 'block';
            butterWarning.textContent = langStrings[currentLanguage].butterWarning;
            return 0;
        } else {
            butterWarning.style.display = 'none';
            return grams;
        }
    }

    // Calculate scaled recipe
    function calculateScaledRecipe(butterInGrams, cookieType) {
        const base = baseRecipes[cookieType];
        if (!base) return null;

        const scalingFactor = butterInGrams / base.baseButter;
        const scaledIngredients = {};

        for (const key in base.ingredients) {
            scaledIngredients[key] = {
                grams: base.ingredients[key][0] * scalingFactor,
                unitType: base.ingredients[key][1] // Keep track of type for conversion
            };
        }

        let yieldValue;
        if (cookieType === 'thick') {
            // Calculate yield based on total dough weight and target cookie weight
            let totalDoughWeight = 0;
            for (const key in scaledIngredients) {
                totalDoughWeight += scaledIngredients[key].grams;
            }
            yieldValue = Math.round(totalDoughWeight / base.cookieSizeGrams);
        } else {
            yieldValue = Math.round(base.yieldPerBase * scalingFactor);
        }

        return {
            ingredients: scaledIngredients,
            yield: yieldValue,
            notesKey: base.notes,
            stepsKey: base.steps,
            prepTechKeys: base.prepTech,
            isThick: cookieType === 'thick' // Flag for easter egg
        };
    }

// Format ingredient amount based on unit system
function formatIngredient(grams, unitType, lang, unitSystem) {
    const T = langStrings[lang]; // Translation helper
    let outputText = ''; // Use a single output variable

    // Special case for Eggs - Show decimal count and total grams
    if (unitType === 'egg') {
        let numEggs = grams / GRAMS_PER_LARGE_EGG;
        if (numEggs < 0.5) numEggs = 1; // Ensure at least 1 egg if grams > 0
        const eggText = numEggs.toFixed(1) + " " + (numEggs <= 1 ? T.egg : T.eggs);
        const totalGrams = Math.round(grams);
        outputText = `${eggText} (${totalGrams}g)`;
        return outputText;
    }

    // --- Proceed with other unit types ---
    let metricText = `${Math.round(grams)} g`;
    let imperialText = '';
    let cupsText = ''; // For Arabic display (if applicable)

    // --- Imperial Calculation (Approximate) ---
    let imperialAmount = '';
    let imperialUnit = '';
    switch (unitType) {
        case 'butter':
        case 'sugar': // Granulated and Brown are similar enough for approx cups
        case 'chocolate':
            const cupEq = unitType === 'butter' ? GRAMS_PER_CUP_BUTTER : (unitType === 'sugar' ? GRAMS_PER_CUP_GRAN_SUGAR : GRAMS_PER_CUP_CHOC_CHIPS);
            imperialAmount = (grams / cupEq).toFixed(2);
            // Remove trailing ".00"
            imperialAmount = imperialAmount.endsWith('.00') ? imperialAmount.slice(0, -3) : imperialAmount;
            imperialUnit = (parseFloat(imperialAmount) === 1) ? T.cup : T.cups; // Use translations for cup/cups
            cupsText = `${imperialAmount} ${imperialUnit}`; // For potential AR display
            break;
        case 'flour':
            imperialAmount = (grams / GRAMS_PER_CUP_FLOUR).toFixed(2);
            imperialAmount = imperialAmount.endsWith('.00') ? imperialAmount.slice(0, -3) : imperialAmount;
            imperialUnit = (parseFloat(imperialAmount) === 1) ? T.cup : T.cups;
            cupsText = `${imperialAmount} ${imperialUnit}`;
            break;
        case 'salt':
        case 'bakingSoda':
        case 'bakingPowder':
        case 'vanilla':
        case 'milkPowder': // Added milk powder here for tsp/tbsp logic
        case 'prepWater': // Added prep water here for tsp/tbsp logic
            let tspEq = 1; // Default multiplier
            let unitNameSingular = 'tsp'; // Default unit
            let unitNamePlural = 'tsps';
            let useTbsp = false;

            if (unitType === 'salt') tspEq = GRAMS_PER_TSP_SALT;
            else if (unitType === 'bakingSoda') tspEq = GRAMS_PER_TSP_BAKING_SODA;
            else if (unitType === 'bakingPowder') tspEq = GRAMS_PER_TSP_BAKING_POWDER;
            else if (unitType === 'vanilla') tspEq = GRAMS_PER_TSP_VANILLA;
            else if (unitType === 'prepWater') tspEq = 4.9; // Approx 5g water/tsp
            else if (unitType === 'milkPowder') {
                tspEq = GRAMS_PER_TBSP_MILK_POWDER / 3; // Convert Tbsp base to Tsp base
                unitNameSingular = 'Tbsp'; // Prefer Tbsp display
                unitNamePlural = 'Tbsp';
                useTbsp = true;
            }

            let baseAmount = grams / tspEq; // Amount in basic unit (tsp)

            // Convert to Tbsp if preferred and applicable
            if (useTbsp && baseAmount >= 2.9) { // If close to 1 Tbsp or more
                baseAmount = baseAmount / 3; // Convert tsp amount to tbsp amount
                unitNameSingular = 'Tbsp';
                unitNamePlural = 'Tbsp';
            } else { // Otherwise stick to tsp
                unitNameSingular = 'tsp';
                unitNamePlural = 'tsps';
            }

            if (baseAmount < 0.1) baseAmount = 0; // Avoid tiny fractions

            if (baseAmount < 1 && baseAmount > 0) { // Handle fractions
                if (baseAmount >= 0.875) imperialAmount = '⅞';
                else if (baseAmount >= 0.7) imperialAmount = '¾';
                else if (baseAmount >= 0.6) imperialAmount = '⅔';
                else if (baseAmount >= 0.4) imperialAmount = '½';
                else if (baseAmount >= 0.3) imperialAmount = '⅓';
                else if (baseAmount >= 0.2) imperialAmount = '¼';
                else if (baseAmount >= 0.1) imperialAmount = '⅛';
                else imperialAmount = 'pinch'; // Only if really small
                imperialUnit = unitNameSingular; // Use singular for fractions
            } else {
                // Format whole/decimal numbers (e.g., 1, 1.5, 2)
                imperialAmount = parseFloat(baseAmount.toFixed(1)).toString(); // toFixed(1) then parse and back to string removes trailing .0
                imperialUnit = (baseAmount > 0 && baseAmount <= 1) ? unitNameSingular : unitNamePlural;
            }
            if (imperialAmount === 'pinch') imperialUnit = '';
            // Special label for prep water
            if (unitType === 'prepWater') imperialUnit += ' water/milk';
            break;
        default: // Fallback for unknown types
            imperialAmount = Math.round(grams);
            imperialUnit = 'g';
    }
    // Avoid displaying unit if amount is 0
    if (parseFloat(imperialAmount) === 0) {
        imperialText = `0 ${imperialUnit}`; // Or just "0"?
    } else {
        imperialText = `${imperialAmount} ${imperialUnit}`;
    }

    // --- Return based on language and unit system ---
    if (lang === 'en') {
        outputText = (unitSystem === 'metric') ? metricText : imperialText.trim(); // Trim potential extra space
    } else { // Arabic
        // Always show grams, optionally show cups if applicable for certain types
        outputText = `<span class="unit-g">${metricText}</span>`;
        if (cupsText && (unitType === 'butter' || unitType === 'sugar' || unitType === 'flour' || unitType === 'chocolate')) {
            outputText += ` <span class="unit-cups">(${cupsText})</span>`;
        }
    }
    return outputText;
}

    // Display the recipe
    function displayRecipe(recipeData) {
        if (!recipeData) return;

        const lang = currentLanguage;
        const units = currentUnitSystem;
        const T = langStrings[lang]; // Translation helper

        const cookieName = T[`${selectedCookieType}Title`];
        const yieldNum = recipeData.yield;
        let yieldText = '';
        if (selectedCookieType === 'thick') {
            yieldText = `${yieldNum} ${yieldNum === 1 ? T.largeCookie : T.largeCookies}`;
        } else {
            yieldText = `${yieldNum} ${yieldNum === 1 ? T.cookie : T.cookies}`;
        }

        let ingredientsHtml = `<h3 class="ingredients-title">${T.ingredientsTitle}</h3><ul>`;
        for (const key in recipeData.ingredients) {
            const item = recipeData.ingredients[key];
            const ingredientName = T[key] || key; // Use translation or key as fallback
            const formattedAmount = formatIngredient(item.grams, item.unitType, lang, units);
            ingredientsHtml += `<li><strong>${formattedAmount}</strong> ${ingredientName}</li>`;
        }
        ingredientsHtml += `</ul>`;

        let prepTechHtml = `<h3 class="prep-tech-title">${T.prepTitle}</h3>`;
        recipeData.prepTechKeys.forEach(key => {
            prepTechHtml += `<div class="pro-tip note">
                                <h4>${T[`prepTechTitle_${key}`]}</h4>
                                <p>${T[`prepTechDesc_${key}`]}</p>
                             </div>`;
        });

        let stepsHtml = `<h3 class="steps-title">${T.stepsTitle}</h3><ol>`;
        const stepsArray = T[recipeData.stepsKey].split('\n'); // Split steps string into array
        stepsArray.forEach(step => {
            if (step.trim()) { // Avoid empty lines
                // Basic formatting for bolding: finding text between **
                let formattedStep = step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                stepsHtml += `<li>${formattedStep.replace(/^\d+\.\s*/, '')}</li>`; // Remove leading number/dot
            }
        });
        stepsHtml += `</ol>`;

        let notesHtml = `<div class="pro-tip"><h4>${T.proTipsTitle}</h4><p>${T[recipeData.notesKey]}</p></div>`;

        recipeContent.innerHTML = `
            <h2>${T.recipeTitle.replace('{cookieName}', cookieName)}</h2>
            <p class="recipe-yield">${T.approxYield} ${yieldText}</p>
            ${prepTechHtml}
            ${ingredientsHtml}
            ${stepsHtml}
            ${notesHtml}
        `;

        // Show/Hide Easter Egg & Chocolate Tip
        stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
        chocolateRecommendation.style.display = 'block'; // Show general chocolate tip

        // Update texts within dynamic sections if needed
        updateLanguageContent(recipeDisplaySection); // Apply translations to static text within recipe section

        recipeDisplaySection.style.display = 'block';
        // Scroll smoothly to the recipe
        recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // --- Language and Unit Switching ---
    function updateLanguageContent(parentElement = document.body) {
        const elements = parentElement.querySelectorAll('[data-en]');
        elements.forEach(el => {
            const key = currentLanguage; // 'en' or 'ar'
            if (el.dataset[key]) {
                // Handle different element types
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = el.dataset[key];
                } else {
                    el.innerHTML = el.dataset[key]; // Use innerHTML to allow tags in data attributes
                }
            }
        });

        // Update static button text specifically
        langToggleButton.textContent = (currentLanguage === 'en') ? T('toggleArabic') : T('toggleEnglish');
        unitToggleButton.textContent = (currentLanguage === 'en') ? T(currentUnitSystem === 'metric' ? 'unitImperial' : 'unitMetric') : T(currentUnitSystem === 'grams' ? 'unitCups' : 'unitGrams');

        // Update specific dynamic labels/placeholders if not covered by data attributes
        if (parentElement === document.body || parentElement.contains(butterUnitSelect)) {
            // Update butter unit options
            const butterUnitOptions = butterUnitSelect.options;
            for (let i = 0; i < butterUnitOptions.length; i++) {
                const option = butterUnitOptions[i];
                const value = option.value; // 'grams' or 'cups'
                option.textContent = T(value); // Use 'grams' or 'cups' key from langStrings
            }
        }

        // Set page direction
        htmlElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
    }

    // Helper to get translation
    function T(key) {
        return langStrings[currentLanguage][key] || key; // Fallback to key name
    }

    function toggleLanguage() {
        currentLanguage = (currentLanguage === 'en') ? 'ar' : 'en';
        // Adjust unit system based on language change if needed
        if (currentLanguage === 'ar') {
            currentUnitSystem = 'grams'; // Default Arabic to Grams/Cups view
        } else {
            currentUnitSystem = 'metric'; // Default English to Metric
        }
        updateLanguageContent(); // Update all text
        // Re-display recipe if one is selected to apply new lang/units
        if (selectedCookieType && baseButterGrams > 0) {
            const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            displayRecipe(scaledRecipe);
        }
        // Update button text after updating content
        langToggleButton.textContent = (currentLanguage === 'en') ? T('toggleArabic') : T('toggleEnglish');
        updateUnitButtonText(); // Update unit button text
    }

    function toggleUnits() {
        if (currentLanguage === 'en') {
            currentUnitSystem = (currentUnitSystem === 'metric') ? 'imperial' : 'metric';
        } else { // Arabic toggles between Grams (primary) and Cups (secondary view)
            // This logic might need refinement - maybe just changes display preference?
            // For now, let's assume it affects the *display* preference in formatIngredient
            currentUnitSystem = (currentUnitSystem === 'grams') ? 'cups' : 'grams'; // Toggle preference?
            // For simplicity, let's just stick to EN having Metric/Imperial toggle for now
            // And AR showing Grams + Cups where applicable always. So AR toggle does nothing practical yet.
            // Reverting AR toggle logic:
            if (currentLanguage === 'ar') {
                console.warn("Unit toggle currently only affects English display.");
                return; // Or implement a specific AR unit preference logic later
            }
        }
        updateUnitButtonText(); // Update button text
        // Re-display recipe with new unit formatting
        if (selectedCookieType && baseButterGrams > 0) {
            const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            displayRecipe(scaledRecipe);
        }
    }

    function updateUnitButtonText() {
        if (currentLanguage === 'en') {
            unitToggleButton.textContent = T(currentUnitSystem === 'metric' ? 'unitImperial' : 'unitMetric');
        } else {
            // Decide how to label AR unit button - maybe it's fixed?
            unitToggleButton.textContent = T('unitGrams'); // Example: Always show Grams as base for AR? Or hide button?
            // Hiding for now in AR mode as the display shows both anyway
            unitToggleButton.style.display = 'none';
            butterUnitSelect.style.display = 'inline-block'; // Ensure butter unit select is visible
        }

        // Show/hide butter unit select based on language/system
        if (currentLanguage === 'en' && currentUnitSystem === 'imperial') {
            butterUnitSelect.value = 'cups'; // Default imperial to cups input
            butterUnitSelect.style.display = 'none'; // Hide selector in Imperial view
        } else {
            butterUnitSelect.style.display = 'inline-block'; // Show for Metric EN and AR
        }
    }

    // --- Event Listeners ---
    startExperimentBtn.addEventListener('click', () => {
        baseButterGrams = getBaseButterInGrams();
        if (baseButterGrams > 0) {
            cookieSelectionSection.style.display = 'block';
            cookieSelectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Hide recipe until a type is chosen
            recipeDisplaySection.style.display = 'none';
            // Reset selection visual
            cookieOptions.forEach(opt => opt.classList.remove('selected'));
            selectedCookieType = null;
        }
    });

    // Update button state when input changes
    butterAmountInput.addEventListener('input', () => {
        butterWarning.style.display = 'none'; // Hide warning on new input
        // Optionally disable button if input is invalid here
    });
    butterUnitSelect.addEventListener('change', () => {
        butterWarning.style.display = 'none';
    });

    cookieOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (baseButterGrams <= 0) {
                // Maybe prompt them to enter butter first?
                butterAmountInput.focus();
                butterWarning.textContent = "Please enter butter amount first!"; // Temp message
                butterWarning.style.display = 'block';
                return;
            }

            // Update selection visual
            cookieOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            selectedCookieType = option.dataset.cookieType;
            const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            displayRecipe(scaledRecipe);
        });

        // Hover effect (Optional - CSS handles basic hover, JS for more complex)
        option.addEventListener('mouseenter', () => {
            // Add class for JS-driven hover effects if needed
        });
        option.addEventListener('mouseleave', () => {
            // Remove class
        });
    });

    langToggleButton.addEventListener('click', toggleLanguage);
    unitToggleButton.addEventListener('click', toggleUnits);

    // --- Initial Setup ---
    updateLanguageContent(); // Set initial language text
    updateUnitButtonText(); // Set initial unit button text and visibility

}); // End DOMContentLoaded
