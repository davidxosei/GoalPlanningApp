# Goal Planning App

A full-stack web application that helps users break down their goals into manageable steps through customizable roadmaps. Built with Spring Boot, React.js, and PostgreSQL, the app allows users to register, log in securely, and track progress on their personalized goals.

**Live Demo:** [https://goalplanningapp.vercel.app/](https://goalplanningapp.vercel.app/)

---

## Features

- **User Authentication**  
  Secure registration and login using JWT authentication with access and refresh tokens.

- **Roadmap Creation**  
  Users can create and delete multiple roadmaps, each representing a specific goal or objective.

- **Step Management**  
  Within each roadmap, users can add, edit, and track individual steps to organize and plan progress.

- **Personalized Dashboard**  
  Users see a preview of all their roadmaps on login, and can drill down into each one for detailed step tracking.

- **Persistent Data**  
  All data is stored in a PostgreSQL database, and user sessions are secured using JWTs. Data access is scoped per user.

---

## Tech Stack

**Frontend:**  
- React.js  
- JavaScript, HTML, CSS  
- Vercel (deployment)

**Backend:**  
- Java, Spring Boot  
- Spring MVC, Spring Security  
- PostgreSQL  
- Railway (deployment)

**Authentication & Security:**  
- JWT authentication (access & refresh tokens)  
- CORS configuration  
- Secure password encryption

---

## Architecture Overview

- RESTful API architecture following MVC pattern.
- Repository layer for database interaction using Spring Data JPA.
- Auth-secured endpoints scoped to authenticated users.
- Frontend integrated with backend API using Axios and React state.

---

## Security

- Passwords are encrypted and never stored in plaintext.  
- JWT-based session management ensures that users can only access their own data.  
- Backend enforces strict CORS and authentication rules.

---

## Screenshots
![image](https://github.com/user-attachments/assets/084ea7d8-56f6-4a3a-87f0-f49171b89edc)
![image](https://github.com/user-attachments/assets/125c4b80-5007-481b-8e12-eccc5517c8c5)
![image](https://github.com/user-attachments/assets/6df17db0-9dd7-4b79-87e9-29c6366cc6c6)
![image](https://github.com/user-attachments/assets/61d9a7b5-9afe-419b-af94-f15a795a048b)
![image](https://github.com/user-attachments/assets/8389a719-c8bf-4960-b5d2-d36a22765dac)



