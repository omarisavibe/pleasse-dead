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
    let currentLanguage = 'en'; // Default language
    let currentUnitSystem = 'metric'; // 'metric' or 'imperial' for EN, affects display formatting
    let baseButterGrams = 0; // User's input converted to grams
    let selectedCookieType = null; // 'classic', 'thick', or 'thin'

    // --- Constants ---
    const GRAMS_PER_CUP_BUTTER = 226.8;
    const GRAMS_PER_CUP_FLOUR = 125;
    const GRAMS_PER_CUP_GRAN_SUGAR = 200;
    const GRAMS_PER_CUP_BROWN_SUGAR = 213; // Packed
    const GRAMS_PER_TSP_SALT = 6;
    const GRAMS_PER_TSP_BAKING_SODA = 4.8;
    const GRAMS_PER_TSP_BAKING_POWDER = 4;
    const GRAMS_PER_LARGE_EGG = 50; // Average weight without shell
    const GRAMS_PER_TSP_VANILLA = 4.2;
    const GRAMS_PER_CUP_CHOC_CHIPS = 170; // Approx
    const GRAMS_PER_TBSP_MILK_POWDER = 7; // Approx Non-Fat Dry Milk

    // --- Base Recipes (Based on OCR Text - Using 284g butter base) ---
    // All base amounts in GRAMS for easy scaling
    const baseRecipes = {
        classic: {
            baseButter: 284,
            yieldPerBase: 30, // Approx. yield
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
                prepWater: [9.4, 'water'] // ~2 tsp hydration per base
            },
            notes: 'classicNotes',
            prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick'],
            steps: 'classicSteps'
        },
        thick: {
            baseButter: 284,
            yieldPerBase: 10, // Approx. yield for LARGE cookies
            cookieSizeGrams: 140, // Approx size per cookie (target)
            ingredients: {
                granulatedSugar: [100, 'sugar'],
                lightBrownSugar: [200, 'sugar'],
                toastedMilkPowder: [15, 'milkPowder'], // ~2.5 Tbsp
                largeEggs: [100, 'egg'], // 2 eggs
                vanillaExtract: [8.4, 'vanilla'], // 2 tsp
                allPurposeFlour: [420, 'flour'],
                tableSalt: [6, 'salt'], // 1 tsp
                bakingPowder: [5, 'bakingPowder'], // 1 1/4 tsp
                // NO Baking Soda
                chocolateChips: [567, 'chocolate'],
                prepWater: [9.4, 'water'] // ~2 tsp hydration per base
            },
            notes: 'thickNotes',
            prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick', 'toastMilkPowder'],
            steps: 'thickSteps'
        },
        thin: {
            baseButter: 284,
            yieldPerBase: 42, // Approx. yield
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
                prepWater: [9.4, 'water'] // ~2 tsp hydration per base
            },
            notes: 'thinNotes',
            prepTech: ['brownButter', 'hydrateButter', 'chillButterThin'],
            steps: 'thinSteps'
        }
    };

    // --- Language Strings ---
    // *** NOTE: Fixed the structure here - removed the extra nested 'ar' key ***
    const langStrings = {
        en: {
            // Toggles & Units
            toggleArabic: 'عربي',
            toggleEnglish: 'English',
            unitMetric: 'Switch to Imperial (cups, tsp)',
            unitImperial: 'Switch to Metric (g, ml)',
            unitGrams: 'Grams (g)', // Added for consistency, though not used in EN toggle
            unitCups: 'Cups (cups)', // Added for consistency
            // Butter Input
            egg: 'egg',
            eggs: 'eggs',
            butterVarTitle: 'Step 1: Butter Up! 🧈',
            butterVarDesc: 'Great cookies need the perfect amount of butter. So, how much of this golden goodness are you using? Be precise, chef! 👩‍🍳',
            grams: 'grams',
            cups: 'cups', // Used for butter unit dropdown & formatting
            cup: 'cup',   // Used for formatting singular cup
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
            classicSteps: `**Prep:** Whisk flour, salt, baking powder, soda. Line baking sheets. Ensure butter is chilled pliable (60-65°F), eggs room temp.
**Cream:** Beat chilled brown butter & sugars on med-high speed for a FULL 5 mins until light, fluffy, increased volume (this is key!). Scrape bowl.
**Add Wet:** Low speed. Add eggs one by one, mixing *just* until combined. Mix in vanilla with last egg. Don’t overmix!
**Add Dry:** Lowest speed. Add flour mix gradually, mixing *only* until streaks disappear. Finish by hand if needed to avoid toughness.
**Fold:** Gently fold in chocolate chips with a spatula.
**Chill (Recommended):** Cover dough, refrigerate 30-60 mins minimum (up to 48 hrs for deeper flavor). Solidifies fat, hydrates flour.
**Scoop & Bake:** Preheat 375°F (190°C). Scoop ~2 Tbsp balls onto sheets, 2 inches apart. Bake 10-12 mins, until edges golden, center soft/puffy. Rotate sheet halfway.
**Cool:** Cool on sheet 3-5 mins (critical setting time!), then transfer to wire rack.`,
            thickNotes: `Thickness demands fighting spread! High brown sugar, NO soda, MANDATORY long chill are key. Moderate creaming prevents collapse. Toasted milk powder adds nutty depth and subtle chew. Embrace the underbake for ultimate goo!`,
            thickSteps: `**Prep:** Whisk flour, toasted milk powder, salt, baking powder. Line sheets. Ensure butter chilled pliable (60-65°F), eggs room temp.
**Cream (Moderately):** Beat chilled brown butter & sugars on medium speed ~2-3 mins until combined and creamy (NOT super light/fluffy like classic). Scrape bowl. Avoid over-aerating.
**Add Wet:** Low speed. Add eggs one by one, just until combined. Mix in vanilla.
**Add Dry:** Lowest speed. Add flour mix in 4-5 additions, mixing until *almost* combined (few streaks ok). Minimizes gluten.
**Fold:** Add massive amount of chocolate. Use sturdy spatula/hands to fold, incorporating final flour bits. Dough will be THICK. Do not overmix.
**MANDATORY Chill:** Divide dough into LARGE balls (4-6 oz / 113-170g each). Roll tall. Wrap tightly. Refrigerate MINIMUM 4 hours, ideally 12-72 hours. DO NOT SKIP/SHORTEN.
**Bake COLD:** Preheat 350°F (180°C). Place COLD dough balls far apart on sheet. Do NOT flatten. Bake 18-25 mins (depends on size). Edges set, center very soft, slightly gooey, maybe underbaked. (Internal temp 175-185°F / 79-85°C is a good target). Rotate sheet halfway.
**Cool CAREFULLY:** Cool on sheet 10-15 MINUTES. They are delicate! Transfer gently to wire rack. Best enjoyed warm (but not molten hot!).`,
            thinNotes: `Crispiness = Maximum Spread + Minimum Gluten. High granulated sugar, high baking soda (alkalinity boosts browning/spread), and reverse creaming (coats flour with fat first) are crucial. NO chilling! Bake thoroughly.`,
            thinSteps: `**Prep:** Line sheets. Ensure butter is cool but pliable (65-68°F / 18-20°C), cut into small pieces. Eggs room temp. Whisk eggs & vanilla in small bowl.
**Reverse Cream:** In mixer bowl, combine flour, sugars, salt, baking soda. Mix briefly. Add cool butter pieces. Mix on low until mixture resembles coarse, damp sand/crumbs (butter worked in, coating flour). Takes a few mins.
**Combine Wet/Dry:** Mixer on low. Gradually stream in egg/vanilla mixture. Mix *only* until a cohesive dough just forms. It might look crumbly first. DO NOT OVERMIX. Tenderness is key.
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
            unitMetric: 'حوّل للإنجليزي (كوب، معلقة)', // Text for toggle button in AR context (maybe misleading?)
            unitImperial: 'حوّل للمتري (جم، مل)',       // Text for toggle button in AR context (maybe misleading?)
            unitGrams: 'جرام (g)',
            unitCups: 'كوب (cups)',

            // Butter Input
            butterVarTitle: 'أول خطوة: الزبدة يا باشا! 🧈',
            butterVarDesc: 'كوكيز جامدة؟ محتاجة زبدة مظبوطة. يعني قد إيه من الدهب السايح ناوي تحط؟ خليك دقيق يا شيف! 👩‍🍳',
            grams: 'جرام',
            cups: 'كوب', // Used for butter unit dropdown & formatting
            cup: 'كوب',  // Used for formatting singular cup
            butterWarning: 'دخل كمية زبدة مظبوطة (على الأقل ١٠٠ جرام أو نص كوب كده). متسحبش علينا كده! 🙃',
            beginExperiment: 'يلا نبدأ التجربة! 🍪',

            // Cookie Selection
            phenotypeTitle: 'الخطوة التانية: اختار مود الكوكيز 🍪',
            phenotypeDesc: 'النهاردة نفسك في إيه؟ يلا نختار نوع المغامرة:',
            thinTitle: 'كوكيز رفايعة ومقرمشة موت',
            thinDesc: 'زي الشبسي... بس كوكيز. تنفع تتغمس أو تتاكل على طول. فليكس جامد 😎',
            classicTitle: 'الأصلية المتوازنة',
            classicDesc: 'طراوة × قرمشة × طعم جامد. دايمًا بتكسب الناس. 🎉',
            thickTitle: 'الكوكي اللي مليانة وشبعانة',
            thickDesc: 'سميكة ولزجة وتخلي حواسك ترقص. طعم مش طبيعي. 💃',

            // Recipe Display
            recipeTitle: 'وصفة {cookieName}',
            prepTitle: 'التحضير على أصوله',
            ingredientsTitle: 'مكونات المغامرة بتاعتك 🗺️',
            approxYield: 'هتعمل حوالي',
            cookies: 'كوكيز',
            cookie: 'كوكي',
            largeCookies: 'كوكيز كبار',
            largeCookie: 'كوكي كبيرة',
            stepsTitle: 'خطوات الشيف الجامد 👩‍🍳',
            proTipsTitle: 'نصايح من أستاذ الكوكيز بتاعك 🧠',

            // Ingredient Names
            unsaltedButter: 'زبدة سايحة جامدة',
            granulatedSugar: 'سكر عادي',
            lightBrownSugar: 'سكر بني فاتح',
            egg: 'بيضة',
            eggs: 'بيض',
            toastedMilkPowder: 'لبن بودرة متحمص',
            largeEggs: 'بيض كبير (بدرجة حرارة الغرفة يا ريس) 🥚',
            vanillaExtract: 'فانيليا',
            allPurposeFlour: 'دقيق عادي',
            tableSalt: 'رشة ملح كده على الماشي',
            bakingPowder: 'بيكنج بودر',
            bakingSoda: 'بيكنج صودا',
            chocolateChips: 'شوكولاتة قطع أو حبيبات (زود براحتك 😍)',
            prepWater: 'مياه/لبن (للترطيب، زي ما بترطب وشك) 💧',

            // Prep Techniques
            prepTechTitle_brownButter: 'إزاي تحوّل الزبدة لدهب سايح 🧈✨',
            prepTechDesc_brownButter: `اسيبك من اللحمة، هنا التفاعل الجد! حمّر الزبدة لحد ما تاخد لون وريحة تخلي الكوكيز تقول يا سلام. <br>١. قطع الزبدة وحطها في حلة بلون فاتح. <br>٢. سيحها على نار متوسطة. هتعمل رغوة — عادي. قلّبها براحة. <br>٣. كمل تسخين. هتلاقي الرواسب بتتحمص وتبقى بني فاتح (ريحة بندق كده). الموضوع بياخد من ٥ لـ١٠ دقايق. <br>٤. أول ما تاخد لون، صبها في طبق مقاوم للحرارة بسرعة. ما تحرقهاش بقى.`,
            prepTechTitle_hydrateButter: 'لو عايز: رجّع للزبدة شوية مياه 💦',
            prepTechDesc_hydrateButter: `لما تحمّر الزبدة، بيطير منها شوية مياه (حوالي ١٥-٢٠٪). ممكن تضيف نقطة مياه تانية بعد التحمير وقبل ما تبردها عشان تظبط قوام العجينة.`,
            prepTechTitle_chillButterClassicThick: 'تبريد الزبدة عشان الشغل الصح ⏳',
            prepTechDesc_chillButterClassicThick: `ليه بنبرد؟ الزبدة وهي سايحة مش هتخفق كويس. لازم نرجّع الهيكل بتاعها. <br>١. ابردها ٥-١٠ دقايق. <br>٢. حطها في التلاجة لحد ما تبقى شبه عجينة لعب الأطفال — مش جامدة خالص. استهدف حوالي ١٦-١٨° مئوية.`,
            prepTechTitle_chillButterThin: 'تبريد مختلف للكريسبيز ❄️',
            prepTechDesc_chillButterThin: `لو بتعمل الكوكيز الرفايعة، برد الزبدة بس سيبها لينة كده. <br>١. خلى الزبدة ترجع لدرجة حرارة الغرفة، وبعدين حطها شوية في التلاجة (٣٠-٦٠ دقيقة). المفروض تبقى شادة شوية بس تتقطع بسهولة.`,
            prepTechTitle_toastMilkPowder: 'طعم زيادة: حمّص لبن البودرة 🔥',
            prepTechDesc_toastMilkPowder: `بيزود النكهة بتاعة التوفي/الكراميل. خصوصًا في الكوكيز السميكة. <br>١. افرد بودرة اللبن على صينية أو طاسة. <br>٢. في الفرن: ١٢٠°م لمدة ١٠-١٥ دقيقة (قلّب كل شوية). في طاسة: نار هادية وقلب دايمًا. <br>٣. خليك صاحي! أول ما يبقى لونه دهبي وريحتك تقول الله، طفي.`,

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
            // Conclusion
            conclusionTitle: 'كده المهمة تمت! 🎉',
            conclusionDesc: 'التجربة أثبتت: كوكي الزبدة البنية كسب السباق. لو عملت إنجاز شهي، شاركنا الدليل!',
            conclusionTag: 'اعمللي تاج على انستجرام:',
            conclusionGoForth: 'يلا انطلق واطبخ بعلم ودماغ!',
            footerText: 'اتعمل بالعلم، الزبدة، وكام سطر كود.',
        }
    };

    // --- Functions ---

    /**
     * Gets the butter amount from the input, converts it to grams,
     * and validates it (must be > 0 and >= 100g).
     * Displays a warning if invalid.
     * @returns {number} Butter amount in grams, or 0 if invalid.
     */
    function getBaseButterInGrams() {
        const amount = parseFloat(butterAmountInput.value);
        const unit = butterUnitSelect.value;

        if (isNaN(amount) || amount <= 0) {
            butterWarning.style.display = 'block';
            butterWarning.textContent = T('butterWarning'); // Use translated warning
            return 0;
        }

        let grams = (unit === 'cups') ? amount * GRAMS_PER_CUP_BUTTER : amount;

        // Basic validation (minimum 100g)
        if (grams < 100) {
            butterWarning.style.display = 'block';
            butterWarning.textContent = T('butterWarning');
            return 0;
        } else {
            butterWarning.style.display = 'none';
            return grams;
        }
    }

    /**
     * Calculates the scaled ingredient amounts and yield based on the
     * user's butter input and selected cookie type.
     * @param {number} butterInGrams - The user's butter amount in grams.
     * @param {string} cookieType - 'classic', 'thick', or 'thin'.
     * @returns {object|null} An object with scaled ingredients, yield, and recipe keys, or null if invalid type.
     */
    function calculateScaledRecipe(butterInGrams, cookieType) {
        const base = baseRecipes[cookieType];
        if (!base || butterInGrams <= 0) return null; // Added check for valid butter

        const scalingFactor = butterInGrams / base.baseButter;
        const scaledIngredients = {};

        for (const key in base.ingredients) {
            if (Object.hasOwnProperty.call(base.ingredients, key)) {
                scaledIngredients[key] = {
                    grams: base.ingredients[key][0] * scalingFactor,
                    unitType: base.ingredients[key][1] // Keep track of type for conversion
                };
            }
        }

        let yieldValue;
        if (cookieType === 'thick') {
            // Calculate yield based on total dough weight and target cookie weight
            let totalDoughWeight = 0;
            for (const key in scaledIngredients) {
                totalDoughWeight += scaledIngredients[key].grams;
            }
            // Add back the butter weight which is not in scaledIngredients list
            totalDoughWeight += butterInGrams;
            yieldValue = Math.round(totalDoughWeight / base.cookieSizeGrams);
        } else {
            yieldValue = Math.round(base.yieldPerBase * scalingFactor);
        }
        // Ensure yield is at least 1 if calculation is positive
        yieldValue = Math.max(1, yieldValue);

        return {
            ingredients: scaledIngredients,
            yield: yieldValue,
            notesKey: base.notes,
            stepsKey: base.steps,
            prepTechKeys: base.prepTech || [], // Ensure prepTechKeys is always an array
            isThick: cookieType === 'thick' // Flag for easter egg
        };
    }

    /**
     * Formats an ingredient amount (in grams) into a user-readable string
     * based on the current language and unit system.
     * Handles eggs, cups, tsp/tbsp (with fractions), and Arabic display preferences.
     * @param {number} grams - The amount in grams.
     * @param {string} unitType - The type of ingredient (e.g., 'flour', 'sugar', 'salt', 'egg').
     * @param {string} lang - The current language ('en' or 'ar').
     * @param {string} unitSystem - The current unit system ('metric' or 'imperial' for EN).
     * @returns {string} The formatted ingredient string.
     */
    function formatIngredient(grams, unitType, lang, unitSystem) {
        const T_local = langStrings[lang]; // Use local alias for translation helper
        let outputText = '';

        // Ensure grams is non-negative
        grams = Math.max(0, grams);

        // Special case for Eggs - Show decimal count and total grams
        if (unitType === 'egg') {
            let numEggs = grams / GRAMS_PER_LARGE_EGG;
            // Ensure at least 1 egg if grams > 0, handle near-zero cases reasonably
             if (grams > 0 && numEggs < 0.5) {
                 numEggs = 0.5; // Or maybe display grams only? Let's keep 0.5 for now.
             } else if (grams === 0) {
                 numEggs = 0;
             }
             // Display fractional eggs, but avoid '0.0 eggs'
             const eggText = numEggs > 0 ? numEggs.toFixed(1) + " " + (numEggs > 1 ? T_local.eggs : T_local.egg) : "0 " + T_local.eggs;
             const totalGrams = Math.round(grams);
             // Show grams for precision, especially for fractional eggs
             outputText = `${eggText} (~${totalGrams}g)`;
             return outputText;
         }


        // --- Standard Formatting (Grams and optionally Imperial/Cups) ---
        let metricText = `${Math.round(grams)}g`; // Always calculate metric text
        let imperialText = ''; // For EN imperial display
        let cupsText = '';     // For AR supplemental display

        // --- Calculate Imperial/Cup Equivalent (Approximate) ---
        let imperialAmount = '';
        let imperialUnit = '';

        switch (unitType) {
            case 'butter':
            case 'sugar': // Granulated and Brown are similar enough for approx cups
            case 'chocolate':
                const cupEq = unitType === 'butter' ? GRAMS_PER_CUP_BUTTER :
                              (unitType === 'sugar' ? GRAMS_PER_CUP_GRAN_SUGAR : // Using Gran Sugar as approx for both sugars
                                GRAMS_PER_CUP_CHOC_CHIPS);
                if (cupEq > 0) {
                    let cups = grams / cupEq;
                    imperialAmount = cups.toFixed(2);
                    // Remove trailing ".00" and format nicely
                    imperialAmount = imperialAmount.endsWith('.00') ? imperialAmount.slice(0, -3) : parseFloat(imperialAmount).toString();
                    imperialUnit = (parseFloat(imperialAmount) === 1) ? T_local.cup : T_local.cups;
                    cupsText = `${imperialAmount} ${imperialUnit}`;
                }
                break;

            case 'flour':
                if (GRAMS_PER_CUP_FLOUR > 0) {
                    let cups = grams / GRAMS_PER_CUP_FLOUR;
                    imperialAmount = cups.toFixed(2);
                    imperialAmount = imperialAmount.endsWith('.00') ? imperialAmount.slice(0, -3) : parseFloat(imperialAmount).toString();
                    imperialUnit = (parseFloat(imperialAmount) === 1) ? T_local.cup : T_local.cups;
                    cupsText = `${imperialAmount} ${imperialUnit}`;
                }
                break;

            case 'salt':
            case 'bakingSoda':
            case 'bakingPowder':
            case 'vanilla':
            case 'milkPowder':
            case 'water': // Renamed prepWater type to just 'water' for simplicity
                let tspEq = 1;
                let unitNameSingular = 'tsp';
                let unitNamePlural = 'tsps';
                let useTbsp = false;

                // Set gram equivalent per tsp/tbsp based on type
                if (unitType === 'salt') tspEq = GRAMS_PER_TSP_SALT;
                else if (unitType === 'bakingSoda') tspEq = GRAMS_PER_TSP_BAKING_SODA;
                else if (unitType === 'bakingPowder') tspEq = GRAMS_PER_TSP_BAKING_POWDER;
                else if (unitType === 'vanilla') tspEq = GRAMS_PER_TSP_VANILLA;
                else if (unitType === 'water') tspEq = 4.9; // Approx 5g water/tsp
                else if (unitType === 'milkPowder') {
                    tspEq = GRAMS_PER_TBSP_MILK_POWDER / 3; // Convert Tbsp base to Tsp base
                    unitNameSingular = 'Tbsp'; // Prefer Tbsp display
                    unitNamePlural = 'Tbsp';
                    useTbsp = true;
                }

                if (tspEq > 0) {
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

                    // Avoid tiny fractions like 0.0something tsp
                    if (baseAmount < 0.1 && baseAmount > 0) baseAmount = 0.1; // Represent as 'pinch' or 1/8

                    // Handle fractions and formatting
                    if (baseAmount < 1 && baseAmount > 0) {
                        if (baseAmount >= 0.875) imperialAmount = '⅞';
                        else if (baseAmount >= 0.7) imperialAmount = '¾';    // (0.75)
                        else if (baseAmount >= 0.6) imperialAmount = '⅔';    // (0.66)
                        else if (baseAmount >= 0.45) imperialAmount = '½';   // (0.5)
                        else if (baseAmount >= 0.3) imperialAmount = '⅓';    // (0.33)
                        else if (baseAmount >= 0.2) imperialAmount = '¼';    // (0.25)
                        else if (baseAmount >= 0.1) imperialAmount = '⅛';    // (0.125)
                        //else imperialAmount = 'pinch'; // Optional: represent smallest as pinch
                        imperialUnit = unitNameSingular;
                    } else if (baseAmount >= 1) {
                        // Format whole/decimal numbers (e.g., 1, 1.5, 2)
                        imperialAmount = parseFloat(baseAmount.toFixed(1)).toString(); // toFixed(1) then parse+string removes trailing .0
                        imperialUnit = (parseFloat(imperialAmount) === 1) ? unitNameSingular : unitNamePlural;
                    } else { // baseAmount is 0 or less
                         imperialAmount = '0';
                         imperialUnit = unitNamePlural; // Show unit even for 0
                    }
                   // if (imperialAmount === 'pinch') imperialUnit = ''; // No unit for pinch
                    // Special label for prep water
                    if (unitType === 'water') imperialUnit += ' water/milk';
                }
                break;

            default: // Fallback for unknown types - just show metric
                imperialText = metricText; // No specific imperial conversion defined
                break;
        }

        // Construct the imperial text if an amount was calculated
        if (imperialAmount !== '' && imperialAmount !== '0') {
           imperialText = `${imperialAmount} ${imperialUnit}`;
        } else if (imperialAmount === '0'){
           imperialText = `0 ${imperialUnit}`; // Handle zero case explicitly
        } else {
             imperialText = metricText; // Fallback if no imperial calculation happened
        }


        // --- Return based on language and unit system ---
        if (lang === 'en') {
            outputText = (unitSystem === 'metric') ? metricText : imperialText.trim();
        } else { // Arabic: Always show grams, optionally show cups if applicable
            outputText = `<span class="unit-g">${metricText}</span>`;
            // Show cup equivalent only for ingredients where it makes sense and was calculated
            if (cupsText && (unitType === 'butter' || unitType === 'sugar' || unitType === 'flour' || unitType === 'chocolate')) {
                outputText += ` <span class="unit-cups">(${cupsText})</span>`;
            }
        }

        return outputText;
    }

    /**
     * Builds and inserts the HTML for the calculated recipe into the DOM.
     * Includes title, yield, prep steps, ingredients, instructions, notes,
     * and conditionally shows the 'stuffed' easter egg.
     * @param {object} recipeData - The object returned by calculateScaledRecipe.
     */
    function displayRecipe(recipeData) {
        if (!recipeData || !selectedCookieType) {
            recipeContent.innerHTML = '<p>Error: Could not calculate recipe.</p>'; // Basic error message
            recipeDisplaySection.style.display = 'block';
            return;
        }

        const lang = currentLanguage;
        const units = currentUnitSystem;
        const T_local = langStrings[lang]; // Translation helper

        // Ensure selectedCookieType has a valid translation before proceeding
        const cookieName = T_local[`${selectedCookieType}Title`] || selectedCookieType; // Fallback to key name
        if (!T_local[recipeData.notesKey] || !T_local[recipeData.stepsKey]) {
             console.error(`Missing language strings for notes/steps: ${recipeData.notesKey}, ${recipeData.stepsKey} in lang ${lang}`);
             recipeContent.innerHTML = `<p>Error: Missing recipe text for language ${lang}.</p>`;
             recipeDisplaySection.style.display = 'block';
             return;
         }

        const yieldNum = recipeData.yield;
        let yieldText = '';
        if (selectedCookieType === 'thick') {
            yieldText = `${yieldNum} ${yieldNum === 1 ? T_local.largeCookie : T_local.largeCookies}`;
        } else {
            yieldText = `${yieldNum} ${yieldNum === 1 ? T_local.cookie : T_local.cookies}`;
        }

        // --- Ingredients List ---
        let ingredientsHtml = `<h3 class="ingredients-title">${T_local.ingredientsTitle}</h3><ul>`;
        for (const key in recipeData.ingredients) {
            if (Object.hasOwnProperty.call(recipeData.ingredients, key)) {
                const item = recipeData.ingredients[key];
                // Use translation for ingredient name, fallback to the key
                const ingredientName = T_local[key] || key.replace(/([A-Z])/g, ' $1').toLowerCase(); // Add spaces before caps
                const formattedAmount = formatIngredient(item.grams, item.unitType, lang, units);
                ingredientsHtml += `<li><strong>${formattedAmount}</strong> ${ingredientName}</li>`;
            }
        }
        ingredientsHtml += `</ul>`;

        // --- Prep Techniques ---
        let prepTechHtml = `<h3 class="prep-tech-title">${T_local.prepTitle}</h3>`;
        if (recipeData.prepTechKeys && recipeData.prepTechKeys.length > 0) {
             recipeData.prepTechKeys.forEach(key => {
                 const titleKey = `prepTechTitle_${key}`;
                 const descKey = `prepTechDesc_${key}`;
                 if (T_local[titleKey] && T_local[descKey]) {
                     prepTechHtml += `<div class="pro-tip note">
                                         <h4>${T_local[titleKey]}</h4>
                                         <p>${T_local[descKey]}</p>
                                      </div>`;
                 } else {
                     console.warn(`Missing prep tech translation for key: ${key} in lang: ${lang}`);
                 }
             });
        } else {
            prepTechHtml += '<p>No specific prep techniques listed.</p>'; // Fallback if none provided
        }


        // --- Steps ---
        let stepsHtml = `<h3 class="steps-title">${T_local.stepsTitle}</h3><ol>`;
        const stepsString = T_local[recipeData.stepsKey] || ""; // Get steps string, default to empty
        const stepsArray = stepsString.split('\n'); // Split steps string into array
        stepsArray.forEach(step => {
            const trimmedStep = step.trim();
            if (trimmedStep) { // Avoid empty lines
                // Basic formatting for bolding: replace **text** with <strong>text</strong>
                let formattedStep = trimmedStep.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                // Remove potential leading numbering (e.g., "1.", "٢.") that might be in the translation
                formattedStep = formattedStep.replace(/^[\d١٢٣٤٥٦٧٨٩]+\.\s*/, '');
                stepsHtml += `<li>${formattedStep}</li>`;
            }
        });
        stepsHtml += `</ol>`;

        // --- Notes ---
        let notesHtml = `<div class="pro-tip"><h4>${T_local.proTipsTitle}</h4><p>${T_local[recipeData.notesKey]}</p></div>`;

        // --- Assemble Final HTML ---
        recipeContent.innerHTML = `
            <h2>${T_local.recipeTitle.replace('{cookieName}', cookieName)}</h2>
            <p class="recipe-yield">${T_local.approxYield} ${yieldText}</p>
            ${prepTechHtml}
            ${ingredientsHtml}
            ${stepsHtml}
            ${notesHtml}
        `;

        // --- Easter Egg & Recommendations ---
        // Conditionally display based on whether the element exists and cookie type
        if(stuffedEasterEgg) {
             stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
         }
        if(chocolateRecommendation) {
             chocolateRecommendation.style.display = 'block'; // Always show general chocolate tip if element exists
         }


        // --- Display and Scroll ---
        // Update static texts *within* the newly added recipe section if they use data-attributes
        // updateLanguageContent(recipeDisplaySection); // Usually not needed if innerHTML replaces everything

        recipeDisplaySection.style.display = 'block';
        recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    // --- Language and Unit Switching ---

    /**
     * Updates the text content of elements with data-en and data-ar attributes
     * based on the current language. Also sets the HTML direction ('ltr' or 'rtl').
     * @param {HTMLElement} [parentElement=document.body] - The container element to update. Defaults to the whole body.
     */
    function updateLanguageContent(parentElement = document.body) {
        const T_local = langStrings[currentLanguage]; // Alias for current language strings

        // Update elements with data attributes
        const elements = parentElement.querySelectorAll('[data-en], [data-ar]');
        elements.forEach(el => {
            const text = T_local[el.dataset.key] || el.dataset[currentLanguage]; // Prefer data-key if available
             if (text !== undefined) {
                // Handle different element types
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if(el.placeholder !== undefined) el.placeholder = text;
                    // Update value only if specifically intended (usually placeholder is enough)
                    // if(el.value !== undefined) el.value = text;
                 } else if (el.tagName === 'BUTTON') {
                    el.textContent = text; // Use textContent for buttons to avoid replacing icons etc.
                 } else {
                     el.innerHTML = text; // Use innerHTML to allow HTML tags within translations
                 }
            } else if (el.dataset[currentLanguage]) { // Fallback directly to data-[lang] if data-key not used/found
                 if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                     if(el.placeholder !== undefined) el.placeholder = el.dataset[currentLanguage];
                 } else {
                     el.innerHTML = el.dataset[currentLanguage];
                 }
             }
             // Add debug warning if text source is missing for the current language
              else {
                  console.warn(`Missing translation for element with data-key='${el.dataset.key}' or data-${currentLanguage} in lang '${currentLanguage}'`, el);
              }
        });

        // --- Update specific elements not easily handled by data-attributes ---

        // Language Toggle Button Text
        if (langToggleButton) {
            langToggleButton.textContent = (currentLanguage === 'en') ? T_local.toggleArabic : T_local.toggleEnglish;
        }

        // Unit Toggle Button Text (logic is handled in updateUnitButtonText)

        // Butter Unit Dropdown Options
        if (butterUnitSelect) {
             const butterUnitOptions = butterUnitSelect.options;
             for (let i = 0; i < butterUnitOptions.length; i++) {
                 const option = butterUnitOptions[i];
                 const valueKey = option.value; // 'grams' or 'cups'
                 option.textContent = T_local[valueKey] || option.value; // Use translation or fallback to value
             }
         }


        // Update Page Direction
        htmlElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
        htmlElement.setAttribute('lang', currentLanguage); // Set lang attribute

        // Call function to update unit button text and visibility
        updateUnitButtonText();
    }

    /**
     * Helper function to get a translated string for the current language.
     * @param {string} key - The key of the string in langStrings.
     * @returns {string} The translated string, or the key itself if not found.
     */
    function T(key) {
        // Ensure the structure exists before trying to access the key
        if (langStrings[currentLanguage] && langStrings[currentLanguage][key] !== undefined) {
             return langStrings[currentLanguage][key];
        }
        // console.warn(`Translation key "${key}" not found for language "${currentLanguage}".`);
        return key; // Fallback to key name if translation is missing
    }

    /**
     * Toggles the current language between 'en' and 'ar'.
     * Updates UI text, sets default unit systems per language,
     * and redisplays the recipe if one is active.
     */
    function toggleLanguage() {
        currentLanguage = (currentLanguage === 'en') ? 'ar' : 'en';

        // Set default unit preferences when language changes
        // currentUnitSystem = (currentLanguage === 'ar') ? 'grams' : 'metric'; // AR defaults to Grams display, EN to Metric

        // For now, keep the selected unit system unless it needs forcing.
        // English: Toggles Metric/Imperial.
        // Arabic: The concept of 'system' is less relevant as it shows grams + optionally cups.
        // So, changing language doesn't force-change the *EN* metric/imperial state.
        // But AR mode effectively ignores the 'metric'/'imperial' setting used by EN.

        updateLanguageContent(); // Update all text based on new language

        // Re-calculate and display recipe with new language / formatting rules
        if (selectedCookieType && baseButterGrams > 0) {
            const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            displayRecipe(scaledRecipe); // This will use the new language's formatting rules
        }
    }

    /**
     * Toggles the unit system for English display ('metric' <-> 'imperial').
     * For Arabic, this function currently has no effect as both grams and cups
     * (where relevant) are often shown.
     * Updates the unit toggle button and redisplays the recipe.
     */
    function toggleUnits() {
        if (currentLanguage === 'en') {
            currentUnitSystem = (currentUnitSystem === 'metric') ? 'imperial' : 'metric';
            updateUnitButtonText(); // Update button text/state

            // Re-calculate and display recipe with new unit formatting
            if (selectedCookieType && baseButterGrams > 0) {
                const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
                displayRecipe(scaledRecipe);
            }
        } else {
            // Currently, no unit toggling action is defined for Arabic mode
            // as the display format inherently shows primary (grams) + secondary (cups)
            console.log("Unit toggle primarily affects English display format (Metric/Imperial).");
        }
    }

    /**
     * Updates the text and visibility of the Unit Toggle Button
     * and the Butter Unit Select dropdown based on the current language and unit system (for EN).
     */
    function updateUnitButtonText() {
         if (!unitToggleButton || !butterUnitSelect) return; // Safety check

         if (currentLanguage === 'en') {
             unitToggleButton.textContent = T(currentUnitSystem === 'metric' ? 'unitImperial' : 'unitMetric');
             unitToggleButton.style.display = 'inline-block'; // Show toggle button for EN

             // Control butter unit selector based on EN unit system
             if (currentUnitSystem === 'imperial') {
                  butterUnitSelect.value = 'cups'; // Default imperial input to cups
                  // Decide if you want to *hide* the selector in imperial, or just default it.
                  // Hiding it makes the 'cups' unit fixed when in imperial mode.
                   butterUnitSelect.style.display = 'none';
              } else { // Metric view
                  butterUnitSelect.value = 'grams'; // Default metric input to grams
                  butterUnitSelect.style.display = 'inline-block'; // Show selector
              }
         } else { // Arabic
             // In AR mode, hide the EN-style unit toggle button because display shows both units anyway
             unitToggleButton.style.display = 'none';
             // Always show the butter unit selector (grams/cups) for AR input
             butterUnitSelect.style.display = 'inline-block';
         }
    }

    // --- Event Listeners ---

    // Start Experiment Button Click
    if (startExperimentBtn) {
        startExperimentBtn.addEventListener('click', () => {
            baseButterGrams = getBaseButterInGrams(); // Validate and get butter in grams
            if (baseButterGrams > 0) {
                if (cookieSelectionSection) {
                     cookieSelectionSection.style.display = 'block'; // Show cookie options
                     cookieSelectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // Hide recipe display until a type is chosen
                 if (recipeDisplaySection) {
                     recipeDisplaySection.style.display = 'none';
                 }
                 // Reset previous selections if any
                 selectedCookieType = null;
                 if (cookieOptions) {
                     cookieOptions.forEach(opt => opt.classList.remove('selected'));
                 }

            } else {
                 // If butter is invalid, maybe focus the input
                 if (butterAmountInput) butterAmountInput.focus();
            }
        });
    } else {
        console.error("Start Experiment button not found!");
    }


    // Butter Input/Unit Change - Hide warning on interaction
    if (butterAmountInput) {
         butterAmountInput.addEventListener('input', () => {
             if (butterWarning) butterWarning.style.display = 'none';
         });
    }
     if (butterUnitSelect) {
         butterUnitSelect.addEventListener('change', () => {
             if (butterWarning) butterWarning.style.display = 'none';
              // If the system is metric, changing units might affect grams directly
             // You could potentially recalculate or clear selection here if needed.
         });
     }

    // Cookie Option Clicks
    if (cookieOptions && cookieOptions.length > 0) {
        cookieOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Ensure butter amount has been entered and is valid
                if (baseButterGrams <= 0) {
                    if (butterWarning) {
                         butterWarning.textContent = "Please enter a valid butter amount first!";
                         butterWarning.style.display = 'block';
                    }
                     if (butterAmountInput) butterAmountInput.focus();
                     // Scroll back to butter input if needed
                      const butterInputSection = document.getElementById('butter-input-section'); // Assuming a container ID
                     if (butterInputSection) {
                        butterInputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    return; // Stop processing if butter isn't set
                }

                // Update selection visual
                cookieOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Get cookie type and calculate/display recipe
                selectedCookieType = option.dataset.cookieType;
                 if (selectedCookieType) {
                    const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
                    displayRecipe(scaledRecipe);
                 } else {
                     console.error("Clicked cookie option is missing 'data-cookie-type' attribute.", option);
                      if (recipeDisplaySection) recipeDisplaySection.style.display = 'none'; // Hide potentially old recipe
                 }

            });
        });
    } else {
        console.warn("No cookie options found with the class '.cookie-option'.");
    }

    // Language Toggle Button Click
    if (langToggleButton) {
        langToggleButton.addEventListener('click', toggleLanguage);
    } else {
        console.error("Language toggle button not found!");
    }

    // Unit Toggle Button Click
    if (unitToggleButton) {
        unitToggleButton.addEventListener('click', toggleUnits);
    } else {
        console.error("Unit toggle button not found!");
    }

    // --- Initial Setup on Load ---
    updateLanguageContent(); // Set initial language strings and UI state
    // updateUnitButtonText() is called inside updateLanguageContent, so no need to call separately here.
     if (butterWarning) butterWarning.style.display = 'none'; // Ensure warning is hidden initially
     if (cookieSelectionSection) cookieSelectionSection.style.display = 'none'; // Hide section initially
     if (recipeDisplaySection) recipeDisplaySection.style.display = 'none'; // Hide section initially
     // Consider setting initial focus, e.g., to the butter input
    if (butterAmountInput) {
       // butterAmountInput.focus(); // Optional: Focus input on load
    }


}); // End DOMContentLoaded
