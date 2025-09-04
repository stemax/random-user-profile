# Random User Profile Generator

[Demo here](https://random-user-profile-generator.vercel.app/)

Generate realistic **random user profiles** instantly with this web application.  
Perfect for testing, prototyping, or exploring fake user data with avatars, names, emails, addresses, and more.

---

## 🚀 Demo

Try the live demo here: [https://random-user-profile-generator.vercel.app/](https://random-user-profile-generator.vercel.app/)

---

## 📌 Features

- Generate **24 random user profiles** at a time.
- Filter profiles by:
    - **Gender** (`Male`, `Female`, or `Any`)
    - **Age range**
    - **Country**
- View detailed information for each user in a **modal**:
    - Personal info (name, email, phone, address)
    - Physical info (height, weight)
    - Sensitive info (password, credit card)
    - About Me / Bio
- Copy individual fields to clipboard with **one click**.
- Download entire user profile as **JSON**.
- Interactive **animated background** with floating profile fields for a visually engaging experience.
- Fully responsive UI, optimized for desktop and mobile.

---

## 🛠 Technologies Used

This project is built with:

- **React** – for building the user interface
- **TypeScript** – for type safety
- **Vite** – fast build tool for development and production
- **Tailwind CSS** – utility-first CSS framework
- **shadcn-ui** – prebuilt UI components
- **Faker.js** – random user data generation
- **Framer Motion** – animations (optional for interactive background)

---

## 📁 Project Structure

src/
├─ components/ # Reusable UI components (ProfileCard, ProfileModal, Filters)
├─ hooks/ # Custom React hooks (useFakeUsers)
├─ assets/ # Images and static assets
├─ App.tsx # Main application entry
└─ main.tsx # React DOM rendering


---

## ⚡ Getting Started

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd random-user-profile-generator

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev

# Step 5: Open the application in your browser
http://localhost:5173
```

## Deployment

This project is hosted on Vercel for instant deployment:
https://random-user-profile-generator.vercel.app/

## 📈 SEO & Accessibility

Proper semantic HTML with H1/H2 headings.

Meta tags for title, description, Open Graph, and Twitter cards.

Structured data with JSON-LD for web application recognition.

Alt attributes on all images (avatars).

Fully responsive and accessible design.

## 🔧 Customization

Change the number of generated profiles by editing countOfFakeUsers in useFakeUsers.ts.

Adjust avatar size or gender distribution in the same hook.

Modify interactive background colors, speed, or words in BackgroundWords.tsx.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

## 📜 License

This project is licensed under the MIT License. See the LICENSE
file for details.

## 💡 Why Use This Tool?

Quickly generate fake user data for testing, prototyping, or demos.

Interactive UI and smooth animations make exploring data fun.

Easy to copy fields or export as JSON for integration with other projects.

No backend required; fully client-side and instant results.