const nowForDate = new Date();
const todayStr = new Date(nowForDate.getTime() - nowForDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
const filterDate = document.getElementById("filterDate");
const filterTime = document.getElementById("filterTime");
const filterDuration = document.getElementById("filterDuration");
const searchDeskInput = document.getElementById("searchDeskNumber");

filterDate.value = todayStr;
filterDate.min = todayStr;

let currentFloor = 1;
let selectedDeskNumber = null;
let toastTimer;

// Struktur Tata Letak Nomor Meja Persis Sesuai Gambar 1 & Gambar 2
const floorLayouts = {
    1: {
        leftWall: [40, 41, 42, 43, 44, 45, 46],
        midLeftClusters: [
            [[39, 38], [36, 37]],
            [[35, 34], [32, 33]],
            [[31, 30], [28, 29]],
            [[26, 27], [25, 24]]
        ],
        midRightClusters: [
            [[8, 9], [10, 11]],
            [[12, 13], [14, 15]],
            [[16, 17], [18, 19]],
            [[20, 21], [22, 23]]
        ],
        rightWall: [7, 6, 5, 4, 3, 2, 1],
        lowerWingPairs: [
            [47, 52],
            [48, 51],
            [49, 50]
        ]
    },
    2: {
        leftWall: [92, 93, 94, 95, 96, 97, 98],
        midLeftClusters: [
            [[91, 90], [88, 89]],
            [[87, 86], [84, 85]],
            [[83, 82], [80, 81]],
            [[78, 79], [76, 77]]
        ],
        midRightClusters: [
            [[60, 61], [62, 63]],
            [[64, 65], [66, 67]],
            [[68, 69], [70, 71]],
            [[72, 73], [74, 75]]
        ],
        rightWall: [59, 58, 57, 56, 55, 54, 53],
        lowerWingPairs: [] // Di lantai 2 koridor kiri bawah kosong (area smoking)
    }
};
// Sumber data reservasi bersama dengan Reservasi.html dan AdminTransaksi.html
const STORAGE_KEY = "UrbanSpaceTransactions";

function getReservationsDB() {
    try {
        const transactions = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

        return transactions
            .filter(function(item) {
                return item.unitId && item.status !== "Dibatalkan";
            })
            .map(function(item) {
                const startHour = Number(String(item.time || "00:00").split(":")[0]);
                return {
                    deskNumber: Number(item.unitId),
                    date: item.date,
                    startHour: startHour,
                    endHour: startHour + Number(item.duration || 0),
                    holder: item.name || "Pemesan",
                    status: item.status === "Terverifikasi" ? "confirmed" : "unconfirmed"
                };
            });
    } catch (error) {
        console.error("Gagal membaca data reservasi:", error);
        return [];
    }
}

function formatHour(h) {
    return String(h).padStart(2, "0") + ":00";
}

function isOverlap(startA, endA, startB, endB) {
    return startA < endB && endA > startB;
}

// Menentukan informasi zona dari nomor meja
function getDeskZoneInfo(num) {
    if (num >= 1 && num <= 52) {
        return "Lantai 1 • Non-Smoking Indoor";
    }
    if (num >= 76 && num <= 98) {
        return "Lantai 2 • Smoking Indoor";
    }
    return "Lantai 2 • Non-Smoking Indoor";
}

// Mengecek ketersediaan suatu nomor meja pada tanggal & jam terpilih
function getDeskStatus(deskNum, dateVal, reqStart, reqEnd) {
    const conflicts = getReservationsDB().filter(function(r) {
        return (
            r.deskNumber === deskNum &&
            r.date === dateVal &&
            isOverlap(reqStart, reqEnd, r.startHour, r.endHour)
        );
    });

    const confirmedConflict = conflicts.find(function(c) {
        return c.status === "confirmed";
    });
    if (confirmedConflict) {
        return { state: "confirmed", record: confirmedConflict };
    }

    const unconfirmedConflict = conflicts.find(function(c) {
        return c.status === "unconfirmed";
    });
    if (unconfirmedConflict) {
        return { state: "unconfirmed", record: unconfirmedConflict };
    }

    return { state: "available", record: null };
}

// Membuat class warna dan atribut tombol meja berdasarkan statusnya
function getDeskButtonMeta(deskNum) {
    const dateVal = filterDate.value;
    const startHour = parseInt(filterTime.value, 10);
    const endHour = startHour + parseInt(filterDuration.value, 10);
    const statusObj = getDeskStatus(deskNum, dateVal, startHour, endHour);

    let colorClass = "desk-available";
    let titleText = "Meja #" + deskNum + " - Tersedia (Klik untuk pesan)";

    if (statusObj.state === "unconfirmed") {
        colorClass = "desk-unconfirmed";
        titleText = "Meja #" + deskNum + " - Sedang di-hold oleh " + statusObj.record.holder + " (Belum Terkonfirmasi - Klik untuk ambil alih)";
    } else if (statusObj.state === "confirmed") {
        colorClass = "desk-confirmed";
        titleText = "Meja #" + deskNum + " - Tidak Tersedia / Terkonfirmasi oleh " + statusObj.record.holder;
    }

    return {
        colorClass: colorClass,
        titleText: titleText,
        state: statusObj.state
    };
}

// Komponen HTML Meja Vertikal (Dinding Kiri / Dinding Kanan)
function createSideWallDeskHTML(deskNum, side) {
    const meta = getDeskButtonMeta(deskNum);
    const rotClass = side === "left" ? "rot-left" : "rot-right";

    const buttonHTML = `
        <button
            type="button"
            id="desk-btn-${deskNum}"
            onclick="handleDeskClick(${deskNum})"
            title="${meta.titleText}"
            class="desk-btn ${meta.colorClass} h-[74px] w-[42px]"
        >
            <span class="${rotClass}">${deskNum}</span>
        </button>
    `;

    if (side === "left") {
        return `
            <div class="flex items-center gap-1.5">
                ${buttonHTML}
                <div class="chair-pill-v"></div>
            </div>
        `;
    } else {
        return `
            <div class="flex items-center gap-1.5">
                <div class="chair-pill-v"></div>
                ${buttonHTML}
            </div>
        `;
    }
}

// Komponen HTML Kelompok 4 Meja Horizontal (Area Tengah)
function createQuadClusterHTML(quadArray) {
    const topRow = quadArray[0];
    const bottomRow = quadArray[1];

    function renderHorizontalDesk(num, chairPosition) {
        const meta = getDeskButtonMeta(num);
        const chairDiv = `<div class="chair-pill-h"></div>`;
        const btnDiv = `
            <button
                type="button"
                id="desk-btn-${num}"
                onclick="handleDeskClick(${num})"
                title="${meta.titleText}"
                class="desk-btn ${meta.colorClass} h-[42px] w-[84px]"
            >
                ${num}
            </button>
        `;

        return `
            <div class="flex flex-col items-center gap-1.5">
                ${chairPosition === "top" ? chairDiv + btnDiv : btnDiv + chairDiv}
            </div>
        `;
    }

    return `
        <div class="flex flex-col gap-1.5">
            <div class="flex gap-1.5">
                ${renderHorizontalDesk(topRow[0], "top")}
                ${renderHorizontalDesk(topRow[1], "top")}
            </div>
            <div class="flex gap-1.5">
                ${renderHorizontalDesk(bottomRow[0], "bottom")}
                ${renderHorizontalDesk(bottomRow[1], "bottom")}
            </div>
        </div>
    `;
}

// Komponen HTML Meja Koridor Kiri Bawah Lantai 1 (Meja 47 - 52)
function createLowerWingDesksHTML(pairsArray) {
    if (!pairsArray || pairsArray.length === 0) {
        return "";
    }

    const rowsHTML = pairsArray.map(function(pair) {
        const leftNum = pair[0];
        const rightNum = pair[1];
        const metaL = getDeskButtonMeta(leftNum);
        const metaR = getDeskButtonMeta(rightNum);

        return `
            <div class="flex items-center gap-1.5">
                <div class="chair-pill-v"></div>
                <button
                    type="button"
                    id="desk-btn-${leftNum}"
                    onclick="handleDeskClick(${leftNum})"
                    title="${metaL.titleText}"
                    class="desk-btn ${metaL.colorClass} h-[72px] w-[42px]"
                >
                    <span class="rot-left">${leftNum}</span>
                </button>
                <button
                    type="button"
                    id="desk-btn-${rightNum}"
                    onclick="handleDeskClick(${rightNum})"
                    title="${metaR.titleText}"
                    class="desk-btn ${metaR.colorClass} h-[72px] w-[42px]"
                >
                    <span class="rot-left">${rightNum}</span>
                </button>
                <div class="chair-pill-v"></div>
            </div>
        `;
    }).join("");

    return `<div class="flex flex-col gap-2">${rowsHTML}</div>`;
}

// Render seluruh denah sesuai lantai yang aktif
function renderFloorPlan() {
    const layout = floorLayouts[currentFloor];
    const dateVal = filterDate.value;
    const startHour = parseInt(filterTime.value, 10);
    const endHour = startHour + parseInt(filterDuration.value, 10);

    // Update Jadwal Badge
    document.getElementById("scheduleSummaryBadge").textContent =
        dateVal + " • " + formatHour(startHour) + " - " + formatHour(endHour) + " WIB";

    // Atur tampilan khusus Lantai 1 vs Lantai 2 (Zona Smoking & Border Putus-putus)
    const floor2SmokingBg = document.getElementById("floor2SmokingBg");
    const floor2ZoneBadges = document.getElementById("floor2ZoneBadges");
    const lowerLeftWing = document.getElementById("lowerLeftWing");

    if (currentFloor === 2) {
        floor2SmokingBg.classList.remove("hidden");
        floor2ZoneBadges.classList.remove("hidden");
        floor2ZoneBadges.classList.add("flex");
        lowerLeftWing.style.backgroundColor = "#fff2f0";
        lowerLeftWing.style.borderRight = "2px dashed rgba(194, 65, 12, 0.7)";
    } else {
        floor2SmokingBg.classList.add("hidden");
        floor2ZoneBadges.classList.add("hidden");
        floor2ZoneBadges.classList.remove("flex");
        lowerLeftWing.style.backgroundColor = "#ffffff";
        lowerLeftWing.style.borderRight = "1px solid #cbd5e1";
    }

    // Render ke-4 kolom utama + koridor bawah
    document.getElementById("leftWallCol").innerHTML = layout.leftWall
        .map(function(n) { return createSideWallDeskHTML(n, "left"); })
        .join("");

    document.getElementById("midLeftCol").innerHTML = layout.midLeftClusters
        .map(function(cluster) { return createQuadClusterHTML(cluster); })
        .join("");

    document.getElementById("midRightCol").innerHTML = layout.midRightClusters
        .map(function(cluster) { return createQuadClusterHTML(cluster); })
        .join("");

    document.getElementById("rightWallCol").innerHTML = layout.rightWall
        .map(function(n) { return createSideWallDeskHTML(n, "right"); })
        .join("");

    document.getElementById("lowerWingDesks").innerHTML =
        createLowerWingDesksHTML(layout.lowerWingPairs);

    // Hitung Statistik Ketersediaan di Lantai Ini
    const startDesk = currentFloor === 1 ? 1 : 53;
    const endDesk = currentFloor === 1 ? 52 : 98;
    let availCount = 0;
    let unconfCount = 0;
    let confCount = 0;

    for (let d = startDesk; d <= endDesk; d++) {
        const st = getDeskStatus(d, dateVal, startHour, endHour).state;
        if (st === "available") availCount++;
        else if (st === "unconfirmed") unconfCount++;
        else confCount++;
    }

    document.getElementById("activeFloorLabel").textContent =
        "Menampilkan: Denah Lantai " + currentFloor + " (Meja " + startDesk + " - " + endDesk + ")";
    document.getElementById("statAvailable").textContent = availCount;
    document.getElementById("statUnconfirmed").textContent = unconfCount;
    document.getElementById("statConfirmed").textContent = confCount;

    // Update teks tombol switch lantai di pojok kanan bawah & atas
    const targetFloor = currentFloor === 1 ? 2 : 1;
    document.getElementById("switchFloorTitle").textContent = "Lihat Denah Lantai " + targetFloor;
    document.getElementById("switchFloorBtnText").textContent = "Denah Lantai " + targetFloor;

    const topBtn1 = document.getElementById("topBtnFloor1");
    const topBtn2 = document.getElementById("topBtnFloor2");
    if (currentFloor === 1) {
        topBtn1.className = "rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition";
        topBtn2.className = "rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900";
    } else {
        topBtn2.className = "rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition";
        topBtn1.className = "rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900";
    }
}

// Fungsi Ganti Lantai
window.switchFloor = function(floorNum) {
    currentFloor = floorNum;
    renderFloorPlan();
};

window.toggleFloor = function() {
    currentFloor = currentFloor === 1 ? 2 : 1;
    renderFloorPlan();
    showToast("Beralih ke tampilan Denah Lantai " + currentFloor);
};

// Ketika salah satu meja pada denah diklik
window.handleDeskClick = function(deskNum) {
    const dateVal = filterDate.value;
    const startHour = parseInt(filterTime.value, 10);
    const duration = parseInt(filterDuration.value, 10);
    const endHour = startHour + duration;

    const statusObj = getDeskStatus(deskNum, dateVal, startHour, endHour);

    if (statusObj.state === "confirmed") {
        showToast(
            "Meja #" + deskNum + " sudah terverifikasi oleh " +
            statusObj.record.holder + ". Silakan pilih meja lain."
        );
        return;
    }

    if (statusObj.state === "unconfirmed") {
        showToast(
            "Meja #" + deskNum + " sedang menunggu pembayaran/verifikasi. Silakan pilih meja lain."
        );
        return;
    }

    selectedDeskNumber = deskNum;
    openBookingModal(deskNum);
};

function openBookingModal(deskNum) {
    const dateVal = filterDate.value;
    const startHour = parseInt(filterTime.value, 10);
    const duration = parseInt(filterDuration.value, 10);
    const endHour = startHour + duration;
    const totalCost = 15000 * duration;

    document.getElementById("modalZoneBadge").textContent = getDeskZoneInfo(deskNum);
    document.getElementById("modalDeskHeading").textContent = "Reservasi Meja #" + deskNum;
    document.getElementById("summaryDeskInfo").textContent =
        "Meja #" + deskNum + " (" + getDeskZoneInfo(deskNum) + ")";
    document.getElementById("summaryDateTime").textContent =
        dateVal + " | " + formatHour(startHour) + " - " + formatHour(endHour) + " WIB";
    document.getElementById("summaryCost").textContent =
        "IDR " + totalCost.toLocaleString("id-ID");

    const bookModal = document.getElementById("bookingModal");
    bookModal.classList.remove("hidden");
    bookModal.classList.add("flex");
}

function closeWarnModal() {
    const warnModal = document.getElementById("doubleBookingModal");
    warnModal.classList.add("hidden");
    warnModal.classList.remove("flex");
}

function closeBookModal() {
    const bookModal = document.getElementById("bookingModal");
    bookModal.classList.add("hidden");
    bookModal.classList.remove("flex");
    document.getElementById("bookingForm").reset();
}

document.getElementById("closeWarnModal").addEventListener("click", closeWarnModal);
document.getElementById("btnCancelWarn").addEventListener("click", closeWarnModal);

document.getElementById("closeBookModal").addEventListener("click", closeBookModal);
document.getElementById("btnCancelBook").addEventListener("click", closeBookModal);

// Kirim pilihan meja ke halaman Reservasi & Pembayaran
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (selectedDeskNumber === null) return;

    const nameVal = document.getElementById("customerName").value.trim();
    if (!nameVal) {
        alert("Mohon masukkan nama pemesan.");
        return;
    }

    const dateVal = filterDate.value;
    const startHour = parseInt(filterTime.value, 10);
    const duration = parseInt(filterDuration.value, 10);

    const pendingBooking = {
        unitId: String(selectedDeskNumber),
        name: nameVal,
        date: dateVal,
        time: String(startHour).padStart(2, "0") + ":00",
        duration: duration,
        spaceKey: "individual"
    };

    sessionStorage.setItem("UrbanPendingBooking", JSON.stringify(pendingBooking));
    window.location.href = "Reservasi.html";
});

// Fitur Cari Nomor Meja Cepat (1 - 98)
document.getElementById("btnFindDesk").addEventListener("click", function() {
    const num = parseInt(searchDeskInput.value, 10);
    if (!num || num < 1 || num > 98) {
        renderFloorPlan();
        showToast("Ketersediaan denah berhasil diperbarui!");
        return;
    }

    const targetFloor = num <= 52 ? 1 : 2;
    if (currentFloor !== targetFloor) {
        currentFloor = targetFloor;
        renderFloorPlan();
    }

    const btnEl = document.getElementById("desk-btn-" + num);
    if (btnEl) {
        btnEl.scrollIntoView({ behavior: "smooth", block: "center" });
        btnEl.classList.add("ring-4", "ring-slate-900", "scale-110");
        setTimeout(function() {
            btnEl.classList.remove("ring-4", "ring-slate-900", "scale-110");
        }, 2200);
    }
});

function showToast(message) {
    clearTimeout(toastTimer);
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    toastTimer = setTimeout(function() {
        toast.classList.add("hidden");
    }, 3200);
}

// Render ulang setiap kali tanggal/jam/durasi diubah
filterDate.addEventListener("change", renderFloorPlan);
filterTime.addEventListener("change", renderFloorPlan);
filterDuration.addEventListener("change", renderFloorPlan);

// Inisialisasi awal
renderFloorPlan();

window.addEventListener("storage", function(event) {
    if (event.key === STORAGE_KEY || event.key === null) {
        renderFloorPlan();
    }
});