// menampilkan/menyembunyikan password
function hideseek() {
    const passwordField = document.getElementById('password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

function kirimData() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Data pengguna yang benar
    const validUsers = [
        { username: 'admin', password: 'admin123', level: 'admin' },
        { username: 'user', password: 'user123', level: 'user' }
    ];

    if (username.length < 3) {
        validasiError.push('Username minimal 3 karakter');
    }

    let loginBerhasil = false;
    let userLevel = '';
    for (let user of validUsers) {
        if (user.username === username && user.password === password) {
            loginBerhasil = true;
            userLevel = user.level;
            break;
        }
    }

    // Proses login
    if (loginBerhasil) {
        // Simpan data ke localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('userLevel', userLevel);
        
        // Simpan riwayat login
        simpanRiwayatLogin(username, userLevel);

        // Redirect berdasarkan level
        redirectBerdasarkanLevel(userLevel);
        return true;
    } else {
        alert('Username atau password salah!');
        return false;
    }
}

// Fungsi redirect berdasarkan level
function redirectBerdasarkanLevel(level) {
    const redirectMap = {
        'admin': 'admin-dashboard.html',
        'user': 'index.html'
    };

    // Looping untuk mencari halaman redirect
    for (let [userLevel, halaman] of Object.entries(redirectMap)) {
        if (level === userLevel) {
            window.location.href = halaman;
            return;
        }
    }

    // Jika level tidak ditemukan
    window.location.href = 'index1.html';
}

// Fungsi untuk menyimpan riwayat login dengan informasi tambahan
function simpanRiwayatLogin(username, level) {
    // Ambil riwayat login yang sudah ada
    let riwayatLogin = JSON.parse(localStorage.getItem('riwayatLogin') || '[]');

    // Tambahkan entri login baru
    const loginBaru = {
        username: username,
        level: level,
        waktu: new Date().toLocaleString(),
        ip: generateFakeIP(), // Simulasi alamat IP
        browser: detectBrowser() // Simulasi deteksi browser
    };

    // Batasi riwayat login maksimal 3 entri
    while (riwayatLogin.length >= 3) 

    // Simpan entri login baru
    riwayatLogin.push(loginBaru);
    localStorage.setItem('riwayatLogin', JSON.stringify(riwayatLogin));
}