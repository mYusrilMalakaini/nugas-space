const bookingForm = document.getElementById("bookingForm");
const spaceType = document.getElementById("spaceType");
const durationInput = document.getElementById("duration");
const bookingDate = document.getElementById("bookingDate");
const startTime = document.getElementById("startTime");
const noncashOptions = document.getElementById("noncashOptions");
const paymentProvider = document.getElementById("paymentProvider");
const bookingResult = document.getElementById("bookingResult");
const simulatePaymentButton = document.getElementById("simulatePaymentButton");
const STORAGE_KEY = "UrbanSpaceTransactions";

const spaceNames = {
    individual: "Individual Desk",
    group: "Group Desk",
    silent: "Silent Room",
    conference: "Conference Room"
};

function readJSON(key, fallback) {
    try {
const value = JSON.parse(localStorage.getItem(key));
return value === null ? fallback : value;
    } catch (error) {
return fallback;
    }
}

function getTransactions() {
    const transactions = readJSON(STORAGE_KEY, []);
    return Array.isArray(transactions) ? transactions : [];
}

function saveTransactions(transactions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function rupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
style: "currency",
currency: "IDR",
maximumFractionDigits: 0
    }).format(amount);
}

// Pilihan dapat datang dari denah versi localStorage maupun sessionStorage.
let selectedDesk = readJSON("UrbanSpaceSelectedDesk", null);
let pendingBooking = null;
try {
    pendingBooking = JSON.parse(sessionStorage.getItem("UrbanPendingBooking") || "null");
} catch (error) {
    pendingBooking = null;
}

const deskSelection = selectedDesk || pendingBooking;
const selectedUnitId = deskSelection
    ? (deskSelection.deskNumber ?? deskSelection.unitId ?? null)
    : null;

function getSelectedPrice() {
    return Number(spaceType.options[spaceType.selectedIndex].dataset.price);
}

function updateSummary() {
    const price = getSelectedPrice();
    const duration = Number(durationInput.value);
    document.getElementById("summarySpace").textContent =
selectedUnitId !== null ? "Individual Desk - Meja #" + selectedUnitId : spaceNames[spaceType.value];
    document.getElementById("summaryPrice").textContent = rupiah(price);
    document.getElementById("summaryDuration").textContent = duration + " jam";
    document.getElementById("totalPrice").textContent = rupiah(price * duration);
}

function updatePaymentView() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    noncashOptions.classList.toggle("hidden", selectedMethod !== "noncash");

    document.querySelectorAll(".payment-option").forEach(function(option) {
const radio = option.querySelector("input");
option.classList.toggle("border-red-500", radio.checked);
option.classList.toggle("bg-red-50", radio.checked);
option.classList.toggle("border-slate-200", !radio.checked);
    });
}

function setTodayAsMinimum() {
    const now = new Date();
    const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
.toISOString().split("T")[0];

    bookingDate.min = today;
    bookingDate.value = (deskSelection && deskSelection.date) || today;

    if (deskSelection) {
spaceType.value = "individual";
spaceType.disabled = true;

if (deskSelection.time) startTime.value = deskSelection.time;
if (deskSelection.duration) durationInput.value = String(deskSelection.duration);

const customerName = document.getElementById("customerName");
if (deskSelection.name) customerName.value = deskSelection.name;

if (selectedUnitId !== null) {
    document.getElementById("selectedDeskNotice").classList.remove("hidden");
    document.getElementById("selectedDeskSummary").textContent =
"Meja #" + selectedUnitId +
(deskSelection.zone ? " • " + deskSelection.zone : "") +
(deskSelection.date ? " • " + deskSelection.date : "") +
(deskSelection.time ? " • " + deskSelection.time : "") +
(deskSelection.duration ? " selama " + deskSelection.duration + " jam" : "");
}

if (deskSelection.duration) durationInput.disabled = true;
if (deskSelection.date) bookingDate.readOnly = true;
if (deskSelection.time) startTime.readOnly = true;
    }
}

function hasBookingConflict(unitId, date, time, duration, transactions) {
    const requestedStart = Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
    const requestedEnd = requestedStart + duration * 60;

    return transactions.some(function(item) {
if (
    String(item.unitId) !== String(unitId) ||
    item.date !== date ||
    item.status === "Dibatalkan"
) return false;

const existingTime = String(item.time || "00:00");
const existingStart = Number(existingTime.slice(0, 2)) * 60 +
    Number(existingTime.slice(3, 5));
const existingEnd = existingStart + Number(item.duration || 0) * 60;
return requestedStart < existingEnd && existingStart < requestedEnd;
    });
}

spaceType.addEventListener("change", updateSummary);
durationInput.addEventListener("change", updateSummary);
document.querySelectorAll('input[name="paymentMethod"]').forEach(function(radio) {
    radio.addEventListener("change", updatePaymentView);
});

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const date = bookingDate.value;
    const time = startTime.value;
    const duration = Number(durationInput.value);
    const method = document.querySelector('input[name="paymentMethod"]:checked').value;
    const provider = method === "cash" ? "Cash (bayar di lokasi)" : paymentProvider.value;
    const price = getSelectedPrice();
    const total = price * duration;

    if (!name || !phone || !date || !time) {
alert("Mohon lengkapi semua data reservasi.");
return;
    }

    if (!/^[0-9+()\-\s]{9,20}$/.test(phone)) {
alert("Nomor WhatsApp tidak valid.");
return;
    }

    if (time < "08:00" || time > "22:00") {
alert("Jam mulai reservasi harus berada antara pukul 08.00 sampai 22.00 WIB.");
return;
    }

    const startDateTime = new Date(date + "T" + time + ":00");
    if (startDateTime < new Date()) {
alert("Tanggal dan jam reservasi tidak boleh berada di waktu yang sudah lewat.");
return;
    }

    const endHour = Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60 + duration;
    if (endHour > 23) {
alert("Durasi reservasi melewati jam operasional (maksimal sampai pukul 23.00).");
return;
    }

    const transactions = getTransactions();
    if (selectedUnitId !== null && hasBookingConflict(selectedUnitId, date, time, duration, transactions)) {
alert("Maaf, meja tersebut baru saja dipesan. Silakan kembali ke Fasilitas dan pilih meja lain.");
return;
    }

    const bookingId = "NGS-" + Date.now().toString().slice(-8);
    const selectedSpaceName = selectedUnitId !== null
? "Individual Desk - Meja #" + selectedUnitId
: spaceNames[spaceType.value];

    const transaction = {
id: bookingId,
bookingId: bookingId,
unitId: selectedUnitId !== null ? String(selectedUnitId) : spaceType.value,
deskNumber: selectedUnitId !== null ? String(selectedUnitId) : null,
name: name,
phone: phone,
space: selectedSpaceName,
spaceKey: selectedUnitId !== null ? "individual" : spaceType.value,
date: date,
time: time,
duration: duration,
paymentMethod: method,
paymentProvider: provider,
total: total,
status: "Menunggu pembayaran",
createdAt: new Date().toISOString()
    };

    // Simpan satu format transaksi agar halaman denah dan admin membaca sumber data yang sama.
    transactions.unshift(transaction);
    saveTransactions(transactions);
    localStorage.setItem("UrbanSpaceLastBooking", JSON.stringify(transaction));
    localStorage.removeItem("UrbanSpaceSelectedDesk");
    sessionStorage.removeItem("UrbanPendingBooking");

    document.getElementById("resultBookingId").textContent = bookingId;
    document.getElementById("resultName").textContent = name + " (" + phone + ")";
    document.getElementById("resultSchedule").textContent =
selectedSpaceName + " • " + date + " • " + time + " (" + duration + " jam)";
    document.getElementById("resultPayment").textContent = provider;
    document.getElementById("resultTotal").textContent = rupiah(total);
    document.getElementById("transactionStatus").textContent = transaction.status;

    document.getElementById("resultNote").textContent = method === "cash"
? "Silakan lakukan pembayaran cash di lokasi Urban Space. Status transaksi menunggu pembayaran."
: "Lakukan pembayaran sesuai metode yang dipilih, lalu tekan tombol simulasi. Pembayaran ini bukan transaksi sungguhan.";

    simulatePaymentButton.classList.toggle("hidden", method !== "noncash");
    simulatePaymentButton.disabled = false;
    simulatePaymentButton.textContent = "Simulasikan pembayaran berhasil";
    simulatePaymentButton.classList.remove("cursor-not-allowed", "opacity-60");

    bookingResult.classList.remove("hidden");
    bookingResult.scrollIntoView({ behavior: "smooth", block: "start" });
});

simulatePaymentButton.addEventListener("click", function() {
    const savedBooking = readJSON("UrbanSpaceLastBooking", null);
    if (!savedBooking) return;

    const transactions = getTransactions();
    const index = transactions.findIndex(function(item) {
return item.id === savedBooking.id || item.bookingId === savedBooking.bookingId;
    });

    if (index < 0) return;

    transactions[index].status = "Menunggu verifikasi";
    transactions[index].paymentNote = "Pembayaran disimulasikan oleh pengguna";
    saveTransactions(transactions);

    savedBooking.status = "Menunggu verifikasi";
    localStorage.setItem("UrbanSpaceLastBooking", JSON.stringify(savedBooking));

    const statusBadge = document.getElementById("transactionStatus");
    statusBadge.textContent = "Menunggu verifikasi";
    statusBadge.className =
"inline-flex w-fit items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-800";
    document.getElementById("resultNote").textContent =
"Pembayaran disimulasikan dan menunggu verifikasi admin. Ini masih prototype frontend, belum terhubung ke payment gateway.";

    simulatePaymentButton.disabled = true;
    simulatePaymentButton.textContent = "Pembayaran disimulasikan";
    simulatePaymentButton.classList.add("cursor-not-allowed", "opacity-60");
});

setTodayAsMinimum();
updateSummary();
updatePaymentView();