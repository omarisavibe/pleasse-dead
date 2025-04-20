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
    // (Keep EN here, load AR dynamically or embed if needed)
    const langStrings = {
        en: {
            // Toggles & Units
            largeEggs: 'Large Eggs (room temp)',
            egg: 'large egg',        // <-- ADD THIS LINE
            eggs: 'large eggs',      // <-- ADD THIS LINE
            toggleArabic: 'عربي',
            toggleEnglish: 'English',
            unitMetric: 'Metric (g, ml)',
            unitImperial: 'Imperial (cups, tsp)',
            unitGrams: 'Grams (جرام)',
            unitCups: 'Cups (كوب)',
            // Butter Input
            butterVarTitle: 'Step 1: Define Your Butter Variable',
            butterVarDesc: 'All great experiments start with precise measurements. How much unsalted butter are you dedicating to this noble cause?',
            grams: 'grams',
            cups: 'cups',
            butterWarning: 'Please enter a valid butter amount (at least 100g or approx 1/2 cup).',
            beginExperiment: 'Begin Experiment!',
            // Cookie Selection
            phenotypeTitle: 'Step 2: Choose Your Cookie Phenotype',
            phenotypeDesc: 'Select the textural outcome you wish to investigate:',
            thinTitle: 'Thin & Crispy Cracker', thinDesc: 'Delicate, snappy, maximum spread.',
            classicTitle: 'Classic Balanced Specimen', classicDesc: 'Chewy center, crisp edges. The crowd-pleaser.',
            thickTitle: 'Thick & Gooey Behemoth', thickDesc: 'Soft, decadent, minimal spread. Pure indulgence.',
            // Recipe Display
            recipeTitle: '{cookieName} Recipe', // Placeholder
            prepTitle: 'Preparatory Techniques',
            ingredientsTitle: 'Calculated Ingredients',
            approxYield: 'Approximate Yield:',
            cookies: 'cookies', // Plural
            cookie: 'cookie', // Singular
            largeCookies: 'large cookies',
            largeCookie: 'large cookie',
            stepsTitle: 'Methodology (The Steps)',
            proTipsTitle: 'Scientist\'s Notes (Pro Tips)',
            // Ingredient Names
            unsaltedButter: 'Unsalted Butter', granulatedSugar: 'Granulated Sugar', lightBrownSugar: 'Light Brown Sugar (packed)', toastedMilkPowder: 'Toasted Milk Powder', largeEggs: 'Large Eggs (room temp)', vanillaExtract: 'Vanilla Extract', allPurposeFlour: 'All-Purpose Flour (spooned & leveled)', tableSalt: 'Table Salt', bakingPowder: 'Baking Powder (fresh!)', bakingSoda: 'Baking Soda (fresh!)', chocolateChips: 'Chocolate Chips/Chunks', prepWater: 'Water/Milk (for hydration)',
            // Prep Techniques
            prepTechTitle_brownButter: 'How to Brown Butter (Liquid Gold!)',
            prepTechDesc_brownButter: `The Maillard reaction isn't just for steak! Melting butter cooks the milk solids, creating hundreds of nutty, toasty, butterscotch-like flavor compounds.
                                     <br>1. Cut butter into pieces in a light-colored saucepan.
                                     <br>2. Melt on medium heat, it'll foam (water evaporating). Swirl/stir gently.
                                     <br>3. Keep heating & swirling. Milk solids sink and turn golden, then nutty brown (like toasted hazelnuts). Aroma becomes intensely nutty. Takes 5-10 mins.
                                     <br>4. IMMEDIATELY pour into a heatproof bowl (including brown bits) to stop cooking. The line between brown and burnt is thin!`,
            prepTechTitle_hydrateButter: 'Optional: Rehydrate Your Butter',
            prepTechDesc_hydrateButter: `Browning evaporates water (~15-20% of butter). Adding a little back *after* browning but *before* chilling helps maintain dough moisture balance, potentially boosting chewiness. Stir in gently until incorporated. (Amount calculated below).`,
            prepTechTitle_chillButterClassicThick: 'Chill Factor: Solidify for Creaming',
            prepTechDesc_chillButterClassicThick: `Why chill? Browning melts the butter's fat crystals, essential for creaming (trapping air with sugar for lift). We need to rebuild that structure!
                                                <br>1. Cool browned (and maybe hydrated) butter slightly (~5-10 min).
                                                <br>2. Refrigerate until solid but pliable – like cool modeling clay. Not rock hard! (~1-2 hours). Aim for 60-65°F (16-18°C). This state is CRITICAL for the Classic/Thick creaming method.`,
            prepTechTitle_chillButterThin: 'Chill Factor: Cool for Reverse Creaming',
             prepTechDesc_chillButterThin: `For Thin/Crispy using reverse creaming, we need the butter cool but still workable to coat the flour.
                                             <br>1. Cool browned (and maybe hydrated) butter to room temp then refrigerate briefly until just solidified but still easy to cut/break apart (~30-60 min). Aim for slightly firmer than room temp, around 65-68°F (18-20°C). It needs to be cool enough to coat flour particles without melting instantly.`,
            prepTechTitle_toastMilkPowder: 'Flavor Amplifier: Toast Milk Powder',
            prepTechDesc_toastMilkPowder: `Intensifies nutty/malty notes by browning milk sugars/proteins (more Maillard!). Adds depth, especially noticeable in the Thick cookie.
                                         <br>1. Spread Non-Fat Dry Milk Powder thinly on a parchment-lined sheet OR in a dry skillet.
                                         <br>2. Oven: Bake at 250°F (120°C) for 10-15 mins, stirring every 5. Skillet: Heat on medium-low, stirring CONSTANTLY.
                                         <br>3. Watch closely! It turns golden brown and fragrant quickly. Prevent burning.
                                         <br>4. Cool completely before using.`,
            // Notes & Steps (Placeholders - will be filled based on recipe)
            classicNotes: `Classic balance relies on the 1:1 sugar ratio, combined leavening for moderate lift/spread, and PERFECT creaming. Don't skimp on chilling or creaming time! Butter temp (60-65°F) is non-negotiable.`,
            classicSteps: `1. **Prep:** Whisk flour, salt, baking powder, soda. Line baking sheets. Ensure butter is chilled pliable (60-65°F), eggs room temp.
                           2. **Cream:** Beat chilled brown butter & sugars on med-high speed for a FULL 5 mins until light, fluffy, increased volume (this is key!). Scrape bowl.
                           3. **Add Wet:** Low speed. Add eggs one by one, mixing *just* until combined. Mix in vanilla with last egg. Don't overmix!
                           4. **Add Dry:** Lowest speed. Add flour mix gradually, mixing *only* until streaks disappear. Finish by hand if needed to avoid toughness.
                           5. **Fold:** Gently fold in chocolate chips with a spatula.
                           6. **Chill (Recommended):** Cover dough, refrigerate 30-60 mins minimum (up to 48 hrs for deeper flavor). Solidifies fat, hydrates flour.
                           7. **Scoop & Bake:** Preheat 375°F (190°C). Scoop ~2 Tbsp balls onto sheets, 2 inches apart. Bake 10-12 mins, until edges golden, center soft/puffy. Rotate sheet halfway.
                           8. **Cool:** Cool on sheet 3-5 mins (critical setting time!), then transfer to wire rack.`,
            thickNotes: `Thickness demands fighting spread! High brown sugar, NO soda, MANDATORY long chill are key. Moderate creaming prevents collapse. Toasted milk powder adds nutty depth and subtle chew. Embrace the underbake for ultimate goo!`,
            thickSteps: `1. **Prep:** Whisk flour, toasted milk powder, salt, baking powder. Line sheets. Ensure butter chilled pliable (60-65°F), eggs room temp.
                         2. **Cream (Moderately):** Beat chilled brown butter & sugars on medium speed ~2-3 mins until combined and creamy (NOT super light/fluffy like classic). Scrape bowl. Avoid over-aerating.
                         3. **Add Wet:** Low speed. Add eggs one by one, just until combined. Mix in vanilla.
                         4. **Add Dry:** Lowest speed. Add flour mix in 4-5 additions, mixing until *almost* combined (few streaks ok). Minimizes gluten.
                         5. **Fold:** Add massive amount of chocolate. Use sturdy spatula/hands to fold, incorporating final flour bits. Dough will be THICK. Do not overmix.
                         6. **MANDATORY Chill:** Divide dough into LARGE balls (4-6 oz / 113-170g each). Roll tall. Wrap tightly. Refrigerate MINIMUM 4 hours, ideally 12-72 hours. DO NOT SKIP/SHORTEN.
                         7. **Bake COLD:** Preheat 350°F (180°C). Place COLD dough balls far apart on sheet. Do NOT flatten. Bake 18-25 mins (depends on size). Edges set, center very soft, slightly gooey, maybe underbaked. (Internal temp 175-185°F / 79-85°C is a good target). Rotate sheet halfway.
                         8. **Cool CAREFULLY:** Cool on sheet 10-15 MINUTES. They are delicate! Transfer gently to wire rack. Best enjoyed warm (but not molten hot!).`,
             thinNotes: `Crispiness = Maximum Spread + Minimum Gluten. High granulated sugar, high baking soda (alkalinity boosts browning/spread), and reverse creaming (coats flour with fat first) are crucial. NO chilling! Bake thoroughly.`,
             thinSteps: `1. **Prep:** Line sheets. Ensure butter is cool but pliable (65-68°F / 18-20°C), cut into small pieces. Eggs room temp. Whisk eggs & vanilla in small bowl.
                         2. **Reverse Cream:** In mixer bowl, combine flour, sugars, salt, baking soda. Mix briefly. Add cool butter pieces. Mix on low until mixture resembles coarse, damp sand/crumbs (butter worked in, coating flour). Takes a few mins.
                         3. **Combine Wet/Dry:** Mixer on low. Gradually stream in egg/vanilla mixture. Mix *only* until a cohesive dough just forms. It might look crumbly first. DO NOT OVERMIX. Tenderness is key.
                         4. **Fold:** Gently fold in finely chopped chocolate or mini chips with spatula. Minimal strokes.
                         5. **Scoop & Bake IMMEDIATELY:** Do NOT chill! Preheat 350°F (175°C). Scoop small portions (~1 Tbsp) onto sheets, leaving PLENTY of space (3+ inches) – they spread a LOT!
                         6. **Bake for Crispness:** Bake 12-16 mins until spread thin and uniformly golden brown edge-to-center. May look slightly puffy in middle but will flatten on cooling. Rotate sheet halfway. Slight overbaking is OK for crispness.
                         7. **Cool COMPLETELY:** Cool on sheet 5-10 mins until firm enough to move. Transfer to wire rack to cool completely. Full crispness develops upon cooling as sugars recrystallize.`,
            // Easter Egg & Recs
            stuffedTitle: 'SECRET LEVEL UNLOCKED!',
            stuffedCongrats: 'Congratulations, Legend! Choosing the Thick & Gooey path reveals ultimate potential. You can STUFF these behemoths!',
            stuffedHowTo: 'How? Flatten a dough ball slightly, make a dent, add ~1 tsp of Nutella or Pistachio Spread, wrap the dough around it, seal, and bake as directed (maybe add 1-2 min).',
            pistachioTipTitle: 'Pro Pistachio Recommendation:',
            pistachioTipDesc: "Forget watery imitations! For that INTENSE, straight-up pistachio flavour that tastes like liquid gold, I HIGHLY recommend 'ASM Foods Pistachio Cream'. It's ridiculously good. Seriously.",
            pistachioTipLink: 'Check it out here (Egypt Link)',
            chocoTipTitle: 'Chocolate Chip Science:',
            chocoTipDesc: "Not all chocolate chips are created equal! For that melt-in-your-mouth, nostalgic flavour reminiscent of the good stuff (like Galaxy/Dairy Milk, but BETTER because #Boycott!), hunt down 'Target Kualety Dropsy' MILK Chocolate. It's the sweet secret weapon.",
            chocoTipLink: 'Find them via suppliers like this (Facebook Link)',
            chocoTipMilk: 'Make SURE it\'s the MILK chocolate version for maximum deliciousness!',
            // Conclusion
            conclusionTitle: 'Experiment Complete!',
            conclusionDesc: 'Hypothesis confirmed: Brown butter cookies are superior. If you documented your delicious results, share the evidence!',
            conclusionTag: 'Tag me on Instagram:',
            conclusionGoForth: 'Go forth and bake scientifically!',
            footerText: 'Built with science, butter, and a little bit of code.',
            // --- ADD ARABIC TRANSLATIONS HERE ---
        },
        ar: {
            // Toggles & Units
            toggleArabic: 'عربي',
            toggleEnglish: 'English',
            unitMetric: 'متري (جم، مل)',
            unitImperial: 'إمبريالي (كوب، ملعقة)',
            unitGrams: 'جرامات (g)', // AR main unit G
            unitCups: 'أكواب (cups)', // AR secondary unit C
            largeEggs: 'بيض كبير (بدرجة حرارة الغرفة)',
            egg: 'بيضة كبيرة',       // <-- ADD THIS LINE
            eggs: 'بيضات كبيرة',     // <-- ADD THIS LINE
             // Butter Input
            butterVarTitle: 'الخطوة الأولى: تحديد متغير الزبدة',
            butterVarDesc: 'كل التجارب العظيمة تبدأ بقياسات دقيقة. كم جرام أو كوب من الزبدة (غير المملحة) ستخصص لهذا الهدف النبيل؟',
            grams: 'جرام',
            cups: 'كوب',
            butterWarning: 'من فضلك أدخل كمية زبدة صالحة (على الأقل 100 جرام أو حوالي نصف كوب).',
            beginExperiment: 'ابدأ التجربة!',
            // Cookie Selection
            phenotypeTitle: 'الخطوة الثانية: اختر النمط الظاهري للكوكيز',
            phenotypeDesc: 'اختر النتيجة الملمسية التي ترغب في استكشافها:',
            thinTitle: 'رقاقة مقرمشة ورقيقة', thinDesc: 'رقيقة، مقرمشة، أقصى انتشار.',
            classicTitle: 'عينة كلاسيكية متوازنة', classicDesc: 'مركز طري، أطراف مقرمشة. المفضلة للجماهير.',
            thickTitle: 'وحش سميك ولزج', thickDesc: 'طرية، فاخرة، أقل انتشار. متعة خالصة.',
            // Recipe Display
            recipeTitle: 'وصفة {cookieName}', // Placeholder
            prepTitle: 'التقنيات التحضيرية',
            ingredientsTitle: 'المكونات المحسوبة',
            approxYield: 'الكمية التقريبية:',
            cookies: 'كوكيز', // Plural
            cookie: 'كوكي', // Singular
            largeCookies: 'كوكيز كبيرة',
            largeCookie: 'كوكي كبيرة',
            stepsTitle: 'المنهجية (الخطوات)',
            proTipsTitle: 'ملاحظات العالِم (نصائح احترافية)',
            // Ingredient Names
            unsaltedButter: 'زبدة غير مملحة', granulatedSugar: 'سكر حبيبات', lightBrownSugar: 'سكر بني فاتح (مكبوس)', toastedMilkPowder: 'بودرة حليب محمصة', largeEggs: 'بيض كبير (بدرجة حرارة الغرفة)', vanillaExtract: 'مستخلص فانيليا', allPurposeFlour: 'دقيق متعدد الأغراض (مملوء بالملعقة وممسوح)', tableSalt: 'ملح طعام', bakingPowder: 'بيكنج بودر (طازج!)', bakingSoda: 'بيكنج صودا (طازجة!)', chocolateChips: 'حبيبات/قطع شوكولاتة', prepWater: 'ماء/حليب (للترطيب)',
             // Prep Techniques (Translate descriptions carefully)
             prepTechTitle_brownButter: 'كيفية تحمير الزبدة (الذهب السائل!)',
             prepTechDesc_brownButter: `تفاعل ميلارد ليس فقط للستيك! إذابة الزبدة تطهي المواد الصلبة في الحليب، مما يخلق المئات من مركبات النكهة الجوزية والمحمصة والتي تشبه حلوى الباترسكوتش.
                                      <br>١. قطع الزبدة إلى قطع في قدر فاتح اللون.
                                      <br>٢. أذبها على نار متوسطة، ستحدث رغوة (تبخر الماء). حرك القدر دائريًا أو قلّب برفق.
                                      <br>٣. استمر في التسخين والتحريك. المواد الصلبة في الحليب ستترسب وتتحول إلى ذهبية، ثم بنية جوزية (مثل البندق المحمص). الرائحة تصبح جوزية بشكل مكثف. يستغرق ٥-١٠ دقائق.
                                      <br>٤. فورًا صبها في وعاء مقاوم للحرارة (بما في ذلك البقع البنية) لوقف الطهي. الخط الفاصل بين البني والمحروق رفيع!`,
             prepTechTitle_hydrateButter: 'اختياري: إعادة ترطيب زبدتك',
             prepTechDesc_hydrateButter: `التحمير يسبب تبخر الماء (حوالي ١٥-٢٠٪ من الزبدة). إضافة القليل مرة أخرى *بعد* التحمير ولكن *قبل* التبريد يساعد في الحفاظ على توازن رطوبة العجين، مما قد يعزز المضغ. قلبه برفق حتى يتجانس. (الكمية محسوبة أدناه).`,
             prepTechTitle_chillButterClassicThick: 'عامل التبريد: التجميد للخفق (Creaming)',
             prepTechDesc_chillButterClassicThick: `لماذا نبرد؟ التحمير يذيب بلورات دهون الزبدة، وهي ضرورية للخفق (حبس الهواء مع السكر للرفع). نحتاج إلى إعادة بناء هذا الهيكل!
                                                 <br>١. برد الزبدة المحمرة (وربما المرطبة) قليلاً (حوالي ٥-١٠ دقائق).
                                                 <br>٢. ضعها في الثلاجة حتى تصبح صلبة ولكن مرنة - مثل طين النمذجة البارد. ليست صلبة كالصخر! (حوالي ١-٢ ساعة). استهدف درجة حرارة ٦٠-٦٥ فهرنهايت (١٦-١٨ درجة مئوية). هذه الحالة حاسمة لطريقة الخفق الكلاسيكية/السميكة.`,
            prepTechTitle_chillButterThin: 'عامل التبريد: التبريد للخفق العكسي (Reverse Creaming)',
             prepTechDesc_chillButterThin: `للكوكيز الرقيقة/المقرمشة باستخدام الخفق العكسي، نحتاج إلى أن تكون الزبدة باردة ولكن لا تزال قابلة للتشغيل لتغليف الدقيق.
                                              <br>١. برد الزبدة المحمرة (وربما المرطبة) إلى درجة حرارة الغرفة ثم ضعها في الثلاجة لفترة وجيزة حتى تتجمد قليلاً ولكن لا تزال سهلة التقطيع/التكسير (حوالي ٣٠-٦٠ دقيقة). استهدف أن تكون أصلب قليلاً من درجة حرارة الغرفة، حوالي ٦٥-٦٨ فهرنهايت (١٨-٢٠ درجة مئوية). يجب أن تكون باردة بما يكفي لتغليف جزيئات الدقيق دون الذوبان فوراً.`,
            prepTechTitle_toastMilkPowder: 'مُعزز النكهة: تحميص بودرة الحليب',
            prepTechDesc_toastMilkPowder: `يكثف النكهات الجوزية/المالتية عن طريق تحمير سكريات/بروتينات الحليب (المزيد من تفاعل ميلارد!). يضيف عمقًا، ملحوظ بشكل خاص في الكوكي السميك.
                                          <br>١. انشر بودرة الحليب الجاف خالي الدسم بطبقة رقيقة على صينية خبز مبطنة بورق زبدة أو في مقلاة جافة.
                                          <br>٢. الفرن: اخبز على درجة حرارة ٢٥٠ فهرنهايت (١٢٠ درجة مئوية) لمدة ١٠-١٥ دقيقة، مع التقليب كل ٥ دقائق. المقلاة: سخن على نار متوسطة-منخفضة، مع التقليب المستمر.
                                          <br>٣. راقب عن كثب! يتحول لونه إلى بني ذهبي ورائحته عطرة بسرعة. امنع الاحتراق.
                                          <br>٤. برده تمامًا قبل الاستخدام.`,
             // Notes & Steps (Translate carefully)
            classicNotes: `التوازن الكلاسيكي يعتمد على نسبة السكر 1:1، ومواد الرفع المزدوجة لرفع/انتشار معتدل، والخفق المثالي. لا تبخل بوقت التبريد أو الخفق! درجة حرارة الزبدة (16-18°م) غير قابلة للتفاوض.`,
            classicSteps: `١. **التجهيز:** اخلط الدقيق والملح والبيكنج بودر والصودا. بطّن صواني الخبز. تأكد من أن الزبدة مبردة ومرنة (16-18°م)، والبيض بدرجة حرارة الغرفة.
                           ٢. **الخفق:** اخفق الزبدة البنية المبردة والسكريات على سرعة متوسطة-عالية لمدة ٥ دقائق كاملة حتى يصبح الخليط خفيفًا وهشًا ويزداد حجمه (هذا هو المفتاح!). اكشط جوانب الوعاء.
                           ٣. **إضافة السوائل:** على سرعة منخفضة. أضف البيض واحدة تلو الأخرى، اخلط *فقط* حتى يتجانس. أضف الفانيليا مع البيضة الأخيرة. لا تفرط في الخلط!
                           ٤. **إضافة الجاف:** على أقل سرعة. أضف خليط الدقيق تدريجيًا، اخلط *فقط* حتى تختفي خطوط الدقيق. أكمل باليد إذا لزم الأمر لتجنب القساوة.
                           ٥. **الطي:** اطوِ حبيبات الشوكولاتة برفق باستخدام ملعقة مسطحة.
                           ٦. **التبريد (موصى به):** غطِ العجين، ضعه في الثلاجة لمدة 30-60 دقيقة على الأقل (حتى 48 ساعة لنكهة أعمق). يجمد الدهون ويرطب الدقيق.
                           ٧. **التشكيل والخبز:** سخن الفرن إلى 190°م (375°ف). شكّل كرات بحجم 2 ملعقة كبيرة تقريبًا على الصواني، متباعدة بمقدار 2 بوصة. اخبز لمدة 10-12 دقيقة، حتى تصبح الأطراف ذهبية والمركز طريًا/منتفخًا. أدر الصينية في منتصف الوقت.
                           ٨. **التبريد:** برد على الصينية لمدة 3-5 دقائق (وقت التماسك الحرج!)، ثم انقلها إلى رف سلكي.`,
            thickNotes: `السماكة تتطلب محاربة الانتشار! السكر البني العالي، عدم وجود صودا، والتبريد الطويل الإلزامي هي المفتاح. الخفق المعتدل يمنع الانهيار. بودرة الحليب المحمصة تضيف عمقًا جوزيًا ومضغًا خفيفًا. استمتع بعدم الخبز الكامل للحصول على أقصى لزوجة!`,
            thickSteps: `١. **التجهيز:** اخلط الدقيق وبودرة الحليب المحمصة والملح والبيكنج بودر. بطّن الصواني. تأكد من أن الزبدة مبردة ومرنة (16-18°م)، والبيض بدرجة حرارة الغرفة.
                         ٢. **الخفق (باعتدال):** اخفق الزبدة البنية المبردة والسكريات على سرعة متوسطة حوالي 2-3 دقائق حتى يتجانس ويصبح كريميًا (ليس خفيفًا وهشًا جدًا مثل الكلاسيكي). اكشط جوانب الوعاء. تجنب إدخال الكثير من الهواء.
                         ٣. **إضافة السوائل:** على سرعة منخفضة. أضف البيض واحدة تلو الأخرى، فقط حتى يتجانس. أضف الفانيليا.
                         ٤. **إضافة الجاف:** على أقل سرعة. أضف خليط الدقيق في 4-5 إضافات، اخلط حتى يصبح *شبه* متجانس (بعض الخطوط لا بأس بها). يقلل من تطور الجلوتين.
                         ٥. **الطي:** أضف كمية الشوكولاتة الضخمة. استخدم ملعقة مسطحة قوية/يديك للطي، مع دمج آخر بقايا الدقيق. سيكون العجين سميكًا جدًا. لا تفرط في الخلط.
                         ٦. **تبريد إلزامي:** قسم العجين إلى كرات كبيرة (4-6 أونصة / 113-170 جرام لكل منها). شكلها طويلة. غلفها بإحكام. ضعها في الثلاجة لمدة ٤ ساعات على الأقل، ويفضل 12-72 ساعة. لا تتخطى/تقصر هذه المدة.
                         ٧. **اخبز باردًا:** سخن الفرن إلى 180°م (350°ف). ضع كرات العجين الباردة متباعدة على الصينية. لا تبططها. اخبز لمدة 18-25 دقيقة (حسب الحجم). يجب أن تكون الأطراف متماسكة، والمركز طريًا جدًا، ولزجًا قليلاً، وربما غير مكتمل النضج. (درجة الحرارة الداخلية 175-185°ف / 79-85°م هدف جيد). أدر الصينية في منتصف الوقت.
                         ٨. **برد بحذر:** برد على الصينية لمدة ١٠-١٥ دقيقة. إنها هشة! انقلها برفق إلى رف سلكي. الأفضل الاستمتاع بها دافئة (ولكن ليست ساخنة منصهرة!).`,
             thinNotes: `القرمشة = أقصى انتشار + أدنى جلوتين. السكر الأبيض العالي، البيكنج صودا العالية (القلوية تعزز التحمير/الانتشار)، والخفق العكسي (تغليف الدقيق بالدهون أولاً) أمور حاسمة. لا تبريد! اخبز جيدًا.`,
             thinSteps: `١. **التجهيز:** بطّن الصواني. تأكد من أن الزبدة باردة ولكن مرنة (18-20°م / 65-68°ف)، مقطعة إلى قطع صغيرة. البيض بدرجة حرارة الغرفة. اخفق البيض والفانيليا في وعاء صغير.
                         ٢. **الخفق العكسي:** في وعاء الخلاط، اخلط الدقيق والسكريات والملح والبيكنج صودا. اخلط قليلاً. أضف قطع الزبدة الباردة. اخلط على سرعة منخفضة حتى يشبه الخليط رملًا خشنًا ورطبًا/فتاتًا (الزبدة مدمجة، تغلف الدقيق). يستغرق بضع دقائق.
                         ٣. **دمج السوائل/الجاف:** الخلاط على سرعة منخفضة. أضف خليط البيض/الفانيليا تدريجيًا. اخلط *فقط* حتى تتكون عجينة متماسكة بالكاد. قد تبدو مفتتة في البداية. لا تفرط في الخلط. الطراوة هي المفتاح.
                         ٤. **الطي:** اطوِ الشوكولاتة المفرومة ناعمًا أو الحبيبات الصغيرة برفق باستخدام ملعقة مسطحة. بأقل عدد من الحركات.
                         ٥. **التشكيل والخبز فورًا:** لا تبرد! سخن الفرن إلى 175°م (350°ف). شكّل أجزاء صغيرة (حوالي 1 ملعقة كبيرة) على الصواني، تاركًا مساحة كبيرة جدًا (3+ بوصات) - ستنتشر كثيرًا!
                         ٦. **اخبز للقرمشة:** اخبز لمدة 12-16 دقيقة حتى تنتشر رقيقة وتصبح ذهبية بنية بشكل موحد من الحافة إلى المركز. قد تبدو منتفخة قليلاً في المنتصف ولكنها ستسطح عند التبريد. أدر الصينية في منتصف الوقت. الخبز الزائد قليلاً مقبول للقرمشة.
                         ٧. **برد تمامًا:** برد على الصينية لمدة 5-10 دقائق حتى تتماسك بما يكفي لنقلها. انقلها إلى رف سلكي لتبرد تمامًا. تتطور القرمشة الكاملة عند التبريد حيث تتبلور السكريات مرة أخرى.`,
            // Easter Egg & Recs
            stuffedTitle: 'تم فتح مستوى سري!',
            stuffedCongrats: 'مبروك يا أسطورة! اختيارك للمسار السميك واللزج يكشف عن إمكانات فائقة. يمكنك حشو هذه الوحوش!',
            stuffedHowTo: 'إزاي؟ افرد كرة العجين قليلاً، اعمل فجوة، أضف حوالي ملعقة صغيرة نوتيلا أو زبدة فستق، لف العجين حولها، اقفلها كويس، واخبزها حسب التوجيهات (يمكن تحتاج دقيقة أو دقيقتين زيادة).',
            pistachioTipTitle: 'توصية فستق احترافية:',
            pistachioTipDesc: 'انسى الأنواع اللي طعمها خفيف أو مزيت! عشان طعم الفستق المركز الرهيب اللي كأنك بتاكل فستق سايح، أنا برشح بشدة "كريمة الفستق من ASM Foods". خطييييرة بجد.',
            pistachioTipLink: 'شوفها هنا (رابط مصر)',
            chocoTipTitle: 'علم حبيبات الشوكولاتة:',
            chocoTipDesc: 'مش كل الشوكليت شيبس زي بعض! عشان الطعم الدايب اللي بيفكرك بالأنواع الحلوة (زي جلاكسي وديري ميلك، بس أحسن عشان #مقاطعة)، دور على شوكولاتة "Target Kualety Dropsy" باللبن (MILK). ده السلاح السري الحلو.',
            chocoTipLink: 'ممكن تلاقيها عند موردين زي دول (رابط فيسبوك)',
            chocoTipMilk: 'اتأكد إنها النسخة اللي باللبن (MILK) عشان أقصى لذاذة!',
            // Conclusion
            conclusionTitle: 'التجربة اكتملت!',
            conclusionDesc: 'تم تأكيد الفرضية: كوكيز الزبدة البنية متفوقة. لو وثقت نتائجك اللذيذة، شارك الأدلة!',
            conclusionTag: 'اعمل لي تاج على انستجرام:',
            conclusionGoForth: 'انطلق واخبز علمياً!',
            footerText: 'صُنِع بالعلم، الزبدة، وشوية كود.',
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
       // Format ingredient amount based on unit system
    function formatIngredient(grams, unitType, lang, unitSystem) {
        const T = langStrings[lang]; // Translation helper
        let outputText = ''; // Use a single output variable

        // Special case for Eggs - Always show count
        if (unitType === 'egg') {
            let numEggs = Math.round(grams / GRAMS_PER_LARGE_EGG);
            if (numEggs < 1) numEggs = 1; // Ensure at least 1 egg if grams > 0
            // Use singular or plural from langStrings
            const eggUnitText = (numEggs === 1) ? T.egg : T.eggs;
            outputText = `${numEggs} ${eggUnitText}`;
            // Return immediately for eggs, bypassing other unit logic
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
                 if(unitType === 'prepWater') imperialUnit += ' water/milk';
                break;
             // case 'egg': Handled above and returns immediately
             //    break;
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
