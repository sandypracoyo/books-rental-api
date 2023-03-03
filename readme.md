# Books Rental Api
Books Rental Api adalah sebuah project backend api untuk rental buku.

## Fitur
- Autentikasi
    - Login user (Menggunakan jwt token)
    - Refresh token
    - Logout user
- Buku
    - Menambahkan buku disertai fitur untuk upload image/sampul buku
    - Melihat data buku (dengan pagination)
    - Menghapus buku
- Transaksi
    - Transaksi peminjaman buku
    - Transaksi pengembalian buku
- Reporting (Coming soon)
- User Management (Coming soon)

## Teknologi
Berikut adalah teknologi yang digunakan dalam membangun sistem ini :
- NodeJS
- Express Js
- JWT Token
- Bcrypt JS

## Instalasi
Install dependency yang dibutuhkan 
```sh 
npm i
```
Buat .env file, lalu isi file tersebut dengan konfigurasi yang dibutuhkan.
Untuk menjalankan aplikasi dengan env development
```sh
npm run dev
```
Untuk menjalankan aplikasi dengan env production
```sh
npm run start
```