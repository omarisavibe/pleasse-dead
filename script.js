document.addEventListener('DOMContentLoaded', () => {
    // --- The Goods (DOM Elements) ---
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

    // --- Your Vibe, Your State (State Variables) ---
    let currentLanguage = 'en'; // English, duh
    let currentUnitSystem = 'metric'; // Grams just hit different
    let baseButterGrams = 0; // Your butter input, turned into ✨grams✨ for the algorithm
    let selectedCookieType = null; // What cookie mood you're in

    // --- The Numbers Don't Lie (Constants) ---
    const GRAMS_PER_CUP_BUTTER = 226.8; // Butter density - gotta be precise like your search history
    const GRAMS_PER_CUP_FLOUR = 125; // Average AP flour weight
    const GRAMS_PER_CUP_GRAN_SUGAR = 200; // Granulated sweetness
    const GRAMS_PER_CUP_BROWN_SUGAR = 213; // Brown sugar, packed - no cap
    const GRAMS_PER_TSP_SALT = 6; // Salty sprinkle for the win
    const GRAMS_PER_TSP_BAKING_SODA = 4.8; // Soda power for that lift
    const GRAMS_PER_TSP_BAKING_POWDER = 4; // Powder power, different vibes
    const GRAMS_PER_LARGE_EGG = 50; // Egg weight, no shell game
    const GRAMS_PER_TSP_VANILLA = 4.2; // Vanilla - the essential flavor
    const GRAMS_PER_CUP_CHOC_CHIPS = 170; // Choc chip goodness (approx.)
    const GRAMS_PER_TBSP_MILK_POWDER = 7; // Dried milk dust - the secret sauce


    // --- The OG Recipes (Base Recipes - 284g butter is the starting point) ---
    // All amounts in GRAMS 'cause math
    const baseRecipes = {
        classic: {
            baseButter: 284, // Straight outta the source code
            yieldPerBase: 30, // About this many classic beauties
            ingredients: {
                // Ingredient: [Grams in base recipe, type for unit conversion]
                granulatedSugar: [200, 'sugar'],
                lightBrownSugar: [200, 'sugar'],
                largeEggs: [100, 'egg'], // 2 eggs, obviously
                vanillaExtract: [8.4, 'vanilla'], // 2 tsp, the golden ratio
                allPurposeFlour: [420, 'flour'],
                tableSalt: [6, 'salt'], // 1 tsp, balance is everything
                bakingPowder: [4, 'bakingPowder'], // 1 tsp, for the ✨fluff✨
                bakingSoda: [2.4, 'bakingSoda'], // 1/2 tsp, the spread master
                chocolateChips: [454, 'chocolate'], // Load 'em UP
                prepWater: [9.4, 'water'] // ~2 tsp, hydration is key
            },
            notes: 'classicNotes', // Points to the notes in your language
            prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick'], // The pro-level strats
            steps: 'classicSteps' // Your step-by-step guide
        },
        thick: {
            baseButter: 284, // Still the OG
            yieldPerBase: 10, // Thicc cookies = fewer cookies, it's science
            cookieSizeGrams: 140, // Each one's a UNIT (think those big ones from [mention a place you like getting cookies, e.g., that bakery you searched for])
            ingredients: {
                granulatedSugar: [100, 'sugar'], // Less white sugar = more chew
                lightBrownSugar: [200, 'sugar'], // Brown sugar for that gooey goodness
                toastedMilkPowder: [15, 'milkPowder'], // ~2.5 Tbsp for that extra somethin' you know about 😉
                largeEggs: [100, 'egg'], // Still need those eggs
                vanillaExtract: [8.4, 'vanilla'], // Can't skip the vanilla
                allPurposeFlour: [420, 'flour'], // The foundation
                tableSalt: [6, 'salt'], // Balance, always
                bakingPowder: [5, 'bakingPowder'], // 1 1/4 tsp, what the OCR said!
                // NO Baking Soda for these thicc bois!
                chocolateChips: [567, 'chocolate'], // Go ALL OUT with the chocolate (like that Nutella search, but make it chocolate)
                prepWater: [9.4, 'water'] // ~2 tsp for moisture
            },
            notes: 'thickNotes', // More wisdom for thiccness
            prepTech: ['brownButter', 'hydrateButter', 'chillButterClassicThick', 'toastMilkPowder'], // Level up your baking game
            steps: 'thickSteps' // The path to ultimate thiccness
        },
        thin: {
            baseButter: 284, // Yep, still here
            yieldPerBase: 42, // Thin cookies = more to snack on
            ingredients: {
                granulatedSugar: [300, 'sugar'], // High white sugar for that CRUNCH
                lightBrownSugar: [200, 'sugar'], // Still gotta have some chew
                largeEggs: [100, 'egg'], // The glue that holds it together
                vanillaExtract: [8.4, 'vanilla'], // Flavorrrr
                allPurposeFlour: [420, 'flour'], // The canvas for your crispy masterpiece
                tableSalt: [6, 'salt'], // Essential
                bakingSoda: [7.2, 'bakingSoda'], // 1 1/2 tsp, that spread magic (like how your TikTok goes viral 😉)
                // No Baking Powder for maximum thinness!
                chocolateChips: [340, 'chocolate'], // Maybe mini chips for extra thinness?
                prepWater: [9.4, 'water'] // ~2 tsp, gotta keep things consistent
            },
            notes: 'thinNotes', // The secrets to thin and crispy domination
            prepTech: ['brownButter', 'hydrateButter', 'chillButterThin'], // Special chill for the reverse cream method – you're learning all the tricks!
            steps: 'thinSteps' // The roadmap to achieving peak crisp
        }
    };

    // --- Your Words (Language Strings) ---
    const langStrings = {
        en: {
            // Toggles & Units
            toggleArabic: 'عربي',
            toggleEnglish: 'English',
            unitMetric: 'Metric (g, ml)',
            unitImperial: 'Imperial (cups, tsp)',
            unitGrams: 'Grams (جرام)',
            unitCups: 'Cups (كوب)',
            // Butter Input
            butterVarTitle: 'Step 1: Butter Up!',
            butterVarDesc: `Alright, let's talk butter. How much of that unsalted gold are you gonna bless these cookies with? Don't be shy!`,
            grams: 'grams',
            cups: 'cups',
            butterWarning: 'Hold up! Gotta put in a real amount of butter – at least 100g or, like, half a cup.',
            beginExperiment: 'Let\'s Get This Bread (Or... Cookies!)',
            // Cookie Selection
            phenotypeTitle: 'Step 2: Pick Your Cookie Vibe',
            phenotypeDesc: 'What kinda cookie are you feeling today?',
            thinTitle: 'The Crunchy One', thinDesc: 'Delicate, snappy, gonna spread out like crazy.',
            classicTitle: 'The OG', classicDesc: 'Chewy inside, crispy edges. The one that always hits.',
            thickTitle: 'The Thicc Baddie', thickDesc: 'Soft, gooey, barely gonna spread. Pure indulgence, no cap.',
            // Recipe Display
            recipeTitle: '{cookieName} Recipe', // It'll fill in the blanks, trust
            prepTitle: 'Pre-Game Moves',
            ingredientsTitle: 'The Goods (Ingredients Calculated)',
            approxYield: 'Makes About:',
            cookies: 'cookies', // Plural, obvi
            cookie: 'cookie', // For that single perfect bite
            largeCookies: 'chonky cookies',
            largeCookie: 'one chonky cookie',
            stepsTitle: 'The Recipe (Your Path to Cookie Nirvana)',
            proTipsTitle: 'Cookie Hacks (Pro Level)',
            // Ingredient Names
            unsaltedButter: 'Unsalted Butter', granulatedSugar: 'Granulated Sugar', lightBrownSugar: 'Light Brown Sugar (packed, always)', toastedMilkPowder: 'Toasted Milk Powder', largeEggs: 'Large Eggs (room temp, it matters!)', vanillaExtract: 'Vanilla Extract', allPurposeFlour: 'All-Purpose Flour (spooned & leveled – we don\'t gatekeep precision)', tableSalt: 'Table Salt', bakingPowder: 'Baking Powder (fresh, or it\'s a flop)', bakingSoda: 'Baking Soda (freshness is key, fam)', chocolateChips: 'Chocolate Chips/Chunks (treat yourself)', prepWater: 'Water/Milk (for that hydration boost)',
            // Prep Techniques - Let's break it down like your fave TikTok explainer
            prepTechTitle_brownButter: 'Brown Butter Basics (It\'s Liquid Gold, Literally)',
            prepTechDesc_brownButter: `Okay, so the Maillard reaction isn't just for your fancy dinners. When butter melts, the milk solids cook and create, like, a million nutty, toasty, butterscotch flavors. It's a whole experience.<br>
                                      1. Chop your butter into pieces in a light-colored saucepan. You gotta see what's happening.<br>
                                      2. Melt it over medium heat. It'll get foamy (that's the water leaving the chat). Swirl it or stir gently – no need to go wild.<br>
                                      3. Keep the heat and the swirling going. The milk solids will sink and turn golden, then this nutty brown color (think toasted hazelnuts – 🤤). The smell will be insane. This takes like 5-10 mins, so keep your eyes peeled!<br>
                                      4. As soon as it's that brown color and smells nutty AF, IMMEDIATELY pour it into a heatproof bowl (get all those brown bits in there – that's the flavor!). You gotta stop the cooking ASAP or it'll burn, and nobody wants that.`,
            prepTechTitle_hydrateButter: 'Secret Level: Rehydrating Your Butter (Optional, But Peep This)',
            prepTechDesc_hydrateButter: `So, when you brown butter, some of the water leaves (about 15-20%). Adding a tiny bit back *after* browning but *before* chilling can make your dough extra moist, which means extra chewy cookies. Just stir it in gently until it's all mixed in. (The exact amount is calculated below, don't stress).`,
            prepTechTitle_chillButterClassicThick: 'Chill Pill: Solidifying for Maximum Creaminess',
            prepTechDesc_chillButterClassicThick: `Why the fridge time? Browning messes with the butter's fat crystals, which are kinda essential for creaming (that's when you beat butter and sugar to trap air and make your cookies fluffy). We gotta rebuild that structure!<br>
                                              1. Let your browned (and maybe rehydrated) butter cool down a bit – like, 5-10 mins, no rush.<br>
                                              2. Pop it in the fridge until it's solid but still got some give – think of cool playdough, not a literal rock. This usually takes around 1-2 hours. You're aiming for 60-65°F (16-18°C) – this is the sweet spot for Classic and Thicc cookies.`,
            prepTechTitle_chillButterThin: 'Chill Out (But Not Too Much): Cooling for the Reverse Cream Hack',
            prepTechDesc_chillButterThin: `For the Crunchy Ones, we're doing this reverse cream method, so the butter needs to be cool but still soft enough to coat the flour. Think that slightly firm stage.<br>
                                           1. Let that browned (and maybe rehydrated) butter come to room temp, then give it a quick chill in the fridge. You want it just solid but still easy to cut or break apart – maybe 30-60 mins. Aim for a little firmer than room temp, around 65-68°F (18-20°C). It needs to be cool enough to coat the flour without melting instantly, ya feel?`,
            prepTechTitle_toastMilkPowder: 'Flavor Bomb: Toasting Milk Powder (Trust Me On This One)',
            prepTechDesc_toastMilkPowder: `Toasting the milk powder brings out this insane nutty, malty flavor by browning the milk sugars and proteins. More flavor science = better cookies, especially for the Thicc Baddies.<br>
                                           1. Spread that non-fat dry milk powder super thin on a baking sheet lined with parchment paper OR in a dry pan – your choice.<br>
                                           2. Oven method: Bake at 250°F (120°C) for 10-15 mins, stirring every 5. Pan method: Heat over medium-low, and stir. Like, constantly. No distractions!<br>
                                           3. Watch it closely! It'll turn golden brown and smell amazing real quick. Don't let it burn – burnt milk powder cookies? Hard pass.<br>
                                           4. Let it cool ALL the way down before you use it. Patience is a virtue, or whatever.`,
            // Notes & Steps - More you, more personalized
            classicNotes: `The Classic cookie is all about balance – that perfect 1:1 sugar ratio, both baking powder *and* soda doing their thing for the perfect rise and spread, and nailing that CREAMING step. Seriously, don't skip the chill time or rush the creaming! Butter temp (60-65°F) is non-negotiable – treat it like a science experiment.`,
            classicSteps: `1. **Prep Like a Pro:** Whisk together the flour, salt, baking powder, and baking soda. Line your baking sheets – parchment paper is your friend. Make sure your butter is chilled but still got a little give (60-65°F), and your eggs are room temp (take 'em out when you start prepping).<br>
                           2. **Creaming Time:** Beat that chilled brown butter and the sugars on medium-high speed for a FULL 5 minutes. It should get super light, fluffy, and, like, double in size – this is where the magic happens! Don't forget to scrape down the bowl so everything gets mixed evenly.<br>
                           3. **Wet Crew, Assemble:** Turn the mixer to low. Add the eggs one at a time, mixing *just* until they're combined. Mix in the vanilla with the last egg. Don't overmix – we're not making a cake here.<br>
                           4. **Dry Invasion:** On the lowest speed, slowly add the flour mixture. Mix *only* until you can't see any more streaks of flour. If you need to, finish mixing by hand to avoid overmixing – nobody likes a tough cookie.<br>
                           5. **Fold It In Like You Mean It:** Gently fold in those chocolate chips with a spatula. Don't be too aggressive!<br>
                           6. **Chill Out (But For Real This Time):** Cover the dough and stick it in the fridge for at least 30-60 minutes (you can even go up to 48 hours for more flavor – it's a whole thing). This helps the fat solidify and the flour hydrate, trust the process.<br>
                           7. **Scoop & Bake:** Preheat your oven to 375°F (190°C). Scoop about 2 tablespoons of dough per cookie onto your prepared sheets, leaving a couple of inches between them – they need their space. Bake for 10-12 minutes, until the edges are golden and the center still looks a little soft and puffy. Rotate the pan halfway through for even baking.<br>
                           8. **Cool Down Period:** Let the cookies cool on the baking sheet for 3-5 minutes (this is important so they don't crumble!). Then, move them to a wire rack to cool completely. Patience, young grasshopper.`,
            thickNotes: `Thiccness is a battle against the spread! High brown sugar, absolutely NO baking soda, and a MANDATORY long chill are your secret weapons. Go easy on the creaming to prevent them from pancaking. Toasted milk powder? Chef's kiss for that extra nutty, slightly chewy vibe that you're into. And a little secret? Embrace the underbake for maximum goo – it's the only way.`,
            thickSteps: `1. **Prep Time, Thicc Edition:** Whisk together the flour, toasted milk powder (if you're feeling fancy, and you should be!), salt, and baking powder. Line those sheets. Make sure your butter is chilled but still got a little give (60-65°F), and your eggs are at room temp – no cold eggs allowed in the thicc zone.<br>
                           2. **Creaming (But Make It Chill):** Beat that chilled brown butter and the sugars on medium speed for just 2-3 minutes. You want it combined and creamy, but not super light and fluffy like the Classic. Scrape the bowl. We're not trying to whip air into these bad boys.<br>
                           3. **Wet Ingredients, Let's Go:** Turn the mixer to low. Add the eggs one by one, just until they're mixed in. Stir in the vanilla – don't overthink it.<br>
                           4. **Dry Invasion:** On the lowest speed, add the flour mixture in 4-5 batches, mixing until it's *almost* all combined (a few streaks of flour are okay – we're not aiming for perfection here, just thiccness). We're trying to keep that gluten development to a minimum for that soft, gooey texture.<br>
                           5. **Chocolate Overload:** Add ALL the chocolate. Seriously, don't hold back. Use a sturdy spatula or even your hands (wash 'em first, duh!) to fold it in, making sure to mix in any remaining flour bits. The dough will be THICK – don't overmix, just get it combined.<br>
                           6. **The Long Chill (This Ain't Even a Suggestion):** Divide the dough into HUGE balls (like, 4-6 ounces each – these are serious business!). Roll them kinda tall. Wrap them up tight and put them in the fridge for at least 4 hours, but ideally 12-72 hours. DO. NOT. SKIP. THIS. STEP. It's crucial for that perfect thiccness.<br>
                           7. **Bake 'Em Cold:** Preheat your oven to 350°F (180°C). Place those COLD dough balls far apart on the baking sheet. DO NOT flatten them – let them do their thing. Bake for 18-25 minutes (depending on how massive they are). The edges should be set, and the center will look super soft, maybe even a little gooey. (Aim for an internal temp of 175-185°F / 79-85°C – use a thermometer if you're feeling scientific). Rotate the pan halfway.<br>
                           8. **Cooling with Care:** Let these bad boys cool on the baking sheet for a solid 10-15 MINUTES. They're delicate! Gently transfer them to a wire rack. They're best enjoyed warm (but not, like, molten lava hot – give it a minute).`,
            thinNotes: `Crispiness is the goal – maximum spread and minimum gluten. High granulated sugar, lots of baking soda (that alkalinity helps with browning and spread – it's chemistry!), and the reverse creaming method (coating the flour with fat first – it's a whole hack) are non-negotiable. And get this – NO chilling! Bake them until they're nice and golden all over.`,
            thinSteps: `1. **Prep Time, Skinny Style:** Line your baking sheets. Make sure your butter is cool but still got a little give (65-68°F / 18-20°C), and cut it into small pieces – makes it easier to work with. Get your eggs to room temp. Whisk the eggs and vanilla together in a small bowl.<br>
                           2. **Reverse Cream Magic:** In your mixer bowl, toss in the flour, both sugars, salt, and baking soda. Mix it up briefly to combine. Add those cool butter pieces. Mix on low speed until the mixture looks like coarse, damp sand or crumbs (the butter's getting worked in and coating the flour – it's like magic!). This takes a few minutes, so be patient.<br>
                           3. **Wet Meets Dry (Slowly):** With the mixer on low, slowly drizzle in the egg and vanilla mixture. Mix *only* until a dough just barely comes together. It might look a little crumbly at first, but trust the process – don't panic. DO NOT OVERMIX – we want these to be tender and crispy, not tough.<br>
                           4. **Chip In (But Gently):** Gently fold in your finely chopped chocolate or mini chocolate chips with a spatula. Just a few strokes – don't go crazy and develop that gluten.<br>
                           5. **Scoop & Bake (ASAP!):** Don't even think about chilling this dough – it wants to spread! Preheat your oven to 350°F (175°C). Scoop small portions (about 1 tablespoon each) onto your prepared sheets, leaving TONS of space (like, 3+ inches apart) because these guys are gonna go wild and spread out!<br>
                           6. **Bake for the Crunch:** Bake for 12-16 minutes until they've spread out thin and are a uniform golden brown from the edges to the center. They might look a little puffy in the middle, but they'll flatten out as they cool – trust. Rotate the pan halfway through for even crispiness. A little extra baking is okay if you want them extra crunchy.<br>
                           7. **Cool Down, They're Hot!:** Let the cookies cool on the baking sheet for 5-10 minutes until they're firm enough to move. Then, transfer them to a wire rack to cool completely. They'll get even crispier as they cool down and the sugars recrystallize – it's all part of the ✨science✨.`,
            // Easter Egg & Recs - Made for you
            stuffedTitle: '✨OMG, SECRET LEVEL UNLOCKED!✨',
            stuffedCongrats: 'YOOOO, you went for the Thicc Baddie route! You know what that means?! STUFFED COOKIES, bestie!',
            stuffedHowTo: `Okay, listen up. Flatten a dough ball a bit, make a little dip in the middle (like a tiny bowl), drop in about a teaspoon of Nutella or that **pistachio spread** you were eyeing (you know the one 😉), wrap the dough around it, pinch it closed so it's sealed tight, and bake as usual (maybe add a minute or two, just keep an eye on 'em).`,
            pistachioTipTitle: 'Pistachio Pro Tip (For Your Obsession):',
            pistachioTipDesc: `Forget those weak, watery pistachio spreads. For that REAL, "I'm eating straight-up pistachios" flavor that's like liquid gold, I'm telling you, 'ASM Foods Pistachio Cream' is IT. You were searching for it, so you already KNOW it's fire. Seriously, level up your cookie game.`,
            pistachioTipLink: 'Grab it here (Egypt Link)',
            chocoTipTitle: 'Chocolate Chip Wisdom (Listen Up!):',
            chocoTipDesc: `Not all chocolate chips are created equal, my friend! For that melty, nostalgic flavor that takes you back to the good stuff (think Galaxy/Dairy Milk, but BETTER 'cause #Boycott!), you HAVE to find 'Target Kualety Dropsy' MILK Chocolate. It's the secret weapon for that sweet, sweet victory. You were looking at quality targets, so you already have the right mindset!`,
            chocoTipLink: 'Might find 'em through suppliers like this (Facebook Link)',
            chocoTipMilk: 'Make SURE it\'s the MILK chocolate version for max deliciousness – don\'t say I didn\'t warn you.',
            // Conclusion - Your final words
            conclusionTitle: 'Experiment Complete! (And Delicious!)',
            conclusionDesc: `Hypothesis: Brown butter cookies are the absolute BEST. Confirmed. If you documented your amazing results (pics or it didn't happen!), drop 'em and tag me – I wanna see!`,
            conclusionTag: 'Find me on Insta:',
            conclusionGoForth: 'Go forth and bake... for science, for flavor, and for the vibes.',
            footerText: 'Built with science, butter, and a sprinkle of internet magic. You know how it is.',
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
             // Butter Input
            butterVarTitle: 'الخطوة الأولى: الزبدة يا معلم!',
            butterVarDesc: `يلا بينا نشوف الزبدة اللي هنستخدمها. هتحط قد إيه من الزبدة الصفرا الحلوة دي (مش مملحة طبعًا)? متتكسفش!`,
            grams: 'جرام',
            cups: 'كوب',
            butterWarning: 'استنى عندك! لازم تدخل رقم صح للزبدة – على الأقل 100 جرام ولا حوالي نص كوباية كده.',
            beginExperiment: 'يلا نخبز!',
            // Cookie Selection
            phenotypeTitle: 'الخطوة الثانية: اختار شكل الكوكيز اللي نفسك فيها',
            phenotypeDesc: 'عايز الكوكيز بتاعتك تكون إيه بالظبط؟',
            thinTitle: 'الرقيقة المقرمشة', thinDesc: 'رقيقة، بتقرمش، وهتفرش في الصينية براحتها.',
            classicTitle: 'الأصلية', classicDesc: 'طرية من جوا، مقرمشة من برا. اللي كله بيحبها.',
            thickTitle: 'التخينة الجامدة', thickDesc: 'طرية وبتلزق شوية، مش هتفرش كتير. دلع نفسك بقى.',
            // Recipe Display
            recipeTitle: 'وصفة {cookieName}', // هتتغير أوتوماتيك، متقلقش
            prepTitle: 'جهز حاجتك الأول',
            ingredientsTitle: 'المكونات بالظبط (محسوبة)',
            approxYield: 'هتعمل حوالي:',
            cookies: 'كوكيز', // جمع
            cookie: 'كوكي', // مفرد
            largeCookies: 'كوكيز تخينة',
            largeCookie: 'كوكي تخينة',
            stepsTitle: 'الطريقة (الخطوات بالظبط)',
            proTipsTitle: 'نصايح الخبراء (ركز معايا)',
            // Ingredient Names
            unsaltedButter: 'زبدة غير مملحة', granulatedSugar: 'سكر حبيبات', lightBrownSugar: 'سكر بني فاتح (مكبوس طبعًا)', toastedMilkPowder: 'بودرة حليب محمصة', largeEggs: 'بيض كبير (بدرجة حرارة الغرفة، مهم!)', vanillaExtract: 'مستخلص فانيليا', allPurposeFlour: 'دقيق متعدد الأغراض (بالملعقة وتمسحه عشان يبقى مظبوط)', tableSalt: 'ملح طعام', bakingPowder: 'بيكنج بودر (لازم يكون جديد!)', bakingSoda: 'بيكنج صودا (برضه لازم تكون جديدة!)', chocolateChips: 'حبيبات/قطع شوكولاتة', prepWater: 'ماء/حليب (عشان العجينة متطلعش ناشفة)',
            // Prep Techniques (Translate descriptions carefully)
            prepTechTitle_brownButter: 'إزاي تحمر الزبدة (دهب سايل يا باشا!)',
            prepTechDesc_brownButter: `تفاعل ميلارد ده مش بس عشان اللحمة! لما الزبدة تسيح، المواد الصلبة اللي فيها بتستوي وبتعمل طعم مجنون، مكس بين المكسرات والتحميصة وريحة الكراميل. حوار تاني خالص.<br>
                                      ١. قطع الزبدة مكعبات صغيرة في حلة فاتحة عشان تشوف لونها بيتغير إزاي.<br>
                                      ٢. سيحها على نار متوسطة. هتعمل رغوة (المية بتبخر). قلبها أو حرك الحلة بالراحة.<br>
                                      ٣. خليك مستمر في التسخين والتقليب. المواد الصلبة هتنزل تحت وهتتحول للون دهبي، وبعد كده بني فاتح زي البندق المحمص. الريحة هتبقى فظيعة. الموضوع بياخد حوالي ٥-١٠ دقايق، فخلي عينك عليها!<br>
                                      ٤. أول ما توصل للون البني وريحتها تبقى جنان، صبها على طول في طبق تاني يستحمل الحرارة (خد كل الحاجات البني اللي في القاع دي معاك!). لازم توقف الطهي بسرعة عشان متتحرقش – الفرق بين اللون البني والمحروق شعرة!`,
            prepTechTitle_hydrateButter: 'اختياري بس جامد: ترجع المية للزبدة تاني',
            prepTechDesc_hydrateButter: `لما بتحمر الزبدة، شوية مية بتبخر منها (حوالي ١٥-٢٠٪). لو رجعت شوية مية تاني *بعد* ما تحمرها بس *قبل* ما تبردها، ده بيخلي العجينة طرية أكتر، وده ممكن يخلي الكوكيز طرية من جوا. قلبها بالراحة لحد ما المية تختفي. (الكمية هتكون مكتوبة تحت، متقلقش).`,
            prepTechTitle_chillButterClassicThick: 'التبريد مهم: جمدها عشان تبقى كريمية',
prepTechTitle_hydrateButter: 'اختياري بس جامد: ترجع المية للزبدة تاني',
            prepTechDesc_hydrateButter: `لما بتحمر الزبدة، شوية مية بتبخر منها (حوالي ١٥-٢٠٪). لو رجعت شوية مية تاني *بعد* ما تحمرها بس *قبل* ما تبردها، ده بيخلي العجينة طرية أكتر، وده ممكن يخلي الكوكيز طرية من جوا. قلبها بالراحة لحد ما المية تختفي. (الكمية هتكون مكتوبة تحت، متقلقش).`,
            prepTechTitle_chillButterClassicThick: 'التبريد مهم: جمدها عشان تبقى كريمية',
            prepTechDesc_chillButterClassicThick: `ليه بنبردها؟ التحمير بيسيح بلورات الدهون اللي في الزبدة، ودي مهمة عشان لما بنضرب الزبدة مع السكر، بنحبس هوا وبيخلي الكوكيز هشة. محتاجين نرجع البلورات دي تاني!<br>
                                              ١. سيب الزبدة اللي حمرتها (وممكن تكون رجعتلها شوية مية) تبرد شوية – حوالي ٥-١٠ دقايق كده.<br>
                                              ٢. حطها في التلاجة لحد ما تجمد بس لسه طرية شوية – زي الصلصال البارد كده. مش عايزينها تبقى صخرة! (حوالي ساعة ولا اتنين). هدفك تكون درجة حرارتها حوالي ٦٠-٦٥ فهرنهايت (١٦-١٨ درجة مئوية). دي الدرجة المثالية عشان طريقة الخفق بتاعة الكوكيز الكلاسيكية والتخينة.`,
            prepTechTitle_chillButterThin: 'التبريد الخفيف: سقعها عشان طريقة الخفق العكسي',
            prepTechDesc_chillButterThin: `عشان الكوكيز الرقيقة المقرمشة، هنعمل طريقة خفق عكسية، فمحتاجين الزبدة تكون باردة بس لسه طرية عشان نعرف نغطي بيها الدقيق.<br>
                                           ١. سيب الزبدة اللي حمرتها (وممكن تكون رجعتلها شوية مية) تبرد شوية وبعدين حطها في التلاجة بسرعة لحد ما تجمد حاجة بسيطة بس لسه تعرف تقطعها أو تكسرها بسهولة (حوالي نص ساعة لساعة). هدفك تكون أصلب شوية من درجة حرارة الغرفة، حوالي ٦٥-٦٨ فهرنهايت (١٨-٢٠ درجة مئوية). لازم تكون باردة كفاية عشان تغطي حبيبات الدقيق من غير ما تسيح بسرعة، فاهم قصدي؟`,
            prepTechTitle_toastMilkPowder: 'مُعزز طعم خرافي: تحميص بودرة الحليب (هتدمنها!)',
            prepTechDesc_toastMilkPowder: `التحميص ده بيطلع طعم مجنون كده، زي المكسرات والشعير، عشان السكر والبروتين اللي في الحليب بيتكرملوا (تفاعل ميلارد تاني!). بيضيف عمق مش طبيعي، بالذات في الكوكيز التخينة.<br>
                                           ١. فرد بودرة الحليب البودرة خالية الدسم طبقة رقيقة على صينية عليها ورق زبدة أو في طاسة ناشفة – اللي يريحك.<br>
                                           ٢. في الفرن: سخن على ١٢٠ درجة مئوية (٢٥٠ فهرنهايت) لمدة ١٠-١٥ دقيقة، وقلب كل ٥ دقايق. في الطاسة: سخن على نار هادية وقلب باستمرار. آه والله باستمرار، متبصش في حتة تانية!<br>
                                           ٣. عينك عليها! لونها هيتغير بسرعة وهتبقى دهبي وريحتها فظيعة. متخليهاش تتحرق – محدش عايز كوكيز بطعم حليب محروق.<br>
                                           ٤. سيبها تبرد خالص قبل ما تستخدمها.`,
            // Notes & Steps (Translate carefully)
            classicNotes: `الكوكيز الكلاسيكية دي سرها في التوازن – نسبة السكر ١:١، والبيكنج بودر والصودا الاتنين شغالين عشان النفشة والفرشة يبقوا مظبوطين، والأهم من كل ده الخفق الصح. متستعجلش في التبريد ولا في الخفق! درجة حرارة الزبدة (١٦-١٨°م) دي أساس اللعبة.`,
            classicSteps: `١. **جهز كل حاجتك:** اخلط الدقيق والملح والبيكنج بودر والصودا. جهز الصواني وحط عليها ورق زبدة. اتاكد ان الزبدة باردة بس لسه طرية شوية (١٦-١٨°م)، والبيض بدرجة حرارة الغرفة.<br>
                           ٢. **وقت الخفق:** اضرب الزبدة البنية الباردة مع السكر على سرعة متوسطة-عالية لمدة ٥ دقايق كاملة. لازم الخليط يبقى فاتح وهش وحجمه يزيد للضعف (دي أهم خطوة!). متنساش تكحت الجوانب بتاعة الوعاء.<br>
                           ٣. **ضيف الحاجات السايلة:** شغل الخلاط على سرعة هادية. ضيف البيض واحدة واحدة، واخلط *يا دوب* لحد ما يختفوا. ضيف الفانيليا مع آخر بيضة. متخلطش كتير عشان العجينة متطلعش ناشفة.<br>
                           ٤. **ضيف الحاجات الناشفة:** على أقل سرعة، ضيف خليط الدقيق بالتدريج. اخلط *يا دوب* لحد ما الدقيق كله يختفي. لو محتاج، كمل خلط بإيدك عشان متخلطش كتير.<br>
                           ٥. **وقت التقليب بالراحة:** قلب حبيبات الشوكولاتة بالراحة باستخدام معلقة مسطحة.<br>
                           ٦. **التبريد ضروري (نصيحة من القلب):** غطي العجينة وحطها في التلاجة لمدة ٣٠-٦٠ دقيقة على الأقل (ممكن تسيبها لحد ٤٨ ساعة عشان الطعم يبقى أحلى). التبريد ده بيخلي الدهون تجمد والدقيق يشرب السوايل كويس.<br>
                           ٧. **التشكيل والخبز:** سخن الفرن على ١٩٠°م (٣٧٥°ف). شكل العجينة كور صغيرة (حوالي ٢ معلقة كبيرة) ورصها في الصينية مع مسافة حوالي ٥ سم بين كل واحدة والتانية. اخبز لمدة ١٠-١٢ دقيقة، لحد ما الأطراف تبقى دهبية والوش لسه طري شوية. لف الصينية في نص الوقت.<br>
                           ٨. **التبريد النهائي:** سيب الكوكيز تبرد على الصينية لمدة ٣-٥ دقايق (دي خطوة مهمة عشان متتكسرش!). وبعدين نقلهم على شبكة عشان يبردوا خالص.`,
            thickNotes: `الكوكيز التخينة دي محتاجة شغل عشان متفرشش! السكر البني الكتير، ومفيش بيكنج صودا خالص، والتبريد الطويل ضروريين عشان تظبط. متخلطش كتير في الأول عشان متتنفخش زيادة. بودرة الحليب المحمصة بتدي طعم مكسرات تحفة ومضغة خفيفة. ومتخافش تسيبها طرية شوية من جوا عشان تبقى أحلى.`,
            thickSteps: `١. **جهز كل حاجة للكوكيز التخينة:** اخلط الدقيق وبودرة الحليب المحمصة والملح والبيكنج بودر. جهز الصواني وحط عليها ورق زبدة. اتاكد ان الزبدة باردة بس لسه طرية شوية (١٦-١٨°م)، والبيض بدرجة حرارة الغرفة.<br>
                           ٢. **الخفق الخفيف:** اضرب الزبدة البنية الباردة مع السكر على سرعة متوسطة لمدة ٢-٣ دقايق بس، لحد ما الخليط يتجانس ويبقى كريمي (مش لازم يبقى هش ومنفوش زي الكلاسيكية). اكحت الجوانب بتاعة الوعاء. متخلطش كتير عشان مش عايزين ندخل هوا كتير في العجينة.<br>
                           ٣. **ضيف الحاجات السايلة:** شغل الخلاط على سرعة هادية. ضيف البيض واحدة واحدة، واخلط *يا دوب* لحد ما يختفوا. ضيف الفانيليا.<br>
                           ٤. **ضيف الحاجات الناشفة:** على أقل سرعة، ضيف خليط الدقيق على ٤-٥ مرات، واخلط لحد ما الدقيق كله يختفي تقريبًا (لو فيه شوية دقيق صغيرين مفيش مشكلة). ده بيقلل من تكون الجلوتين.<br>
                           ٥. **الشوكولاتة بقى:** حط كمية شوكولاتة كتير براحتك. استخدم معلقة مسطحة قوية أو حتى ايدك (اغسلها كويس الأول!) وقلب بالراحة لحد ما الدقيق كله يختفي. العجينة هتبقى تقيلة جداً. متخلطش كتير.<br>
                           ٦. **التبريد الإلزامي:** قسم العجينة كور كبيرة (حوالي ١١٣-١٧٠ جرام للواحدة). كورها لفوق شوية مش مبططة. لفها كويس بالبلاستيك وحطها في التلاجة لمدة ٤ ساعات على الأقل، والأحسن تسيبها ١٢-٧٢ ساعة. متتجاهلش الخطوة دي أبداً.<br>
                           ٧. **اخبز وهي باردة:** سخن الفرن على ١٨٠°م (٣٥٠°ف). رص كور العجينة الباردة في الصينية بعيد عن بعض. متتبططهاش. اخبز لمدة ١٨-٢٥ دقيقة (حسب حجم الكوكيز). الأطراف هتبقى متماسكة والوش هيبقى طري جداً وممكن يكون بيلزق شوية من النص. (ممكن تستخدم ترمومتر وتخلي درجة الحرارة الداخلية حوالي ٧٩-٨٥°م). لف الصينية في نص الوقت.<br>
                           ٨. **التبريد بحذر:** سيب الكوكيز تبرد على الصينية لمدة ١٠-١٥ دقيقة. بتكون طرية جداً! انقلها بالراحة على شبكة عشان تبرد خالص. طعمها بيكون أحلى وهي دافية شوية مش سخنة.`,
            thinNotes: `الكوكيز المقرمشة = فرش كتير + جلوتين قليل أوي. السكر الأبيض الكتير، والبيكنج صودا الكتير (القلوية بتساعد على التحمير والفرش)، وطريقة الخفق العكسي (نغطي الدقيق بالدهون الأول) دي حاجات أساسية. ومفيش تبريد خالص! اخبزها لحد ما لونها يبقى دهبي كلها.`,
            thinSteps: `١. **جهز كل حاجة للكوكيز الرقيقة:** جهز الصواني وحط عليها ورق زبدة. اتاكد ان الزبدة باردة بس لسه طرية شوية (١٨-٢٠°م)، وقطعها مكعبات صغيرة. البيض يكون بدرجة حرارة الغرفة. اضرب البيض والفانيليا مع بعض في طبق صغير.<br>
                           ٢. **طريقة الخفق العكسي:** في وعاء الخلاط، حط الدقيق والسكر والملح والبيكنج صودا. اخلطهم شوية. ضيف مكعبات الزبدة الباردة. اخلط على سرعة هادية لحد ما الخليط يبقى عامل زي الرمل الخشن والرطب (الزبدة اتغلفت بالدقيق). ده بياخد كام دقيقة.<br>
                           ٣. **اخلط السوايل مع النواشف:** الخلاط شغال على سرعة هادية. ابدأ ضيف خليط البيض والفانيليا بالتدريج. اخلط *يا دوب* لحد ما العجينة تبدأ تتلم. ممكن في الأول تحس إنها مفرولة شوية. متخلطش كتير. السر في إنها تكون طرية.<br>
                           ٤. **قلب الشوكولاتة:** قلب الشوكولاتة المفرومة أو حبيبات الشوكولاتة الصغيرة بالراحة باستخدام معلقة مسطحة. متقلبش كتير.<br>
                           ٥. **شكل واخبز على طول:** متسيبهاش تبرد! سخن الفرن على ١٧٥°م (٣٥٠°ف). شكل العجينة كور صغيرة (حوالي ١ معلقة كبيرة) ورصها في الصينية مع مسافة كبيرة بينهم (حوالي ٧ سم) عشان هتفرش كتير!<br>
                           ٦. **اخبزها عشان تبقى مقرمشة:** اخبز لمدة ١٢-١٦ دقيقة لحد ما تفرد ويبقى لونها دهبي موحد من الأطراف للنص. ممكن تحس إنها منفوخة شوية من النص بس هتهبط لما تبرد. لف الصينية في نص الوقت. لو عايزها مقرمشة زيادة، ممكن تسيبها في الفرن دقيقة كمان.<br>
                           ٧. **التبريد النهائي:** سيب الكوكيز تبرد على الصينية لمدة ٥-١٠ دقايق لحد ما تمسك نفسها شوية. وبعدين انقلها على شبكة عشان تبرد خالص. القرمشة الجامدة بتظهر لما تبرد خالص عشان السكر بيتجمد تاني.`,
            // Easter Egg & Recs
            stuffedTitle: '✨يا خراشي! مستوى سري اتفتح!✨',
            stuffedCongrats: 'يا أسطورة! اختيارك للكوكيز التخينة ده معناه إنك جامد جداً. عارف ده معناه إيه؟ كوكيز محشية يا معلم!',
            stuffedHowTo: 'إزاي؟ بسيطة. افرد كرة العجين شوية، اعمل حفرة صغيرة في النص، حط حوالي معلقة صغيرة نوتيلا أو زبدة فستق، لف العجينة عليها، اقفلها كويس، واخبزها زي ما مكتوب (ممكن تزود دقيقة ولا اتنين).',
            pistachioTipTitle: 'نصيحة فستق من محترف:',
            pistachioTipDesc: 'انسى بقى أي زبدة فستق خفيفة أو طعمها مش باين! عشان تاكل طعم الفستق الأصلي اللي تحس إنه فستق سايح في بقك، أنا بقولك وبأكدلك "كريمة الفستق من ASM Foods" دي حكاية تانية خالص. بجد تحفة. أنت كده كده كنت بتدور عليها أصلاً!',
            pistachioTipLink: 'شوفها من هنا (رابط مصر)',
            chocoTipTitle: 'معلومة مهمة عن الشوكولاتة:',
            chocoTipDesc: 'مش كل الشوكليت شيبس زي بعض! عشان الطعم اللي بيدوب في البق كده ويفكرك بالشوكولاتة بتاعة زمان (زي جلاكسي وديري ميلك، بس أحسن عشان #مقاطعة!)، دور على شوكولاتة "Target Kualety Dropsy" باللبن. دي السر اللي هيخلي الكوكيز بتاعتك طعمها جنان. أنت كنت بتدور على حاجات كواليتي، ف أكيد هتلاقيها!',
            chocoTipLink: 'ممكن تلاقيهم عند موردين زي دول (رابط فيسبوك)',
            chocoTipMilk: 'لازم تتأكد إنها الشوكولاتة اللي باللبن عشان الطعم يبقى أحلى حاجة!',
            // Conclusion
            conclusionTitle: 'التجربة خلصت بنجاح!',
            conclusionDesc: 'الفرضية اتأكدت: كوكيز الزبدة البنية أحسن كوكيز في الدنيا. لو صورت الكوكيز التحفة بتاعتك، ابعتلي الصور بقى!',
            conclusionTag: 'اعملي تاج على انستجرام:',
            conclusionGoForth: 'يلا بقى روح اخبز... بالعلم وبالطعم وبالهنا والشفا!',
            footerText: 'صنع بحب، وعلم، وشوية كود.',
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
        let metricText = `${Math.round(grams)} g`;
        let imperialText = '';
        let cupsText = ''; // For Arabic display

// --- Imperial Calculation (Approximate) ---
        // This is complex and requires careful checks
        if (unitSystem === 'imperial' && lang === 'en') {
            switch (unitType) {
                case 'sugar':
                    imperialText = grams < GRAMS_PER_CUP_GRAN_SUGAR / 4 ? `${Math.round(grams / (GRAMS_PER_TSP_SALT * 5))} tsp` : `${Math.round(grams / GRAMS_PER_CUP_GRAN_SUGAR * 10) / 10} cup`;
                    break;
                case 'flour':
                    imperialText = grams < GRAMS_PER_CUP_FLOUR / 4 ? `${Math.round(grams / (GRAMS_PER_TSP_SALT * 5))} tsp` : `${Math.round(grams / GRAMS_PER_CUP_FLOUR * 10) / 10} cup`;
                    break;
                case 'chocolate':
                    imperialText = grams < GRAMS_PER_CUP_CHOC_CHIPS / 4 ? `${Math.round(grams / (GRAMS_PER_TSP_SALT * 5))} tsp` : `${Math.round(grams / GRAMS_PER_CUP_CHOC_CHIPS * 10) / 10} cup`;
                    break;
                case 'milkPowder':
                    imperialText = grams < GRAMS_PER_TBSP_MILK_POWDER * 2 ? `${Math.round(grams / GRAMS_PER_TBSP_MILK_POWDER)} tbsp` : `${Math.round(grams / GRAMS_PER_CUP_FLOUR * 10) / 10} cup`; // Using flour as a rough volume proxy
                    break;
                case 'salt':
                    imperialText = `${Math.round(grams / GRAMS_PER_TSP_SALT * 10) / 10} tsp`;
                    break;
                case 'bakingPowder':
                    imperialText = `${Math.round(grams / GRAMS_PER_TSP_BAKING_POWDER * 10) / 10} tsp`;
                    break;
                case 'bakingSoda':
                    imperialText = `${Math.round(grams / GRAMS_PER_TSP_BAKING_SODA * 10) / 10} tsp`;
                    break;
                case 'vanilla':
                    imperialText = `${Math.round(grams / GRAMS_PER_TSP_VANILLA * 10) / 10} tsp`;
                    break;
                case 'water':
                    imperialText = `${Math.round(grams / GRAMS_PER_TSP_VANILLA * 10) / 10} tsp`; // Assuming similar density to vanilla for small amounts
                    break;
                case 'egg':
                    imperialText = `${Math.round(grams / GRAMS_PER_LARGE_EGG * 10) / 10} large eggs`; // Not ideal for fractions, but handles multiples
                    break;
                default:
                    imperialText = `${Math.round(grams)} g`; // Fallback to grams if type unknown
            }
        } else if (unitSystem === 'cups' && lang === 'ar') {
            switch (unitType) {
                case 'sugar':
                case 'flour':
                case 'chocolate':
                    cupsText = `${Math.round(grams / (unitType === 'sugar' ? GRAMS_PER_CUP_GRAN_SUGAR : (unitType === 'flour' ? GRAMS_PER_CUP_FLOUR : GRAMS_PER_CUP_CHOC_CHIPS)) * 10) / 10} كوب`;
                    break;
                case 'milkPowder':
                    cupsText = `${Math.round(grams / GRAMS_PER_TBSP_MILK_POWDER)} ملعقة كبيرة`;
                    break;
                case 'salt':
                    cupsText = `${Math.round(grams / GRAMS_PER_TSP_SALT * 10) / 10} ملعقة صغيرة`;
                    break;
                case 'bakingPowder':
                    cupsText = `${Math.round(grams / GRAMS_PER_TSP_BAKING_POWDER * 10) / 10} ملعقة صغيرة`;
                    break;
                case 'bakingSoda':
                    cupsText = `${Math.round(grams / GRAMS_PER_TSP_BAKING_SODA * 10) / 10} ملعقة صغيرة`;
                    break;
                case 'vanilla':
                case 'water':
                    cupsText = `${Math.round(grams / GRAMS_PER_TSP_VANILLA * 10) / 10} ملعقة صغيرة`;
                    break;
                case 'egg':
                    cupsText = `${Math.round(grams / GRAMS_PER_LARGE_EGG * 10) / 10} بيضة كبيرة`;
                    break;
                default:
                    cupsText = `${Math.round(grams)} جم`;
            }
        }

        return unitSystem === 'metric' || lang === 'ar' && currentUnitSystem === 'grams' ? metricText : (lang === 'ar' && currentUnitSystem === 'cups' ? cupsText : imperialText);
    }

    // Display the recipe
    function displayRecipe(recipeData, cookieType) {
        recipeDisplaySection.style.display = 'block';
        recipeContent.innerHTML = ''; // Clear previous recipe

        const lang = langStrings[currentLanguage];
        const unitSystem = currentLanguage === 'ar' ? currentUnitSystem : 'imperial'; // AR uses 'grams' or 'cups'

        const recipeTitleElem = document.createElement('h2');
        recipeTitleElem.textContent = lang.recipeTitle.replace('{cookieName}', lang[cookieType + 'Title'].split(' ')[0]); // Use first word of title
        recipeContent.appendChild(recipeTitleElem);

        // --- Display Prep Techniques ---
        if (recipeData.prepTechKeys && recipeData.prepTechKeys.length > 0) {
            const prepTitleElem = document.createElement('h3');
            prepTitleElem.textContent = lang.prepTitle;
            recipeContent.appendChild(prepTitleElem);

            recipeData.prepTechKeys.forEach(key => {
                const titleKey = `prepTechTitle_${key}`;
                const descKey = `prepTechDesc_${key}`;
                if (lang[titleKey] && lang[descKey]) {
                    const techTitle = document.createElement('h4');
                    techTitle.textContent = lang[titleKey];
                    recipeContent.appendChild(techTitle);
                    const techDesc = document.createElement('p');
                    techDesc.innerHTML = lang[descKey];
                    recipeContent.appendChild(techDesc);
                }
            });
        }

        // --- Display Ingredients ---
        const ingredientsTitleElem = document.createElement('h3');
        ingredientsTitleElem.textContent = lang.ingredientsTitle;
        recipeContent.appendChild(ingredientsTitleElem);

        const ingredientsList = document.createElement('ul');
        for (const key in recipeData.ingredients) {
            const ingredient = recipeData.ingredients[key];
            const listItem = document.createElement('li');
            const formattedAmount = formatIngredient(ingredient.grams, ingredient.unitType, currentLanguage, unitSystem);
            listItem.textContent = `${lang[key]}: ${formattedAmount}`;
            ingredientsList.appendChild(listItem);
        }
        recipeContent.appendChild(ingredientsList);

        const yieldElem = document.createElement('p');
        yieldElem.textContent = `${lang.approxYield} ${recipeData.yield} ${recipeData.isThick ? lang.largeCookies : lang.cookies}`;
        recipeContent.appendChild(yieldElem);

        // --- Display Notes ---
        if (lang[recipeData.notesKey]) {
            const notesTitleElem = document.createElement('h3');
            notesTitleElem.textContent = lang.proTipsTitle;
            recipeContent.appendChild(notesTitleElem);
            const notesElem = document.createElement('p');
            notesElem.textContent = lang[recipeData.notesKey];
            recipeContent.appendChild(notesElem);
        }

        // --- Display Steps ---
        if (lang[recipeData.stepsKey]) {
            const stepsTitleElem = document.createElement('h3');
            stepsTitleElem.textContent = lang.stepsTitle;
            recipeContent.appendChild(stepsTitleElem);
            const stepsElem = document.createElement('ol');
            const steps = lang[recipeData.stepsKey].split('<br>');
            steps.forEach(step => {
                const stepItem = document.createElement('li');
                stepItem.innerHTML = step.trim();
                stepsElem.appendChild(stepItem);
            });
            recipeContent.appendChild(stepsElem);
        }

        // --- Display Easter Egg (if thick) ---
        if (recipeData.isThick) {
            stuffedEasterEgg.style.display = 'block';
            stuffedEasterEgg.querySelector('h3').textContent = lang.stuffedTitle;
            stuffedEasterEgg.querySelector('.congrats').textContent = lang.stuffedCongrats;
            stuffedEasterEgg.querySelector('.howto').textContent = lang.stuffedHowTo;
            const pistachioTip = stuffedEasterEgg.querySelector('.pistachio-tip');
            pistachioTip.querySelector('h4').textContent = lang.pistachioTipTitle;
            pistachioTip.querySelector('p').textContent = lang.pistachioTipDesc;
            const pistachioLink = pistachioTip.querySelector('a');
            pistachioLink.textContent = lang.pistachioTipLink;
            pistachioLink.href = 'https://www.asmfoods.com/'; // Placeholder - Replace with actual link if found
            pistachioTip.style.display = 'block';

            chocolateRecommendation.style.display = 'block';
            chocolateRecommendation.querySelector('h4').textContent = lang.chocoTipTitle;
            chocolateRecommendation.querySelector('p').textContent = lang.chocoTipDesc;
            const chocoLink = chocolateRecommendation.querySelector('a');
            chocoLink.textContent = lang.chocoTipLink;
            chocoLink.href = 'https://www.facebook.com/KualetyEgypt/'; // Placeholder - Replace with actual link if found
            chocolateRecommendation.querySelector('.milk-note').textContent = lang.chocoTipMilk;

        } else {
            stuffedEasterEgg.style.display = 'none';
            chocolateRecommendation.style.display = 'none';
        }
    }

    // --- Event Listeners ---
    startExperimentBtn.addEventListener('click', () => {
        baseButterGrams = getBaseButterInGrams();
        if (baseButterGrams > 0 && selectedCookieType) {
            const recipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            if (recipe) {
                displayRecipe(recipe, selectedCookieType);
            }
        }
    });

    cookieOptions.forEach(option => {
        option.addEventListener('click', function() {
            cookieOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedCookieType = this.id.replace('-option', '');
        });
    });

    langToggleButton.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
        updateLanguage();
    });

    unitToggleButton.addEventListener('click', () => {
        if (currentLanguage === 'ar') {
            currentUnitSystem = currentUnitSystem === 'grams' ? 'cups' : 'grams';
            unitToggleButton.textContent = langStrings[currentLanguage][`unit${currentUnitSystem.charAt(0).toUpperCase() + currentUnitSystem.slice(1)}`];
        } else {
            currentUnitSystem = currentUnitSystem === 'metric' ? 'imperial' : 'metric';
            unitToggleButton.textContent = langStrings[currentLanguage][`unit${currentUnitSystem.charAt(0).toUpperCase() + currentUnitSystem.slice(1)}`];
        }
        if (selectedCookieType) {
            const recipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            if (recipe) {
                displayRecipe(recipe, selectedCookieType);
            }
        }
    });

    butterUnitSelect.addEventListener('change', () => {
        butterAmountInput.placeholder = `Enter amount in ${langStrings[currentLanguage][butterUnitSelect.value]}`;
    });

    // --- Language Update Function ---
    function updateLanguage() {
        const currentLangPack = langStrings[currentLanguage];

        // Update text elements
        langToggleButton.textContent = currentLangPack[`toggle${currentLanguage === 'en' ? 'Arabic' : 'English'}`];
        if (currentLanguage === 'ar') {
            unitToggleButton.style.display = 'inline-block';
            unitToggleButton.textContent = currentLangPack[`unit${currentUnitSystem.charAt(0).toUpperCase() + currentUnitSystem.slice(1)}`];
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
            butterUnitSelect.innerHTML = `<option value="grams">${currentLangPack.grams} (${currentLangPack.unitGrams})</option><option value="cups">${currentLangPack.cups} (${currentLangPack.unitCups})</option>`;
            butterAmountInput.placeholder = `أدخل الكمية بـ${currentLangPack[butterUnitSelect.value]}`;
        } else {
            unitToggleButton.style.display = 'inline-block';
            unitToggleButton.textContent = currentLangPack[`unit${currentUnitSystem.charAt(0).toUpperCase() + currentUnitSystem.slice(1)}`];
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
            butterUnitSelect.innerHTML = `<option value="grams">${currentLangPack.grams}</option><option value="cups">${currentLangPack.cups}</option>`;
            butterAmountInput.placeholder = `Enter amount in ${currentLangPack[butterUnitSelect.value]}`;
        }
        document.querySelector('.butter-variable h2').textContent = currentLangPack.butterVarTitle;
        document.querySelector('.butter-variable p').textContent = currentLangPack.butterVarDesc;
        startExperimentBtn.textContent = currentLangPack.beginExperiment;
        document.querySelector('.cookie-phenotype h2').textContent = currentLangPack.phenotypeTitle;
        document.querySelector('.cookie-phenotype p').textContent = currentLangPack.phenotypeDesc;
        document.getElementById('thin-option').querySelector('h3').textContent = currentLangPack.thinTitle;
        document.getElementById('thin-option').querySelector('p').textContent = currentLangPack.thinDesc;
        document.getElementById('classic-option').querySelector('h3').textContent = currentLangPack.classicTitle;
        document.getElementById('classic-option').querySelector('p').textContent = currentLangPack.classicDesc;
        document.getElementById('thick-option').querySelector('h3').textContent = currentLangPack.thickTitle;
        document.getElementById('thick-option').querySelector('p').textContent = currentLangPack.thickDesc;
        if (butterWarning.style.display === 'block') {
            butterWarning.textContent = currentLangPack.butterWarning;
        }
        if (selectedCookieType) {
            const recipe = calculateScaledRecipe(baseButterGrams, selectedCookieType);
            if (recipe) {
                displayRecipe(recipe, selectedCookieType);
            }
        }
        document.querySelector('footer p').textContent = currentLangPack.footerText;
        const conclusionSection = document.getElementById('conclusion');
        conclusionSection.querySelector('h2').textContent = currentLangPack.conclusionTitle;
        conclusionSection.querySelector('p').textContent = currentLangPack.conclusionDesc;
        conclusionSection.querySelector('.tagline').textContent = currentLangPack.conclusionTag;
        conclusionSection.querySelector('.handle').textContent = '@yourinsta'; // Replace with actual handle
        conclusionSection.querySelector('.go-forth').textContent = currentLangPack.conclusionGoForth;
        if (stuffedEasterEgg.style.display === 'block') {
            stuffedEasterEgg.querySelector('h3').textContent = currentLangPack.stuffedTitle;
            stuffedEasterEgg.querySelector('.congrats').textContent = currentLangPack.stuffedCongrats;
            stuffedEasterEgg.querySelector('.howto').textContent = currentLangPack.stuffedHowTo;
            const pistachioTip = stuffedEasterEgg.querySelector('.pistachio-tip');
            pistachioTip.querySelector('h4').textContent = currentLangPack.pistachioTipTitle;
            pistachioTip.querySelector('p').textContent = currentLangPack.pistachioTipDesc;
            pistachioTip.querySelector('a').textContent = currentLangPack.pistachioTipLink;
            if (chocolateRecommendation.style.display === 'block') {
                chocolateRecommendation.querySelector('h4').textContent = currentLangPack.chocoTipTitle;
                chocolateRecommendation.querySelector('p').textContent = currentLangPack.chocoTipDesc;
                chocolateRecommendation.querySelector('a').textContent = currentLangPack.chocoTipLink;
                chocolateRecommendation.querySelector('.milk-note').textContent = currentLangPack.chocoTipMilk;
            }
        }
    }

    // Initial language setup
    updateLanguage();
});
