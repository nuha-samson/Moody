# Moody

**Moody** is a simple, private mood tracker and journal. It's basically just a place to check in with yourself, log how you're feeling, and look back at your thoughts over time.

I built this as a hands-on project to finally move past "frontend-only" apps. I wanted to practice building a whole system from scratch—everything from the React UI and a REST API to MongoDB, user accounts, and making sure people's data stays private.

## What it does

With Moody, you can:

* Make an account and log in securely
* Pick from 10 different moods to log your day
* Write a journal entry to go with your mood
* Scroll through your past entries
* Edit or delete things you've posted
* Update your profile and change your password
* Log out safely

The important part is that your data is yours; users can only see and manage their own stuff.

## The Tech Stack

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,js,css,nodejs,express,mongodb,mongoose" />
</p>

## Security & Auth

Authentication was one of the biggest things I wanted to learn with this project. 

On the backend, I implemented:
* Password hashing (using bcrypt)
* JWTs for sessions
* Protected routes and middleware
* Input validation and CORS setup
* Secure cookies and environment variables to keep secrets safe

I also spent some time thinking about common security holes—like IDOR (where someone might try to access another user's data by changing an ID in the URL), MongoDB injection, and how to handle JWTs properly.

## How it works

The flow is pretty straightforward:

```text
Create Account
      ↓
    Login
      ↓
Authenticated Session
      ↓
   Dashboard
      ↓
Choose a Mood
      ↓
Write Journal Entry
      ↓
Save Entry
      ↓
View / Edit / Delete History
```

Basically, the React frontend talks to an Express API, which handles all the logic and saves everything to MongoDB via Mongoose.

## Why I built this

The original idea was simple: give people a quiet little corner of the internet to stop, check in with themselves, and record how they're doing.

But for me as a developer, the goal was to build something that required more than just a pretty UI. It was a great way to practice:
* Building a REST API from the ground up
* Connecting a frontend to a real backend
* Working with MongoDB/Mongoose
* Designing how users log in and stay logged in
* Deploying both the frontend and backend

## Current State & Future Plans

I kept the scope focused on the core experience (Auth → Moods → Journaling → History) instead of trying to build a massive mental health platform.

Since I'm actually planning to use Moody myself, I've got a few ideas for updates:
* Mood trends and analytics (seeing patterns over time)
* A calendar view for tracking
* Search and filters for old entries
* Daily reminders
* Better mobile responsiveness

## 💡 What I learned

Building this taught me that "full-stack" is way more than just connecting a frontend to a database. It forced me to think about the whole request lifecycle:

`React UI` $\rightarrow$ `HTTP Request` $\rightarrow$ `Express Route` $\rightarrow$ `Auth Middleware` $\rightarrow$ `Controller` $\rightarrow$ `Mongoose Model` $\rightarrow$ `MongoDB` $\rightarrow$ `Response` $\rightarrow$ `React UI`

It also made me ask questions I never had to think about in frontend projects: *Who is allowed to see this? How do I verify this user? What happens if the input is malicious?* Solving those problems was the most rewarding part of the project.

## Author

**Nuha**

Built as a personal full-stack development project.

---

> If you found the project interesting, feel free to explore the code and follow the development process.
