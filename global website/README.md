# GlobalCare International - Frontend

**GlobalCare International** is a doctor appointment website where patients can find doctors from different countries, book appointments, leave reviews and see their own bookings.

Backend repository: https://github.com/ansarifiza7778-bit/GlobalCare

## Tech Stack

- React (Vite)
- React Router
- JavaScript, CSS
- Node.js, Express.js and MongoDB (backend)

## Features

- Home page with featured doctors
- Doctors page with search (by name, country or specialty) and specialty filter
- Doctor details page with patient reviews
- Register and Login (passwords are hashed in the backend)
- Protected pages: Book Appointment, Confirmation, Review and My Bookings open only after login
- Book an appointment and see a confirmation page
- Rate a doctor with stars and a comment
- My Bookings page that shows only the bookings of the logged-in user

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Doctors | `/doctors` |
| Doctor Details | `/doctors/:id` |
| Login | `/login` |
| Register | `/register` |
| Book Appointment | `/book/:id` |
| Confirmation | `/confirmation` |
| Review | `/review/:id` |
| My Bookings | `/my-bookings` |

## How to Run Locally

1. Start the backend first (see the backend repository). It runs on `http://localhost:5000`.
2. Clone this repository and open the project folder:

```
cd "global website"
```

3. Install the packages:

```
npm install
```

4. Start the website:

```
npm run dev
```

5. Open the link shown in the terminal (usually `http://localhost:5173`).

## Author

Fiza Ansari