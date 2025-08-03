# Prisma + PostgreSQL Blog Backend 📝

A fully functional **CRUD backend API** built using **PostgreSQL**, **Prisma ORM**, and **Express.js**.  
This is a personal **Blogging App** where users can create posts, comment on them, and perform operations like search and pagination.  
The backend uses proper **relational modeling** between **Users**, **Posts**, and **Comments**.

---

## 🔧 Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (Relational Database)
- **Prisma ORM** (Type-safe DB operations)
- **RESTful API structure**
- **Search & Pagination** (via PostgreSQL & query params)

---

## 🧩 Models Overview

### 👤 User
- `id`, `name`, `email`, `createdAt`
- One user can create multiple posts and comments

### 📝 Post
- `id`, `title`, `content`, `userId`, `createdAt`
- Belongs to one **User**
- Has many **Comments**

### 💬 Comment
- `id`, `comment`, `postId`, `userId`, `createdAt`
- Belongs to both **Post** and **User**

---

## ⚙️ Features

- ✅ CRUD operations for **Users**, **Posts**, and **Comments**
- ✅ **Pagination** in post listing
- ✅ **Search** posts by title/content
- ✅ **Relational Database modeling** using Prisma
- ✅ Clean API architecture


