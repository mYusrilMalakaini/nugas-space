 const STORAGE_KEY = "Urban_admin_spaces_v1";

        // Data Awal (Default) sesuai kategori & denah Urban Space
        const defaultSpaces = [
            {
                code: "M-01",
                name: "Individual Desk #01 (Dinding Kanan)",
                category: "Individual Desk",
                floor: "Lantai 1 - Non-Smoking",
                capacity: 1,
                price: 15000,
                status: "available",
                facilities: "Stop Kontak 2 Lubang, Kursi Ergonomis, AC"
            },
            {
                code: "M-10",
                name: "Quad Desk #10 (Tengah Kanan)",
                category: "Individual Desk",
                floor: "Lantai 1 - Non-Smoking",
                capacity: 1,
                price: 15000,
                status: "occupied",
                facilities: "Stop Kontak, Lampu Meja, Wi-Fi Cepat"
            },
            {
                code: "GRP-24",
                name: "Group Desk Blok 24-27",
                category: "Group Desk",
                floor: "Lantai 1 - Non-Smoking",
                capacity: 4,
                price: 40000,
                status: "available",
                facilities: "Meja Kolaborasi, 4 Stop Kontak, Papan Tulis Kecil"
            },
            {
                code: "GRP-47",
                name: "Group Desk Koridor Bawah (47-52)",
                category: "Group Desk",
                floor: "Lantai 1 - Non-Smoking",
                capacity: 6,
                price: 40000,
                status: "available",
                facilities: "Area Diskusi, 6 Stop Kontak, AC"
            },
            {
                code: "SLN-60",
                name: "Silent Zone Desk #60",
                category: "Silent Room",
                floor: "Lantai 2 - Non-Smoking",
                capacity: 2,
                price: 20000,
                status: "available",
                facilities: "Zona Hening, Sekat Akustik, Lampu Baca"
            },
            {
                code: "SMK-88",
                name: "Smoking Indoor Desk #88",
                category: "Individual Desk",
                floor: "Lantai 2 - Smoking Indoor",
                capacity: 1,
                price: 15000,
                status: "occupied",
                facilities: "Exhaust Fan, Asbak, Stop Kontak"
            },
            {
                code: "SMK-92",
                name: "Smoking Wall Desk #92",
                category: "Individual Desk",
                floor: "Lantai 2 - Smoking Indoor",
                capacity: 1,
                price: 15000,
                status: "maintenance",
                facilities: "Exhaust Fan, Stop Kontak"
            },
            {
                code: "CNF-01",
                name: "VIP Conference Room A",
                category: "Conference Room",
                floor: "Lantai 2 - Non-Smoking",
                capacity: 10,
                price: 75000,
                status: "available",
                facilities: "Smart TV Proyektor, Whiteboard, Kedap Suara"
            }
        ];

        // Load dari localStorage atau pakai default
        let spacesList = [];
        function loadSpaces() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    spacesList = JSON.parse(saved);
                } catch (e) {
                    spacesList = [...defaultSpaces];
                }
            } else {
                spacesList = [...defaultSpaces];
                saveSpaces();
            }
        }

        function saveSpaces() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(spacesList));
        }

        // Tampilkan email admin yang login dari login.html
        const loggedEmail = sessionStorage.getItem("UrbanEmail");
        if (loggedEmail) {
            document.getElementById("adminEmailDisplay").textContent = loggedEmail;
        }

        let deleteIndexTarget = null;
        let toastTimer;

        function formatRupiah(num) {
            return "IDR " + Number(num).toLocaleString("id-ID");
        }

        // Render Metrik Kartu Atas, Breakdown Kategori, dan Tabel CRUD
        function renderDashboard() {
            const searchVal = document.getElementById("searchInput").value.trim().toLowerCase();
            const catFilter = document.getElementById("filterCategory").value;
            const statusFilter = document.getElementById("filterStatus").value;

            // 1. Hitung Statistik Keseluruhan
            const totalUnits = spacesList.length;
            let totalCap = 0;
            let availCount = 0;
            let occCount = 0;
            let maintCount = 0;
            let maxRevenue = 0;

            spacesList.forEach(function(item) {
                totalCap += Number(item.capacity);
                maxRevenue += Number(item.price);
                if (item.status === "available") availCount++;
                else if (item.status === "occupied") occCount++;
                else if (item.status === "maintenance") maintCount++;
            });

            const availPct = totalUnits ? Math.round((availCount / totalUnits) * 100) : 0;
            const occPct = totalUnits ? Math.round((occCount / totalUnits) * 100) : 0;
            const maintPct = totalUnits ? Math.round((maintCount / totalUnits) * 100) : 0;

            document.getElementById("sidebarTotalBadge").textContent = totalUnits;
            document.getElementById("metricTotalUnits").textContent = totalUnits + " Unit";
            document.getElementById("metricTotalCapacity").textContent = totalCap + " Kursi";

            document.getElementById("metricAvailableUnits").textContent = availCount + " Unit";
            document.getElementById("metricAvailablePct").textContent = availPct + "%";

            document.getElementById("metricOccupiedUnits").textContent = occCount + " Unit";
            document.getElementById("metricOccupiedPct").textContent = occPct + "%";

            document.getElementById("metricMaintenanceUnits").textContent = maintCount + " Unit";
            document.getElementById("metricMaintenancePct").textContent = maintPct + "%";

            document.getElementById("metricMaxRevenuePerHour").textContent = formatRupiah(maxRevenue) + " / jam";
            document.getElementById("bubbleAvailPct").textContent = availPct + "%";
            document.getElementById("bubbleOccPct").textContent = occPct + "%";
            document.getElementById("bubbleMaintPct").textContent = maintPct + "%";

            // 2. Render Breakdown per Kategori
            const categories = ["Individual Desk", "Group Desk", "Silent Room", "Conference Room"];
            const breakdownContainer = document.getElementById("categoryBreakdownList");
            breakdownContainer.innerHTML = "";

            categories.forEach(function(catName) {
                const catItems = spacesList.filter(function(s) { return s.category === catName; });
                const catAvail = catItems.filter(function(s) { return s.status === "available"; }).length;
                const catSeats = catItems.reduce(function(acc, cur) { return acc + Number(cur.capacity); }, 0);
                const pct = catItems.length ? Math.round((catAvail / catItems.length) * 100) : 0;

                breakdownContainer.innerHTML += `
                    <div>
                        <div class="mb-1.5 flex items-center justify-between text-xs">
                            <span class="font-bold text-slate-800">${catName}</span>
                            <span class="text-slate-500">
                                <strong>${catAvail}</strong>/${catItems.length} Unit Tersedia • <strong>${catSeats} Kursi</strong>
                            </span>
                        </div>
                        <div class="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div class="h-full rounded-full bg-red-600 transition-all duration-300" style="width: ${pct}%;"></div>
                        </div>
                    </div>
                `;
            });

            // 3. Render Tabel CRUD
            const tbody = document.getElementById("crudTableBody");
            const emptyState = document.getElementById("emptyTableState");
            tbody.innerHTML = "";

            let visibleRows = 0;

            spacesList.forEach(function(item, index) {
                const matchSearch =
                    item.code.toLowerCase().includes(searchVal) ||
                    item.name.toLowerCase().includes(searchVal) ||
                    item.floor.toLowerCase().includes(searchVal) ||
                    item.facilities.toLowerCase().includes(searchVal);

                const matchCat = catFilter === "all" || item.category === catFilter;
                const matchStatus = statusFilter === "all" || item.status === statusFilter;

                if (!matchSearch || !matchCat || !matchStatus) return;

                visibleRows++;

                // Badge Warna Status
                let statusSelectClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                if (item.status === "occupied") {
                    statusSelectClass = "bg-red-50 text-red-700 border-red-200";
                } else if (item.status === "maintenance") {
                    statusSelectClass = "bg-amber-50 text-amber-700 border-amber-200";
                }

                const tr = document.createElement("tr");
                tr.className = "transition hover:bg-slate-50/80";

                tr.innerHTML = `
                    <!-- ID / Kode -->
                    <td class="py-4 pl-6 pr-3 font-bold text-slate-900 whitespace-nowrap">
                        <span class="rounded bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-800">#${item.code}</span>
                    </td>

                    <!-- Nama & Kategori -->
                    <td class="px-3 py-4">
                        <div class="font-bold text-slate-900">${item.name}</div>
                        <div class="mt-0.5 text-[11px] font-medium text-red-600">${item.category} • <span class="text-slate-400 font-normal">${item.facilities}</span></div>
                    </td>

                    <!-- Lokasi Lantai -->
                    <td class="px-3 py-4 whitespace-nowrap text-slate-600">
                        <i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>${item.floor}
                    </td>

                    <!-- Kelola Kapasitas Cepat (- / +) -->
                    <td class="px-3 py-4 whitespace-nowrap">
                        <div class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1">
                            <button
                                type="button"
                                onclick="adjustCapacity(${index}, -1)"
                                class="flex h-5 w-5 items-center justify-center rounded bg-slate-100 font-bold text-slate-600 hover:bg-red-600 hover:text-white"
                                title="Kurangi Kapasitas"
                            >−</button>
                            <span class="min-w-[54px] text-center font-bold text-slate-800">${item.capacity} Kursi</span>
                            <button
                                type="button"
                                onclick="adjustCapacity(${index}, 1)"
                                class="flex h-5 w-5 items-center justify-center rounded bg-slate-100 font-bold text-slate-600 hover:bg-red-600 hover:text-white"
                                title="Tambah Kapasitas"
                            >+</button>
                        </div>
                    </td>

                    <!-- Kelola Status Ketersediaan Langsung -->
                    <td class="px-3 py-4 whitespace-nowrap">
                        <select
                            onchange="quickChangeStatus(${index}, this.value)"
                            class="rounded-full border px-3 py-1 text-[11px] font-bold outline-none cursor-pointer ${statusSelectClass}"
                        >
                            <option value="available" ${item.status === "available" ? "selected" : ""}>● Tersedia (Live)</option>
                            <option value="occupied" ${item.status === "occupied" ? "selected" : ""}>● Terisi (Occupied)</option>
                            <option value="maintenance" ${item.status === "maintenance" ? "selected" : ""}>● Maintenance (Disable)</option>
                        </select>
                    </td>

                    <!-- Harga / Jam -->
                    <td class="px-3 py-4 font-bold text-slate-800 whitespace-nowrap">
                        ${formatRupiah(item.price)}
                    </td>

                    <!-- Action (Edit & Delete) -->
                    <td class="py-4 pl-3 pr-6 text-right whitespace-nowrap">
                        <div class="inline-flex items-center gap-2">
                            <button
                                type="button"
                                onclick="openEditModal(${index})"
                                class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                                title="Edit Data Ruangan"
                            >
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button
                                type="button"
                                onclick="openDeleteModal(${index})"
                                class="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-600 hover:text-white"
                                title="Hapus Ruangan"
                            >
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                `;

                tbody.appendChild(tr);
            });

            if (visibleRows === 0) {
                emptyState.classList.remove("hidden");
            } else {
                emptyState.classList.add("hidden");
            }
        }

        // Fitur 1: Kelola Kapasitas Langsung dari Tabel
        window.adjustCapacity = function(index, delta) {
            const current = Number(spacesList[index].capacity);
            const updated = current + delta;
            if (updated < 1) {
                showToast("Kapasitas minimal adalah 1 kursi!");
                return;
            }
            spacesList[index].capacity = updated;
            saveSpaces();
            renderDashboard();
            showToast("Kapasitas " + spacesList[index].code + " diperbarui menjadi " + updated + " kursi.");
        };

        // Fitur 2: Ubah Status Ketersediaan Langsung dari Tabel
        window.quickChangeStatus = function(index, newStatus) {
            spacesList[index].status = newStatus;
            saveSpaces();
            renderDashboard();
            const labelMap = {
                available: "Tersedia (Live)",
                occupied: "Terisi (Occupied)",
                maintenance: "Maintenance (Disable)"
            };
            showToast("Status " + spacesList[index].code + " diubah ke " + labelMap[newStatus]);
        };

        // Fitur 3: Buka Modal Tambah (Create)
        window.openAddModal = function() {
            document.getElementById("spaceForm").reset();
            document.getElementById("editIndex").value = "";
            document.getElementById("modalSubtitle").textContent = "TAMBAH DATA BARU";
            document.getElementById("modalTitle").textContent = "Tambah Meja / Ruangan Baru";

            const modal = document.getElementById("crudModal");
            modal.classList.remove("hidden");
            modal.classList.add("flex");
        };

        // Fitur 4: Buka Modal Edit (Update)
        window.openEditModal = function(index) {
            const item = spacesList[index];
            document.getElementById("editIndex").value = index;
            document.getElementById("modalSubtitle").textContent = "EDIT INVENTARIS #" + item.code;
            document.getElementById("modalTitle").textContent = "Edit Data Meja & Ruangan";

            document.getElementById("inputCode").value = item.code;
            document.getElementById("inputCategory").value = item.category;
            document.getElementById("inputName").value = item.name;
            document.getElementById("inputFloor").value = item.floor;
            document.getElementById("inputCapacity").value = item.capacity;
            document.getElementById("inputPrice").value = item.price;
            document.getElementById("inputStatus").value = item.status;
            document.getElementById("inputFacilities").value = item.facilities;

            const modal = document.getElementById("crudModal");
            modal.classList.remove("hidden");
            modal.classList.add("flex");
        };

        function closeCrudModal() {
            const modal = document.getElementById("crudModal");
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }

        document.getElementById("closeModalBtn").addEventListener("click", closeCrudModal);
        document.getElementById("cancelModalBtn").addEventListener("click", closeCrudModal);

        // Simpan Form Tambah / Edit
        document.getElementById("spaceForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const editIdx = document.getElementById("editIndex").value;
            const newItem = {
                code: document.getElementById("inputCode").value.trim().toUpperCase(),
                category: document.getElementById("inputCategory").value,
                name: document.getElementById("inputName").value.trim(),
                floor: document.getElementById("inputFloor").value,
                capacity: parseInt(document.getElementById("inputCapacity").value, 10) || 1,
                price: parseInt(document.getElementById("inputPrice").value, 10) || 0,
                status: document.getElementById("inputStatus").value,
                facilities: document.getElementById("inputFacilities").value.trim() || "Standar Urban Space"
            };

            if (editIdx === "") {
                // Tambah Baru
                spacesList.unshift(newItem);
                showToast("Unit #" + newItem.code + " berhasil ditambahkan!");
            } else {
                // Update Data Lama
                spacesList[parseInt(editIdx, 10)] = newItem;
                showToast("Data #" + newItem.code + " berhasil diperbarui!");
            }

            saveSpaces();
            closeCrudModal();
            renderDashboard();
        });

        // Fitur 5: Hapus Data (Delete)
        window.openDeleteModal = function(index) {
            deleteIndexTarget = index;
            const item = spacesList[index];
            document.getElementById("deleteTargetName").textContent = "#" + item.code + " - " + item.name;

            const modal = document.getElementById("deleteModal");
            modal.classList.remove("hidden");
            modal.classList.add("flex");
        };

        function closeDeleteModal() {
            deleteIndexTarget = null;
            const modal = document.getElementById("deleteModal");
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }

        document.getElementById("cancelDeleteBtn").addEventListener("click", closeDeleteModal);
        document.getElementById("confirmDeleteBtn").addEventListener("click", function() {
            if (deleteIndexTarget !== null) {
                const removed = spacesList.splice(deleteIndexTarget, 1)[0];
                saveSpaces();
                renderDashboard();
                showToast("Unit #" + removed.code + " telah dihapus.");
            }
            closeDeleteModal();
        });

        // Fitur Tambahan: Set Semua Unit Tersedia & Reset Default
        window.setAllAvailable = function() {
            spacesList.forEach(function(item) {
                item.status = "available";
            });
            saveSpaces();
            renderDashboard();
            showToast("Seluruh meja & ruangan berhasil diset ke status Tersedia!");
        };

        window.resetDefaultData = function() {
            spacesList = [...defaultSpaces];
            saveSpaces();
            renderDashboard();
            showToast("Data inventaris dikembalikan ke pengaturan awal.");
        };

        window.setCategoryFilter = function(cat) {
            document.getElementById("filterCategory").value = cat;
            renderDashboard();
        };

        // Filter & Search Event Listeners
        document.getElementById("searchInput").addEventListener("input", renderDashboard);
        document.getElementById("filterCategory").addEventListener("change", renderDashboard);
        document.getElementById("filterStatus").addEventListener("change", renderDashboard);

        // Sidebar Mobile Toggle
        const sidebar = document.getElementById("sidebar");
        document.getElementById("openSidebarBtn").addEventListener("click", function() {
            sidebar.classList.remove("-translate-x-full");
        });
        document.getElementById("closeSidebarBtn").addEventListener("click", function() {
            sidebar.classList.add("-translate-x-full");
        });

        // Logout kembali ke login.html
        document.getElementById("logoutBtn").addEventListener("click", function() {
            sessionStorage.removeItem("UrbanRole");
            sessionStorage.removeItem("UrbanEmail");
            showToast("Logout berhasil! Mengalihkan ke halaman login...");
            setTimeout(function() {
                window.location.href = "login.html";
            }, 900);
        });

        // Toast Helper
        function showToast(msg) {
            clearTimeout(toastTimer);
            const toast = document.getElementById("toast");
            toast.textContent = msg;
            toast.classList.remove("hidden");
            toastTimer = setTimeout(function() {
                toast.classList.add("hidden");
            }, 2800);
        }

        // Jalankan saat halaman dimuat
        loadSpaces();
        renderDashboard();