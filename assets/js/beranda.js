 // Ambil semua elemen FAQ
        const faqItems = document.querySelectorAll(".faq-item");

        // Tambahkan event click pada setiap FAQ
        faqItems.forEach(function(item) {

            const tombol = item.querySelector(".faq-question");
            const jawaban = item.querySelector(".faq-answer");
            const ikon = item.querySelector(".faq-icon");

            tombol.addEventListener("click", function() {

                // Cek apakah FAQ sedang terbuka
                const sedangTerbuka = !jawaban.classList.contains("hidden");

                // Tutup semua FAQ
                faqItems.forEach(function(faq) {
                    faq.querySelector(".faq-answer").classList.add("hidden");
                    faq.querySelector(".faq-icon").textContent = "+";
                });

                // Buka FAQ yang diklik jika sebelumnya tertutup
                if (!sedangTerbuka) {
                    jawaban.classList.remove("hidden");
                    ikon.textContent = "−";
                }

            });

        });