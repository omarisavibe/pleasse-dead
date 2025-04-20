// Wrap in an IIFE (Immediately Invoked Function Expression) to avoid polluting global scope
(function() {
    'use strict'; // Enable strict mode

    document.addEventListener('DOMContentLoaded', () => {
        // --- Configuration & Constants ---
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
            GRAMS_PER_TBSP_MILK_POWDER: 7.5, // Refined slightly
            MIN_BUTTER_GRAMS: 100,
            DEFAULT_LANG: 'en',
            DEFAULT_UNIT_EN: 'metric', // 'metric' or 'imperial'
        };

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
            cookieOptions: document.querySelectorAll('.cookie-option'),
            stuffedEasterEgg: document.getElementById('stuffed-easter-egg'),
            chocolateRecommendation: document.getElementById('chocolate-recommendation'),
            langToggleButton: document.getElementById('lang-toggle'),
            unitToggleButton: document.getElementById('unit-toggle'),
        };

        // --- State Variables ---
        let state = {
            currentLanguage: CONFIG.DEFAULT_LANG,
            currentUnitSystemEN: CONFIG.DEFAULT_UNIT_EN, // Used only when language is 'en'
            baseButterGrams: 0,
            selectedCookieType: null,
        };

        // --- Base Recipes & Language Strings (Keep as is for brevity, could move to JSON) ---
        const baseRecipes = { /* ... Your existing baseRecipes object ... */
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
        const langStrings = { /* ... Your existing langStrings object ... */
           en: {
                 toggleArabic: 'عربي', toggleEnglish: 'English', unitMetric: 'Metric (g, ml)', unitImperial: 'Imperial (cups, tsp)', unitGrams: 'Grams (جرام)', unitCups: 'Cups (كوب)',
                butterVarTitle: "Step 1: The Butter Sitrep (Spill the Deets)", butterVarDesc: "Alright, real science needs real measurements. How much unsalted butter we talkin' for this glow-up?",
                grams: 'grams', cups: 'cups', butterWarning: "Bruh, enter a real amount (100g+ or like 1/2 cup min).", beginExperiment: "Let's Bake! 🔥",
                phenotypeTitle: "Step 2: Choose Your Fighter (Cookie Edition)", phenotypeDesc: "What's the vibe? Pick your endgame texture:",
                thinTitle: 'Crispy Bois (Max Snap)', thinDesc: 'Delicate, major crunch, spreads for days.',
                classicTitle: 'The OG Vibe (Balanced)', classicDesc: 'Chewy middle, crispy edges. Crowd fave, no cap.',
                thickTitle: 'THICC & Gooey Kings', thickDesc: 'Soft, mega decadent, barely spreads. Pure comfort.',
                recipeTitle: '{cookieName} Breakdown', approxYield: 'Makes Approx:', cookies: 'cookies', cookie: 'cookie', largeCookies: 'THICC cookies', largeCookie: 'THICC cookie',
                prepTitle: 'Prep School: Techniques', ingredientsTitle: 'Ingredient Rundown', stepsTitle: 'The Game Plan (Steps)', proTipsTitle: 'Pro Tips / Science Notes',
                unsaltedButter: 'Unsalted Butter', granulatedSugar: 'Granulated Sugar', lightBrownSugar: 'Light Brown Sugar (packed)', toastedMilkPowder: 'Toasted Milk Powder', largeEggs: 'Large Eggs (room temp)', vanillaExtract: 'Vanilla Extract', allPurposeFlour: 'All-Purpose Flour (spooned & leveled)', tableSalt: 'Table Salt', bakingPowder: 'Baking Powder (fresh!)', bakingSoda: 'Baking Soda (fresh!)', chocolateChips: 'Chocolate Chips/Chunks (Milk Preferred!)', prepWater: 'Water/Milk (for hydration)',
                prepTechTitle_brownButter: 'How to Brown Butter (Liquid Gold!)', prepTechDesc_brownButter: "The Maillard reaction isn't just for steak! Melting butter cooks the milk solids, creating nutty, toasty flavor compounds.<br>1. Cut butter, melt in light pan on medium. It'll foam (water burns off). Swirl often.<br>2. Keep heating/swirling. Milk solids sink, turn golden -> nutty brown (smells amazing). Takes 5-10 min.<br>3. Instantly pour ALL (bits included) into heatproof bowl to stop cooking. Burn line is thin!",
                prepTechTitle_hydrateButter: 'Optional: Hydrate Your Butter', prepTechDesc_hydrateButter: "Browning removes water. Adding back the calculated amount (see recipe) *after* browning, *before* chilling = moister dough, maybe chewier results. Stir in gently.",
                prepTechTitle_chillButterClassicThick: 'Chill Mode: Solidify for Creaming', prepTechDesc_chillButterClassicThick: "Why chill? Browning melts fat crystals needed to trap air w/ sugar for lift. Gotta rebuild!<br>1. Cool browned butter slightly (5-10min).<br>2. Fridge till solid but pliable (~1-2hrs). Aim for 60-65°F (16-18°C). Crucial for Classic/Thick!",
                prepTechTitle_chillButterThin: 'Chill Mode: Cool for Reverse Creaming', prepTechDesc_chillButterThin: "Thin/Crispy needs cool butter to coat flour without melting instantly.<br>1. Cool browned butter to room temp, fridge briefly till just solid but still workable (~30-60 min). Aim ~65-68°F (18-20°C).",
                prepTechTitle_toastMilkPowder: 'Flavor Boost: Toast Milk Powder', prepTechDesc_toastMilkPowder: "Intensifies nutty/malty notes (more Maillard!). Adds depth, esp. in Thickbois.<br>1. Spread Non-Fat Dry Milk powder thin on parchment OR dry skillet.<br>2. Oven: 250°F(120°C) 10-15min, stir often. Skillet: Med-low, stir CONSTANTLY.<br>3. Watch closely! Goes golden & fragrant fast. Don't burn.<br>4. Cool fully.",
                classicNotes: `The 1:1 sugar ratio, combo leavening (lift+spread), & PERFECT 5-min creaming are key. Butter temp (60-65°F/16-18°C) is critical. Chill dough 30min+ for better texture/flavor.`,
                classicSteps: `1. **Prep:** Whisk flour, salt, powder, soda. Line sheets. Butter chilled pliable, eggs room temp.\n2. **Cream:** Beat CHILLED butter & sugars med-high FULL 5 MIN till light, fluffy. Scrape.\n3. **Add Wet:** Low speed. Eggs 1 by 1 (just combined). Vanilla w/ last egg.\n4. **Add Dry:** Low speed. Add flour mix gradually, mix JUST till streaks gone. Don't overmix!\n5. **Fold:** Gently fold in choc chips.\n6. **Chill (Recommended):** Cover dough, fridge 30-60 min (or up to 48h).\n7. **Scoop & Bake:** Preheat 375°F(190°C). Scoop ~2 Tbsp balls, 2in apart. Bake 10-12min (edges gold, center soft). Rotate halfway.\n8. **Cool:** On sheet 5 min, then wire rack.`,
                thickNotes: `High brown sugar, NO soda, MANDATORY long chill fight spread. Moderate cream prevents collapse. Toasted milk powder = depth/chew. Embrace the slight underbake. Size matters.`,
                thickSteps: `1. **Prep:** Whisk flour, toasted milk powder, salt, powder. Line sheets. Butter chilled pliable, eggs room temp.\n2. **Cream (Moderately):** Beat butter & sugars med speed ~2-3min till combined/creamy (NOT fluffy). Scrape.\n3. **Add Wet:** Low speed. Eggs 1 by 1 (just combined). Vanilla.\n4. **Add Dry:** Low speed. Add flour mix in additions, mix till *almost* combined. Less gluten = better.\n5. **Fold:** Add TONS of chocolate. Fold gently w/ final flour bits. Dough = THICC.\n6. **MANDATORY Chill:** Shape LARGE balls (4-6oz / 113-170g), roll tall. Wrap tight. Fridge MIN 4 hrs, IDEAL 12-72h. DO. NOT. SKIP.\n7. **Bake COLD:** Preheat 350°F(180°C). Bake COLD dough balls far apart. NO FLATTEN. 18-25min (depends on size). Edges set, center soft/gooey (175-185°F / 79-85°C internal target). Rotate halfway.\n8. **Cool CAREFULLY:** On sheet 10-15 MIN! Very delicate. Transfer gently to rack. Best warm.`,
                thinNotes: `Crisp = Max Spread. High white sugar, high soda (alkaline = brown/spread), reverse cream (fat coats flour first). NO CHILL. Bake thoroughly. Small scoops, LOTS of space.`,
                thinSteps: `1. **Prep:** Line sheets. Butter cool/pliable (65-68°F/18-20°C), cut small. Eggs room temp. Whisk eggs & vanilla.\n2. **Reverse Cream:** Mixer: combine flour, sugars, salt, soda. Add cool butter. Mix low till coarse damp crumbs (butter coats flour). Few mins.\n3. **Combine:** Low speed. Stream in egg/vanilla mix. Mix JUST till cohesive dough forms. DON'T OVERMIX.\n4. **Fold:** Gently fold in fine chopped/mini choc chips. Minimal strokes.\n5. **Scoop & Bake NOW:** NO CHILL! Preheat 350°F(175°C). Scoop SMALL (~1 Tbsp) balls, leave PLENTY (3+ in) space. Spread happens.\n6. **Bake Crispy:** Bake 12-16min till thin, uniform gold edge-to-center. Rotate halfway. Overbake slightly OK.\n7. **Cool FULLY:** On sheet 5-10 min till firm. Transfer to rack. Crispness develops upon full cooling.`,
                stuffedTitle: '✨ SECRET LEVEL UNLOCKED! ✨', stuffedCongrats: "Okay, Legend! Peeped the Thicc path? You get BONUS CONTENT: Stuff 'em!", stuffedHowTo: "How? Flatten dough, make dent, drop in ~1 tsp Nutella/Pistachio spread (IYKYK), wrap, seal, bake. Might need 1-2 extra mins. Easy.",
                pistachioTipTitle: 'Pistachio Spread Hot Take:', pistachioTipDesc: "Fr tho, ditch the watery pistachio stuff. You want that LIQUID GOLD flavor? 'ASM Foods Pistachio Cream' is IT. Seriously addictive.", pistachioTipLink: 'Cop it Here (Egypt Link)',
                chocoTipTitle: 'Choco Chip Deep Dive 🧐', chocoTipDesc: "Real talk: not all chips hit the same. For that melty, nostalgic vibe (iykyk, but better #BoycottFriendly), hunt down 'Target Kualety Dropsy' MILK Choc. It's the secret sauce, lowkey.", chocoTipLink: 'Find a supplier (FB Link)', chocoTipMilk: 'MAKE SURE it\'s the MILK one for max deliciousness, trust.',
                conclusionTitle: 'Mission Accomplished! (You Ate 💅)', conclusionDesc: 'Hypothesis: Brown butter slaps. Confirmed. Did you document the deliciousness? Flex on the \'gram!', conclusionTag: 'Tag me! ->', conclusionGoForth: 'Go forth and bake like the main character you are.',
                footerText: 'Built w/ science, butter & good vibes ✨'
             },
             ar: { /* ... Your existing Arabic translations ... */
                 toggleArabic: 'عربي', toggleEnglish: 'English', unitMetric: 'متري (جم، مل)', unitImperial: 'إمبريالي (كوب، ملعقة)', unitGrams: 'جرامات (g)', unitCups: 'أكواب (cups)',
                 butterVarTitle: 'الخطوة الأولى: تحديد متغير الزبدة', butterVarDesc: 'كل التجارب العظيمة تبدأ بقياسات دقيقة. كم جرام أو كوب من الزبدة (غير المملحة) ستخصص لهذا الهدف النبيل؟',
                grams: 'جرام', cups: 'كوب', butterWarning: 'من فضلك أدخل كمية زبدة صالحة (على الأقل 100 جرام أو حوالي نصف كوب).', beginExperiment: 'ابدأ التجربة!',
                 phenotypeTitle: 'الخطوة الثانية: اختر النمط الظاهري للكوكيز', phenotypeDesc: 'اختر النتيجة الملمسية التي ترغب في استكشافها:',
                 thinTitle: 'رقاقة مقرمشة ورقيقة', thinDesc: 'رقيقة، مقرمشة، أقصى انتشار.',
                classicTitle: 'عينة كلاسيكية متوازنة', classicDesc: 'مركز طري، أطراف مقرمشة. المفضلة للجماهير.',
                 thickTitle: 'وحش سميك ولزج', thickDesc: 'طرية، فاخرة، أقل انتشار. متعة خالصة.',
                recipeTitle: 'تفاصيل وصفة {cookieName}', approxYield: 'الكمية التقريبية:', cookies: 'كوكيز', cookie: 'كوكي', largeCookies: 'كوكيز عملاقة', largeCookie: 'كوكي عملاقة',
                 prepTitle: 'التقنيات التحضيرية', ingredientsTitle: 'قائمة المكونات', stepsTitle: 'المنهجية (الخطوات)', proTipsTitle: 'ملاحظات علمية / نصائح',
                unsaltedButter: 'زبدة غير مملحة', granulatedSugar: 'سكر حبيبات', lightBrownSugar: 'سكر بني فاتح (مكبوس)', toastedMilkPowder: 'بودرة حليب محمصة', largeEggs: 'بيض كبير (بحرارة الغرفة)', vanillaExtract: 'خلاصة فانيليا', allPurposeFlour: 'دقيق متعدد الأغراض (مملوء بالملعقة وممسوح)', tableSalt: 'ملح طعام', bakingPowder: 'بيكنج بودر (طازج!)', bakingSoda: 'بيكنج صودا (طازجة!)', chocolateChips: 'حبيبات/قطع شوكولاتة (يفضل بالحليب!)', prepWater: 'ماء/حليب (للترطيب)',
                 prepTechTitle_brownButter: 'كيفية تحمير الزبدة (الذهب السائل!)', prepTechDesc_brownButter: 'تفاعل ميلارد ليس للستيك فقط! إذابة الزبدة تطهي جوامد الحليب، مكونة نكهات جوزية ومحمصة.<br>١. قطع الزبدة، أذبها في قدر فاتح على حرارة متوسطة. سترغي (تبخر الماء). حرك باستمرار.<br>٢. استمر بالتحريك والتسخين. الجوامد تترسب وتتحول للذهبي -> البني الجوزي (رائحة رائعة). يستغرق ٥-١٠ دقائق.<br>٣. فوراً اسكب الكل (مع الرواسب) في وعاء مقاوم للحرارة لوقف الطهي. خط الاحتراق رفيع!',
                prepTechTitle_hydrateButter: 'اختياري: إعادة ترطيب زبدتك', prepTechDesc_hydrateButter: 'التحمير يزيل الماء. إضافة الكمية المحسوبة (انظر الوصفة) *بعد* التحمير و*قبل* التبريد = عجين أكثر رطوبة، وربما أمضغ. قلّب برفق.',
                prepTechTitle_chillButterClassicThick: 'التبريد: التجميد للخفق', prepTechDesc_chillButterClassicThick: 'لماذا؟ التحمير يذيب بلورات الدهن اللازمة لحبس الهواء مع السكر للرفع. يجب إعادة البناء!<br>١. برّد الزبدة المحمرة قليلاً (٥-١٠ دقائق).<br>٢. ثلاجة حتى تتجمد ولكن تبقى لينة (~١-٢ ساعة). الهدف ٦٠-٦٥°ف (١٦-١٨°م). أساسي للكلاسيك/السميك!',
                prepTechTitle_chillButterThin: 'التبريد: التبريد للخفق العكسي', prepTechDesc_chillButterThin: 'الرقيق/المقرمش يحتاج زبدة باردة لتغليف الدقيق دون الذوبان فوراً.<br>١. برّد الزبدة المحمرة لحرارة الغرفة، ثلاجة قليلاً حتى تتجمد بالكاد وتبقى قابلة للتشغيل (~٣٠-٦٠ دقيقة). الهدف ~٦٥-٦٨°ف (١٨-٢٠°م).',
                prepTechTitle_toastMilkPowder: 'تعزيز النكهة: تحميص بودرة الحليب', prepTechDesc_toastMilkPowder: 'يكثف النكهات الجوزية/المالتية (المزيد من ميلارد!). يضيف عمقاً، خاصة في السميك.<br>١. انشر بودرة الحليب الجاف خالي الدسم رقيقة على ورق زبدة أو مقلاة جافة.<br>٢. فرن: ٢٥٠°ف (١٢٠°م) ١٠-١٥د، قلب كثيراً. مقلاة: حرارة متوسطة-منخفضة، قلب باستمرار.<br>٣. راقب جيداً! يصبح ذهبياً وعطراً بسرعة. لا تحرقه.<br>٤. برّد تماماً.',
                classicNotes: 'نسبة السكر ١:١، مواد الرفع المزدوجة (رفع+انتشار)، والخفق المثالي لـ٥ دقائق هي المفتاح. حرارة الزبدة (١٦-١٨°م) حاسمة. برّد العجين ٣٠ دقيقة+ لملمس/نكهة أفضل.',
                 classicSteps: `١. **تجهيز:** اخلط الدقيق، الملح، البودر، الصودا. بطّن الصواني. الزبدة مبردة لينة، البيض بحرارة الغرفة.\n٢. **خفق:** اخفق الزبدة المبردة والسكريات بسرعة متوسطة-عالية لـ٥ دقائق كاملة حتى يصبح خفيفاً وهشاً. اكشط.\n٣. **إضافة الرطب:** سرعة منخفضة. البيض ١ تلو ١ (فقط يمتزج). الفانيليا مع آخر بيضة.\n٤. **إضافة الجاف:** سرعة منخفضة. أضف خليط الدقيق تدريجياً، اخلط فقط حتى تختفي الخطوط. لا تفرط بالخلط!\n٥. **طي:** اطوِ رقائق الشوكولاتة برفق.\n٦. **تبريد (مستحسن):** غط العجين، ثلاجة ٣٠-٦٠ دقيقة (أو حتى ٤٨ ساعة).\n٧. **تشكيل وخبز:** سخن الفرن ٣٧٥°ف(١٩٠°م). شكل كرات ~٢ م ك، تباعد ٢ بوصة. اخبز ١٠-١٢ دقيقة (الأطراف ذهبية، المركز طري). أدر الصينية.\n٨. **تبريد:** على الصينية ٥ دقائق، ثم رف سلكي.`,
                 thickNotes: 'سكر بني عالي، لا صودا، تبريد طويل إلزامي لمنع الانتشار. خفق معتدل يمنع الانهيار. بودرة حليب محمصة = عمق/مضغة. تقبل عدم الخبز الكامل قليلاً. الحجم مهم.',
                 thickSteps: `١. **تجهيز:** اخلط الدقيق، بودرة حليب محمصة، ملح، بودر. بطّن الصواني. الزبدة مبردة لينة، البيض بحرارة الغرفة.\n٢. **خفق (معتدل):** اخفق الزبدة والسكريات بسرعة متوسطة ~٢-٣ دقائق حتى يمتزجا/يكرما (ليس هشاً). اكشط.\n٣. **إضافة الرطب:** سرعة منخفضة. البيض ١ تلو ١ (فقط يمتزج). فانيليا.\n٤. **إضافة الجاف:** سرعة منخفضة. أضف خليط الدقيق دفعات، اخلط حتى *شبه* يمتزج. جلوتين أقل = أفضل.\n٥. **طي:** أضف كمية شوكولاتة ضخمة. اطوِ برفق مع بقايا الدقيق. العجين = سميك جداً.\n٦. **تبريد إلزامي:** شكل كرات كبيرة (٤-٦ أونصة / ١١٣-١٧٠ جرام)، طويلة الشكل. غلف بإحكام. ثلاجة على الأقل ٤ ساعات، مثالي ١٢-٧٢ ساعة. لا. تتخطى.\n٧. **اخبز باردًا:** سخن الفرن ٣٥٠°ف(١٨٠°م). اخبز كرات العجين الباردة متباعدة. لا تبطط. ١٨-٢٥ دقيقة (حسب الحجم). الأطراف متماسكة، المركز طري/لزج (هدف داخلي ١٧٥-١٨٥°ف / ٧٩-٨٥°م). أدر الصينية.\n٨. **برد بحذر:** على الصينية ١٠-١٥ دقيقة! هش جداً. انقل برفق للرف. أفضل وهي دافئة.`,
                 thinNotes: 'القرمشة = انتشار أقصى. سكر أبيض عالي، صودا عالية (قلوي = تحمير/انتشار)، خفق عكسي (الدهن يغلف الدقيق أولاً). لا تبريد. اخبز جيداً. كرات صغيرة، مسافة كبيرة جداً.',
                thinSteps: `١. **تجهيز:** بطّن الصواني. الزبدة باردة/لينة (٦٥-٦٨°ف/١٨-٢٠°م)، مقطعة صغيرة. بيض بحرارة الغرفة. اخفق البيض والفانيليا.\n٢. **خفق عكسي:** بالخلاط: اخلط الدقيق، السكريات، الملح، الصودا. أضف الزبدة الباردة. اخلط ببطء حتى يصبح كالفتات الرطب الخشن (الزبدة تغلف الدقيق). بضع دقائق.\n٣. **دمج:** سرعة منخفضة. اسكب خليط البيض/الفانيليا. اخلط فقط حتى تتكون عجينة متماسكة. لا تفرط بالخلط!\n٤. **طي:** اطوِ برفق الشوكولاتة المفرومة/الصغيرة. حركات قليلة.\n٥. **تشكيل واخبز الآن:** لا تبريد! سخن الفرن ٣٥٠°ف(١٧٥°م). شكل كرات صغيرة (~١ م ك)، اترك مساحة كبيرة جداً (٣+ بوصة). تنتشر.\n٦. **اخبز للقرمشة:** اخبز ١٢-١٦ دقيقة حتى تصبح رقيقة، ذهبية موحدة من الحافة للمركز. أدر الصينية. زيادة الخبز قليلاً مقبول.\n٧. **برد تمامًا:** على الصينية ٥-١٠ دقائق حتى تتماسك. انقل لرف سلكي. القرمشة تتطور عند التبريد الكامل.`,
                 stuffedTitle: '✨ تم فتح مستوى سري! ✨', stuffedCongrats: 'مبروك يا أسطورة! اختيارك للمسار السميك واللزج يكشف عن إمكانات فائقة. يمكنك حشو هذه الوحوش!', stuffedHowTo: 'إزاي؟ افرد كرة العجين قليلاً، اعمل فجوة، أضف حوالي ملعقة صغيرة نوتيلا أو زبدة فستق (فاهم عليا 😉)، لف العجين حولها، اقفلها كويس، واخبزها حسب التوجيهات (يمكن تحتاج دقيقة أو دقيقتين زيادة). سهلة.',
                 pistachioTipTitle: 'توصية فستق احترافية:', pistachioTipDesc: 'بجد، انسى الأنواع الخفيفة أو المزيّتة! عشان طعم الفستق المركز الرهيب اللي كأنه دهب سايح، أنا برشح بقوة "كريمة الفستق من ASM Foods". إدمان خطير.', pistachioTipLink: 'شوفها هنا (رابط مصر)',
                 chocoTipTitle: 'تفكيك شوكولاتة الشيبس 🧐:', chocoTipDesc: 'بصراحة: مش كل الشيبس زي بعض. عشان الطعم الدايب الحنيني (فاهم عليا، بس أحسن عشان #مقاطعة)، دور على شوكولاتة "Target Kualety Dropsy" باللبن (MILK). هي السر الحلو، بصوت واطي.', chocoTipLink: 'ممكن تلاقيها عند موردين زي دول (رابط فيسبوك)', chocoTipMilk: 'اتأكد إنها النسخة اللي باللبن (MILK) عشان أقصى لذاذة، ثق فيا.',
                 conclusionTitle: 'المهمة تمت! (خلصت عليهم 💅)', conclusionDesc: 'الفرضية: الزبدة البنية جامدة. تأكدت. صورت اللذاذة؟ اعمل فليكس ع الإنستا!', conclusionTag: 'اعملي تاج! ->', conclusionGoForth: 'انطلق واخبز كأنك بطل القصة.',
                 footerText: 'صُنع بالعلم، الزبدة، و طاقة إيجابية ✨'
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
            if (!base || !base.baseButter || base.baseButter <= 0) {
                console.error(`Invalid base recipe for type: ${cookieType}`);
                return null;
            }

            const scalingFactor = butterInGrams / base.baseButter;
            const scaledIngredients = {};
            let totalDoughWeight = 0;

            for (const key in base.ingredients) {
                const ingredientGrams = base.ingredients[key][0] * scalingFactor;
                scaledIngredients[key] = {
                    grams: ingredientGrams,
                    unitType: base.ingredients[key][1]
                };
                totalDoughWeight += ingredientGrams; // Sum grams for thick yield calc
            }

            let yieldValue;
            if (cookieType === 'thick' && base.cookieSizeGrams > 0) {
                // Yield based on target weight for thick cookies
                yieldValue = Math.max(1, Math.round(totalDoughWeight / base.cookieSizeGrams)); // Ensure at least 1
            } else if (base.yieldPerBase) {
                // Yield based on base recipe yield estimate
                yieldValue = Math.max(1, Math.round(base.yieldPerBase * scalingFactor)); // Ensure at least 1
            } else {
                yieldValue = 0; // Default if no yield info
            }

            return {
                ingredients: scaledIngredients,
                yield: yieldValue,
                notesKey: base.notes,
                stepsKey: base.steps,
                prepTechKeys: base.prepTech,
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
                const tolerance = 0.08; // Allow slight variation
                if (Math.abs(decimal - 1/8) < tolerance) return '⅛';
                if (Math.abs(decimal - 1/4) < tolerance) return '¼';
                if (Math.abs(decimal - 1/3) < tolerance) return '⅓';
                if (Math.abs(decimal - 3/8) < tolerance) return '⅜';
                if (Math.abs(decimal - 1/2) < tolerance) return '½';
                if (Math.abs(decimal - 5/8) < tolerance) return '⅝';
                if (Math.abs(decimal - 2/3) < tolerance) return '⅔';
                if (Math.abs(decimal - 3/4) < tolerance) return '¾';
                if (Math.abs(decimal - 7/8) < tolerance) return '⅞';
                return decimal.toFixed(1); // Fallback to one decimal place
            };

             // Helper to format whole numbers and fractions
            const formatMixedNumber = (value, unitSingular, unitPlural) => {
                if (value < 0.01) return `pinch`; // Treat very small as a pinch
                const whole = Math.floor(value);
                const fractional = value - whole;
                let amountStr = "";
                 if (whole > 0) {
                     amountStr += `${whole}`;
                }
                 if (fractional > tolerance) { // Add tolerance check for fractional part
                    if (whole > 0) amountStr += " "; // Add space between whole and fraction
                     amountStr += formatFraction(fractional);
                 }
                if (amountStr === "") amountStr = formatFraction(value); // Handle cases less than 1
                 const unit = value > (1 + tolerance) ? unitPlural : unitSingular; // Add tolerance for pluralization
                 return `${amountStr} ${unit}`;
             };

            const tolerance = 0.01; // Tolerance for checking small amounts

            switch (unitType) {
                case 'butter':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_BUTTER, 'cup butter', 'cups butter');
                case 'granulatedSugar':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_GRAN_SUGAR, 'cup sugar', 'cups sugar');
                case 'lightBrownSugar':
                     return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_BROWN_SUGAR, 'cup brown sugar', 'cups brown sugar');
                 case 'flour':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_FLOUR, 'cup flour', 'cups flour');
                case 'chocolate':
                     return formatMixedNumber(grams / CONFIG.GRAMS_PER_CUP_CHOC_CHIPS, 'cup chips', 'cups chips');
                case 'salt':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_SALT, 'tsp salt', 'tsps salt');
                 case 'bakingSoda':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_BAKING_SODA, 'tsp baking soda', 'tsps baking soda');
                 case 'bakingPowder':
                     return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_BAKING_POWDER, 'tsp baking powder', 'tsps baking powder');
                 case 'vanilla':
                    return formatMixedNumber(grams / CONFIG.GRAMS_PER_TSP_VANILLA, 'tsp vanilla', 'tsps vanilla');
                case 'prepWater': // Water/Milk for hydration
                    return formatMixedNumber(grams / 4.9, 'tsp water/milk', 'tsps water/milk'); // Approx 5g/tsp
                 case 'milkPowder':
                    const tbsp = grams / CONFIG.GRAMS_PER_TBSP_MILK_POWDER;
                    return formatMixedNumber(tbsp, 'Tbsp milk powder', 'Tbsp milk powder'); // Always Tbsp
                 case 'egg':
                     const numEggs = Math.max(1, Math.round(grams / CONFIG.GRAMS_PER_LARGE_EGG)); // Ensure at least 1 egg if calculated
                    return `${numEggs} large ${numEggs > 1 ? 'eggs' : 'egg'}`;
                 default:
                    console.warn("Unknown unitType for Imperial formatting:", unitType);
                     return `${Math.round(grams)} g`; // Fallback to grams
             }
        }


        /**
         * Formats an ingredient amount for display based on language and unit system.
         * @param {number} grams - Ingredient amount in grams.
         * @param {string} unitType - Type of ingredient ('flour', 'sugar', etc.).
         * @returns {string} HTML formatted string for the amount.
         */
        function formatIngredientAmount(grams, unitType) {
            const metricText = `${Math.round(grams)} ${T('grams')}`; // Use translated 'grams'

            if (state.currentLanguage === 'en') {
                return (state.currentUnitSystemEN === 'metric')
                    ? metricText
                    : formatImperial(grams, unitType);
            } else { // Arabic - Always show grams, add cups optionally
                 let cupsText = '';
                // Define types where cup conversion is meaningful
                 const cupTypes = ['butter', 'sugar', 'flour', 'chocolate', 'granulatedSugar', 'lightBrownSugar'];
                if (cupTypes.includes(unitType)) {
                    const cupEq =
                         unitType === 'butter' ? CONFIG.GRAMS_PER_CUP_BUTTER :
                        unitType === 'flour' ? CONFIG.GRAMS_PER_CUP_FLOUR :
                        unitType === 'granulatedSugar' ? CONFIG.GRAMS_PER_CUP_GRAN_SUGAR :
                        unitType === 'lightBrownSugar' ? CONFIG.GRAMS_PER_CUP_BROWN_SUGAR :
                        unitType === 'chocolate' ? CONFIG.GRAMS_PER_CUP_CHOC_CHIPS :
                        CONFIG.GRAMS_PER_CUP_GRAN_SUGAR; // Fallback
                     const cupsValue = (grams / cupEq);
                    // Only show cups if it's a reasonable amount (e.g., > 1/8 cup)
                    if (cupsValue > 0.1) {
                        const cupsFormatted = formatMixedNumber(cupsValue, T('cups'), T('cups')).replace('cups', '').replace('cup','').trim(); // Format number/fraction
                        cupsText = ` <span class="unit-cups">(${cupsFormatted} ${T('cups')})</span>`;
                    }
                 }
                return `<span class="unit-g">${metricText}</span>${cupsText}`;
             }
        }

        /**
         * Renders the calculated recipe into the DOM.
         * @param {object} recipeData - The scaled recipe object from calculateScaledRecipe.
         */
        function displayRecipe(recipeData) {
            if (!recipeData) {
                 console.error("Cannot display recipe: recipeData is null.");
                 // Optionally show an error message to the user
                return;
             }

            const cookieName = T(`${state.selectedCookieType}Title`);
             const yieldNum = recipeData.yield;
            let yieldLabelKey;
             if (state.selectedCookieType === 'thick') {
                yieldLabelKey = yieldNum === 1 ? 'largeCookie' : 'largeCookies';
             } else {
                 yieldLabelKey = yieldNum === 1 ? 'cookie' : 'cookies';
            }
             const yieldText = `${yieldNum} ${T(yieldLabelKey)}`;


            // Build Ingredients List (using DOM manipulation for safety, though strings faster)
             const ingredientsList = document.createElement('ul');
            for (const key in recipeData.ingredients) {
                const item = recipeData.ingredients[key];
                const ingredientName = T(key) || key; // Use translation or key
                const formattedAmount = formatIngredientAmount(item.grams, item.unitType);

                const li = document.createElement('li');
                // Use innerHTML carefully only for formatted amount which might contain spans
                li.innerHTML = `<strong>${formattedAmount}</strong> ${ingredientName}`;
                ingredientsList.appendChild(li);
             }

            // Build Prep Techniques
             let prepTechHtml = `<h3 class="prep-tech-title">${T('prepTitle')}</h3>`;
            recipeData.prepTechKeys.forEach(key => {
                 // Basic check if translation exists
                if (T(`prepTechTitle_${key}`) !== `prepTechTitle_${key}`) {
                     prepTechHtml += `<div class="pro-tip note">
                                        <h4>${T(`prepTechTitle_${key}`)}</h4>
                                         <p>${T(`prepTechDesc_${key}`)}</p>
                                      </div>`;
                } else {
                     console.warn(`Missing translation for prep technique: ${key}`);
                 }
            });

            // Build Steps List
             let stepsHtml = `<h3 class="steps-title">${T('stepsTitle')}</h3><ol>`;
             const stepsString = T(recipeData.stepsKey);
            if (stepsString !== recipeData.stepsKey) { // Check if step translation exists
                 const stepsArray = stepsString.split('\n');
                stepsArray.forEach(step => {
                     if (step.trim()) {
                        // Format bold text: **text** -> <strong>text</strong>
                        let formattedStep = step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        // Remove leading list markers like '1.' if they exist
                        stepsHtml += `<li>${formattedStep.replace(/^\s*\d+\.\s*/, '')}</li>`;
                     }
                 });
             } else {
                 console.warn(`Missing translation for steps: ${recipeData.stepsKey}`);
                 stepsHtml += `<li>${T('error_missing_steps')}</li>`; // Add placeholder error message
             }
            stepsHtml += `</ol>`;

            // Build Notes
            let notesHtml = '';
            const notesString = T(recipeData.notesKey);
             if (notesString !== recipeData.notesKey) { // Check if translation exists
                notesHtml = `<div class="pro-tip"><h4>${T('proTipsTitle')}</h4><p>${notesString}</p></div>`;
             } else {
                 console.warn(`Missing translation for notes: ${recipeData.notesKey}`);
            }


            // Update Recipe Content Section
            DOMElements.recipeContent.innerHTML = `
                 <h2>${T('recipeTitle').replace('{cookieName}', cookieName)}</h2>
                <p class="recipe-yield">${T('approxYield')} ${yieldText}</p>
                <!-- Ingredients will be appended below -->
                 ${prepTechHtml}
                 ${stepsHtml}
                 ${notesHtml}
            `;
             // Append the ingredient list (built with DOM methods)
            const ingredientsHeader = DOMElements.recipeContent.querySelector('.recipe-yield').nextElementSibling; // Find element after yield
            DOMElements.recipeContent.insertBefore(document.createElement('h3'), ingredientsHeader).outerHTML = `<h3 class="ingredients-title">${T('ingredientsTitle')}</h3>`; // Add title
            DOMElements.recipeContent.insertBefore(ingredientsList, ingredientsHeader); // Insert UL

            // Show/Hide Sections
            DOMElements.stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
             DOMElements.chocolateRecommendation.style.display = 'block'; // Always show general tip
            DOMElements.recipeDisplaySection.style.display = 'block';

            // Apply language translations to static text within these revealed sections
             updateLanguageContent(DOMElements.recipeDisplaySection);
            updateLanguageContent(DOMElements.stuffedEasterEgg);
             updateLanguageContent(DOMElements.chocolateRecommendation);


            // Smooth scroll to the recipe
             DOMElements.recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }


        /**
         * Updates text content based on the current language.
         * @param {Element} [parentElement=document.body] - The container element to update.
         */
        function updateLanguageContent(parentElement = document.body) {
            const elements = parentElement.querySelectorAll('[data-en]'); // Find elements with translations

            elements.forEach(el => {
                const langKey = state.currentLanguage; // 'en' or 'ar'
                if (el.dataset[langKey]) {
                    // Use innerHTML as data attributes might contain HTML (like <br>)
                    if (el.tagName === 'INPUT' && el.placeholder) {
                        el.placeholder = el.dataset[langKey];
                    } else if (el.tagName === 'OPTION' && el.value) {
                         el.textContent = el.dataset[langKey]; // Update option text
                    } else {
                         el.innerHTML = el.dataset[langKey];
                     }
                } else {
                    // Optional: Log warning if translation is missing for current lang
                     // console.warn(`Missing translation for ${langKey}:`, el);
                 }
            });

             // Update non-data attribute elements (like buttons)
            if (parentElement === document.body) { // Only update global buttons if updating whole body
                DOMElements.langToggleButton.textContent = T(state.currentLanguage === 'en' ? 'toggleArabic' : 'toggleEnglish');
                updateUnitButtonVisuals(); // Update unit button text and visibility

                 // Update <select> options for butter unit explicitly if needed
                 const butterUnitOptions = DOMElements.butterUnitSelect.options;
                 for (let i = 0; i < butterUnitOptions.length; i++) {
                     const option = butterUnitOptions[i];
                     option.textContent = T(option.value); // e.g., T('grams'), T('cups')
                 }
            }

             // Set page direction
             DOMElements.htmlElement.setAttribute('dir', state.currentLanguage === 'ar' ? 'rtl' : 'ltr');
        }

        /** Updates unit button text and visibility based on language */
         function updateUnitButtonVisuals() {
             if (state.currentLanguage === 'en') {
                 DOMElements.unitToggleButton.textContent = T(state.currentUnitSystemEN === 'metric' ? 'unitImperial' : 'unitMetric');
                 DOMElements.unitToggleButton.style.display = 'inline-block'; // Show toggle for EN
                 // Hide butter unit select if EN/Imperial
                 DOMElements.butterUnitSelect.style.display = state.currentUnitSystemEN === 'imperial' ? 'none' : 'inline-block';
             } else {
                // ARABIC: Hide the Metric/Imperial toggle button as formatting handles both
                DOMElements.unitToggleButton.style.display = 'none';
                DOMElements.butterUnitSelect.style.display = 'inline-block'; // Always show grams/cups select
            }
        }

         /** Handles language toggle */
         function handleLanguageToggle() {
            state.currentLanguage = (state.currentLanguage === 'en') ? 'ar' : 'en';
             // When switching language, EN defaults to metric, AR has no explicit system toggle needed
             if (state.currentLanguage === 'en') {
                 state.currentUnitSystemEN = CONFIG.DEFAULT_UNIT_EN; // Reset EN to default
             }

            updateLanguageContent(); // Update all text on page

             // Re-display recipe if one is selected to apply new lang/units
             if (state.selectedCookieType && state.baseButterGrams > 0) {
                 const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);
                 if (scaledRecipe) {
                    displayRecipe(scaledRecipe);
                 }
            }
             updateUnitButtonVisuals(); // Update button visibility/text AFTER content update
        }

        /** Handles unit system toggle (for English only) */
         function handleUnitToggle() {
             if (state.currentLanguage !== 'en') return; // Only functional for English

             state.currentUnitSystemEN = (state.currentUnitSystemEN === 'metric') ? 'imperial' : 'metric';
            updateUnitButtonVisuals(); // Update button text & butter unit select visibility

             // Re-display recipe with new unit formatting
            if (state.selectedCookieType && state.baseButterGrams > 0) {
                const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);
                 if (scaledRecipe) {
                    displayRecipe(scaledRecipe);
                 }
            }
        }


        /** Handles the click on the "Start Experiment" button */
         function handleStartExperiment() {
            const butterGrams = getValidatedButterGrams();
             if (butterGrams > 0) {
                state.baseButterGrams = butterGrams;
                DOMElements.cookieSelectionSection.style.display = 'block';
                // Smooth scroll to cookie selection
                DOMElements.cookieSelectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 // Hide recipe until a type is chosen
                DOMElements.recipeDisplaySection.style.display = 'none';
                DOMElements.stuffedEasterEgg.style.display = 'none';
                DOMElements.chocolateRecommendation.style.display = 'none';

                // Reset selection visuals
                DOMElements.cookieOptions.forEach(opt => opt.classList.remove('selected'));
                state.selectedCookieType = null; // Reset selected type
            }
        }

         /** Handles clicking on a cookie type option */
         function handleCookieSelection(event) {
            // Ensure the click is on the option div itself or its children
             const selectedOption = event.target.closest('.cookie-option');
             if (!selectedOption) return;

            // Check if butter amount is entered first
            if (state.baseButterGrams <= 0) {
                 showWarning('butterWarning'); // Re-use butter warning
                return;
            }

            // Update selection visuals
            DOMElements.cookieOptions.forEach(opt => opt.classList.remove('selected'));
            selectedOption.classList.add('selected');

             // Get cookie type and calculate/display recipe
            state.selectedCookieType = selectedOption.dataset.cookieType;
            if (!state.selectedCookieType) {
                 console.error("Selected cookie option is missing 'data-cookie-type' attribute.");
                return;
            }

            const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);
            if (scaledRecipe) {
                 displayRecipe(scaledRecipe);
             } else {
                 // Handle error case where calculation failed (e.g., show error message)
                 console.error(`Failed to calculate recipe for type: ${state.selectedCookieType}`);
                 // Maybe display a simple error in the recipe area
                 DOMElements.recipeContent.innerHTML = `<p class="warning">${T('error_calculating_recipe')}</p>`;
                 DOMElements.recipeDisplaySection.style.display = 'block';
            }
         }


        // --- Event Listeners ---
        DOMElements.startExperimentBtn.addEventListener('click', handleStartExperiment);

         // Hide warning instantly when user types or changes unit
         DOMElements.butterAmountInput.addEventListener('input', hideWarning);
         DOMElements.butterUnitSelect.addEventListener('change', hideWarning);

         // Use event delegation for cookie option clicks
         DOMElements.cookieSelectionSection.addEventListener('click', handleCookieSelection);

        DOMElements.langToggleButton.addEventListener('click', handleLanguageToggle);
        DOMElements.unitToggleButton.addEventListener('click', handleUnitToggle);


        // --- Initial Setup ---
        updateLanguageContent(); // Set initial language/texts
        updateUnitButtonVisuals(); // Set initial button states

    }); // End DOMContentLoaded

}()); // End IIFE
