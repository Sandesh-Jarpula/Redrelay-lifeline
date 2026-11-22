// ==========================================
// REDRELAY - LIFELINE
// FRONTEND APPLICATION
// ==========================================


// BLOOD COMPATIBILITY MATRIX

const compatibility = {

    "A+": ["A+", "A-", "O+", "O-"],
    "A-": ["A-", "O-"],

    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],

    "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "AB-": ["A-", "B-", "AB-", "O-"],

    "O+": ["O+", "O-"],
    "O-": ["O-"]

};


// DATA STORAGE

let donors = JSON.parse(localStorage.getItem("redrelayDonors")) || [];

let requests = JSON.parse(localStorage.getItem("redrelayRequests")) || [];

let users = JSON.parse(localStorage.getItem("redrelayUsers")) || [];

let currentUser = JSON.parse(localStorage.getItem("redrelayCurrentUser")) || null;


// SAVE DATA

function saveData() {

    localStorage.setItem("redrelayDonors", JSON.stringify(donors));

    localStorage.setItem("redrelayRequests", JSON.stringify(requests));

    localStorage.setItem("redrelayUsers", JSON.stringify(users));

}


// ==========================================
// SAMPLE DATA
// ==========================================

function initializeData() {

    if (donors.length === 0) {

        const names = [
            "Rahul Sharma", "Arjun Reddy", "Priya Kumar",
            "Sneha Rao", "Karthik Varma", "Ananya Das",
            "Vikram Singh", "Meera Patel", "Rohan Gupta",
            "Aarav Nair", "Divya Reddy", "Sanjay Kumar",
            "Neha Sharma", "Aditya Rao", "Ishita Verma",
            "Manoj Das", "Kiran Reddy", "Pooja Singh",
            "Varun Kumar", "Riya Patel", "Harsha Reddy",
            "Akash Sharma", "Sowmya Rao", "Nikhil Das",
            "Abhishek Verma", "Anjali Nair", "Ravi Kumar",
            "Siddharth Rao", "Kavya Reddy", "Suresh Patel"
        ];

        const groups = [
            "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
        ];

        const localities = [
            "Miyapur", "Kukatpally", "Madhapur",
            "Gachibowli", "Ameerpet", "Begumpet",
            "Secunderabad", "Kondapur", "Hitech City",
            "Dilsukhnagar"
        ];

        for (let i = 0; i < 30; i++) {

            donors.push({

                id: Date.now() + i,

                name: names[i],

                blood: groups[i % 8],

                city: "Hyderabad",

                locality: localities[i % localities.length],

                phone: "98765432" + String(i).padStart(2, "0"),

                available: "Available",

                lastDonation: null

            });

        }

    }


    if (requests.length === 0) {

        requests = [

            {
                id: 1001,
                patient: "Ramesh Kumar",
                hospital: "Apollo Hospital",
                city: "Hyderabad",
                locality: "Jubilee Hills",
                blood: "B+",
                units: 2,
                fulfilled: 1,
                deadline: new Date(Date.now() + 4 * 3600000).toISOString(),
                doctor: "9999999999",
                status: 1
            },

            {
                id: 1002,
                patient: "Anjali Sharma",
                hospital: "Yashoda Hospital",
                city: "Hyderabad",
                locality: "Secunderabad",
                blood: "O-",
                units: 3,
                fulfilled: 0,
                deadline: new Date(Date.now() + 3 * 3600000).toISOString(),
                doctor: "9999999998",
                status: 0
            },

            {
                id: 1003,
                patient: "Arjun Reddy",
                hospital: "KIMS Hospital",
                city: "Hyderabad",
                locality: "Begumpet",
                blood: "A+",
                units: 2,
                fulfilled: 2,
                deadline: new Date(Date.now() + 5 * 3600000).toISOString(),
                doctor: "9999999997",
                status: 3
            },

            {
                id: 1004,
                patient: "Priya Rao",
                hospital: "Care Hospital",
                city: "Hyderabad",
                locality: "Banjara Hills",
                blood: "AB+",
                units: 4,
                fulfilled: 1,
                deadline: new Date(Date.now() + 6 * 3600000).toISOString(),
                doctor: "9999999996",
                status: 1
            },

            {
                id: 1005,
                patient: "Vikram Singh",
                hospital: "Continental Hospital",
                city: "Hyderabad",
                locality: "Gachibowli",
                blood: "O+",
                units: 2,
                fulfilled: 0,
                deadline: new Date(Date.now() + 8 * 3600000).toISOString(),
                doctor: "9999999995",
                status: 0
            }

        ];

    }

    saveData();

}


// ==========================================
// LOGIN AND REGISTRATION
// ==========================================

function showRegister() {

    document.getElementById("loginForm").classList.add("hidden");

    document.getElementById("registerForm").classList.remove("hidden");

}


function showLogin() {

    document.getElementById("registerForm").classList.add("hidden");

    document.getElementById("loginForm").classList.remove("hidden");

}


function togglePassword(id, icon) {

    const input = document.getElementById(id);

    if (input.type === "password") {

        input.type = "text";

        icon.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.replace("fa-eye-slash", "fa-eye");

    }

}


// REGISTER ACCOUNT

document.getElementById("registerFormElement").addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("regName").value.trim();

    const email = document.getElementById("regEmail").value.trim().toLowerCase();

    const password = document.getElementById("regPassword").value;

    const role = document.getElementById("regRole").value;

    if (users.some(user => user.email === email)) {

        showToast("This email is already registered.");

        return;

    }

    users.push({

        name,
        email,
        password,
        role

    });

    saveData();

    showToast("Account created successfully!");

    showLogin();

    document.getElementById("loginEmail").value = email;

});


// LOGIN

document.getElementById("loginFormElement").addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();

    const password = document.getElementById("loginPassword").value;

    const role = document.getElementById("loginRole").value;

    const user = users.find(u =>
        u.email === email &&
        u.password === password &&
        u.role === role
    );

    // Demo login

    if (email === "demo@redrelay.com" && password === "123456") {

        currentUser = {

            name: "Demo User",
            email,
            role

        };

    }

    else if (user) {

        currentUser = user;

    }

    else {

        showToast("Invalid login details. Please register first.");

        return;

    }

    localStorage.setItem("redrelayCurrentUser", JSON.stringify(currentUser));

    openApplication();

});


// ==========================================
// APPLICATION OPEN / LOGOUT
// ==========================================

function openApplication() {

    document.getElementById("authPage").classList.add("hidden");

    document.getElementById("mainApp").classList.remove("hidden");

    document.getElementById("userName").textContent = currentUser.name;

    document.getElementById("userRole").textContent = currentUser.role;

    document.getElementById("userAvatar").textContent =
        currentUser.name.charAt(0).toUpperCase();

    refreshDashboard();

    renderFeed();

    renderDonors();

    renderTracking();

    renderCompatibility();

    // Auto-detect donor registration

    const existingDonor = donors.find(d =>
        d.email === currentUser.email
    );

    if (currentUser.role === "Donor" && !existingDonor) {

        document.getElementById("donorName").value = currentUser.name;

    }

}


function logout() {

    localStorage.removeItem("redrelayCurrentUser");

    currentUser = null;

    document.getElementById("mainApp").classList.add("hidden");

    document.getElementById("authPage").classList.remove("hidden");

    showLogin();

    showToast("Logged out successfully.");

}


// ==========================================
// NAVIGATION
// ==========================================

function showSection(section, element) {

    document.querySelectorAll(".page-section").forEach(page => {

        page.classList.add("hidden");

    });

    document.getElementById(section).classList.remove("hidden");

    document.querySelectorAll(".nav-link").forEach(link => {

        link.classList.remove("active");

    });

    if (element) {

        element.classList.add("active");

    } else {

        document.querySelectorAll(".nav-link").forEach(link => {

            if (link.getAttribute("onclick")?.includes("'" + section + "'")) {

                link.classList.add("active");

            }

        });

    }

    const titles = {

        dashboard: "Dashboard",
        sos: "Emergency SOS",
        donors: "Find Donors",
        registerDonor: "Become a Donor",
        feed: "Emergency Feed",
        tracking: "Request Tracking",
        compatibility: "Blood Compatibility"

    };

    document.getElementById("pageTitle").textContent = titles[section];

    if (section === "feed") renderFeed();

    if (section === "donors") renderDonors();

    if (section === "tracking") renderTracking();

}


// ==========================================
// DASHBOARD
// ==========================================

function refreshDashboard() {

    const active = requests.filter(r => r.status !== 3);

    const fulfilled = requests.reduce((sum, r) => sum + r.fulfilled, 0);

    const needed = active.reduce((sum, r) => sum + (r.units - r.fulfilled), 0);

    document.getElementById("activeCount").textContent = active.length;

    document.getElementById("donorCount").textContent = donors.length;

    document.getElementById("fulfilledCount").textContent = fulfilled;

    document.getElementById("neededCount").textContent = needed;

    renderDashboardRequests();

}


function renderDashboardRequests() {

    const container = document.getElementById("dashboardRequests");

    container.innerHTML = "";

    requests.slice(0, 4).forEach(request => {

        container.innerHTML += createRequestCard(request, false);

    });

}


// ==========================================
// REQUEST CARD
// ==========================================

function createRequestCard(request, showRespond) {

    const percentage = Math.min(
        100,
        (request.fulfilled / request.units) * 100
    );

    const statusText = [

        "Open / Broadcasted",

        "Donors Responded",

        "Fulfilled / In Transit",

        "Closed"

    ][request.status];

    return `

    <div class="request-card ${request.status === 0 ? 'urgent-card' : ''}">

        <div class="request-top">

            <div class="blood-type">${request.blood}</div>

            <span class="status-badge ${request.status === 3 ? 'success' : 'urgent'}">
                ${statusText}
            </span>

        </div>

        <h3>${request.hospital}</h3>

        <p class="request-detail">
            <i class="fa-solid fa-user"></i>
            Patient: ${request.patient}
        </p>

        <p class="request-detail">
            <i class="fa-solid fa-location-dot"></i>
            ${request.locality}, ${request.city}
        </p>

        <p class="request-detail">
            <i class="fa-solid fa-clock"></i>
            Deadline: ${new Date(request.deadline).toLocaleString()}
        </p>

        <div class="progress-label">

            <span>Blood Units Fulfilled</span>

            <strong>${request.fulfilled}/${request.units}</strong>

        </div>

        <div class="progress">

            <div class="progress-fill" style="width:${percentage}%"></div>

        </div>

        ${showRespond && request.status !== 3 ? `

            <div class="card-actions">

                <button class="small-btn" onclick="respondToRequest(${request.id})">
                    <i class="fa-solid fa-heart"></i> I Can Donate
                </button>

            </div>

        ` : ""}

    </div>

    `;

}


// ==========================================
// EMERGENCY SOS FORM
// ==========================================

document.getElementById("sosForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const deadline = new Date(document.getElementById("deadline").value);

    if (deadline <= new Date()) {

        showToast("Please select a future deadline.");

        return;

    }

    const request = {

        id: Date.now(),

        patient: document.getElementById("patientName").value,

        hospital: document.getElementById("hospitalName").value,

        city: document.getElementById("requestCity").value.trim(),

        locality: document.getElementById("requestLocality").value.trim(),

        blood: document.getElementById("requiredBlood").value,

        units: Number(document.getElementById("unitsRequired").value),

        fulfilled: 0,

        deadline: deadline.toISOString(),

        doctor: document.getElementById("doctorContact").value,

        status: 0

    };

    requests.unshift(request);

    saveData();

    const matches = findCompatibleDonors(request);

    this.reset();

    refreshDashboard();

    renderFeed();

    renderTracking();

    showToast("Emergency SOS broadcast successfully!");

    alert(

        "EMERGENCY BROADCAST SENT!\n\n" +

        "Request ID: " + request.id + "\n" +

        "Compatible available donors found: " + matches.length

    );

    showSection("feed");

});


// ==========================================
// BLOOD COMPATIBILITY ENGINE
// ==========================================

function findCompatibleDonors(request) {

    return donors.filter(donor => {

        const compatible = compatibility[request.blood].includes(donor.blood);

        const sameCity =
            donor.city.toLowerCase() === request.city.toLowerCase();

        const available = donor.available === "Available";

        const notRecovering = !donor.lastDonation ||
            Date.now() - donor.lastDonation >= 90 * 24 * 60 * 60 * 1000;

        return compatible && sameCity && available && notRecovering;

    });

}


// ==========================================
// DONOR REGISTRATION
// ==========================================

document.getElementById("donorForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const existingDonor = donors.find(d =>
        currentUser && d.email === currentUser.email
    );

    if (existingDonor) {

        showToast("You are already registered as a donor.");

        return;

    }

    const donor = {

        id: Date.now(),

        name: document.getElementById("donorName").value,

        blood: document.getElementById("donorBlood").value,

        city: document.getElementById("donorCity").value.trim(),

        locality: document.getElementById("donorLocality").value.trim(),

        phone: document.getElementById("donorPhone").value,

        email: currentUser ? currentUser.email : "",

        available: document.getElementById("donorAvailability").value,

        lastDonation: null

    };

    donors.push(donor);

    saveData();

    this.reset();

    refreshDashboard();

    renderDonors();

    showToast("Welcome to the RedRelay donor network!");

});


// ==========================================
// DISPLAY DONORS
// ==========================================

function renderDonors(filtered = donors) {

    const container = document.getElementById("donorResults");

    container.innerHTML = "";

    if (filtered.length === 0) {

        container.innerHTML = "<p>No matching donors found.</p>";

        return;

    }

    filtered.forEach(donor => {

        const recovering = donor.lastDonation &&
            Date.now() - donor.lastDonation < 90 * 24 * 60 * 60 * 1000;

        const available = donor.available === "Available" && !recovering;

        container.innerHTML += `

        <div class="donor-card">

            <div class="donor-header">

                <div class="donor-avatar">
                    ${donor.blood}
                </div>

                <span class="${available ? 'available' : 'unavailable'}">
                    ${available ? '● Available' : '● Unavailable'}
                </span>

            </div>

            <h3>${donor.name}</h3>

            <p><i class="fa-solid fa-location-dot"></i>
                ${donor.locality}, ${donor.city}
            </p>

            <p><i class="fa-solid fa-droplet"></i>
                Blood Group: ${donor.blood}
            </p>

            <p><i class="fa-solid fa-phone"></i>
                Contact: Private
            </p>

            <button class="small-btn" onclick="relayDonor(${donor.id})">
                I Can Donate / Contact Relay
            </button>

        </div>

        `;

    });

}


// ==========================================
// DONOR FILTER
// ==========================================

function filterDonors() {

    const blood = document.getElementById("filterBlood").value;

    const city = document.getElementById("filterCity").value.toLowerCase().trim();

    const locality = document.getElementById("filterLocality").value.toLowerCase().trim();

    const filtered = donors.filter(donor => {

        return (

            (!blood || donor.blood === blood) &&

            (!city || donor.city.toLowerCase().includes(city)) &&

            (!locality || donor.locality.toLowerCase().includes(locality))

        );

    });

    renderDonors(filtered);

}


// ==========================================
// DONOR RESPONSE
// ==========================================

function respondToRequest(id) {

    const request = requests.find(r => r.id === id);

    if (!request || request.status === 3) return;

    if (request.fulfilled >= request.units) {

        showToast("All required units are already committed.");

        return;

    }

    if (!currentUser || currentUser.role !== "Donor") {

        showToast("Please log in using a donor account to respond.");

        return;

    }

    const donor = donors.find(d => d.email === currentUser.email);

    if (!donor) {

        showToast("Please register as a donor first.");

        showSection("registerDonor");

        return;

    }

    const recovering = donor.lastDonation &&
        Date.now() - donor.lastDonation < 90 * 24 * 60 * 60 * 1000;

    if (donor.available !== "Available" || recovering) {

        showToast("You are currently unavailable to donate.");

        return;

    }

    if (!compatibility[request.blood].includes(donor.blood)) {

        showToast("Your blood group is not compatible with this request.");

        return;

    }

    if (donor.city.toLowerCase() !== request.city.toLowerCase()) {

        showToast("This request is outside your registered city.");

        return;

    }

    if (!request.responses) {

        request.responses = [];

    }

    if (request.responses.includes(donor.id)) {

        showToast("You have already responded to this request.");

        return;

    }

    request.responses.push(donor.id);

    request.fulfilled++;

    request.status = request.fulfilled >= request.units ? 2 : 1;

    saveData();

    refreshDashboard();

    renderFeed();

    renderTracking();

    showToast("Thank you! Your response has been recorded.");

}


// ==========================================
// PRIVATE DONOR RELAY
// ==========================================

function relayDonor(id) {

    const donor = donors.find(d => d.id === id);

    if (!donor) return;

    if (!currentUser || currentUser.role !== "Requester") {

        showToast("Sign in as a requester to use the contact relay.");

        return;

    }

    showToast(

        "Contact relay simulated for " + donor.name +

        ". Phone number remains private."

    );

}


// ==========================================
// EMERGENCY FEED
// ==========================================

function renderFeed() {

    const container = document.getElementById("feedRequests");

    container.innerHTML = "";

    requests.forEach(request => {

        container.innerHTML += createRequestCard(request, true);

    });

}


// ==========================================
// REQUEST TRACKING
// ==========================================

function renderTracking() {

    const container = document.getElementById("trackingRequests");

    container.innerHTML = "";

    const stages = [

        "Open / Broadcasted",

        "Donors Responded",

        "Fulfilled / In Transit",

        "Closed"

    ];

    requests.forEach(request => {

        container.innerHTML += `

        <div class="tracking-card">

            <div class="request-top">

                <div>

                    <h3>${request.hospital}</h3>

                    <p class="request-detail">
                        ${request.patient} | ${request.blood}
                    </p>

                </div>

                <span class="blood-type">${request.fulfilled}/${request.units}</span>

            </div>

            <div class="tracking-steps">

                ${stages.map((stage, index) => `

                    <div class="step ${index <= request.status ? 'completed' : ''}">

                        <div class="step-circle">

                            ${index <= request.status ? '✓' : index + 1}

                        </div>

                        <p>${stage}</p>

                    </div>

                `).join("")}

            </div>

            <div class="tracking-actions">

                ${request.status === 2 ? `

                    <button class="small-btn" onclick="markReceived(${request.id})">
                        Mark Blood Received
                    </button>

                ` : ""}

                ${request.status === 0 ? `

                    <button class="small-btn secondary-btn" onclick="updateStatus(${request.id},1)">
                        Update to Donors Responded
                    </button>

                ` : ""}

                ${request.status === 1 ? `

                    <button class="small-btn secondary-btn" onclick="updateStatus(${request.id},2)">
                        Mark Fulfilled / In Transit
                    </button>

                ` : ""}

                ${request.status !== 3 ? `

                    <button class="small-btn secondary-btn" onclick="closeRequest(${request.id})">
                        Close Request
                    </button>

                ` : ""}

            </div>

        </div>

        `;

    });

}


// ==========================================
// STATUS MANAGEMENT
// ==========================================

function updateStatus(id, status) {

    const request = requests.find(r => r.id === id);

    if (!request) return;

    if (status === 2 && request.fulfilled < request.units) {

        showToast("All required units must be committed first.");

        return;

    }

    request.status = status;

    saveData();

    refreshDashboard();

    renderFeed();

    renderTracking();

    showToast("Request status updated.");

}


function markReceived(id) {

    const request = requests.find(r => r.id === id);

    if (!request) return;

    if (request.fulfilled < request.units) {

        showToast("The required units are not yet fulfilled.");

        return;

    }

    const confirmed = confirm("Confirm that the patient has received the required blood?");

    if (!confirmed) return;

    request.status = 3;

    saveData();

    refreshDashboard();

    renderFeed();

    renderTracking();

    showToast("Request successfully closed!");

}


function closeRequest(id) {

    const confirmed = confirm("Are you sure you want to close this request?");

    if (!confirmed) return;

    const request = requests.find(r => r.id === id);

    if (!request) return;

    request.status = 3;

    saveData();

    refreshDashboard();

    renderFeed();

    renderTracking();

    showToast("Emergency request closed.");

}


// ==========================================
// COMPATIBILITY TABLE
// ==========================================

function renderCompatibility() {

    const container = document.getElementById("compatibilityTable");

    container.innerHTML = "";

    Object.keys(compatibility).forEach(group => {

        container.innerHTML += `

        <tr>

            <td>${group}</td>

            <td>${compatibility[group].join(", ")}</td>

        </tr>

        `;

    });

}


// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotifications() {

    const active = requests.filter(r => r.status !== 3).length;

    alert(

        "REDRELAY NOTIFICATIONS\n\n" +

        "Active emergency requests: " + active + "\n\n" +

        "You are viewing simulated demo notifications."

    );

}


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ==========================================
// INITIALIZATION
// ==========================================

initializeData();


// Restore login session

if (currentUser) {

    openApplication();

}
