document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    // (Removed loaderWrapper)
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
    const whyItWorksContainer = document.getElementById('why-it-works-container');
    const cookieOptions = document.querySelectorAll('.cookie-option');
    const stuffedEasterEgg = document.getElementById('stuffed-easter-egg');
    const chocolateRecommendation = document.getElementById('chocolate-recommendation');
    const langToggleButton = document.getElementById('lang-toggle');
    const unitToggleButton = document.getElementById('unit-toggle');
    const htmlElement = document.documentElement;
    const mainContent = document.getElementById('main-content');
    const headerOverlayImage = document.querySelector('.header-comparison-image-overlay');

    // --- State & Constants ---
    // (Unchanged from V4)
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
        // PASTE YOUR COMPLETED langStrings OBJECT HERE (containing both en and ar)
        // It was provided in the previous two turns
        // ... (Make sure the full object from the previous step is here) ...
        en: { /* ... V4 English strings ... */ },
        ar: { /* ... V4 Arabic strings ... */ }
    };


    // --- Functions ---
    // (showSection, getBaseButterInGrams, calculateScaledRecipe, formatIngredient, formatMarkdown - unchanged from V4 draft)
     function showSection(sectionElement) {
         if (!sectionElement) return;
         sectionElement.style.display = 'block';
         setTimeout(() => {
             sectionElement.classList.add('visible');
              const yOffset = -80;
              const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
         }, 50);
     }
     function getBaseButterInGrams() {
          const amount = parseFloat(butterAmountInput.value.trim());
          const unit = butterUnitSelect.value;
          if (isNaN(amount) || amount <= 0) {
              butterWarning.textContent = T('butterWarningMsg');
              butterWarning.style.display = 'block'; butterAmountInput.focus(); return 0;
          }
          let grams = (unit === 'cups') ? amount * GRAMS_PER_CUP_BUTTER : amount;
          if (grams < 99.5) {
              butterWarning.textContent = T('butterWarningMsg');
              butterWarning.style.display = 'block'; butterAmountInput.focus(); return 0;
          } else {
              butterWarning.style.display = 'none'; return grams;
          }
      }
     function calculateScaledRecipe(butterInGrams, cookieType) {
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
        return { ingredients: scaledIngredients, yield: yieldValue, cookieSizeDescKey: base.cookieSizeDescKey, prepTechKeys: base.prepTechKeys, stepsKey: base.stepsKey, whyItWorksKey: base.whyItWorksKey, isThick: cookieType === 'thick' };
    }
     function formatIngredient(grams, unitType, lang, unitSystem) {
        const T = (key) => langStrings[lang]?.[key] || langStrings['en']?.[key] || key;
        let metricText = `${Math.round(grams)} ${T('grams')}`;
        let imperialText = ''; let cupsText = '';
        let imperialAmountStr = ''; let imperialUnit = '';
        function toFraction(decimal, tolerance = 0.05) {
            if (decimal === 0) return '0';
            const fractions = {'1/8':.125,'1/4':.25,'1/3':.333,'3/8':.375,'1/2':.5,'5/8':.625,'2/3':.667,'3/4':.75,'7/8':.875};
            let bestMatch = ''; let minDiff = 1;
            for (const [frac, val] of Object.entries(fractions)) {
                const diff = Math.abs(decimal - val);
                if (diff < tolerance && diff < minDiff) { minDiff = diff; bestMatch = frac; }
            }
            if (!bestMatch && Math.abs(decimal - 0.75) < 0.08) bestMatch = '3/4';
            if (!bestMatch && Math.abs(decimal - 0.5) < 0.08) bestMatch = '1/2';
            if (!bestMatch && Math.abs(decimal - 0.25) < 0.08) bestMatch = '1/4';
            if (!bestMatch) {
                if (decimal < 0.1) return 'pinch';
                if (decimal < 1) return decimal.toFixed(1);
                return decimal.toFixed(1).replace('.0', '');
            } return bestMatch;
        }
        switch (unitType) {
            case 'butter': case 'granulatedSugar': case 'lightBrownSugar': case 'flour': case 'chocolate': {
                const cupEqMap = {'butter':GRAMS_PER_CUP_BUTTER,'granulatedSugar':GRAMS_PER_CUP_GRAN_SUGAR,'lightBrownSugar':GRAMS_PER_CUP_BROWN_SUGAR,'flour':GRAMS_PER_CUP_FLOUR,'chocolate':GRAMS_PER_CUP_CHOC_CHIPS};
                const cupEq = cupEqMap[unitType] || 200; // Default fallback
                const cups = grams / cupEq; const wholeCups = Math.floor(cups); const remainder = cups - wholeCups;
                imperialAmountStr = wholeCups > 0 ? `${wholeCups} ` : ''; imperialAmountStr += toFraction(remainder);
                imperialUnit = (cups > 1.1 || cups < 0.9) ? T('cups') : T('cup');
                cupsText = `${imperialAmountStr.trim()} ${imperialUnit}`; break;
            }
            case 'salt': case 'bakingSoda': case 'bakingPowder': case 'vanilla': case 'water': {
                 const tspEqMap = {'salt':GRAMS_PER_TSP_SALT,'bakingSoda':GRAMS_PER_TSP_BAKING_SODA,'bakingPowder':GRAMS_PER_TSP_BAKING_POWDER,'vanilla':GRAMS_PER_TSP_VANILLA,'water':GRAMS_PER_TSP_WATER};
                 const tspEq = tspEqMap[unitType] || 5; // Default fallback
                 const tsp = grams / tspEq;
                 if (tsp * 3 >= 1) {
                      const tbsp = tsp / 3; const wholeTbsp = Math.floor(tbsp); const remainder = tbsp - wholeTbsp;
                      imperialAmountStr = wholeTbsp > 0 ? `${wholeTbsp} ` : ''; imperialAmountStr += toFraction(remainder);
                      imperialUnit = (tbsp > 1.1 || tbsp < 0.9) ? 'Tbsp' : 'Tbsp';
                  } else {
                      const wholeTsp = Math.floor(tsp); const remainder = tsp - wholeTsp;
                      imperialAmountStr = wholeTsp > 0 ? `${wholeTsp} ` : ''; imperialAmountStr += toFraction(remainder);
                      imperialUnit = (tsp > 1.1 || tsp < 0.9) ? 'tsps' : 'tsp';
                      if (imperialAmountStr === 'pinch') imperialUnit = '';
                   }
                  if (unitType === 'water') imperialUnit += ' water/milk'; break;
            }
             case 'milkPowder': {
                 const tbsp = grams / GRAMS_PER_TBSP_MILK_POWDER; const wholeTbsp = Math.floor(tbsp); const remainder = tbsp - wholeTbsp;
                 imperialAmountStr = wholeTbsp > 0 ? `${wholeTbsp} ` : ''; imperialAmountStr += toFraction(remainder);
                 imperialUnit = (tbsp > 1.1 || tbsp < 0.9) ? 'Tbsp' : 'Tbsp'; break;
             }
            case 'egg': {
                const numEggs = Math.max(1, Math.round(grams / GRAMS_PER_LARGE_EGG));
                imperialAmountStr = numEggs; imperialUnit = numEggs > 1 ? 'large eggs' : 'large egg'; break;
            }
            default: imperialAmountStr = Math.round(grams); imperialUnit = 'g (?)';
        }
        imperialText = `${imperialAmountStr.trim()} ${imperialUnit}`.replace(' 0 ', ' ');
        if (lang === 'en') { return (unitSystem === 'metric') ? metricText : imperialText; }
        else { let arabicText = `<span class="unit-g">${metricText}</span>`;
            if (cupsText && (unitType==='butter'||unitType==='granulatedSugar'||unitType==='lightBrownSugar'||unitType==='flour'||unitType==='chocolate')) { arabicText += ` <span class="unit-cups">(${cupsText})</span>`; }
            return arabicText;
        }
    }
     function formatMarkdown(text) {
         if (!text) return '';
         return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
     }

    // Display recipe (UPDATED FOR V4)
    function displayRecipe(recipeData) {
        if (!recipeData) return;

        const lang = currentLanguage;
        const units = currentUnitSystem;
        const T = (key, replacements = {}) => {
            let str = langStrings[lang]?.[key] || langStrings['en']?.[key] || key;
            for (const placeholder in replacements) { str = str.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]); }
            return str.replace('{heartIcon}', '<i class="fas fa-heart" style="color: #e53935;"></i>');
        };

        const cookieName = T(`${selectedCookieType}SelectTitle`);
        const yieldNum = recipeData.yield;
        const yieldDesc = T(recipeData.cookieSizeDescKey, { yieldNum: yieldNum });

        // Populate Title and Yield
        dynamicRecipeTitle.innerHTML = T('recipeTitle', { cookieName: cookieName });
        dynamicYieldInfo.innerHTML = `${T('approxYield')} ${yieldDesc}`;

        // Prep Techniques
        prepTechniquesContainer.innerHTML = '';
        const butterGrams = recipeData.ingredients.unsaltedButter.grams;
        const prepReplacements = { /* ... Calculate prep replacements ... */ };
        recipeData.prepTechKeys.forEach(key => { /* ... Generate prep HTML ... */ });

        // Ingredients
        ingredientListContainer.innerHTML = '';
        const formattedButter = formatIngredient(butterGrams, 'butter', lang, units);
        const butterNote = T('ingredientButterNote') ? `<i class="note-inline">${T('ingredientButterNote')}</i>` : '';
        ingredientListContainer.innerHTML += `<li><strong>${formattedButter}</strong> ${T('unsaltedButter')} ${butterNote}</li>`;
        for (const key in recipeData.ingredients) { /* ... Generate ingredient list ... */ }

        // Steps
        stepsContainer.innerHTML = '';
        const stepsReplacements = { /* ... Calculate step replacements ... */ };
        const stepsString = T(recipeData.stepsKey, stepsReplacements);
        const stepsArray = stepsString.split('<br>');
        stepsArray.forEach(step => { /* ... Generate step list ... */ });

        // Why It Works Section
        whyItWorksContainer.innerHTML = '';
        const whyItWorksZone = document.querySelector('.why-it-works-zone');
        if (recipeData.whyItWorksKey) { /* ... Generate Why It Works content ... */ }
        else { if(whyItWorksZone) whyItWorksZone.style.display = 'none'; }

        // Hide separate science zone
        const scienceZone = document.querySelector('.science-zone');
        if (scienceZone) scienceZone.style.display = 'none';

        // Show/Hide Easter Egg & Recs
        stuffedEasterEgg.style.display = recipeData.isThick ? 'block' : 'none';
        chocolateRecommendation.style.display = 'block';

        updateLanguageContent(recipeContentCard); // Update static text

        // Display Logic
        recipeDisplaySection.style.display = 'block';
        setTimeout(() => { /* ... Scroll into view ... */ }, 50);
    }


    // --- Language and Unit Switching ---
     function updateLanguageContent(parentElement = document.body) {
         parentElement.querySelectorAll('[data-en]').forEach(el => {
             const key = currentLanguage;
             if (el.dataset[key]) {
                 if (el.tagName === 'INPUT' && el.placeholder) { el.placeholder = el.dataset[key]; }
                 else if (el.tagName === 'BUTTON' || el.tagName === 'OPTION' || el.tagName === 'SPAN') { el.textContent = el.dataset[key]; }
                 else { el.innerHTML = el.dataset[key]; }
             }
         });
         htmlElement.setAttribute('lang', currentLanguage);
         htmlElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
         langToggleButton.textContent = T(currentLanguage === 'en' ? 'toggleArabic' : 'toggleEnglish');
         updateUnitButtonDisplay();
         const footerP = document.querySelector('footer p'); if (footerP) footerP.innerHTML = T('footerText');
         const titleTag = document.querySelector('title'); if(titleTag) titleTag.textContent = T('pageTitle');
     }
     function updateUnitButtonDisplay() {
        const T = (key) => langStrings[currentLanguage]?.[key] || key;
         if (currentLanguage === 'en') {
             unitToggleButton.textContent = T(currentUnitSystem === 'metric' ? 'unitImperial' : 'unitMetric');
             unitToggleButton.style.display = 'inline-block';
             butterUnitSelect.style.display = (currentUnitSystem === 'imperial') ? 'none' : 'inline-block';
             if (currentUnitSystem === 'imperial') butterUnitSelect.value = 'cups';
         } else {
             unitToggleButton.textContent = T(currentUnitSystem === 'grams' ? 'unitCups' : 'unitGrams');
             unitToggleButton.style.display = 'inline-block';
             butterUnitSelect.style.display = 'inline-block';
         }
     }
     function toggleLanguage() {
        currentLanguage = (currentLanguage === 'en') ? 'ar' : 'en';
        currentUnitSystem = (currentLanguage === 'en') ? 'metric' : 'grams';
        updateLanguageContent();
        if (selectedCookieType && baseButterGrams > 0) {
            const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType); displayRecipe(scaledRecipe);
        }
    }
     function toggleUnits() {
         if (currentLanguage === 'en') { currentUnitSystem = (currentUnitSystem === 'metric') ? 'imperial' : 'metric'; }
         else { currentUnitSystem = (currentUnitSystem === 'grams') ? 'cups' : 'grams'; butterUnitSelect.value = currentUnitSystem; }
        updateUnitButtonDisplay();
        if (selectedCookieType && baseButterGrams > 0) {
            const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType); displayRecipe(scaledRecipe);
        }
    }

    // --- Event Listeners & Initial Setup ---
     startExperimentBtn.addEventListener('click', () => {
        baseButterGrams = getBaseButterInGrams();
        if (baseButterGrams > 0) { showSection(cookieSelectionSection); recipeDisplaySection.style.display = 'none'; recipeDisplaySection.classList.remove('visible'); cookieOptions.forEach(opt => { opt.classList.remove('selected'); opt.setAttribute('aria-pressed', 'false'); }); selectedCookieType = null; }
    });
     butterAmountInput.addEventListener('input', () => { butterWarning.style.display = 'none'; });
     butterUnitSelect.addEventListener('change', () => { butterWarning.style.display = 'none'; if (currentLanguage === 'ar') { currentUnitSystem = butterUnitSelect.value; updateUnitButtonDisplay(); } });
     cookieOptions.forEach(option => {
        const selectCookie = () => {
            if (baseButterGrams <= 0) { butterWarning.textContent = T("butterWarningMsg"); butterWarning.style.display = 'block'; butterAmountInput.focus(); document.getElementById('butter-input-section').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
            cookieOptions.forEach(opt => { opt.classList.remove('selected'); opt.setAttribute('aria-pressed', 'false'); });
            option.classList.add('selected'); option.setAttribute('aria-pressed', 'true');
            selectedCookieType = option.dataset.cookieType; const scaledRecipe = calculateScaledRecipe(baseButterGrams, selectedCookieType); displayRecipe(scaledRecipe);
        };
        option.addEventListener('click', selectCookie);
        option.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCookie(); } });
    });
     langToggleButton.addEventListener('click', toggleLanguage);
     unitToggleButton.addEventListener('click', toggleUnits);

     window.addEventListener('load', () => {
          // Loader hiding logic REMOVED
          if (headerOverlayImage) { headerOverlayImage.classList.add('loaded'); }
           console.log("%c Psst... Baking Scientist!", "color: #a0522d; font-size: 16px; font-weight: bold;");
           console.log("%c Looks like you know your way around the lab tools (DevTools!). Your secret code for today is: BROWN_BUTTER_ROCKS", "color: #333; font-size: 12px;");
     });
     updateLanguageContent();
     updateUnitButtonDisplay();
     const sections = document.querySelectorAll('.content-section');
     const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
     const observerCallback = (entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { if (entry.target.id !== 'recipe-display-section') { entry.target.classList.add('visible'); } } }); };
     const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
     sections.forEach(section => { sectionObserver.observe(section); });

}); // End DOMContentLoaded
