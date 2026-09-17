const KDD_SUPABASE_URL = "https://jlcfxdlawnocvoncchhk.supabase.co";
const KDD_SUPABASE_KEY = "sb_publishable_yVyrp0EG8Czkb4PQVADzsQ_6fBvKh6F";
const supabaseClient = supabase.createClient(KDD_SUPABASE_URL, KDD_SUPABASE_KEY);
const languageSelect = document.getElementById("language");
languageSelect.addEventListener("change", () => {
    const selectedLanguage = languageSelect.value;
    document.getElementById("actionPrompt").textContent = translations[selectedLanguage].actionPrompt;
    document.getElementById("sendMoneyBtn").textContent = translations[selectedLanguage].sendMoney;
    document.getElementById("receiveMoneyBtn").textContent = translations[selectedLanguage].receiveMoney;
    document.getElementById("trustTitle").textContent = translations[selectedLanguage].trustTitle;
    document.getElementById("trustText").textContent = translations[selectedLanguage].trustText;
    document.getElementById("howItWorksTitle").textContent = translations[selectedLanguage].howItWorksTitle;
    document.getElementById("howStep1").textContent = translations[selectedLanguage].howStep1;
    document.getElementById("howStep2").textContent = translations[selectedLanguage].howStep2;
    document.getElementById("howStep3").textContent = translations[selectedLanguage].howStep3;
    document.getElementById("tagline").textContent = translations[selectedLanguage].tagline;
    
});
const sendMoneyBtn = document.getElementById("sendMoneyBtn");
const sendDemo = document.getElementById("sendDemo");
sendMoneyBtn.addEventListener("click", () => {
    sendDemo.hidden = false;
    receiveDemo.hidden = true;
    reviewDemo.hidden = true;
});
const sendContinueBtn = document.getElementById("sendContinueBtn");
const sendAmount = document.getElementById("sendAmount");
const recipientName = document.getElementById("recipientName");
sendContinueBtn.addEventListener("click", () => {
   if (!sendAmount.value || Number(sendAmount.value) <= 0 || !recipientName.value) {
        alert("Please enter an amount and recipient.");
        return;
    }
    reviewType.textContent = "Type: Send Money";
reviewAmount.textContent = `Amount: $${sendAmount.value}`;
reviewPerson.textContent = `Recipient: ${recipientName.value}`;
reviewDemo.hidden = false;
});
const receiveMoneyBtn = document.getElementById("receiveMoneyBtn");
const receiveDemo = document.getElementById("receiveDemo");
receiveMoneyBtn.addEventListener("click", () => {
    receiveDemo.hidden = false;
    sendDemo.hidden = true;
    reviewDemo.hidden = true;
});
const receiveContinueBtn = document.getElementById("receiveContinueBtn");
const receiveAmount = document.getElementById("receiveAmount");
const senderName = document.getElementById("senderName");

receiveContinueBtn.addEventListener("click", () => {
   if (!receiveAmount.value || Number(receiveAmount.value) <= 0 || !senderName.value) {
        alert("Please enter an amount and sender.");
        return;
    }
  reviewType.textContent = "Type: Receive Money";
reviewAmount.textContent = `Amount: $${receiveAmount.value}`;
reviewPerson.textContent = `Sender: ${senderName.value}`;
reviewDemo.hidden = false;
});
const reviewDemo = document.getElementById("reviewDemo");
const reviewType = document.getElementById("reviewType");
const reviewAmount = document.getElementById("reviewAmount");
const reviewPerson = document.getElementById("reviewPerson");
const confirmTransactionBtn = document.getElementById("confirmTransactionBtn");
confirmTransactionBtn.addEventListener("click", () => {
    const transaction = {
    type: reviewType.textContent,
    amount: reviewAmount.textContent,
    person: reviewPerson.textContent,
    status: "Completed",
    date: new Date().toLocaleString()
};

const transactionHistory =
    JSON.parse(localStorage.getItem("kddTransactionHistory")) || [];

transactionHistory.unshift(transaction);
localStorage.setItem("kddTransactionHistory", JSON.stringify(transactionHistory));
renderTransactionHistory();
    alert("Transaction confirmed successfully.");
    reviewDemo.hidden = true;
receiveAmount.value = "";
senderName.value = "";
sendAmount.value = "";
recipientName.value = "";
reviewAmount.textContent = "";
reviewPerson.textContent = "";
alert("Your transaction has been completed.");
});
const translations = {
    en: {
        title: "KDD Platform",
        tagline: "Connecting people. Moving money. Building trust.",
        actionPrompt: "What would you like to do?",
        sendMoney: "Send Money",
        receiveMoney: "Receive Money",
        trustTitle: "Simple. Secure. Transparent.",
        trustText: "Send and receive money with clear steps and trusted support.",
        howItWorksTitle: "How KDD Works",
        howStep1: "1. Choose Send Money or Receive Money.",
        howStep2: "2. Enter the required information.",
        howStep3: "3. Review and confirm your transaction."
    },
    ht: {
    title: "KDD Platform",
    tagline: "Konekte moun. Fè lajan sikile. Bati konfyans.",
    actionPrompt: "Kisa ou ta renmen fè?",
    sendMoney: "Voye Lajan",
    receiveMoney: "Resevwa Lajan",
    trustTitle: "Senp. An sekirite. Transparan.",
    trustText: "Voye ak resevwa lajan ak etap ki klè ak sipò ou ka fè konfyans.",
    howItWorksTitle: "Kijan KDD Mache",
    howStep1: "1. Chwazi Voye Lajan oswa Resevwa Lajan.",
    howStep2: "2. Antre enfòmasyon yo mande yo.",
    howStep3: "3. Revize epi konfime tranzaksyon ou."
},
fr: {
    title: "KDD Platform",
    tagline: "Connecter les gens. Faire circuler l'argent. Bâtir la confiance.",
    actionPrompt: "Que souhaitez-vous faire ?",
    sendMoney: "Envoyer de l'argent",
    receiveMoney: "Recevoir de l'argent",
    trustTitle: "Simple. Sécurisé. Transparent.",
    trustText: "Envoyez et recevez de l'argent avec des étapes claires et une assistance fiable.",
    howItWorksTitle: "Comment fonctionne KDD",
    howStep1: "1. Choisissez Envoyer de l'argent ou Recevoir de l'argent.",
    howStep2: "2. Entrez les informations requises.",
    howStep3: "3. Vérifiez et confirmez votre transaction."
},
es: {
    title: "KDD Platform",
    tagline: "Conectando personas. Moviendo dinero. Generando confianza.",
    actionPrompt: "¿Qué le gustaría hacer?",
    sendMoney: "Enviar dinero",
    receiveMoney: "Recibir dinero",
    trustTitle: "Simple. Seguro. Transparente.",
   trustText: "Envía y recibe dinero con pasos claros y asistencia confiable.",
   howItWorksTitle: "Cómo funciona KDD",
   howStep1: "1. Elija Enviar dinero o Recibir dinero.",
   howStep2: "2. Ingrese la información requerida.",
   howStep3: "3. Revise y confirme su transacción."
}
};
const transactionHistoryList = document.getElementById("transactionHistoryList");

function renderTransactionHistory() {
    const history =
        JSON.parse(localStorage.getItem("kddTransactionHistory")) || [];

    transactionHistoryList.innerHTML = "";

    history.forEach((transaction) => {
        const item = document.createElement("div");
        item.className = "transaction-item";

        item.textContent =
            `${transaction.type} | ${transaction.amount} | ${transaction.person} | ${transaction.status} | ${transaction.date}`;

        transactionHistoryList.appendChild(item);
    });
}

renderTransactionHistory();

const saveProfileBtn = document.getElementById("saveProfileBtn");
const userFullName = document.getElementById("userFullName");
const userEmail = document.getElementById("userEmail");
const userCountry = document.getElementById("userCountry");

saveProfileBtn.addEventListener("click", () => {
    if (
        !userFullName.value.trim() ||
        !userEmail.value.trim() ||
        !userCountry.value.trim()
    ) {
        alert("Please complete all profile fields.");
        return;
    }

    const userProfile = {
        fullName: userFullName.value.trim(),
        email: userEmail.value.trim(),
        country: userCountry.value.trim()
    };

    localStorage.setItem("kddUserProfile", JSON.stringify(userProfile));

    alert("Profile saved successfully.");
});

const savedUserProfile =
    JSON.parse(localStorage.getItem("kddUserProfile"));

if (savedUserProfile) {
    userFullName.value = savedUserProfile.fullName || "";
    userEmail.value = savedUserProfile.email || "";
    userCountry.value = savedUserProfile.country || "";
}

const walletProvider = document.getElementById("walletProvider");
const connectWalletBtn = document.getElementById("connectWalletBtn");
const walletStatus = document.getElementById("walletStatus");

connectWalletBtn.addEventListener("click", () => {
    if (!walletProvider.value) {
        alert("Please choose a wallet or payment partner.");
        return;
    }

    localStorage.setItem("kddWalletProvider", walletProvider.value);
    walletStatus.textContent = "Wallet Status: Connected";

    alert("Wallet connected successfully.");
});

const savedWalletProvider = localStorage.getItem("kddWalletProvider");

if (savedWalletProvider) {
    walletProvider.value = savedWalletProvider;
    walletStatus.textContent = "Wallet Status: Connected";
}

const profileSecurityStatus =
    document.getElementById("profileSecurityStatus");

const walletSecurityStatus =
    document.getElementById("walletSecurityStatus");

const transactionSecurityStatus =
    document.getElementById("transactionSecurityStatus");

const backendSecurityStatus =
    document.getElementById("backendSecurityStatus");

async function updateSecurityReadiness() {
    const profileReady = localStorage.getItem("kddUserProfile");
    const walletReady = localStorage.getItem("kddWalletProvider");

   const { count: readinessTransactionCount, error: readinessTransactionError } =
    await supabaseClient
        .from("transactions")
        .select("*", { count: "exact", head: true });

    profileSecurityStatus.textContent =
        profileReady ? "Profile: Ready" : "Profile: Incomplete";

    walletSecurityStatus.textContent =
        walletReady ? "Wallet: Connected" : "Wallet: Not Connected";

    transactionSecurityStatus.textContent =
    readinessTransactionError
        ? "Transaction Records: Error"
        : `Transaction Records: ${readinessTransactionCount ?? 0}`;

    const { error: backendError } = await supabaseClient
    .from("profiles")
    .select("id")
    .limit(1);

backendSecurityStatus.textContent =
    backendError
        ? "Backend Connection: Error"
        : "Backend Connection: Connected";
}

updateSecurityReadiness();

saveProfileBtn.addEventListener("click", updateSecurityReadiness);
connectWalletBtn.addEventListener("click", updateSecurityReadiness);

const adminTransactionCount =
    document.getElementById("adminTransactionCount");

const adminProfileStatus =
    document.getElementById("adminProfileStatus");

const adminWalletStatus =
    document.getElementById("adminWalletStatus");

const adminSystemMode =
    document.getElementById("adminSystemMode");

async function updateAdminMonitoring() {
    const { count: transactionCount, error: transactionError } =
    await supabaseClient
        .from("transactions")
        .select("*", { count: "exact", head: true });

    const profileReady = localStorage.getItem("kddUserProfile");
    const walletReady = localStorage.getItem("kddWalletProvider");

    adminTransactionCount.textContent =
    transactionError
        ? "Transactions: Error"
        : `Transactions: ${transactionCount ?? 0}`;

    adminProfileStatus.textContent =
        profileReady ? "User Profile: Ready" : "User Profile: Incomplete";

    adminWalletStatus.textContent =
        walletReady ? "Wallet: Connected" : "Wallet: Not Connected";

    adminSystemMode.textContent =
    transactionError
        ? "System Mode: Error"
        : "System Mode: Supabase";
}

updateAdminMonitoring();

saveProfileBtn.addEventListener("click", updateAdminMonitoring);
connectWalletBtn.addEventListener("click", updateAdminMonitoring);
confirmTransactionBtn.addEventListener("click", updateAdminMonitoring);
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const authStatus = document.getElementById("authStatus");
const adminMonitoring = document.querySelector(".admin-monitoring");
adminMonitoring.style.display = "none";
signUpBtn.addEventListener("click", async () => {
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
        authStatus.textContent = "Enter email and password.";
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        authStatus.textContent = error.message;
        return;
    }

    authStatus.textContent = data.session
        ? "Account created and signed in."
        : "Account created. Check your email to confirm.";
});
signInBtn.addEventListener("click", async () => {
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
        authStatus.textContent = "Enter email and password.";
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        authStatus.textContent = error.message;
        return;
    }

    const profile = await loadCurrentUserProfile();

if (profile) {
    authStatus.textContent =
        `Signed in as ${data.user.email} | Status: ${profile.verification_status} | Role: ${profile.role}`;
        adminMonitoring.style.display =
    profile.role === "admin" ? "block" : "none";
}
});
signOutBtn.addEventListener("click", async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        authStatus.textContent = error.message;
        return;
    }

    authStatus.textContent = "Not signed in";
    adminMonitoring.style.display = "none";
});
async function loadCurrentUserProfile() {
    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
        return null;
    }

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("email, verification_status, role")
        .eq("id", user.id)
        .single();

    if (error) {
        authStatus.textContent = error.message;
        return null;
    }

    return data;
}
async function restoreSession() {
    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session) {
        authStatus.textContent = "Not signed in";
        adminMonitoring.style.display = "none";
        return;
    }

    const profile = await loadCurrentUserProfile();

    if (profile) {
        authStatus.textContent =
            `Signed in as ${session.user.email} | Status: ${profile.verification_status} | Role: ${profile.role}`;

        adminMonitoring.style.display =
            profile.role === "admin" ? "block" : "none";
    }
}

restoreSession();