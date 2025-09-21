# 🎵 Music Distribution Platform – Frontend Assessment

This project is a mock **Music Distribution Platform** built with **Next.js** and **React**.  
It demonstrates understanding of React and Next.js fundamentals including **routing**, **API integration**, **state management**, and **UI design**.

---

## 🚀 Features


### 🔐 Login Page (Mock Authentication)
- Simple form with `username` + `password`.
- Mock validation (e.g., `admin / password`).
- On successful login → redirect to **Dashboard**.
- Store login state in `localStorage`.

---

### 📊 Dashboard Page
- Fetch tracks from mock **Next.js API Route** (`/api/tracks`).
- Display tracks in a **table format**:
  - Title
  - Artist Name
  - Release Date
  - Genre
  - Status
- Each row links to **Track Details Page** (`/track/[id]`).

---

### ⬆️ Track Upload Page
- Form fields:
  - Track Title
  - Artist Name
  - Release Date
  - Genre
- On submit:
  - Add new track (mock state update).
  - Redirect back to Dashboard to show updated list.
- No real file upload required.

---

### 📄 Track Details Page
- Dynamic route: `/track/[id]`.
- Fetch track details by `id` from mock API.
- Show:
  - Title
  - Artist
  - Release Date
  - Genre
  - Status

---

### ⭐ Extra features
- filter tracks (by Genre or Status) on Dashboard.
- Persist login session with `localStorage`.

---

## ⚙️ Technical Requirements
- **Next.js (latest stable version)**
- **React Functional Components** + Hooks (`useState`, `useEffect`)
- **Next.js API Routes** for serving mock data
- **Dynamic Routing** for track details
- **Responsive Design** (desktop & mobile)
- No real backend, only mock API

---




## 📡 Sample API Route (`/pages/api/tracks.js`)

```javascript
export default function handler(req, res) {
  const tracks = [
    {
      id: 1,
      title: "Dreamscape",
      artist: "Aria Smith",
      releaseDate: "2024-05-10",
      genre: "Pop",
      status: "Published",
    },
    {
      id: 2,
      title: "Midnight Beats",
      artist: "DJ Raven",
      releaseDate: "2024-06-22",
      genre: "Electronic",
      status: "Draft",
    },
    {
      id: 3,
      title: "Echoes of Tomorrow",
      artist: "Liam Grey",
      releaseDate: "2024-07-01",
      genre: "Rock",
      status: "Submitted",
    },
  ];

  res.status(200).json(tracks);
}
```
---

## 📸 Project Screenshot

![Music Distribution Platform Screenshot](https://res.cloudinary.com/do0jgbkjz/image/upload/v1758453246/vbm-admin/file_1758453246290.png)
![Music Distribution Platform Screenshot](https://res.cloudinary.com/do0jgbkjz/image/upload/v1758453247/vbm-admin/file_1758453246950.png)
![Music Distribution Platform Screenshot](https://res.cloudinary.com/do0jgbkjz/image/upload/v1758453245/vbm-admin/file_1758453244975.png)
![Music Distribution Platform Screenshot](https://res.cloudinary.com/do0jgbkjz/image/upload/v1758453245/vbm-admin/file_1758453245664.png)
![Music Distribution Platform Screenshot](https://res.cloudinary.com/do0jgbkjz/image/upload/v1758453246/vbm-admin/file_1758453246861.png)
![Music Distribution Platform Screenshot](https://res.cloudinary.com/do0jgbkjz/image/upload/v1758453247/vbm-admin/file_1758453247035.png)

---

