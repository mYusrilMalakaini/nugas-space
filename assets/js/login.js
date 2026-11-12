// Mengambil elemen HTML
        const tabCustomer = document.getElementById("tabCustomer");
        const tabStaff = document.getElementById("tabStaff");

        const emailInput = document.getElementById("emailInput");
        const passwordInput = document.getElementById("passwordInput");

        const loginTitle = document.getElementById("loginTitle");
        const loginSubtitle = document.getElementById("loginSubtitle");

        const togglePasswordBtn = document.getElementById("togglePasswordBtn");
        const eyeIcon = document.getElementById("eyeIcon");

        const loginForm = document.getElementById("loginForm");
        const toast = document.getElementById("toast");

        let currentRole = "customer";
        let toastTimer;

        // Mengganti tampilan tab
        function switchTab(role) {

            currentRole = role;

            if (role === "staff") {

                tabStaff.classList.add(
                    "border-red-600",
                    "bg-white",
                    "text-slate-900"
                );

                tabStaff.classList.remove(
                    "border-transparent",
                    "text-slate-500"
                );

                tabCustomer.classList.remove(
                    "border-red-600",
                    "bg-white",
                    "text-slate-900"
                );

                tabCustomer.classList.add(
                    "border-transparent",
                    "text-slate-500"
                );

                emailInput.placeholder = "staff@Urban.space";

                loginTitle.textContent = "Staff Portal";
                loginSubtitle.textContent = "Masuk dengan kredensial staf Urban";

            } else {

                tabCustomer.classList.add(
                    "border-red-600",
                    "bg-white",
                    "text-slate-900"
                );

                tabCustomer.classList.remove(
                    "border-transparent",
                    "text-slate-500"
                );

                tabStaff.classList.remove(
                    "border-red-600",
                    "bg-white",
                    "text-slate-900"
                );

                tabStaff.classList.add(
                    "border-transparent",
                    "text-slate-500"
                );

                emailInput.placeholder = "john@doe.com";

                loginTitle.textContent = "Login to your account";
                loginSubtitle.textContent = "Enter your credentials below";

            }

        }

        // Event untuk mengganti tab
        tabCustomer.addEventListener("click", function() {
            switchTab("customer");
        });

        tabStaff.addEventListener("click", function() {
            switchTab("staff");
        });

        // Toggle password
        togglePasswordBtn.addEventListener("click", function() {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                eyeIcon.classList.remove("fa-eye");
                eyeIcon.classList.add("fa-eye-slash");

            } else {

                passwordInput.type = "password";

                eyeIcon.classList.remove("fa-eye-slash");
                eyeIcon.classList.add("fa-eye");

            }

        });

        // Menampilkan toast
        function showToast(message) {

            clearTimeout(toastTimer);

            toast.textContent = message;

            toast.classList.remove("hidden");
            toast.classList.add("block");

            toastTimer = setTimeout(function() {

                toast.classList.add("hidden");
                toast.classList.remove("block");

            }, 2500);

        }

        // Login form
        loginForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (email === "" || password === "") {
                showToast("Email dan password wajib diisi!");
                return;
            }

            const roleName = currentRole === "staff" ? "Staff / Admin" : "Customer";

            // Simpan sesi sederhana di sessionStorage untuk ditampilkan di Dashboard Admin
            sessionStorage.setItem("UrbanRole", currentRole);
            sessionStorage.setItem("UrbanEmail", email);

            showToast("Login sebagai " + roleName + " berhasil! Mengalihkan...");

            setTimeout(function() {
                if (currentRole === "staff") {
                    window.location.href = "admin-dashboard.html";
                } else {
                    window.location.href = "Beranda.html";
                }
            }, 1000);

        });

        // Forgot Password
        document.getElementById("forgotPassword").addEventListener("click", function(event) {

            event.preventDefault();

            showToast("Fitur reset kata sandi belum tersedia.");

        });

        // Sign Up
        document.getElementById("signUp").addEventListener("click", function(event) {

            event.preventDefault();

            showToast("Halaman pendaftaran belum tersedia.");

        });