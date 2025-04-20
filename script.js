        // --- Base Recipes & Language Strings - GEN Z TAKEOVER ---
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
        const langStrings = {
           en: {
                 // Toggles & Units
                 toggleArabic: 'عربي version pls',
                 toggleEnglish: 'Back to English ig',
                 unitMetric: 'Metric (grams, the one that makes sense) 🤓',
                 unitImperial: 'Imperial (cups?? 🗽🦅 wtf is a cup)',
                 unitGrams: 'grams (for the ✨precise✨ ones)',
                 unitCups: 'cups (for the ✨chaotic✨ ones)',
                 // Butter Input
                 butterVarTitle: "Okay STEP 1: Butter Business 🧈 SPILL",
                 butterVarDesc: "Alright team, gather 'round. Real experiments need... like... numbers. How much unsalted butter we throwin' into this delicious void? 🤔 Spill it.",
                 grams: 'grams',
                 cups: 'cups',
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
                 // Ingredient Names
                 unsaltedButter: 'Unsalted Butter (the bougie kind)', granulatedSugar: 'White Sugar (the basic one)', lightBrownSugar: 'Light Brown Sugar (squish it down, assert dominance)', toastedMilkPowder: 'Toasted Milk Powder (if u wanna be ~extra~)', largeEggs: 'Large Eggs (pretend they\'re room temp, even if they aren\'t 🤫)', vanillaExtract: 'Vanilla Extract (smells good juice)', allPurposeFlour: 'A.P. Flour (spoon it gently, no packing allowed 🙅)', tableSalt: 'Salt (essential flavor dust)', bakingPowder: 'Baking Powder (check expiry? nahhh jk pls do)', bakingSoda: 'Baking Soda (also check expiry?? maybe??)', chocolateChips: 'Choc Chips/Chunks (Target Kualety MILK ftw, ignore other opinions)', prepWater: 'Water or Milk (H₂O for the dough-o💧)',
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
            },
             ar: { // ARABIC - Applying similar chaotic energy with Egyptian colloquialisms
                 toggleArabic: 'قلبّ عربي يا شبح',
                 toggleEnglish: 'رجّع انجليزي يسطا',
                 unitMetric: 'متري (جرامات واللي يفهم بقى) 🤓',
                 unitImperial: 'إمبريالي (كوبايات؟ إيه الهبل دا 🗽🦅)',
                 unitGrams: 'جرامات (للناس الـ✨دقيقة✨)',
                 unitCups: 'كوبايات (للناس الـ✨عشوائية✨)',
                 butterVarTitle: "يلا بينا الخطوة 1: حوار الزبدة 🧈 وريني اللي عندك",
                 butterVarDesc: "تمام يا جماعة، ركزوا معايا. التجارب اللي بجد عايزة... يعني... أرقام. كام جرام زبدة طرية هنرميهم في الفراغ اللذيذ دا؟ 🤔 احكيلي.",
                 grams: 'جرام',
                 cups: 'كوباية',
                 butterWarning: "يادي النيلة. 💀 دخل رقم بجد. أقل حاجة 100 جرام أو نص كوباية طيب. صلحها بالله عليك.",
                 beginExperiment: "يلا نطبخ (مجازًا يعني) 🔥",
                 phenotypeTitle: "خطوة 2: اختار البطل بتاعك™ 🥊🍪",
                 phenotypeDesc: "أولًا، إيه الـ mood اللي طالعين بيه؟ اختار الكائن الكوكي النهائي:",
                 thinTitle: 'المقرمشين المنطلقين™ ✨', thinDesc: 'ملوك الفلات. قرمشة لا نهائية. بيتفرد أسرع من النت عندي.',
                 classicTitle: 'الأصلي الكيوت المتوازن 😎', classicDesc: 'الميكس المثالي بين طري جوة وقرمشة برة. بتاع الشعب الصراحة fr.',
                 thickTitle: '👑 أسياد التُخن والتكبيسة 👑', thickDesc: 'ناعم زي سحابة عجين. دلع مقرف من كتر حلاوته. واخد راحته فالمساحة. الكوكي الحضن.',
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
                 unsaltedButter: 'زبدة طرية (النوع الأنتيكة)', granulatedSugar: 'سكر أبيض (العادي بتاعنا)', lightBrownSugar: 'سكر بني فاتح (دُكه لتحت، افرض سيطرتك)', toastedMilkPowder: 'بودرة لبن محمصة (لو عايز تتمنظر ~بالشياكة~)', largeEggs: 'بيض كبير (اعمل نفسك جايبهم بحرارة الغرفة حتى لو لأ 🤫)', vanillaExtract: 'فانيليا سايلة (عصير ريحته حلوة)', allPurposeFlour: 'دقيق أ.غ (بالملعقة براحة، بلاش كبس 🙅)', tableSalt: 'ملح (غبار الطعم الأساسي)', bakingPowder: 'بيكنج بودر (تشوف تاريخه؟ لا طبعًا بهزر شوفه)', bakingSoda: 'بيكنج صودا (تشوف تاريخه برضه؟ يمكن؟)', chocolateChips: 'شوكليت شيبس/قطع (Target Kualety لبن وبس، تجاهل أي رأي تاني)', prepWater: 'مية أو لبن (أكسجين العجين أو كدا💧)',
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
                 classicNotes: `🔑: سكر ١:١، البودرتين، خفق ٥ دقايق مظبوطييين (شغّل تايمر!). حرارة الزبدة (١٦-١٨°م) = قانون دولة. التبريد مش اختياري لو عايز القوام الصح، اتفقنا؟ اتفقنا. 🤝`,
                 classicSteps: `١. **جهّز:** اخلط النواشف. جهّز الصواني. الزبدة = باردة-بتتفعص، البيض = شبه حرارة الغرفة ههه.\n٢. **الخفق (فقرة الحفلة):** اضرب الزبدة الباردة والسكر ع سرعة وسط-عالية **٥ دقايق كاملة**. من غير غش. لازم يبقى لونها فاتح وهشة فشخ. اكحت كويس.\n٣. **السوايل:** سرعة بطيئة. البيض يدخل واحدة ورا واحدة. اخلط *يا دوب* يختلط. زيادة خلط = حزن. الفانيليا بتتزحلق آخر حاجة.\n٤. **النواشف:** أبطأ سرعة. نزّل الدقيق حبة حبة. وقّف أول ما *أغلبه* يختلط. كام خط عادي. كمل بإيدك يمكن؟\n٥. **قلّب بالراحة:** نزل الشوكولاتة. اعمل كأن العجينة عندها مشاعر.\n٦. **برّد (بليز اعملها):** غطي العجينة. تلاجة ٣٠-٦٠ دقيقة أقل أقل حاجة. لحد ٤٨ ساعة لطعم في عالم تاني. الدهن يمسك، الدقيق يشرب.\n٧. **شكّل واخبز:** فرن ١٩٠°م/٣٧٥°ف. شكّل كور ~٢ م ك. سيب مسافة (عايزين مساحة شخصية). اخبز ١٠-١٢ دقيقة (الأطراف دهبي، النص طري/منفوش). لف الصينية مرة يمكن.\n٨. **منطقة التبريد:** 🚨 مهم: سيب الكوكيز ع الصينية السخنة ٥ دقايق!! بتكمل سوا. بعدين انقل ع رف سلك. اصبر بقى الله يهديك.`,
                 thickNotes: `استراتيجية التُخن: بنحارب التفلطح! 💪 إزاي؟ سكر بني كتير، مفيش صودا، تبريد طوييييييل **إلزامي**. اخفق بالهداوة (هوا كتير = انهيار). بودرة لبن محمصة = بوسة الشيف 💋. حب النص الطري شوية. طاقة الكوكي الضخمة فقط. 👑`,
                 thickSteps: `١. **جهّز:** اخلط النواشف (مع بودرة اللبن المحمصة). جهّز الصواني. الزبدة = باردة-بتتفعص، البيض = بيتظاهر بحرارة الغرفة.\n٢. **اخفق (بالهداوة!):** زبدة وسكر سرعة وسط ~٢-٣ دقيقة. الهدف: مختلط وكريمي. مش فاتح/هش زي الكلاسيك. بلاش هوا كتير.\n٣. **السوايل:** سرعة بطيئة. البيض ١ ورا ١، يا دوب يتخلطوا. نزل الفانيليا.\n٤. **النواشف:** سرعة بطيئة. نزّل الدقيق دفعات. اخلط لحد ما يبقى *شبه* اتخلط. بنكره الجلوتين هنا. 😤\n٥. **قلّب (بأقصى قوة):** حط كمية شوكولاتة مهولة. استخدم إيدك/سباتيولا متينة عشان تدخل آخر حبة دقيق. العجينة = تقيلة فشخ. متخلطش زيادة.\n٦. **التبريد الإلزامي الأبدي:** شكّل كور **كبييييرة** (قد ١١٣-١٧٠جم). خلّيها طويلة مش مبططة. غلفها جاااامد. تلاجة أقل شيء ٤ ساعات. الأفضل = ١٢-٧٢ ساعة. إيـــاااااك. تــفــكّـــس. للــخــطــوة. دي. أبدًا.\n٧. **اخبز ساقع:** فرن ١٨٠°م/٣٥٠°ف. حط كور العجين الساقعة بعيد عن بعض. متـــبـــطـــطـــش. اخبز ١٨-٢٥ دقيقة (حسب التخن). الأطراف شكلها استوت، النص شكله ني شوية/عجينة لزجة كدا (الهدف ~٧٩-٨٥°م / ١٧٥-١٨٥°ف لو عندك ترمومتر زي الدحيحة). لف الصينية مرة.\n٨. **بروتوكول التبريد (بالراحة عليها!):** 🚨 سيبها ع الصينية ١٠ لـ ١٥ دقيقة. دي عيال عملاقة هفّة. انقلها بالراحة عالرف. أحسن وهي دافية شوية. قلبها سايح = وجع.`,
                  thinNotes: `شفرة القرمشة: أقصى تفلطح + أقل جلوتين = كسبت ✨. سكر أبيض كتير، صودا كتير (قلوي = بنيان/تفلطح). حيلة الخفق العكسي هي الحل. **ممنوع التبريد**. اخبز لحد ما تتكسر. كور صغيرة، أماكن واسعة. ثق فالعملية. 🙏`,
                  thinSteps: `١. **جهّز:** بطّن الصواني. الزبدة = باردة بس لينة (١٨-٢٠°م / ٦٥-٦٨°ف)، مقطعة صغير. البيض = شبه حرارة الغرفة. اضرب البيض والفانيليا ف طبق لوحده زي المحترفين.\n٢. **وقت الخفق العكسي:** فالعجانة: دقيق، سكر، ملح، صودا. خلطة سريعة. حط حتت الزبدة الباردة. اخلط على الواطي لحد ما يبقى شكله زي رمل مبلول/فتات (الزبدة غلفت الدقيق = الهدف تحقق ✅). بياخد كام دقيقة.\n٣. **السوايل مع النواشف:** سرعة واطية. سرسب خليط البيض/فانيليا ببطء. اخلط يا دوب لحد ما *بالعافية* تلم عجينة. ممكن شكلها يبقى بايظ فالأول. زيادة الخلط هو العدو الأول.\n٤. **قلّب (أقل ما يمكن):** بالراحة ضيف شوكولاتة مفرومة ناعم/صغنونة. أقل تقليبات ممكنة.\n٥. **شكّل واخبز فورًاااا:** 💨 ممنوع التبريد!! فرن ١٧٥°م/٣٥٠°ف. شكّل كور صغنونة (~١ م ك). سيب مسااااافة كبيرة (٣+ بوصة!!). بيتفردوا بجنووون.\n٦. **اخبز لحد القرمشة:** اخبز ١٢-١٦ دقيقة لحد ما تبقى فلات ولونها دهبي من الحرف للحرف. لف الصينية مرة. لو زودت الخبز سيكا دا المطلوب هنا أصلاً.\n٧. **برّد نهااائياً للقرمشة:** ع الصينية ٥-١٠ دقايق (استنى يمسكوا نفسهم!). بعدين عالرف يبردوا ١٠٠%. القرمشة بتظهر لما يبردوا خاااالص. سحر! 🪄`,
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
                 conclusionTitle: 'خلصانة بشياكة! 🎉 نجحت المهمة؟ (انت اللي تقرر ههه)',
                 conclusionDesc: 'الفرضية: الزبدة البنية جبارة. النتيجة: طبعاً أيوه. ✅ صورت؟ نزّل صور دليل عالإنستا وإلا كأنك معملتش حاجة! وريهم شغلك! 💪',
                 conclusionTag: 'منشن العبد لله يمكن؟ ->',
                 conclusionGoForth: 'روح اخبز فوضى أكتر. انت البطل فالقصة، عيش الدور. 💅✨',
                 footerText: 'اتعملت بالعلم™، زبدة🧈، نوبات قلق😰 وسحر الأكواد✨',
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
                if (Math.abs(decimal) < 0.05) return ''; // Ignore tiny fractions
                if (Math.abs(decimal - 1/8) < tolerance) return '⅛';
                if (Math.abs(decimal - 1/4) < tolerance) return '¼';
                if (Math.abs(decimal - 1/3) < tolerance) return '⅓';
                if (Math.abs(decimal - 3/8) < tolerance) return '⅜';
                if (Math.abs(decimal - 1/2) < tolerance) return '½';
                if (Math.abs(decimal - 5/8) < tolerance) return '⅝';
                if (Math.abs(decimal - 2/3) < tolerance) return '⅔';
                if (Math.abs(decimal - 3/4) < tolerance) return '¾';
                if (Math.abs(decimal - 7/8) < tolerance) return '⅞';
                return decimal.toFixed(1); // Fallback to one decimal place if no close fraction
            };

             // Helper to format whole numbers and fractions
            const formatMixedNumber = (value, unitSingular, unitPlural) => {
                 if (value < 0.05) return `~pinch`; // Even smaller things might be a pinch
                 const whole = Math.floor(value + 0.001); // Add small epsilon for rounding near whole numbers
                const fractional = value - whole;
                let amountStr = "";
                 if (whole > 0) {
                     amountStr += `${whole}`;
                 }
                 const fractionStr = formatFraction(fractional);
                 if (fractionStr !== '') {
                    if (whole > 0) amountStr += " "; // Add space only if there's a whole number AND a fraction
                     amountStr += fractionStr;
                 }
                 if (amountStr === "") { // Case where it's purely fractional (less than 1)
                     amountStr = formatFraction(value);
                 }
                 // Pluralization logic slightly more robust
                 const unit = Math.abs(value - 1) < 0.1 ? unitSingular : unitPlural; // If it's close to 1, use singular
                 return `${amountStr} ${unit}`;
             };

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
                     // Using Tbsp as fallback for smaller chocolate amounts can be useful
                     const cupsChoc = grams / CONFIG.GRAMS_PER_CUP_CHOC_CHIPS;
                     if (cupsChoc < 0.25 && cupsChoc > 0.01) { // Less than 1/4 cup? Try Tbsp
                        const tbspChoc = cupsChoc * 16; // ~16 Tbsp per cup
                        return formatMixedNumber(tbspChoc, 'Tbsp choc chips', 'Tbsp choc chips');
                     }
                    return formatMixedNumber(cupsChoc, 'cup choc chips', 'cups choc chips');
                case 'salt':
                case 'bakingSoda':
                case 'bakingPowder':
                case 'vanilla':
                case 'prepWater': // Treat these small volume things similarly
                     const tspEq =
                        unitType === 'salt' ? CONFIG.GRAMS_PER_TSP_SALT :
                        unitType === 'bakingSoda' ? CONFIG.GRAMS_PER_TSP_BAKING_SODA :
                        unitType === 'bakingPowder' ? CONFIG.GRAMS_PER_TSP_BAKING_POWDER :
                        unitType === 'vanilla' ? CONFIG.GRAMS_PER_TSP_VANILLA :
                        4.9; // approx 5g/tsp for water
                    const unitName = unitType === 'prepWater' ? 'water/milk' : unitType.replace(/([A-Z])/g, ' $1').toLowerCase(); // "bakingSoda" -> "baking soda"
                     return formatMixedNumber(grams / tspEq, `tsp ${unitName}`, `tsps ${unitName}`);
                 case 'milkPowder':
                    const tbspMilk = grams / CONFIG.GRAMS_PER_TBSP_MILK_POWDER;
                     return formatMixedNumber(tbspMilk, 'Tbsp milk powder', 'Tbsp milk powder'); // Always Tbsp
                 case 'egg':
                     const numEggs = Math.max(1, Math.round(grams / CONFIG.GRAMS_PER_LARGE_EGG));
                    return `${numEggs} large ${numEggs === 1 ? 'egg' : 'eggs'}`;
                 default:
                     console.warn("Unknown unitType for Imperial formatting:", unitType);
                     return `${Math.round(grams)} g`;
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
            if (metricAmount === 0 && grams > 0) { // Handle small amounts that round to 0
                 return `~ pinch / tiny bit`; // More descriptive for very small non-zero grams
             }
             const metricText = `${metricAmount} ${T('grams')}`;

            if (state.currentLanguage === 'en') {
                 if (state.currentUnitSystemEN === 'metric') {
                    return metricText;
                 } else {
                    // Convert to imperial ONLY for display if selected
                     return formatImperial(grams, unitType);
                 }
            } else { // Arabic - Always show grams, add cups optionally IF relevant
                let cupsText = '';
                const cupTypes = ['butter', 'sugar', 'flour', 'chocolate', 'granulatedSugar', 'lightBrownSugar']; // Keep the list concise
                 if (cupTypes.includes(unitType)) {
                    const cupEq =
                        unitType === 'butter' ? CONFIG.GRAMS_PER_CUP_BUTTER :
                        unitType === 'flour' ? CONFIG.GRAMS_PER_CUP_FLOUR :
                        unitType === 'granulatedSugar' ? CONFIG.GRAMS_PER_CUP_GRAN_SUGAR :
                        unitType === 'lightBrownSugar' ? CONFIG.GRAMS_PER_CUP_BROWN_SUGAR :
                         unitType === 'chocolate' ? CONFIG.GRAMS_PER_CUP_CHOC_CHIPS :
                        CONFIG.GRAMS_PER_CUP_GRAN_SUGAR;
                     const cupsValue = (grams / cupEq);
                     // Only show cups if it's a reasonable amount (like 1/4 cup or more)
                     if (cupsValue >= 0.2) {
                        // Use formatImperial's logic (via formatMixedNumber) for consistency
                        const cupsFormatted = formatMixedNumber(cupsValue, T('cups'), T('cups')).replace(T('cups'), '').trim();
                        if (cupsFormatted !== "~pinch") { // Don't show pinch as cups
                           cupsText = ` <span class="unit-cups">(${cupsFormatted} ${T('cups')})</span>`;
                         }
                    }
                 }
                 // Prioritize showing Grams clearly in AR
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
                // Show user friendly error
                 DOMElements.recipeContent.innerHTML = `<h2 class="warning">${T('error_recipe_display')}</h2> <p>${T('error_try_again')}</p>`;
                 DOMElements.recipeDisplaySection.style.display = 'block';
                 return;
             }

            const cookieName = T(`${state.selectedCookieType}Title`);
             const yieldNum = recipeData.yield;
            let yieldLabelKey = yieldNum === 1 ? 'cookie' : 'cookies'; // Default
            if (state.selectedCookieType === 'thick') {
                yieldLabelKey = yieldNum === 1 ? 'largeCookie' : 'largeCookies';
             }
            const yieldText = `${yieldNum} ${T(yieldLabelKey)}`;


            // Build Ingredients List more safely
            const ingredientsList = document.createElement('ul');
             Object.entries(recipeData.ingredients).forEach(([key, item]) => {
                const ingredientNameText = T(key) || key; // Get translated name text
                const formattedAmountHtml = formatIngredientAmount(item.grams, item.unitType); // Get amount HTML

                const li = document.createElement('li');
                const strong = document.createElement('strong');
                strong.innerHTML = formattedAmountHtml; // Amount might have HTML spans
                li.appendChild(strong);
                 li.appendChild(document.createTextNode(` ${ingredientNameText}`)); // Append name as text node
                 ingredientsList.appendChild(li);
            });

            // Build Prep Techniques HTML String
            let prepTechHtml = `<h3 class="prep-tech-title">${T('prepTitle')}</h3>`;
            recipeData.prepTechKeys.forEach(key => {
                const titleKey = `prepTechTitle_${key}`;
                const descKey = `prepTechDesc_${key}`;
                 // Check BOTH title and description exist
                if (T(titleKey) !== titleKey && T(descKey) !== descKey) {
                    prepTechHtml += `
                        <div class="pro-tip note">
                            <h4>${T(titleKey)}</h4>
                            <p>${T(descKey)}</p>
                        </div>`;
                 } else {
                    console.warn(`Missing translation for prep technique title or desc: ${key}`);
                 }
             });

             // Build Steps HTML String (Improved formatting resilience)
             let stepsHtml = `<h3 class="steps-title">${T('stepsTitle')}</h3><ol>`;
             const stepsString = T(recipeData.stepsKey);
            if (stepsString !== recipeData.stepsKey) {
                const stepsArray = stepsString.split('\n');
                stepsArray.forEach(stepText => {
                    const trimmedStep = stepText.trim();
                     if (trimmedStep) {
                        // Basic safe formatting: Find **bold** text
                         let formattedStepHtml = trimmedStep
                            .replace(/^\s*\d+\.\s*/, '') // Remove leading numbers/dots
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Apply bold

                        stepsHtml += `<li>${formattedStepHtml}</li>`;
                    }
                });
             } else {
                 console.warn(`Missing translation for steps: ${recipeData.stepsKey}`);
                 stepsHtml += `<li>${T('error_missing_steps')}</li>`; // Add placeholder error
            }
             stepsHtml += `</ol>`;

             // Build Notes HTML String
             let notesHtml = '';
            const notesString = T(recipeData.notesKey);
             if (notesString !== recipeData.notesKey) {
                notesHtml = `
                    <div class="pro-tip">
                        <h4>${T('proTipsTitle')}</h4>
                        <p>${notesString}</p>
                     </div>`;
            } else {
                 console.warn(`Missing translation for notes: ${recipeData.notesKey}`);
             }

             // Construct final innerHTML (Minimize direct injection)
            const finalHtml = `
                <h2>${T('recipeTitle').replace('{cookieName}', cookieName)}</h2>
                 <p class="recipe-yield">${T('approxYield')} ${yieldText}</p>
                <h3 class="ingredients-title">${T('ingredientsTitle')}</h3>
                <!-- Ingredients UL placeholder -->
                ${prepTechHtml}
                ${stepsHtml}
                ${notesHtml}
            `;

             DOMElements.recipeContent.innerHTML = finalHtml;

            // Find the placeholder h3 and insert the list before its next sibling
             const ingredientsTitleH3 = DOMElements.recipeContent.querySelector('.ingredients-title');
            if (ingredientsTitleH3 && ingredientsTitleH3.nextSibling) {
                DOMElements.recipeContent.insertBefore(ingredientsList, ingredientsTitleH3.nextSibling);
             } else if (ingredientsTitleH3) {
                 // If it's the last element, just append
                DOMElements.recipeContent.appendChild(ingredientsList);
             } else {
                 // Fallback if title isn't found (shouldn't happen)
                 console.error("Could not find ingredients title to insert list after.");
             }

            // Show/Hide Sections AFTER updating content
            DOMElements.stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
            DOMElements.chocolateRecommendation.style.display = 'block';
             DOMElements.recipeDisplaySection.style.display = 'block';


             // Apply language updates AFTER revealing the sections
             // Avoids trying to update hidden elements sometimes
             setTimeout(() => {
                updateLanguageContent(DOMElements.recipeDisplaySection);
                 if (recipeData.isThick) {
                    updateLanguageContent(DOMElements.stuffedEasterEgg);
                 }
                updateLanguageContent(DOMElements.chocolateRecommendation);
             }, 0); // Small timeout allows browser to render sections first


            // Smooth scroll to the displayed recipe section
             DOMElements.recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }


        /**
         * Updates text content based on the current language. Applies to visible elements within the parent.
         * @param {Element} [parentElement=document.body] - The container element to update.
         */
         function updateLanguageContent(parentElement = document.body) {
             // Check if parentElement is actually visible - skip update if not
            // Note: This check might not be 100% reliable for all visibility scenarios (CSS)
            // if (parentElement !== document.body && parentElement.offsetParent === null && parentElement.style.display === 'none') {
             //    console.log("Skipping language update for hidden parent:", parentElement.id || parentElement.tagName);
            //    return; // Don't update if the container isn't rendered
             //}

            // Find all elements with translation data-attributes within the parent
             const elements = parentElement.querySelectorAll('[data-en][data-ar]');

            elements.forEach(el => {
                 // Only update if the element itself is somewhat visible (basic check)
                 // if (el.offsetParent === null && el.style.display === 'none') {
                 //    return; // Skip individually hidden elements within the visible parent
                 //}

                const langKey = state.currentLanguage; // 'en' or 'ar'
                 const translation = el.dataset[langKey];

                if (translation !== undefined) {
                    // Update based on element type
                    if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
                         el.placeholder = translation;
                     } else if (el.tagName === 'OPTION') {
                         el.textContent = translation;
                     } else if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'P' || el.tagName === 'SPAN' || el.tagName === 'STRONG' || el.tagName === 'DIV' || el.tagName === 'FOOTER' || el.tagName === 'LABEL') {
                         // Use innerHTML for elements that might contain child HTML (like <strong> in steps)
                         el.innerHTML = translation;
                    } else {
                         // Fallback for other simple text elements
                        el.textContent = translation;
                     }
                } else {
                     console.warn(`Missing translation for lang "${langKey}" in element:`, el);
                 }
            });

             // === Update elements WITHOUT data attributes (like toggle buttons) ===
             // These only need updating when the whole body is targeted
             if (parentElement === document.body) {
                DOMElements.langToggleButton.textContent = T(state.currentLanguage === 'en' ? 'toggleArabic' : 'toggleEnglish');

                // Update Butter Unit Select Options text
                 const butterUnitOptions = DOMElements.butterUnitSelect.options;
                 for (let i = 0; i < butterUnitOptions.length; i++) {
                     const option = butterUnitOptions[i];
                     option.textContent = T(option.value); // Translate 'grams' or 'cups' value
                 }
                 // (Unit button text is handled by updateUnitButtonVisuals)
            }
             // === Set Page Direction ===
             // Always set direction, even if updating a subsection (though mainly needed for body)
             DOMElements.htmlElement.setAttribute('dir', state.currentLanguage === 'ar' ? 'rtl' : 'ltr');

             // Update Unit Button Visuals AFTER language content update, but only if body updated
             if (parentElement === document.body) {
                updateUnitButtonVisuals();
            }
        }


        /** Updates unit button text and visibility based on language */
         function updateUnitButtonVisuals() {
             if (state.currentLanguage === 'en') {
                // Update EN button text based on current system
                 DOMElements.unitToggleButton.textContent = T(state.currentUnitSystemEN === 'metric' ? 'unitImperial' : 'unitMetric');
                 // Show the toggle button for EN
                DOMElements.unitToggleButton.style.display = 'inline-block';
                 // Hide the *butter unit select* <select> element if EN & Imperial
                DOMElements.butterUnitSelect.style.display = state.currentUnitSystemEN === 'imperial' ? 'none' : 'inline-block';
             } else {
                 // ARABIC: Hide the separate Metric/Imperial toggle button
                DOMElements.unitToggleButton.style.display = 'none';
                 // ARABIC: Always show the grams/cups <select> for butter input
                DOMElements.butterUnitSelect.style.display = 'inline-block';
             }
        }

         /** Handles language toggle */
         function handleLanguageToggle() {
            state.currentLanguage = (state.currentLanguage === 'en') ? 'ar' : 'en';
            // Reset EN to default metric when switching TO English
             if (state.currentLanguage === 'en') {
                 state.currentUnitSystemEN = CONFIG.DEFAULT_UNIT_EN;
             }

             // 1. Update ALL language content on the page first
            updateLanguageContent(); // Target document.body implicitly

             // 2. Re-display recipe (if active) using the NEW language translations & unit formats
            if (state.selectedCookieType && state.baseButterGrams > 0) {
                const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);
                 if (scaledRecipe) {
                    displayRecipe(scaledRecipe); // displayRecipe now handles inner translations
                 } else {
                    console.error("Error recalculating recipe on language toggle.");
                    // Maybe clear the recipe display or show an error?
                     DOMElements.recipeDisplaySection.style.display = 'none';
                 }
            }

             // 3. Update button visuals (text/visibility) *after* content update
             // updateUnitButtonVisuals(); // Called within updateLanguageContent(document.body)
        }

        /** Handles unit system toggle (for English only) */
         function handleUnitToggle() {
            if (state.currentLanguage !== 'en') {
                 console.log("Unit toggle ignored in non-English language.");
                return; // Guard clause: only works in English
             }

            // Toggle the state
             state.currentUnitSystemEN = (state.currentUnitSystemEN === 'metric') ? 'imperial' : 'metric';

             // 1. Update button visuals (which also handles the <select> visibility)
            updateUnitButtonVisuals();

            // 2. Re-display the recipe with new unit formatting IF a recipe is active
             if (state.selectedCookieType && state.baseButterGrams > 0) {
                const scaledRecipe = calculateScaledRecipe(state.baseButterGrams, state.selectedCookieType);
                if (scaledRecipe) {
                    displayRecipe(scaledRecipe);
                 } else {
                    console.error("Error recalculating recipe on unit toggle.");
                    DOMElements.recipeDisplaySection.style.display = 'none';
                 }
            }
        }


        /** Handles the click on the "Start Experiment" button */
         function handleStartExperiment() {
            const butterGrams = getValidatedButterGrams();
             if (butterGrams > 0) {
                 state.baseButterGrams = butterGrams; // Store the valid amount

                 // Reveal cookie selection, hide recipe sections
                 DOMElements.cookieSelectionSection.style.display = 'block';
                 DOMElements.recipeDisplaySection.style.display = 'none';
                 DOMElements.stuffedEasterEgg.style.display = 'none';
                 DOMElements.chocolateRecommendation.style.display = 'none';

                // Reset any previous cookie selection visual state
                DOMElements.cookieOptions.forEach(opt => opt.classList.remove('selected'));
                state.selectedCookieType = null; // Clear selected type state

                 // Scroll smoothly down to the selection area
                 DOMElements.cookieSelectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
             // If butterGrams is 0, the validation function already showed the warning.
        }

         /** Handles clicking on a cookie type option using event delegation */
        function handleCookieSelection(event) {
            // Find the closest '.cookie-option' parent from the clicked element
            const selectedOption = event.target.closest('.cookie-option');

            // If the click wasn't inside a cookie option, ignore it
             if (!selectedOption) return;

            // Pre-condition check: Must have entered a valid butter amount first
            if (state.baseButterGrams <= 0) {
                showWarning('butterWarning'); // Remind user to enter butter amount
                return;
            }

            // Update visuals: Deselect all, then select the clicked one
            DOMElements.cookieOptions.forEach(opt => opt.classList.remove('selected'));
             selectedOption.classList.add('selected');

             // Get the selected cookie type from the data attribute
            const newCookieType = selectedOption.dataset.cookieType;
            if (!newCookieType) {
                console.error("Clicked cookie option is missing the 'data-cookie-type' attribute.", selectedOption);
                 // Show user friendly error maybe?
                 return;
             }
            state.selectedCookieType = newCookieType; // Update state

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
                 DOMElements.recipeDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
        }


        // --- Event Listeners ---
        DOMElements.startExperimentBtn.addEventListener('click', handleStartExperiment);

        // Instantly hide warning on user input/change for butter
        DOMElements.butterAmountInput.addEventListener('input', hideWarning);
        DOMElements.butterUnitSelect.addEventListener('change', hideWarning);

        // Use event delegation for cookie selection clicks on the container
        DOMElements.cookieSelectionSection.addEventListener('click', handleCookieSelection);

        // Language and Unit toggle listeners
         DOMElements.langToggleButton.addEventListener('click', handleLanguageToggle);
        DOMElements.unitToggleButton.addEventListener('click', handleUnitToggle);

        // --- Add Error keys to langStrings ---
        const errorKeys = {
             en: {
                error_recipe_display: 'Whoops! 😵‍💫 Could not display recipe.',
                error_recipe_calculation: 'Math is hard 🫠 Failed to calculate recipe.',
                 error_missing_steps: 'Uh oh, steps went missing? Tell the dev maybe? 🤷‍♀️',
                 error_try_again: 'Maybe try refreshing or selecting again?',
             },
            ar: {
                error_recipe_display: 'لا مؤاخذة! 😵‍💫 معرفتش أعرض الوصفة.',
                error_recipe_calculation: 'الحسابات صعبة 🫠 فشلت في حساب الوصفة.',
                 error_missing_steps: 'يا نهار أبيض، الخطوات ضاعت؟ بلغ الباشمهندس يمكن؟ 🤷‍♂️',
                 error_try_again: 'جرب تعمل ريفريش أو تختار تاني كدا؟',
            }
        };
         // Merge error strings into the main langStrings object
         langStrings.en = { ...langStrings.en, ...errorKeys.en };
         langStrings.ar = { ...langStrings.ar, ...errorKeys.ar };

        // --- Initial Page Setup ---
         updateLanguageContent(); // Apply initial language texts based on default state
        // updateUnitButtonVisuals(); // Called by updateLanguageContent now


         console.log("Gen Z Cookie Calculator Initialized... probably fine? ✨");

    }); // End DOMContentLoaded

 }()); // End IIFE
