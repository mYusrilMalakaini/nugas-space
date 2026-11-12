const STORAGE_KEY = "UrbanSpaceTransactions";
        const tableBody = document.getElementById("transactionTable");
        const searchInput = document.getElementById("searchInput");
        const statusFilter = document.getElementById("statusFilter");
        const unitInventory = Array.from({ length: 98 }, function(_, index) {
            const deskNumber = index + 1;
            return {
                id: String(deskNumber),
                type: deskNumber <= 52 ? "Meja • Lantai 1" : "Meja • Lantai 2"
            };
        });

        function getTransactions() {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
            catch (error) { return []; }
        }
        function saveTransactions(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
        function money(value) { return "IDR " + new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(Number(value) || 0); }
        function escapeHTML(value) {
            return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
        }
        function statusClass(status) {
            if (status === "Terverifikasi") return "bg-emerald-50 text-emerald-700";
            if (status === "Menunggu verifikasi") return "bg-blue-50 text-blue-700";
            return "bg-amber-50 text-amber-700";
        }
        function minutes(value) {
            if (!value) return 0;
            const parts = value.split(":").map(Number);
            return parts[0] * 60 + parts[1];
        }
        function renderUnitMonitoring() {
            const date = document.getElementById("monitorDate").value;
            const time = document.getElementById("monitorTime").value || "09:00";
            const duration = Number(document.getElementById("monitorDuration").value || 1);
            const start = minutes(time);
            const end = start + duration * 60;
            const transactions = getTransactions();

            const rows = unitInventory.map(unit => {
                const booking = transactions.find(item => {
                    if (item.unitId !== unit.id || item.date !== date || item.status === "Dibatalkan") return false;
                    const bookingStart = minutes(item.time);
                    const bookingEnd = bookingStart + Number(item.duration || 0) * 60;
                    return start < bookingEnd && bookingStart < end;
                });

                if (!booking) {
                    return { unit, status: "Tersedia", detail: "Tidak ada booking pada rentang waktu ini" };
                }
                const pending = booking.status !== "Terverifikasi";
                return {
                    unit,
                    status: pending ? "Menunggu pembayaran/verifikasi" : "Terverifikasi / terpesan",
                    detail: booking.id + " • " + booking.name + " • " + booking.time + " (" + booking.duration + " jam)"
                };
            });

            const available = rows.filter(row => row.status === "Tersedia").length;
            const pending = rows.filter(row => row.status === "Menunggu pembayaran/verifikasi").length;
            const booked = rows.filter(row => row.status === "Terverifikasi / terpesan").length;
            document.getElementById("availableUnits").textContent = available + " unit";
            document.getElementById("pendingUnits").textContent = pending + " unit";
            document.getElementById("bookedUnits").textContent = booked + " unit";

            const body = document.getElementById("unitMonitoringTable");
            body.innerHTML = rows.map(row => {
                let badge = "bg-emerald-50 text-emerald-700";
                if (row.status.startsWith("Menunggu")) badge = "bg-amber-50 text-amber-700";
                if (row.status.startsWith("Terverifikasi")) badge = "bg-red-50 text-red-700";
                return '<tr class="hover:bg-slate-50/70">' +
                    '<td class="px-4 py-3 font-bold text-slate-800">' + row.unit.id + '</td>' +
                    '<td class="px-4 py-3 text-slate-600">' + row.unit.type + '</td>' +
                    '<td class="px-4 py-3"><span class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ' + badge + '">' + row.status + '</span></td>' +
                    '<td class="px-4 py-3 text-[11px] text-slate-500">' + escapeHTML(row.detail) + '</td></tr>';
            }).join("");
        }

        function render() {
            const transactions = getTransactions();
            const verified = transactions.filter(item => item.status === "Terverifikasi");
            const pending = transactions.filter(item => item.status !== "Terverifikasi");
            const verifiedRevenue = verified.reduce((sum, item) => sum + Number(item.total || 0), 0);
            const cash = transactions.filter(item => item.paymentMethod === "cash");
            const noncash = transactions.filter(item => item.paymentMethod === "noncash");
            const cashRevenue = cash.filter(item => item.status === "Terverifikasi").reduce((sum, item) => sum + Number(item.total || 0), 0);
            const noncashRevenue = noncash.filter(item => item.status === "Terverifikasi").reduce((sum, item) => sum + Number(item.total || 0), 0);

            document.getElementById("totalTransactions").textContent = transactions.length;
            document.getElementById("pendingTransactions").textContent = pending.length;
            document.getElementById("verifiedTransactions").textContent = verified.length;
            document.getElementById("verifiedRevenue").textContent = money(verifiedRevenue);
            document.getElementById("cashCount").textContent = cash.length;
            document.getElementById("cashRevenue").textContent = money(cashRevenue);
            document.getElementById("noncashCount").textContent = noncash.length;
            document.getElementById("noncashRevenue").textContent = money(noncashRevenue);
            document.getElementById("reportPeriod").textContent = "Diperbarui " + new Date().toLocaleString("id-ID");

            const query = searchInput.value.trim().toLowerCase();
            const filter = statusFilter.value;
            const filtered = transactions.filter(item => {
                const matchQuery = [item.id, item.name, item.phone, item.space].some(value => String(value || "").toLowerCase().includes(query));
                const matchStatus = filter === "all" || item.status === filter;
                return matchQuery && matchStatus;
            });

            if (!filtered.length) {
                tableBody.innerHTML = '<tr><td colspan="6" class="px-5 py-12 text-center text-slate-400">Tidak ada transaksi yang cocok. Coba ubah pencarian atau buat reservasi baru.</td></tr>';
            } else {
                tableBody.innerHTML = filtered.map(item => {
                    const isVerified = item.status === "Terverifikasi";
                    const schedule = escapeHTML(item.date) + " • " + escapeHTML(item.time) + " (" + escapeHTML(item.duration) + " jam)";
                    const payment = item.paymentMethod === "cash" ? "Cash" : "Non-cash";
                    const action = isVerified
                        ? '<span class="text-[11px] font-semibold text-emerald-600"><i class="fa-solid fa-check mr-1"></i>Selesai</span>'
                        : '<button type="button" data-verify="' + escapeHTML(item.id) + '" class="rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-red-700">Verifikasi</button>';
                    return '<tr class="align-top hover:bg-slate-50/70">' +
                        '<td class="px-5 py-4"><p class="font-bold text-slate-800">' + escapeHTML(item.id) + '</p><p class="mt-1 font-semibold">' + escapeHTML(item.name) + '</p><p class="mt-1 text-[10px] text-slate-400">' + escapeHTML(item.phone) + '</p></td>' +
                        '<td class="px-5 py-4"><p class="font-semibold text-slate-700">' + escapeHTML(item.space) + (item.unitId ? " • Meja #" + escapeHTML(item.unitId) : "") + '</p><p class="mt-1 text-[10px] text-slate-400">' + schedule + '</p></td>' +
                        '<td class="px-5 py-4"><p class="font-semibold">' + payment + '</p><p class="mt-1 text-[10px] text-slate-400">' + escapeHTML(item.paymentProvider) + '</p></td>' +
                        '<td class="px-5 py-4 font-bold text-slate-800">' + money(item.total) + '</td>' +
                        '<td class="px-5 py-4"><span class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ' + statusClass(item.status) + '">' + escapeHTML(item.status) + '</span></td>' +
                        '<td class="px-5 py-4 text-right">' + action + '</td></tr>';
                }).join("");
            }
            document.getElementById("tableCount").textContent = "Menampilkan " + filtered.length + " dari " + transactions.length + " transaksi";
            renderUnitMonitoring();
        }

        tableBody.addEventListener("click", function(event) {
            const button = event.target.closest("[data-verify]");
            if (!button) return;
            const transactions = getTransactions();
            const item = transactions.find(transaction => transaction.id === button.dataset.verify);
            if (!item || item.status === "Terverifikasi") return;
            const confirmed = confirm("Verifikasi pembayaran untuk transaksi " + item.id + " atas nama " + item.name + "?");
            if (!confirmed) return;
            item.status = "Terverifikasi";
            item.verifiedAt = new Date().toISOString();
            saveTransactions(transactions);
            render();
        });

        document.getElementById("refreshButton").addEventListener("click", render);
        searchInput.addEventListener("input", render);
        statusFilter.addEventListener("change", render);

        document.getElementById("exportCsv").addEventListener("click", function() {
            const transactions = getTransactions();
            if (!transactions.length) {
                alert("Belum ada transaksi untuk diekspor.");
                return;
            }
            const columns = ["id", "name", "phone", "space", "unitId", "date", "time", "duration", "paymentMethod", "paymentProvider", "total", "status", "createdAt", "verifiedAt"];
            const csvCell = value => '"' + String(value ?? "").replace(/"/g, '""') + '"';
            const csv = [columns.join(","), ...transactions.map(item => columns.map(key => csvCell(item[key])).join(","))].join("\r\n");
            const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "laporan-transaksi-Urban-space.csv";
            link.click();
            URL.revokeObjectURL(url);
        });

        const monitorDate = document.getElementById("monitorDate");
        const now = new Date();
        monitorDate.value = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
        monitorDate.addEventListener("change", renderUnitMonitoring);
        document.getElementById("monitorTime").addEventListener("change", renderUnitMonitoring);
        document.getElementById("monitorDuration").addEventListener("change", renderUnitMonitoring);
        window.addEventListener("storage", render);
        render();