```PROJECT FOR MY SCHOOL TASK```

Aplikasi todo-list ini dibuat dengan menggunakan React (Typescript), Vite serta TailwindCSS untuk frontend nya,
ExpressJS untuk backend nya, serta database yang digunakan untuk pembuatan aplikasi todo-list ini adalah PostgreSQL.

cara running aplikasi =

  backend :
  1. ketik "cd server" di terminal visual studio code untuk menuju direktori atau folder server,
  2. lalu ketik "npm run dev" untuk menjalankan sisi backend dari aplikasi todo-list ini.

  frontend :
  1. buka/open terminal baru di visual studio code,
  2. ketik "cd client" untuk menuju direktori atau folder client
  3. lalu ketik "npm run dev" untuk mulai menjalankan sisi frontend dari aplikasi todo-list ini.

note :

untuk file _.env_ pada folder server, isi nya disesuaikan dengan konfigurasi akun postgresql masing-masing. contohnya :
{ 
  DATABASE_URL=postgresql://(username_postgres):(password_postgres)@localhost:5432/(nama_db)
  PORT=3001
}
