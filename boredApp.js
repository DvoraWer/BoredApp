

const mainButton = document.getElementById("boredButton");
const skipButton = document.getElementById("skipButton");

const result = document.getElementById("result");
const activityIcon = document.getElementById("activityIcon");
const hint = document.getElementById("hint");

const categoryButtons = document.querySelectorAll(".category");
const energyButtons = document.querySelectorAll(".energy");


// ========================================
// המשימות
// ========================================

const activities = [

    // --------------------
    // 🎨 יצירה
    // --------------------

    {
        text: "ציירי משהו במשך 5 דקות",
        category: "creative",
        energy: "low",
        icon: "🎨"
    },

    {
        text: "כתבי 5 רעיונות לדברים שהיית רוצה לעשות",
        category: "creative",
        energy: "low",
        icon: "✍️"
    },

    {
        text: "נסי לצייר משהו ביד הלא דומיננטית שלך",
        category: "creative",
        energy: "medium",
        icon: "🖌️"
    },

    {
        text: "עשי קולאז' מתמונות שיש לך בטלפון",
        category: "creative",
        energy: "medium",
        icon: "🖼️"
    },

    {
        text: "עצבי לעצמך רקע חדש לטלפון",
        category: "creative",
        energy: "medium",
        icon: "📱"
    },

    {
        text: "צלמי 3 תמונות יפות של דברים רגילים בבית",
        category: "creative",
        energy: "high",
        icon: "📸"
    },


    // --------------------
    // 🎵 מוזיקה
    // --------------------

    {
        text: "שימי שיר שאת אוהבת ופשוט תקשיבי לו",
        category: "music",
        energy: "low",
        icon: "🎵"
    },

    {
        text: "שמעי שיר שלא שמעת אף פעם",
        category: "music",
        energy: "low",
        icon: "🎧"
    },

    {
        text: "בני פלייליסט של 5 שירים לפי וייב מסוים",
        category: "music",
        energy: "medium",
        icon: "🎶"
    },

    {
        text: "מצאי שיר ישן שלא שמעת הרבה זמן",
        category: "music",
        energy: "low",
        icon: "💿"
    },

    {
        text: "שימי מוזיקה ותעשי סיבוב קטן בבית",
        category: "music",
        energy: "high",
        icon: "💃"
    },

    {
        text: "בחרי שיר ונסי לשים לב לכלי נגינה שאת שומעת בו",
        category: "music",
        energy: "medium",
        icon: "🎼"
    },


    // --------------------
    // 🧹 מועיל
    // --------------------

    {
        text: "סדרי מגירה אחת בלבד",
        category: "productive",
        energy: "low",
        icon: "🧹"
    },

    {
        text: "סדרי את שולחן העבודה במחשב",
        category: "productive",
        energy: "low",
        icon: "💻"
    },

    {
        text: "מחקי 10 תמונות מיותרות מהטלפון",
        category: "productive",
        energy: "low",
        icon: "🗑️"
    },

    {
        text: "סדרי את תיקיית ההורדות במחשב",
        category: "productive",
        energy: "medium",
        icon: "📁"
    },

    {
        text: "סדרי את השולחן שלך",
        category: "productive",
        energy: "medium",
        icon: "🗂️"
    },

    {
        text: "עשי reset קטן לחדר במשך 15 דקות",
        category: "productive",
        energy: "high",
        icon: "✨"
    },

    {
        text: "בחרי אזור אחד בחדר ועשי בו סדר יסודי",
        category: "productive",
        energy: "high",
        icon: "🧽"
    },


    // --------------------
    // ☕ צ'יל
    // --------------------

    {
        text: "הכיני לעצמך משהו טעים לשתות",
        category: "chill",
        energy: "low",
        icon: "☕"
    },

    {
        text: "שבי 10 דקות ופשוט תעשי כלום",
        category: "chill",
        energy: "low",
        icon: "😌"
    },

    {
        text: "פתחי חלון ופשוט תיהני מהאוויר",
        category: "chill",
        energy: "low",
        icon: "🌿"
    },

    {
        text: "שימי מוזיקה רגועה ותני לעצמך הפסקה",
        category: "chill",
        energy: "low",
        icon: "🫧"
    },

    {
        text: "הכיני לעצמך משהו טעים לאכול",
        category: "chill",
        energy: "medium",
        icon: "🍓"
    },

    {
        text: "עשי הפסקת מסך של 15 דקות",
        category: "chill",
        energy: "medium",
        icon: "🌸"
    },

    {
        text: "עשי סיבוב קצר בחוץ",
        category: "chill",
        energy: "high",
        icon: "🌤️"
    },

    {
        text: "שבי במקום נעים בבית עם משהו לשתות",
        category: "chill",
        energy: "medium",
        icon: "🛋️"
    }
];


// ========================================
// State - הבחירות הנוכחיות
// ========================================

let selectedCategory = "all";
let selectedEnergy = "low";


// ========================================
// מציאת משימות שמתאימות לבחירות
// ========================================

function getAvailableActivities() {

    return activities.filter(activity => {

        const categoryMatch =
            selectedCategory === "all" ||
            activity.category === selectedCategory;

        const energyMatch =
            activity.energy === selectedEnergy;

        return categoryMatch && energyMatch;
    });
}


// ========================================
// הצגת משימה אקראית
// ========================================

function showRandomActivity() {

    const availableActivities = getAvailableActivities();

    // אם אין משימה מתאימה
    if (availableActivities.length === 0) {

        result.textContent = "אין לי עדיין משימה כזאת 😅";
        activityIcon.textContent = "🤷‍♀️";

        hint.textContent = "נסי קטגוריה או רמת אנרגיה אחרת";

        return;
    }


    // בחירת משימה אקראית
    const randomIndex = Math.floor(
        Math.random() * availableActivities.length
    );

    const activity = availableActivities[randomIndex];


    // הצגת המשימה
    result.textContent = activity.text;
    activityIcon.textContent = activity.icon;

    hint.textContent = "אולי דווקא זה הדבר שהיית צריכה לעשות 😉";


    // הפעלת האנימציה מחדש
    result.classList.remove("pop");

    void result.offsetWidth;

    result.classList.add("pop");
}


// ========================================
// הכפתור הראשי
// ========================================

mainButton.addEventListener("click", showRandomActivity);


// ========================================
// כפתור "לא בא לי"
// ========================================

skipButton.addEventListener("click", showRandomActivity);


// ========================================
// בחירת קטגוריה
// ========================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // מסירים active מכל הקטגוריות
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // מסמנים את הקטגוריה שנבחרה
        button.classList.add("active");


        // שומרים את הבחירה
        selectedCategory = button.dataset.category;


        // מציגים משימה מתאימה
        showRandomActivity();
    });

});


// ========================================
// בחירת רמת אנרגיה
// ========================================

energyButtons.forEach(button => {

    button.addEventListener("click", () => {

        // מסירים active מכל רמות האנרגיה
        energyButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // מסמנים את הרמה שנבחרה
        button.classList.add("active");


        // שומרים את הבחירה
        selectedEnergy = button.dataset.energy;


        // מציגים משימה מתאימה
        showRandomActivity();
    });

});



