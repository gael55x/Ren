# Ren - Your Daily Inspirational Bot

### Project by: Gaille Amolong  
Ren is a mobile application designed to deliver personalized motivational quotes, affirmations, and advice tailored to a user’s emotional state. By utilizing artificial intelligence, Ren generates custom motivational content that adapts to how the user feels at any given moment. Whether someone is feeling burdened, excited, or unsure, Ren provides encouragement suited to their situation.

---

## Features
- **AI-Powered Inspiration**: Delivers motivational quotes based on user inputs using AI-driven natural language processing (NLP).
- **Daily Affirmations**: Offers personalized affirmations based on emotional states.
- **Mood-Adaptive Messages**: Ren adjusts its messages based on how a user feels at the time of interaction.
- **Cross-Platform**: Built using React Native and Flask, supporting both iOS and Android platforms.
- **User Interaction Tracking**: Uses SQLite to store user interactions for personalized messaging.

---

## Project Overview

### **Why Ren?**
Ren was born from the desire to make mental health support more accessible and offer a daily dose of positivity. In today’s fast-paced world, many people are overwhelmed by stress and anxiety. Ren aims to provide a small, meaningful touchpoint of encouragement each day.

---

## Tech Stack

- **Frontend**: React Native
- **Backend**: Flask (Python)
- **AI Model**: TensorFlow, NLP with NLTK and Scikit-learn (TF-IDF, Cosine Similarity)
- **Database**: SQLite (For storing user interactions)

---

## Installation and Setup

### **Frontend (React Native)**

1. Clone the repository:

   ```bash
   git clone https://github.com/gael55x/Ren
   ```

2. Navigate into the project directory:

   ```bash
   cd Ren
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the app:

   ```bash
   expo start
   ```

---

### **Backend (Flask)**

1. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Run the Flask server:

   ```bash
   python chatbot.py
   ```

---

## API Endpoints

- `POST /chatbot`: Receives user input and returns an AI-generated motivational response.
  
  **Example request**:
  ```
  {
      "message": "I'm feeling down"
  }
  ```

  **Example response**:
  ```
  {
      "response": ["Keep pushing forward! Better days are coming."]
  }
  ```

---

## How It Works

### **AI Layer**:
- The AI model utilizes natural language processing (NLP) techniques, such as tokenization and TF-IDF (Term Frequency-Inverse Document Frequency), to interpret user input.
- **Cosine similarity** is used to compare the user's input against pre-existing motivational phrases.
- The backend, powered by **Flask**, manages communication between the frontend and the AI model.
- The AI model is a **four-layered neural network** that delivers personalized responses based on the processed input.

---

## Project Timeline

### **Planning Phase**
- Created basic UI sketches and wireframes on October 4, 2024.
- Selected **React Native** for the frontend and **Flask** for the backend.

### **Preparation Phase**
- October 5, 2024: Initialized React Native project, set up the development environment, and created the home screen layout.

### **Execution Phase**
- October 5: Finished three core screens (welcome, home, and input screen).
- October 10: Built the AI layer using TensorFlow, created the NLP system, and implemented motivational message generation.
- October 11: Integrated the frontend with the backend, enabling the app to send user inputs to the AI and receive responses.

---

## Screenshots

### Welcome Screen:
![Welcome Screen](link_to_image)

### Home Screen:
![Home Screen](link_to_image)

### Profile Screen (Dark Mode):
![Profile Screen Dark Mode](link_to_image)

### Profile Screen (Light Mode):
![Profile Screen Light Mode](link_to_image)

### Favorite Messages Screen:
![Favorite Messages Screen](link_to_image)

---

## Links

- **UI Design Mockup**: [View on Eraser](https://app.eraser.io/workspace/C6t2BojL9A84FaXEF6SF?origin=share)
- **Video Presentation**: [Watch on Google Drive](https://drive.google.com/drive/folders/1d5_i6QTZvdN0gzh3cAGsXPBZtADq3oT2?usp=drive_link)
- **Code Repository**: [GitHub Repository](https://github.com/gael55x/Ren)

---

## Takeaways
Developing Ren has been an enriching experience that taught me valuable technical and personal lessons. I gained experience in:
- **Perseverance**: Overcoming technical challenges during the development process.
- **User-Centered Design**: Incorporating feedback to create a more intuitive user experience.
- **Interdisciplinary Skills**: Combining frontend, backend, AI, and UI/UX knowledge to build a complete application.
- **Resilience**: Tackling dependency issues, fine-tuning the AI model, and managing full-stack development by myself.

---

## Future Enhancements
In the future, I plan to expand Ren's features to include:
- **Mood Tracking**: Allowing users to track their mood over time.
- **Journaling**: Integrating a journaling feature for personal reflection.
- **Community Support**: Adding a community-driven feature where users can share motivational stories and encouragement.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for checking out **Ren - Your Daily Inspirational Bot**. I hope Ren brings a bit of positivity and inspiration into your daily life!
