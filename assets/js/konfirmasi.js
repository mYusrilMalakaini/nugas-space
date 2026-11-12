const bookingHistoryData = [
      {
        id: 'INV/URB/20261112/0841',
        checkinCode: 'URB-841A',
        dateIssued: '12 Nov 2026, 08:05 WIB',
        custName: 'Ahmad Pratama',
        custOrg: 'Institut Teknologi Sepuluh Nopember (ITS)',
        custContact: '0812-3456-7890 \u2022 ahmad.pratama@student.its.ac.id',
        deskName: 'Meja A-03',
        deskType: 'Individual Desk',
        zone: 'Lantai 1, No-Smoking Indoor (Full AC)',
        schedule: 'Kamis, 12 Nov 2026 \u2022 14:00 - 17:00 WIB (3 Jam)',
        rate: 5000,
        duration: 3,
        discount: 0,
        pointsEarned: 1500,
        total: 15000,
        paymentMethod: 'QRIS Terverifikasi',
        status: 'active',
        statusLabel: 'AKTIF / LUNAS'
      },
      {
        id: 'INV/URB/20261113/0912',
        checkinCode: 'URB-912B',
        dateIssued: '12 Nov 2026, 07:50 WIB',
        custName: 'Ahmad Pratama',
        custOrg: 'Institut Teknologi Sepuluh Nopember (ITS)',
        custContact: '0812-3456-7890 \u2022 ahmad.pratama@student.its.ac.id',
        deskName: 'Study Room A',
        deskType: 'Study Room (Privat 1-11 Org)',
        zone: 'Lantai 1, Ruang Rapat Kedap Suara',
        schedule: 'Jumat, 13 Nov 2026 \u2022 19:00 - 21:00 WIB (2 Jam)',
        rate: 40000,
        duration: 2,
        discount: 0,
        pointsEarned: 8000,
        total: 80000,
        paymentMethod: 'Menunggu QRIS / Tunai',
        status: 'pending',
        statusLabel: 'MENUNGGU BAYAR'
      },
      {
        id: 'INV/URB/20261109/0520',
        checkinCode: 'URB-520C',
        dateIssued: '09 Nov 2026, 13:45 WIB',
        custName: 'Ahmad Pratama',
        custOrg: 'Institut Teknologi Sepuluh Nopember (ITS)',
        custContact: '0812-3456-7890 \u2022 ahmad.pratama@student.its.ac.id',
        deskName: 'Meja G-01',
        deskType: 'Group Desk (4 Pax)',
        zone: 'Lantai 1, Area Kolaborasi Kelompok',
        schedule: 'Senin, 09 Nov 2026 \u2022 15:00 - 19:00 WIB (4 Jam)',
        rate: 20000,
        duration: 4,
        discount: 0,
        pointsEarned: 8000,
        total: 80000,
        paymentMethod: 'QRIS Terverifikasi',
        status: 'completed',
        statusLabel: 'SELESAI'
      },
      {
        id: 'INV/URB/20261106/0311',
        checkinCode: 'URB-311D',
        dateIssued: '06 Nov 2026, 09:50 WIB',
        custName: 'Ahmad Pratama',
        custOrg: 'Institut Teknologi Sepuluh Nopember (ITS)',
        custContact: '0812-3456-7890 \u2022 ahmad.pratama@student.its.ac.id',
        deskName: 'Meja B-04',
        deskType: 'Individual Desk (Happy Hour)',
        zone: 'Lantai 1, No-Smoking Indoor (Full AC)',
        schedule: 'Jumat, 06 Nov 2026 \u2022 10:00 - 13:00 WIB (3 Jam)',
        rate: 3000,
        duration: 3,
        discount: 0,
        pointsEarned: 0,
        total: 9000,
        paymentMethod: 'Tunai Kasir',
        status: 'completed',
        statusLabel: 'SELESAI'
      },
      {
        id: 'INV/URB/20261103/0198',
        checkinCode: 'URB-198E',
        dateIssued: '03 Nov 2026, 20:10 WIB',
        custName: 'Ahmad Pratama',
        custOrg: 'Institut Teknologi Sepuluh Nopember (ITS)',
        custContact: '0812-3456-7890 \u2022 ahmad.pratama@student.its.ac.id',
        deskName: 'Meja A-01',
        deskType: 'Individual Desk',
        zone: 'Lantai 2, Smoking Indoor (Full AC)',
        schedule: 'Selasa, 03 Nov 2026 \u2022 21:00 - 01:00 WIB (4 Jam)',
        rate: 3000,
        duration: 4,
        discount: 0,
        pointsEarned: 0,
        total: 12000,
        paymentMethod: 'Dibatalkan Pengguna',
        status: 'cancelled',
        statusLabel: 'DIBATALKAN'
      }
    ];

    let notificationsData = [
      {
        id: 1,
        title: 'Pembayaran QRIS Terkonfirmasi (LUNAS)',
        desc: 'Invoice INV/URB/20261112/0841 untuk Meja A-03 (14:00 - 17:00 WIB) telah berhasil dibayar sebesar IDR 15.000.',
        time: '5 menit yang lalu',
        type: 'success',
        unread: true,
        invoiceId: 'INV/URB/20261112/0841'
      },
      {
        id: 2,
        title: 'Menunggu Pembayaran Reservasi Study Room A',
        desc: 'Segera selesaikan pembayaran IDR 80.000 untuk jadwal Jumat, 13 Nov 2026 (19:00 - 21:00 WIB) sebelum batas waktu habis.',
        time: '20 menit yang lalu',
        type: 'warning',
        unread: true,
        invoiceId: 'INV/URB/20261113/0912'
      },
      {
        id: 3,
        title: 'Cashback +1.500 Poin Ditambahkan',
        desc: 'Selamat! Kamu mendapat poin loyalitas 10% dari sesi sore. Tukarkan poinmu pada sesi pagi (10.00 - 14.00 WIB).',
        time: 'Kemarin, 19:05 WIB',
        type: 'info',
        unread: false,
        invoiceId: 'INV/URB/20261109/0520'
      },
      {
        id: 4,
        title: 'Pengingat Check-Out Close Bill',
        desc: 'Sesi nugas di Meja G-01 telah selesai. Terima kasih telah melakukan check-out tepat waktu.',
        time: '09 Nov 2026, 18:55 WIB',
        type: 'info',
        unread: false,
        invoiceId: 'INV/URB/20261109/0520'
      }
    ];

    let activeInvoice = bookingHistoryData[0];
    let currentFilter = 'all';

    // DOM References
    const navTabInvoice = document.getElementById('nav-tab-invoice');
    const navTabHistory = document.getElementById('nav-tab-history');
    const navTabNotif = document.getElementById('nav-tab-notif');

    const sectionInvoice = document.getElementById('section-invoice');
    const sectionHistory = document.getElementById('section-history');
    const sectionNotif = document.getElementById('section-notif');

    const toastPopup = document.getElementById('toast-popup');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    // =========================================
    // NAVIGATION & TOAST
    // =========================================
    function switchTab(tabName) {
      const activeCls = 'px-3.5 py-2 rounded-lg bg-nugas-red text-white shadow-sm transition-all flex items-center gap-1.5';
      const inactiveCls = 'px-3.5 py-2 rounded-lg text-slate-600 hover:text-nugas-navy transition-all flex items-center gap-1.5';

      navTabInvoice.className = tabName === 'invoice' ? activeCls : inactiveCls;
      navTabHistory.className = tabName === 'history' ? activeCls : inactiveCls;
      navTabNotif.className = tabName === 'notif' ? activeCls + ' relative' : inactiveCls + ' relative';

      sectionInvoice.classList.toggle('hidden', tabName !== 'invoice');
      sectionHistory.classList.toggle('hidden', tabName !== 'history');
      sectionNotif.classList.toggle('hidden', tabName !== 'notif');
    }

    navTabInvoice.addEventListener('click', () => switchTab('invoice'));
    navTabHistory.addEventListener('click', () => switchTab('history'));
    navTabNotif.addEventListener('click', () => switchTab('notif'));

    let toastTimer = null;
    function showToast(title, msg, isSuccess = true) {
      toastTitle.textContent = title;
      toastMessage.textContent = msg;
      toastIcon.textContent = isSuccess ? '\u2713' : '!';
      toastIcon.className = isSuccess
        ? 'w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0'
        : 'w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black shrink-0';

      toastPopup.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
      toastPopup.classList.add('translate-y-0', 'opacity-100');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastPopup.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
        toastPopup.classList.remove('translate-y-0', 'opacity-100');
      }, 4000);
    }

    document.getElementById('btn-close-toast').addEventListener('click', () => {
      toastPopup.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    });

    // =========================================
    // RENDER INVOICE DETAIL
    // =========================================
    function renderInvoice(item) {
      activeInvoice = item;
      document.getElementById('inv-code').textContent = item.id;
      document.getElementById('inv-date-issued').textContent = 'Diterbitkan: ' + item.dateIssued;
      document.getElementById('inv-cust-name').textContent = item.custName;
      document.getElementById('inv-cust-org').textContent = item.custOrg;
      document.getElementById('inv-cust-contact').textContent = item.custContact;
      document.getElementById('inv-space-name').textContent = item.deskName + ' \u2014 ' + item.deskType;
      document.getElementById('inv-zone').textContent = item.zone;
      document.getElementById('inv-schedule').textContent = item.schedule;
      document.getElementById('inv-checkin-code').textContent = item.checkinCode;
      document.getElementById('inv-payment-method').textContent = item.paymentMethod;

      document.getElementById('inv-item-title').textContent = 'Sewa ' + item.deskName + ' - ' + item.deskType + ' (Close Bill)';
      document.getElementById('inv-item-rate').textContent = 'IDR ' + item.rate.toLocaleString('id-ID');
      document.getElementById('inv-item-duration').textContent = item.duration + ' Jam';
      document.getElementById('inv-item-subtotal').textContent = 'IDR ' + item.total.toLocaleString('id-ID');
      document.getElementById('inv-sum-sub').textContent = 'IDR ' + item.total.toLocaleString('id-ID');
      document.getElementById('inv-sum-disc').textContent = 'IDR ' + item.discount.toLocaleString('id-ID');
      document.getElementById('inv-sum-points').textContent = '+' + item.pointsEarned.toLocaleString('id-ID') + ' Poin';
      document.getElementById('inv-sum-total').textContent = 'IDR ' + item.total.toLocaleString('id-ID');

      // Banner styling based on status
      const banner = document.getElementById('confirmation-banner');
      const iconBox = document.getElementById('banner-icon-box');
      const heading = document.getElementById('banner-heading');
      const pill = document.getElementById('banner-pill');
      const subtext = document.getElementById('banner-subtext');

      if (item.status === 'active' || item.status === 'completed') {
        banner.className = 'no-print bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm';
        iconBox.className = 'w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-sm';
        iconBox.textContent = '\u2713';
        heading.textContent = item.status === 'completed' ? 'Sesi Booking Selesai' : 'Reservasi Terkonfirmasi!';
        pill.className = 'px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider';
        pill.textContent = item.statusLabel;
        subtext.textContent = 'Bukti pemesanan dan kode QR Check-In siap digunakan. Harap check-out 5 menit sebelum sesi berakhir.';
      } else if (item.status === 'pending') {
        banner.className = 'no-print bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm';
        iconBox.className = 'w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-sm';
        iconBox.textContent = '!';
        heading.textContent = 'Menunggu Pembayaran';
        pill.className = 'px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider';
        pill.textContent = item.statusLabel;
        subtext.textContent = 'Selesaikan pembayaran via QRIS atau Tunai di kasir onsite sebelum jadwal dimulai.';
      } else {
        banner.className = 'no-print bg-slate-100 border border-slate-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm';
        iconBox.className = 'w-10 h-10 rounded-xl bg-slate-500 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-sm';
        iconBox.textContent = '\u2715';
        heading.textContent = 'Reservasi Dibatalkan';
        pill.className = 'px-2.5 py-0.5 rounded-full bg-slate-600 text-white text-[10px] font-black uppercase tracking-wider';
        pill.textContent = item.statusLabel;
        subtext.textContent = 'Pemesanan ini telah dibatalkan oleh pengguna.';
      }
    }

    // Invoice Buttons
    document.getElementById('btn-copy-inv').addEventListener('click', () => {
      const code = activeInvoice.id;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          showToast('Nomor Invoice Disalin', 'Kode ' + code + ' berhasil disalin ke clipboard.');
        }).catch(() => {});
      } else {
        showToast('Nomor Invoice', 'Kode: ' + code);
      }
    });

    document.getElementById('btn-print-page').addEventListener('click', () => {
      window.print();
    });

    document.getElementById('btn-toggle-status').addEventListener('click', () => {
      if (activeInvoice.status === 'pending') {
        activeInvoice.status = 'active';
        activeInvoice.statusLabel = 'AKTIF / LUNAS';
        activeInvoice.paymentMethod = 'QRIS Terverifikasi';
        showToast('Pembayaran Lunas!', 'Invoice ' + activeInvoice.id + ' kini berstatus AKTIF / LUNAS.');
      } else if (activeInvoice.status === 'active') {
        activeInvoice.status = 'pending';
        activeInvoice.statusLabel = 'MENUNGGU BAYAR';
        activeInvoice.paymentMethod = 'Menunggu QRIS / Tunai';
        showToast('Status Diubah', 'Invoice ' + activeInvoice.id + ' diubah ke Menunggu Pembayaran.', false);
      } else {
        showToast('Info Status', 'Hanya invoice aktif atau menunggu bayar yang dapat diubah statusnya.', false);
        return;
      }
      renderInvoice(activeInvoice);
      renderHistory();
    });

    document.getElementById('btn-wa-share').addEventListener('click', () => {
      const msg = encodeURIComponent(
        'Halo Urban Space, berikut bukti reservasi saya:\n' +
        'Invoice: ' + activeInvoice.id + '\n' +
        'Meja: ' + activeInvoice.deskName + ' (' + activeInvoice.deskType + ')\n' +
        'Jadwal: ' + activeInvoice.schedule + '\n' +
        'Total: IDR ' + activeInvoice.total.toLocaleString('id-ID')
      );
      window.open('https://wa.me/6282139662022?text=' + msg, '_blank');
    });

    document.getElementById('btn-trigger-notif-demo').addEventListener('click', () => {
      showToast('Notifikasi Konfirmasi Terkirim', 'WhatsApp & Email bukti booking ' + activeInvoice.id + ' telah dikirim.');
    });

    // =========================================
    // RENDER RIWAYAT PEMESANAN
    // =========================================
    function getStatusBadgeClass(status) {
      if (status === 'active') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      if (status === 'pending') return 'bg-amber-100 text-amber-800 border-amber-200';
      if (status === 'completed') return 'bg-slate-100 text-slate-700 border-slate-200';
      return 'bg-red-50 text-red-700 border-red-200';
    }

    function renderHistory() {
      const container = document.getElementById('history-list-container');
      const query = document.getElementById('history-search').value.trim().toLowerCase();

      const filtered = bookingHistoryData.filter(item => {
        const matchFilter = currentFilter === 'all' || item.status === currentFilter;
        const matchQuery = !query ||
          item.id.toLowerCase().includes(query) ||
          item.deskName.toLowerCase().includes(query) ||
          item.deskType.toLowerCase().includes(query);
        return matchFilter && matchQuery;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            Tidak ada riwayat pemesanan yang sesuai dengan filter atau pencarian Anda.
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(item => `
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-nugas-red/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-bold text-slate-500">${item.id}</span>
              <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStatusBadgeClass(item.status)}">
                ${item.statusLabel}
              </span>
            </div>
            <div class="font-black text-base text-nugas-navy">
              ${item.deskName} <span class="text-slate-400 font-semibold text-xs">&bull; ${item.deskType}</span>
            </div>
            <div class="text-xs text-slate-600">${item.schedule}</div>
            <div class="text-[11px] text-slate-400">${item.zone}</div>
          </div>

          <div class="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div class="text-left md:text-right">
              <div class="text-[11px] text-slate-400 font-semibold">Total Biaya</div>
              <div class="text-lg font-black text-nugas-red">IDR ${item.total.toLocaleString('id-ID')}</div>
              ${item.pointsEarned > 0 ? `<div class="text-[10px] font-bold text-emerald-600">+${item.pointsEarned.toLocaleString('id-ID')} Poin</div>` : ''}
            </div>
            <div class="flex items-center gap-2">
              <button class="btn-view-invoice px-3.5 py-2 rounded-xl bg-nugas-navy hover:bg-slate-800 text-white text-xs font-bold transition-all" data-id="${item.id}">
                Lihat Invoice
              </button>
              <button class="btn-rebook px-3 py-2 rounded-xl bg-nugas-redLight hover:bg-red-100 text-nugas-red text-xs font-bold transition-all" data-desk="${item.deskName}">
                Pesan Lagi
              </button>
            </div>
          </div>
        </div>
      `).join('');

      // Attach listeners
      container.querySelectorAll('.btn-view-invoice').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const found = bookingHistoryData.find(x => x.id === id);
          if (found) {
            renderInvoice(found);
            switchTab('invoice');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });

      container.querySelectorAll('.btn-rebook').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const desk = e.currentTarget.getAttribute('data-desk');
          showToast('Siap Pesan Ulang', 'Membuka template reservasi baru untuk ' + desk + '.');
        });
      });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.className = 'filter-btn px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all';
        });
        e.currentTarget.className = 'filter-btn px-3.5 py-2 rounded-xl bg-nugas-navy text-white transition-all';
        currentFilter = e.currentTarget.getAttribute('data-filter');
        renderHistory();
      });
    });

    document.getElementById('history-search').addEventListener('input', renderHistory);

    // =========================================
    // RENDER NOTIFIKASI KONFIRMASI
    // =========================================
    function renderNotifications() {
      const listEl = document.getElementById('notif-feed-list');
      const unreadCount = notificationsData.filter(n => n.unread).length;
      const badge = document.getElementById('notif-badge-count');
      badge.textContent = unreadCount;
      badge.classList.toggle('hidden', unreadCount === 0);

      listEl.innerHTML = notificationsData.map(n => {
        let dotColor = 'bg-slate-400';
        if (n.type === 'success') dotColor = 'bg-emerald-500';
        if (n.type === 'warning') dotColor = 'bg-amber-500';
        if (n.type === 'info') dotColor = 'bg-nugas-red';

        return `
          <div class="p-5 transition-all ${n.unread ? 'bg-nugas-redLight/40' : 'bg-white'} hover:bg-slate-50 flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <span class="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${dotColor}"></span>
              <div class="space-y-1 text-xs">
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-sm text-nugas-navy">${n.title}</span>
                  ${n.unread ? '<span class="px-1.5 py-0.5 rounded bg-nugas-red text-white text-[9px] font-black uppercase">BARU</span>' : ''}
                </div>
                <p class="text-slate-600 leading-relaxed">${n.desc}</p>
                <div class="text-[11px] text-slate-400 pt-0.5">${n.time}</div>
              </div>
            </div>
            <button class="btn-notif-open shrink-0 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-nugas-red text-xs font-bold text-nugas-navy transition-all" data-id="${n.id}" data-inv="${n.invoiceId}">
              Buka Invoice
            </button>
          </div>
        `;
      }).join('');

      listEl.querySelectorAll('.btn-notif-open').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const nid = parseInt(e.currentTarget.getAttribute('data-id'), 10);
          const invId = e.currentTarget.getAttribute('data-inv');
          const notifObj = notificationsData.find(x => x.id === nid);
          if (notifObj) notifObj.unread = false;
          const foundInv = bookingHistoryData.find(x => x.id === invId);
          if (foundInv) {
            renderInvoice(foundInv);
            switchTab('invoice');
          }
          renderNotifications();
        });
      });
    }

    document.getElementById('btn-mark-all-read').addEventListener('click', () => {
      notificationsData.forEach(n => { n.unread = false; });
      renderNotifications();
      showToast('Semua Dibaca', 'Seluruh notifikasi konfirmasi telah ditandai sudah dibaca.');
    });

    document.getElementById('btn-add-sample-notif').addEventListener('click', () => {
      const newId = Date.now();
      notificationsData.unshift({
        id: newId,
        title: 'Pengingat Sesi Nugas Dimulai 15 Menit Lagi',
        desc: 'Meja A-03 di Lantai 1 No-Smoking Indoor siap ditempati. Jangan lupa tunjukkan QR Check-In URB-841A ke staf.',
        time: 'Baru saja',
        type: 'success',
        unread: true,
        invoiceId: 'INV/URB/20261112/0841'
      });
      renderNotifications();
      showToast('Notifikasi Baru Masuk', 'Pengingat sesi nugas di Meja A-03 baru saja diterima.');
    });

    

    // Initial Render
    renderInvoice(activeInvoice);
    renderHistory();
renderNotifications();