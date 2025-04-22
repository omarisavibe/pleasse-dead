document.addEventListener('DOMContentLoaded', () => {
    // --- Constants ---
    const GRAMS_PER_CUP_BUTTER = 226.8;
    const GRAMS_PER_CUP_FLOUR = 125;
    const GRAMS_PER_CUP_GRAN_SUGAR = 200;
    const GRAMS_PER_CUP_BROWN_SUGAR = 213; // Packed
    const GRAMS_PER_TSP_SALT = 6;
    const GRAMS_PER_TSP_BAKING_SODA = 4.8;
    const GRAMS_PER_TSP_BAKING_POWDER = 4;
    const GRAMS_PER_LARGE_EGG = 50;
    const GRAMS_PER_TSP_VANILLA = 4.2;
    const GRAMS_PER_CUP_CHOC_CHIPS = 170;
    const GRAMS_PER_TBSP_MILK_POWDER = 7;
    const GRAMS_PER_TSP_WATER = 4.9; // Approx 5g/tsp

    // --- Base Recipes (Grams) ---
    const baseRecipes = {
        classic: {
            baseButter: 284, yieldPerBase: 30,
            ingredients: {
                granulatedSugar: [200, 'sugar'], lightBrownSugar: [200, 'sugar'], largeEggs: [100, 'egg'], vanillaExtract: [8.4, 'vanilla'], allPurposeFlour: [420, 'flour'], tableSalt: [6, 'salt'], bakingPowder: [4, 'bakingPowder'], bakingSoda: [2.4, 'bakingSoda'], chocolateChips: [454, 'chocolate'], prepWater: [9.4, 'water']
            }, notes: 'classicNotes', prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick'], steps: 'classicSteps'
        },
        thick: {
            baseButter: 284, yieldPerBase: 10, cookieSizeGrams: 140,
            ingredients: {
                granulatedSugar: [100, 'sugar'], lightBrownSugar: [200, 'sugar'], toastedMilkPowder: [15, 'milkPowder'], largeEggs: [100, 'egg'], vanillaExtract: [8.4, 'vanilla'], allPurposeFlour: [420, 'flour'], tableSalt: [6, 'salt'], bakingPowder: [5, 'bakingPowder'], /* NO Baking Soda */ chocolateChips: [567, 'chocolate'], prepWater: [9.4, 'water']
            }, notes: 'thickNotes', prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick', 'toastMilkPowder'], steps: 'thickSteps'
        },
        thin: {
            baseButter: 284, yieldPerBase: 42,
            ingredients: {
                granulatedSugar: [300, 'sugar'], lightBrownSugar: [200, 'sugar'], largeEggs: [100, 'egg'], vanillaExtract: [8.4, 'vanilla'], allPurposeFlour: [420, 'flour'], tableSalt: [6, 'salt'], bakingSoda: [7.2, 'bakingSoda'], /* NO Baking Powder */ chocolateChips: [340, 'chocolate'], prepWater: [9.4, 'water']
            }, notes: 'thinNotes', prepTech: ['brownButter', 'hydrateButter', 'chillButterThin'], steps: 'thinSteps'
        }
    };

    // --- Language Strings ---
    const langStrings = {
        en: {
            // Toggles & Units
            toggleArabic: 'عربي', toggleEnglish: 'English', unitMetric: 'Switch to Imperial (cups, tsp)', unitImperial: 'Switch to Metric (g, ml)', unitGrams: 'Grams (g)', unitCups: 'Cups (cups)',
            // Units Short
            cup: 'cup', cups: 'cups', tsp: 'tsp', tsps: 'tsps', Tbsp: 'Tbsp', Tbsps: 'Tbsp', // Tbsp often doesn't pluralize with 's'
            // Butter Input
            egg: 'egg', eggs: 'eggs', butterVarTitle: 'Step 1: Butter Up! 🧈', butterVarDesc: 'Great cookies need the perfect amount of butter. So, how much of this golden goodness are you using? Be precise, chef! 👩‍🍳', grams: 'grams', butterWarning: 'Yo, enter a valid butter amount (at least 100g or about 1/2 cup). Don’t leave me hanging! 🙃', beginExperiment: 'Let’s Bake! 🍪',
            // Cookie Selection
            phenotypeTitle: 'Step 2: Pick Your Cookie Vibe 🍪', phenotypeDesc: 'What kind of cookie are you feeling today? Choose your adventure:', thinTitle: 'The Crispy AF Cracker', thinDesc: 'So thin, it’s basically a cookie flex. Perfect for dunking or just flexing on your friends. 😎', classicTitle: 'The OG Balanced Baddie', classicDesc: 'Chewy, crispy, and always down to party. The crowd-pleaser that never misses. 🎉', thickTitle: 'The Thicc King', thickDesc: 'So gooey, it’ll make your taste buds do a happy dance. Pure indulgence, no cap. 💃',
            // Recipe Display
            recipeTitle: '{cookieName} Recipe', prepTitle: 'Prep Like a Pro', ingredientsTitle: 'Your Cookie Blueprint 🗺️', approxYield: 'You’ll get roughly', cookies: 'cookies', cookie: 'cookie', largeCookies: 'large cookies', largeCookie: 'large cookie', stepsTitle: 'Let’s Bake, Bestie! 👩‍🍳', proTipsTitle: 'Pro Tips from Your Cookie Sensei 🧠',
            // Ingredient Names
            unsaltedButter: 'Homemade Brown Butter 🧈', granulatedSugar: 'White Sugar 🍬', lightBrownSugar: 'Light Brown Sugar', toastedMilkPowder: 'Toasted Milk Powder (for that extra oomph) 🥛', largeEggs: 'Large Eggs (room temp, pls) 🥚', vanillaExtract: 'Vanilla Extract', allPurposeFlour: 'All-Purpose Flour', tableSalt: 'Salt (just a pinch) 🧂', bakingPowder: 'Baking Powder (fresh!)', bakingSoda: 'Baking Soda (fresh, duh!)', chocolateChips: 'Chocolate Chips/Chunks 🍫', prepWater: 'Water/Milk (for hydration, like your skin) 💧',
            // Prep Techniques (Shortened for brevity, assume full text is here)
            prepTechTitle_brownButter: 'Browning Butter 101: Turn that butter into liquid gold! 🧈✨', prepTechDesc_brownButter: `Melt butter, let milk solids toast to nutty brown (5-10 min). Pour out immediately. <br>1. Cut butter, melt med heat. <br>2. Foam subsides, solids sink & brown. <br>3. Nutty aroma? Pour into bowl (incl. bits).`,
            prepTechTitle_hydrateButter: 'Optional: Hydrate Your Butter 💦', prepTechDesc_hydrateButter: `Browning removes water. Add calculated amount back *after* browning, *before* chilling for moisture. Stir gently.`,
            prepTechTitle_chillButterClassicThick: 'Chill Factor: Solidify for Creaming ⏳', prepTechDesc_chillButterClassicThick: `Recrystallizes fat for creaming. <br>1. Cool browned butter slightly. <br>2. Refrigerate until solid but pliable (60-65°F / 16-18°C). Crucial for Classic/Thick. (~1-2 hrs).`,
            prepTechTitle_chillButterThin: 'Chill Factor: Cool for Reverse Creaming ❄️', prepTechDesc_chillButterThin: `For coating flour without instant melting. <br>1. Cool browned butter, refrigerate briefly until just solidified but cuttable (65-68°F / 18-20°C). (~30-60 min).`,
            prepTechTitle_toastMilkPowder: 'Flavor Amplifier: Toast Milk Powder 🔥', prepTechDesc_toastMilkPowder: `Intensifies nutty/malty notes. <br>1. Spread NFDM thin on sheet/skillet. <br>2. Oven: 250°F/120°C (10-15m, stir). Skillet: Med-low, stir constantly. <br>3. Watch closely! Golden brown & fragrant. Cool.`,
             // Notes & Steps (Shortened for brevity, assume full text is here)
            classicNotes: `Balance: 1:1 sugar, combined leavening, PERFECT creaming. Butter temp (60-65°F) is key.`,
            classicSteps: `**Prep:** Whisk dry. Line sheets. Butter chilled pliable, eggs room temp. \n**Cream:** Beat chilled butter & sugars med-high 5 FULL mins (light/fluffy). Scrape. \n**Add Wet:** Low speed. Eggs 1by1 (just combined). Vanilla. \n**Add Dry:** Lowest speed. Flour mix gradually (just combined). Finish by hand. \n**Fold:** Chocolate. \n**Chill (Recommended):** 30-60 min min (up to 48hr). \n**Scoop & Bake:** 375°F (190°C). ~2 Tbsp balls, 2in apart. 10-12 min (edges golden). Rotate. \n**Cool:** On sheet 3-5 min, then rack.`,
            thickNotes: `Thickness: Fight spread! High brown sugar, NO soda, MANDATORY long chill. Moderate cream. Toasted milk powder adds depth. Underbake for goo.`,
            thickSteps: `**Prep:** Whisk flour, milk powder, salt, baking powder. Line sheets. Butter chilled pliable, eggs room temp. \n**Cream (Moderately):** Beat chilled butter & sugars medium ~2-3 mins (creamy, NOT fluffy). Scrape. \n**Add Wet:** Low speed. Eggs 1by1 (just combined). Vanilla. \n**Add Dry:** Lowest speed. Flour mix 4-5 adds (almost combined). \n**Fold:** Chocolate (lots!). Use hands/spatula. Dough is THICK. \n**MANDATORY Chill:** LARGE balls (4-6oz/113-170g), roll tall. Wrap. Refrigerate MIN 4 hrs (ideal 12-72). \n**Bake COLD:** 350°F (180°C). Cold balls far apart. NO flatten. 18-25 min (edges set, center soft/gooey). Rotate. \n**Cool CAREFULLY:** On sheet 10-15 MIN, then rack gently.`,
            thinNotes: `Crispiness: Max Spread, Min Gluten. High granulated sugar, high soda, reverse cream. NO chill! Bake thoroughly.`,
            thinSteps: `**Prep:** Line sheets. Butter cool pliable (65-68°F), cut small. Eggs room temp. Whisk eggs/vanilla. \n**Reverse Cream:** Mixer: flour, sugars, salt, soda. Add cool butter. Low speed till coarse sand/crumbs. \n**Combine Wet/Dry:** Low speed. Stream in egg/vanilla mix (just forms cohesive dough). DO NOT OVERMIX. \n**Fold:** Finely chopped/mini chocolate. Minimal strokes. \n**Scoop & Bake IMMEDIATELY:** NO CHILL! 350°F (175°C). Small scoops (~1 Tbsp), PLENTY space (3+ in). \n**Bake for Crispness:** 12-16 min (thin, uniform golden). Rotate. \n**Cool COMPLETELY:** On sheet 5-10 min, then rack fully. Crispness develops on cooling.`,
            // Easter Egg & Recs
            stuffedTitle: 'YOU UNLOCKED THE SECRET SAUCE! 🎉', stuffedCongrats: 'Congrats, Legend! Choosing the Thick & Gooey path reveals ultimate potential. You can STUFF these behemoths!', stuffedHowTo: 'How? Flatten dough ball, dent, add ~1 tsp Nutella/Pistachio Spread, wrap, seal, bake (+1-2 min maybe).', pistachioTipTitle: 'Pro Pistachio Recommendation:', pistachioTipDesc: 'For INTENSE pistachio flavour, I HIGHLY recommend "ASM Foods Pistachio Cream". Ridiculously good.', pistachioTipLink: 'Check it out here (Egypt Link)', chocoTipTitle: 'Chocolate Chip Science:', chocoTipDesc: 'For melt-in-your-mouth nostalgia, hunt down "Dropsy" MILK Chocolate. The sweet secret weapon. #Boycott', chocoTipLink: 'Find them via suppliers like this (Facebook Link)', chocoTipMilk: 'Make SURE it’s the MILK chocolate version!',
            // Conclusion
            conclusionTitle: 'Experiment Complete! 🎉', conclusionDesc: 'Hypothesis confirmed: Brown butter cookies are superior. Share the evidence!', conclusionTag: 'Tag me on Instagram:', conclusionGoForth: 'Go forth and bake scientifically!', footerText: 'Built with science, butter, and a little bit of code.'
        },
        ar: {
            // Toggles & Units
            toggleArabic: 'عربي', toggleEnglish: 'English', unitMetric: 'حوّل للإنجليزي (كوب، معلقة)', unitImperial: 'حوّل للمتري (جم، مل)', unitGrams: 'جرام (g)', unitCups: 'كوب (cups)',
            // Units Short
            cup: 'كوب', cups: 'كوب', tsp: 'معلقة صغيرة', tsps: 'معلقة صغيرة', Tbsp: 'معلقة كبيرة', Tbsps: 'معلقة كبيرة',
            // Butter Input
            egg: 'بيضة', eggs: 'بيض', butterVarTitle: 'أول خطوة: الزبدة يا باشا! 🧈', butterVarDesc: 'كوكيز جامدة؟ محتاجة زبدة مظبوطة. يعني قد إيه من الدهب السايح ناوي تحط؟ خليك دقيق يا شيف! 👩‍🍳', grams: 'جرام', butterWarning: 'دخل كمية زبدة مظبوطة (على الأقل ١٠٠ جرام أو نص كوب كده). متسحبش علينا كده! 🙃', beginExperiment: 'يلا نبدأ التجربة! 🍪',
            // Cookie Selection
            phenotypeTitle: 'الخطوة التانية: اختار مود الكوكيز 🍪', phenotypeDesc: 'النهاردة نفسك في إيه؟ يلا نختار نوع المغامرة:', thinTitle: 'كوكيز رفايعة ومقرمشة موت', thinDesc: 'زي الشبسي... بس كوكيز. تنفع تتغمس أو تتاكل على طول. فليكس جامد 😎', classicTitle: 'الأصلية المتوازنة', classicDesc: 'طراوة × قرمشة × طعم جامد. دايمًا بتكسب الناس. 🎉', thickTitle: 'الكوكي اللي مليانة وشبعانة', thickDesc: 'سميكة ولزجة وتخلي حواسك ترقص. طعم مش طبيعي. 💃',
             // Recipe Display
            recipeTitle: 'وصفة {cookieName}', prepTitle: 'التحضير على أصوله', ingredientsTitle: 'مكونات المغامرة بتاعتك 🗺️', approxYield: 'هتعمل حوالي', cookies: 'كوكيز', cookie: 'كوكي', largeCookies: 'كوكيز كبار', largeCookie: 'كوكي كبيرة', stepsTitle: 'خطوات الشيف الجامد 👩‍🍳', proTipsTitle: 'نصايح من أستاذ الكوكيز بتاعك 🧠',
            // Ingredient Names
            unsaltedButter: 'زبدة بنية معمولة في البيت 🧈', granulatedSugar: 'سكر أبيض 🍬', lightBrownSugar: 'سكر بني فاتح', toastedMilkPowder: 'لبن بودرة متحمص (للطعم الزيادة) 🥛', largeEggs: 'بيض كبير (بحرارة الغرفة) 🥚', vanillaExtract: 'فانيليا', allPurposeFlour: 'دقيق متعدد الاستخدامات', tableSalt: 'ملح (رشة بسيطة) 🧂', bakingPowder: 'بيكنج بودر (طازة!)', bakingSoda: 'بيكنج صودا (طازة برضه!)', chocolateChips: 'قطع شوكولاتة / شيبس 🍫', prepWater: 'ماء/لبن (للترطيب) 💧',
            // Prep Techniques (Shortened for brevity, assume full text is here)
            prepTechTitle_brownButter: 'إزاي تحوّل الزبدة لدهب سايح 🧈✨', prepTechDesc_brownButter: `سيح الزبدة وخلي الرواسب تتحمص للون بني مكرمل (٥-١٠ دق). صبها بسرعة. <br>١. قطع الزبدة، نار متوسطة. <br>٢. الرغوة تروح، الرواسب تنزل وتتحمص. <br>٣. ريحة مكسرات؟ صب في طبق (مع الرواسب).`,
            prepTechTitle_hydrateButter: 'اختياري: رطّب الزبدة 💦', prepTechDesc_hydrateButter: `التحميص بيشيل مياه. ضيف الكمية المحسوبة بعد التحميص وقبل التبريد عشان الرطوبة. قلّب براحة.`,
            prepTechTitle_chillButterClassicThick: 'التبريد عشان الخفق الصح ⏳', prepTechDesc_chillButterClassicThick: `بيجمّد الدهون عشان الخفق. <br>١. برّد الزبدة البنية شوية. <br>٢. تلاجة لحد ما تبقى جامدة بس لينة (١٦-١٨°م). مهم للكلاسيك/السميكة. (~١-٢ ساعة).`,
            prepTechTitle_chillButterThin: 'تبريد مختلف للرفيعة ❄️', prepTechDesc_chillButterThin: `عشان تغلف الدقيق من غير ما تسيح بسرعة. <br>١. برّد الزبدة البنية، وتلاجة شوية لحد ما يدوب تجمد بس تتقطع (١٨-٢٠°م). (~٣٠-٦٠ دقيقة).`,
            prepTechTitle_toastMilkPowder: 'طعم زيادة: حمّص لبن البودرة 🔥', prepTechDesc_toastMilkPowder: `بيقوّي طعم المكسرات/الكراميل. <br>١. افرد بودرة اللبن على صينية/طاسة. <br>٢. فرن: ١٢٠°م (١٠-١٥د، قلّب). طاسة: نار هادية، تقليب مستمر. <br>٣. خليك صاحي! لون دهبي وريحة حلوة. برّده.`,
            // Notes & Steps (Assume full Arabic text is here)
             classicNotes: `الكوكي الكلاسيكي بيعتمد على توازن السكر 1:1، ورفع مزدوج علشان يطلع ناشف من بره وطري من جوه. أهم حاجة؟ خفق محترم وتبريد بضمير! الزبدة لازم تبقى بحرارة 16-18°م، وده قانون مش اقتراح. صدق العملية، الطعم هيخطفك! 🙌`,
            classicSteps: `**التحضير:** اخلط الجاف. جهز الصواني. الزبدة مبردة لينة، البيض بحرارة الغرفة. \n**الخفق:** اخفق الزبدة البنية المبردة والسكريات سرعة متوسطة-عالية ٥ دقائق كاملة (فاتح ومنفوش). اكشط الجوانب. \n**إضافة السوائل:** سرعة بطيئة. بيض واحدة واحدة (يدوب يختلط). فانيليا. \n**إضافة الجاف:** أبطأ سرعة. الدقيق تدريجي (يدوب يختلط). كمّل باليد. \n**تقليب:** شوكولاتة. \n**تبريد (مستحسن):** أقل حاجة ٣٠-٦٠ دقيقة (لحد ٤٨ ساعة). \n**تشكيل وخبز:** فرن ١٩٠°م. كور ~٢ م.ك، مسافة ٢ بوصة. ١٠-١٢ دقيقة (الحواف ذهبية). لف الصينية. \n**تبريد:** على الصينية ٣-٥ دقائق، ثم رف.`,
            thickNotes: `عايز كوكي سميك؟ يبقى لازم تمنع الانتشار! سكر بني أكتر، مفيش صودا، وتبريد طويل إجباري. خفق متوسط مش جامد عشان الكوكي ما يهبطش. بودرة اللبن المحمصة بتضيف طعم غني ومضغ خفيف. وسر اللعبة؟ خبز نص سوى!`,
            thickSteps: `**التحضير:** اخلط الدقيق، بودرة اللبن، الملح، البيكنج بودر. جهز الصواني. الزبدة مبردة لينة، البيض بحرارة الغرفة. \n**الخفق (متوسط):** اخفق الزبدة البنية المبردة والسكريات سرعة متوسطة ~٢-٣ دقائق (كريمي، مش منفوش أوي). اكشط. \n**إضافة السوائل:** سرعة بطيئة. بيض واحدة واحدة (يدوب يختلط). فانيليا. \n**إضافة الجاف:** أبطأ سرعة. الدقيق ٤-٥ مرات (شبه مختلط). \n**تقليب:** شوكولاتة (كتير!). استخدم ايد/ملعقة قوية. العجينة تقيلة. \n**تبريد إجباري:** كور كبيرة (١١٣-١٧٠ جم)، اعملها طويلة. لفها. تلاجة أقل حاجة ٤ ساعات (الأفضل ١٢-٧٢). \n**اخبزها باردة:** فرن ١٨٠°م. كور باردة، مسافات واسعة. متفردهاش. ١٨-٢٥ دقيقة (الحواف ثابتة، الوسط طري/لزج). لف الصينية. \n**برّد بحذر:** على الصينية ١٠-١٥ دقيقة، ثم انقلها للرف بحذر.`,
            thinNotes: `عايز قرمشة؟ يبقى انت في معسكر الانتشار! سكر أبيض زيادة، صودا كتير، وخفق بالعكس (يعني نحط الزبدة في الأول مع الجاف). مفيش تبريد هنا! ادخل فرن على طول.`,
            thinSteps: `**التحضير:** جهز الصواني. زبدة باردة لينة (١٨-٢٠°م)، قطع صغيرة. بيض بحرارة الغرفة. اخفق البيض/الفانيليا. \n**الخفق العكسي:** بالعجان: دقيق، سكريات، ملح، صودا. ضيف الزبدة الباردة. سرعة بطيئة لحد ما يبقى شبه الرمل المبلول. \n**خلط السوائل/الجاف:** سرعة بطيئة. صب خليط البيض/الفانيليا تدريجي (يدوب تتكون عجينة). متخلطش زيادة. \n**تقليب:** شوكولاتة مفرومة/صغيرة. أقل تقليب. \n**تشكيل وخبز فورًا:** بدون تبريد! فرن ١٧٥°م. كور صغيرة (~١ م.ك)، مسافة كبيرة جدًا (٣+ بوصة). \n**اخبز للقرمشة:** ١٢-١٦ دقيقة (رفيعة، ذهبية كلها). لف الصينية. \n**برّد تمامًا:** على الصينية ٥-١٠ دقائق، ثم رف حتى يبرد تمامًا. القرمشة بتظهر لما يبرد.`,
            // Easter Egg & Recs
            stuffedTitle: 'إنت فتّحت السر الخطير! 🎉', stuffedCongrats: 'مبروك يا كينج! اختيارك للكوكي اللزج السميك بيقول إنك مش عادي. تقدر تحشي الوحوش دي بحاجات خطيرة!', stuffedHowTo: 'إزاي؟ افرد الكورة شوية، اعمل تجويف، حط جوه معلقة صغيرة نوتيلا أو زبدة فستق، لف العجينة حواليها كويس، واقفلها جامد، وخبزها زي ما هو مكتوب (ممكن تحتاج دقيقتين زيادة).', pistachioTipTitle: 'ترشيح فستق جامد:', pistachioTipDesc: 'انسَ الأنواع اللي طعمها باهت أو فيها زيوت! لو عايز طعم فستق فعلي، أنصحك بـ"كريمة الفستق من ASMA Foods". خطيييرة ومركزة.', pistachioTipLink: 'شوفها هنا (رابط لمصر)', chocoTipTitle: 'علم الشوكولاتة:', chocoTipDesc: 'مش أي شوكليت شيبس تنفع! لو بتدور على الطعم الدايب اللي يدوّبك، جرب "Dropsy" باللبن. سلاح سري بجد. #مقاطعة', chocoTipLink: 'دور عند موردين زي دول (رابط فيسبوك)', chocoTipMilk: 'اتأكد إنها النسخة اللبني (MILK) عشان تاخد الطراوة الصح!',
            // Conclusion
            conclusionTitle: 'كده المهمة تمت! 🎉', conclusionDesc: 'التجربة أثبتت: كوكي الزبدة البنية كسب السباق. لو عملت إنجاز شهي، شاركنا الدليل!', conclusionTag: 'اعمللي تاج على انستجرام:', conclusionGoForth: 'يلا انطلق واطبخ بعلم ودماغ!', footerText: 'اتعمل بالعلم، الزبدة، وكام سطر كود.'
        }
    };

    // --- DOM Elements ---
    const htmlElement = document.documentElement;
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

    // Basic check for essential elements
    if (!butterAmountInput || !butterUnitSelect || !startExperimentBtn || !recipeContent || !cookieSelectionSection || !recipeDisplaySection || !langToggleButton || !unitToggleButton) {
        console.error("Error: One or more essential HTML elements are missing!");
        alert("Error initializing the page. Please check the console.");
        return; // Stop execution if essential elements are missing
    }

    // --- State Variables ---
    let currentLanguage = 'en'; // 'en' or 'ar'
    let currentUnitSystem = 'metric'; // 'metric' or 'imperial' for EN
    let baseButterGrams = 0;
    let selectedCookieType = null;

    // --- Helper Functions ---

    /** Gets translation string safely */
    function T(key) {
        return langStrings[currentLanguage]?.[key] || key; // Fallback to key name
    }

    /** Rounds a number to the nearest common fraction string (e.g., 0.75 -> "¾") */
    function roundToNearestFraction(amount) {
        const tolerance = 0.08; // How close it needs to be
        const fractions = {
            '⅛': 1/8, '¼': 1/4, '⅓': 1/3, '½': 1/2, '⅔': 2/3, '¾': 3/4, '⅞': 7/8
        };
        // Handle edge case: very small amounts become "pinch" later
        if (amount < 0.1) return null; // Indicate very small

        for (const [text, value] of Object.entries(fractions).sort(([,a],[,b]) => a-b)) {
            if (Math.abs(amount - value) < tolerance) {
                return text;
            }
        }
        // If no fraction matches well, return decimal rounded to 1 place
        const rounded = parseFloat(amount.toFixed(1));
        return rounded === 0 ? null : rounded.toString(); // Avoid returning "0.0"
    }

    // --- Core Calculation Functions ---

    /** Reads and validates butter input, returns grams or 0 if invalid */
    function getBaseButterInGrams() {
        const amount = parseFloat(butterAmountInput.value);
        const unit = butterUnitSelect.value;

        if (isNaN(amount) || amount <= 0) {
            butterWarning.textContent = T('butterWarning');
            butterWarning.style.display = 'block';
            return 0;
        }

        let grams = (unit === 'cups') ? amount * GRAMS_PER_CUP_BUTTER : amount;

        if (grams < 100) { // Minimum validation
            butterWarning.textContent = T('butterWarning');
            butterWarning.style.display = 'block';
            return 0;
        }

        butterWarning.style.display = 'none';
        return grams;
    }

    /** Calculates scaled recipe based on butter amount and cookie type */
    function calculateScaledRecipe(butterInGrams, cookieType) {
        const base = baseRecipes[cookieType];
        if (!base || butterInGrams <= 0) return null;

        const scalingFactor = butterInGrams / base.baseButter;
        const scaledIngredients = {};

        for (const key in base.ingredients) {
            scaledIngredients[key] = {
                grams: base.ingredients[key][0] * scalingFactor,
                unitType: base.ingredients[key][1]
            };
        }

        // Calculate yield
        let yieldValue;
        if (cookieType === 'thick' && base.cookieSizeGrams) {
            let totalDoughWeight = Object.values(scaledIngredients).reduce((sum, item) => sum + item.grams, 0);
            yieldValue = Math.round(totalDoughWeight / base.cookieSizeGrams);
        } else {
            yieldValue = Math.round(base.yieldPerBase * scalingFactor);
        }
        // Ensure yield is at least 1 if calculation resulted in 0 but ingredients exist
        if (yieldValue < 1 && Object.keys(scaledIngredients).length > 0) yieldValue = 1;


        return {
            ingredients: scaledIngredients,
            yield: yieldValue,
            notesKey: base.notes,
            stepsKey: base.steps,
            prepTechKeys: base.prepTech || [], // Ensure it's an array
            isThick: cookieType === 'thick'
        };
    }

    // --- Formatting Functions ---

    /** Formats imperial units (cups, tsp, Tbsp) with fractions */
    function formatImperial(grams, unitType) {
        let amount = 0;
        let unitSingular = '';
        let unitPlural = '';
        let baseGramsPerUnit = 1;
        let preferTbsp = false;

        switch (unitType) {
            case 'butter': amount = grams / GRAMS_PER_CUP_BUTTER; unitSingular = T('cup'); unitPlural = T('cups'); break;
            case 'sugar': amount = grams / GRAMS_PER_CUP_GRAN_SUGAR; unitSingular = T('cup'); unitPlural = T('cups'); break; // Approx for both
            case 'chocolate': amount = grams / GRAMS_PER_CUP_CHOC_CHIPS; unitSingular = T('cup'); unitPlural = T('cups'); break;
            case 'flour': amount = grams / GRAMS_PER_CUP_FLOUR; unitSingular = T('cup'); unitPlural = T('cups'); break;
            case 'salt': amount = grams / GRAMS_PER_TSP_SALT; unitSingular = T('tsp'); unitPlural = T('tsps'); baseGramsPerUnit = GRAMS_PER_TSP_SALT; break;
            case 'bakingSoda': amount = grams / GRAMS_PER_TSP_BAKING_SODA; unitSingular = T('tsp'); unitPlural = T('tsps'); baseGramsPerUnit = GRAMS_PER_TSP_BAKING_SODA; break;
            case 'bakingPowder': amount = grams / GRAMS_PER_TSP_BAKING_POWDER; unitSingular = T('tsp'); unitPlural = T('tsps'); baseGramsPerUnit = GRAMS_PER_TSP_BAKING_POWDER; break;
            case 'vanilla': amount = grams / GRAMS_PER_TSP_VANILLA; unitSingular = T('tsp'); unitPlural = T('tsps'); baseGramsPerUnit = GRAMS_PER_TSP_VANILLA; break;
            case 'water': amount = grams / GRAMS_PER_TSP_WATER; unitSingular = T('tsp'); unitPlural = T('tsps'); baseGramsPerUnit = GRAMS_PER_TSP_WATER; break; // Treat prepWater as water
            case 'milkPowder': // Prefers Tbsp
                amount = grams / (GRAMS_PER_TBSP_MILK_POWDER / 3); // Calculate based on tsp first
                unitSingular = T('tsp');
                unitPlural = T('tsps');
                baseGramsPerUnit = GRAMS_PER_TBSP_MILK_POWDER / 3;
                preferTbsp = true;
                break;
            default: return `${Math.round(grams)} g`; // Fallback
        }

         // Handle Tbsp preference conversion
        if (preferTbsp && amount >= 2.5) { // Switch to Tbsp if near or over 1 Tbsp (3 tsp)
            amount /= 3;
            unitSingular = T('Tbsp');
            unitPlural = T('Tbsps');
            baseGramsPerUnit *= 3;
        }

        if (amount < 0.01) return `0 ${unitPlural}`; // Handle zero amount

        // For tsp/Tbsp, try fractions first
        if (['tsp', 'Tbsp'].includes(unitSingular) || ['tsps', 'Tbsps'].includes(unitPlural)) {
            const wholePart = Math.floor(amount);
            const fractionalPart = amount - wholePart;
            const fractionStr = roundToNearestFraction(fractionalPart);

            if (fractionStr === null && wholePart === 0) { // Very small amount
                 return `pinch ${unitType === 'salt' ? '' : unitSingular}`.trim(); // Pinch usually implies salt, but specify for others
            }

            let formattedAmount = '';
            if (wholePart > 0) {
                formattedAmount += wholePart;
                if (fractionStr) {
                    formattedAmount += ` ${fractionStr}`; // e.g., "1 ½"
                }
            } else if (fractionStr) {
                formattedAmount = fractionStr; // e.g., "¾"
            } else {
                 formattedAmount = '0'; // Should not happen if amount > 0.01 but as fallback
            }

             const unit = (amount > 1 || (wholePart === 1 && fractionStr)) ? unitPlural : unitSingular;
            return `${formattedAmount} ${unit}`;

        } else { // Handle cups (usually allow decimals like 1.25, 1.5, 1.75)
            let formattedAmount = parseFloat(amount.toFixed(2)).toString(); // Round to 2 decimals, remove trailing zeros
            // Remove trailing ".0" if it was exactly whole number
            if (formattedAmount.endsWith('.0')) {
                formattedAmount = formattedAmount.slice(0, -2);
            }
            const unit = (parseFloat(formattedAmount) === 1) ? unitSingular : unitPlural;
            return `${formattedAmount} ${unit}`;
        }
    }

    /** Formats ingredient display based on language and unit system */
    function formatIngredient(grams, unitType) {
        const isArabic = currentLanguage === 'ar';
        const isImperial = currentUnitSystem === 'imperial';

        // Special case: Eggs
        if (unitType === 'egg') {
            let numEggs = Math.max(0.1, grams / GRAMS_PER_LARGE_EGG); // Avoid 0 eggs if grams > 0
             // Round to nearest half egg or whole egg, minimum 0.5 if grams > 0
            if (numEggs < 0.5 && grams > 0) numEggs = 0.5;
            else if (numEggs > 0.5) numEggs = Math.round(numEggs * 2) / 2; // Round to nearest 0.5

            const eggText = numEggs.toString() + " " + (numEggs <= 1 ? T('egg') : T('eggs'));
            const totalGrams = Math.round(grams);
            return `${eggText} (~${totalGrams}g)`; // Always show grams for eggs
        }

        // Metric formatting (always useful)
        const metricText = `${Math.round(grams)} ${T('grams')}`;

        // English Display
        if (!isArabic) {
            if (isImperial) {
                 return formatImperial(grams, unitType);
            } else {
                 return metricText; // English Metric
            }
        }
        // Arabic Display (Grams + Cups in parenthesis if applicable)
        else {
            let output = `<span class="unit-g">${metricText}</span>`;
            // Add cup equivalent for relevant types
            if (['butter', 'sugar', 'chocolate', 'flour'].includes(unitType)) {
                 const cupsFormatted = formatImperial(grams, unitType); // Get cup value
                // Ensure formatImperial returned a cup value, not fallback grams
                 if (cupsFormatted.includes(T('cup')) || cupsFormatted.includes(T('cups'))) {
                    output += ` <span class="unit-cups">(${cupsFormatted})</span>`;
                }
            }
            return output;
        }
    }


    // --- HTML Generation Functions ---

    function generateIngredientsHTML(ingredients) {
        let html = `<h3 class="ingredients-title">${T('ingredientsTitle')}</h3><ul>`;
        for (const key in ingredients) {
            const item = ingredients[key];
            // Skip ingredients with 0 grams calculated
            if (Math.round(item.grams) <= 0 && item.unitType !== 'egg') continue; // Keep eggs even if < 1

            const ingredientName = T(key) || key.replace(/([A-Z])/g, ' $1').trim(); // Fallback formatting
            const formattedAmount = formatIngredient(item.grams, item.unitType);
            html += `<li><strong>${formattedAmount}</strong> ${ingredientName}</li>`;
        }
        html += `</ul>`;
        return html;
    }

    function generatePrepTechHTML(prepTechKeys) {
        if (!prepTechKeys || prepTechKeys.length === 0) return '';
        let html = `<h3 class="prep-tech-title">${T('prepTitle')}</h3>`;
        prepTechKeys.forEach(key => {
            const titleKey = `prepTechTitle_${key}`;
            const descKey = `prepTechDesc_${key}`;
            if (T(titleKey) !== titleKey) { // Only add if translation exists
                 html += `<div class="pro-tip note">
                            <h4>${T(titleKey)}</h4>
                            <p>${T(descKey)}</p>
                          </div>`;
            }
        });
        return html;
    }

    function generateStepsHTML(stepsKey) {
        const stepsString = T(stepsKey);
        if (stepsString === stepsKey) return ''; // No steps defined

        let html = `<h3 class="steps-title">${T('stepsTitle')}</h3><ol>`;
        const stepsArray = stepsString.split('\n');
        stepsArray.forEach(step => {
            const trimmedStep = step.trim();
            if (trimmedStep) {
                // Basic formatting: **bold** and remove leading list markers if present
                let formattedStep = trimmedStep
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^\s*[\d-*]+\.?\s*/, ''); // Remove leading numbers/bullets
                html += `<li>${formattedStep}</li>`;
            }
        });
        html += `</ol>`;
        return html;
    }

    function generateNotesHTML(notesKey) {
        const notesString = T(notesKey);
        if (notesString === notesKey) return ''; // No notes defined
        return `<div class="pro-tip"><h4>${T('proTipsTitle')}</h4><p>${notesString}</p></div>`;
    }


    // --- UI Update Functions ---

    /** Displays the calculated recipe */
    function displayRecipe(recipeData) {
        if (!recipeData) {
            recipeContent.innerHTML = `<p>Error calculating recipe.</p>`; // Basic error display
            recipeDisplaySection.style.display = 'block';
            return;
        }

        const cookieName = T(`${selectedCookieType}Title`);
        const yieldNum = recipeData.yield;
        let yieldText = '';

        if (selectedCookieType === 'thick') {
            yieldText = `${yieldNum} ${yieldNum === 1 ? T('largeCookie') : T('largeCookies')}`;
        } else {
            yieldText = `${yieldNum} ${yieldNum === 1 ? T('cookie') : T('cookies')}`;
        }

        // Generate HTML parts
        const ingredientsHtml = generateIngredientsHTML(recipeData.ingredients);
        const prepTechHtml = generatePrepTechHTML(recipeData.prepTechKeys);
        const stepsHtml = generateStepsHTML(recipeData.stepsKey);
        const notesHtml = generateNotesHTML(recipeData.notesKey);

        // Assemble final HTML
        recipeContent.innerHTML = `
            <h2>${T('recipeTitle').replace('{cookieName}', cookieName)}</h2>
            <p class="recipe-yield">${T('approxYield')} ${yieldText}</p>
            ${prepTechHtml}
            ${ingredientsHtml}
            ${stepsHtml}
            ${notesHtml}
        `;

        // Show/Hide Easter Egg & Chocolate Tip based on recipe type
        stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
        chocolateRecommendation.style.display = 'block'; // Always show general chocolate tip? Or specific conditions?

        // Ensure static text within the recipe section is also translated
        updateLanguageContent(recipeDisplaySection);

        recipeDisplaySection.style.display = 'block';
        recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    /** Updates text content based on the current language */
    function updateLanguageContent(parentElement = document.body) {
        const elements = parentElement.querySelectorAll('[data-lang-key]');
        elements.forEach(el => {
            const key = el.dataset.langKey;
            const translation = T(key);
            if (translation !== key) { // Only update if a translation exists
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = translation;
                } else if (el.tagName === 'BUTTON' || el.tagName === 'OPTION') {
                     el.textContent = translation; // Use textContent for buttons/options
                }
                 else {
                    el.innerHTML = translation; // Use innerHTML for elements that might contain tags
                }
            }
        });

         // Manually update elements not using data-lang-key if needed (like dynamic buttons)
        langToggleButton.textContent = (currentLanguage === 'en') ? T('toggleArabic') : T('toggleEnglish');
        updateUnitButtonText(); // Ensure unit button text is correct

         // Update butter unit select options manually
        Array.from(butterUnitSelect.options).forEach(option => {
            const valueKey = option.value === 'grams' ? 'grams' : 'cups';
            option.textContent = T(valueKey);
        });

        // Set page direction
        htmlElement.lang = currentLanguage;
        htmlElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    }


    /** Updates the unit toggle button text and visibility */
    function updateUnitButtonText() {
        if (currentLanguage === 'ar') {
            unitToggleButton.style.display = 'none'; // Hide unit toggle in AR
            butterUnitSelect.style.display = 'inline-block'; // Always show butter unit select in AR
        } else { // English
            unitToggleButton.style.display = 'inline-block'; // Show unit toggle in EN
            unitToggleButton.textContent = T(currentUnitSystem === 'metric' ? 'unitImperial' : 'unitMetric');
            // Hide butter unit selector only if EN + Imperial (as cups are assumed)
            // Show it for EN + Metric
            butterUnitSelect.style.display = (currentUnitSystem === 'imperial') ? 'none' : 'inline-block';
            // If switching to imperial, ensure butter unit is cups
            if (currentUnitSystem === 'imperial') {
                butterUnitSelect.value = 'cups';
            } else {
                 // Optional: default to grams when switching back to metric?
                 butterUnitSelect.value = 'grams';
            }
        }
    }

    // --- Event Handlers ---

    function handleStartExperiment() {
        baseButterGrams = getBaseButterInGrams();
        if (baseButterGrams > 0) {
            cookieSelectionSection.style.display = 'block';
            cookieSelectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            recipeDisplaySection.style.display = 'none'; // Hide previous recipe
            // Reset selection visuals
            cookieOptions.forEach(opt => opt.classList.remove('selected'));
            selectedCookieType = null; // Reset selected type
        } else {
             // Ensure focus if validation failed in getBaseButterInGrams
            butterAmountInput.focus();
        }
    }

    function handleCookieSelection(event) {
        // Ensure butter amount is valid before allowing selection
        if (baseButterGrams <= 0) {
            handleStartExperiment(); // Re-trigger validation/focus
            // Optionally show a more specific message
            butterWarning.textContent = "Enter butter amount first!";
            butterWarning.style.display = 'block';
            return;
        }

        const selectedOption = event.currentTarget;

        // Update selection visual
        cookieOptions.forEach(opt => opt.classList.remove('selected'));
        selectedOption.classList.add('selected');

        selectedCookieType = selectedOption.dataset.cookieType;
        if (!selectedCookieType) {
            console.error("Clicked option missing data-cookie-type attribute:", selectedOption);
            return;
        }

        const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
        displayRecipe(scaledRecipe);
    }

    function handleLanguageToggle() {
        currentLanguage = (currentLanguage === 'en') ? 'ar' : 'en';
        // Reset unit system to default for the new language
        currentUnitSystem = (currentLanguage === 'en') ? 'metric' : 'grams'; // AR doesn't really use the 'system' state

        updateLanguageContent(); // Update all text content FIRST
        updateUnitButtonText(); // Update button visibility/text based on new lang

        // Re-display recipe if one is active
        if (selectedCookieType && baseButterGrams > 0) {
            const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            displayRecipe(scaledRecipe); // This will use the new lang/units
        }
    }

    function handleUnitToggle() {
        // Unit toggle only functions for English
        if (currentLanguage === 'en') {
            currentUnitSystem = (currentUnitSystem === 'metric') ? 'imperial' : 'metric';
            updateUnitButtonText(); // Update button text and butter unit select visibility

            // Re-display recipe with new unit formatting
            if (selectedCookieType && baseButterGrams > 0) {
                const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
                displayRecipe(scaledRecipe);
            }
        }
    }

    // --- Event Listeners ---
    startExperimentBtn.addEventListener('click', handleStartExperiment);

    // Hide warning on input change
    butterAmountInput.addEventListener('input', () => {
        butterWarning.style.display = 'none';
    });
    butterUnitSelect.addEventListener('change', () => {
        butterWarning.style.display = 'none';
    });

    // Add listeners to cookie options
    cookieOptions.forEach(option => {
        option.addEventListener('click', handleCookieSelection);
        // Add keydown listener for accessibility (Enter/Space)
        option.addEventListener('keydown', (e) => {
             if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault(); // Prevent spacebar scrolling
                 handleCookieSelection(e);
             }
         });
    });

    langToggleButton.addEventListener('click', handleLanguageToggle);
    unitToggleButton.addEventListener('click', handleUnitToggle);

    // --- Initial Setup ---
    updateLanguageContent(); // Set initial text based on default language
    updateUnitButtonText(); // Set initial button state

}); // End DOMContentLoaded
