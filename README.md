# Sound Nest

![logo](https://raw.githubusercontent.com/Joanna-Khek/sound-nest/refs/heads/main/frontend/public/sound_nest_logo_1.svg)

Sound Nest is an enhanced version of my earlier project, Rhythmix, featuring several key improvements:

- **Next.js** for server-side rendering, significantly improving application speed and performance.
- **Djoser** for robust and efficient user authentication.
- **Redux** for scalable and centralized state management.

The web application is built with a Django backend and a React frontend (leveraging Next.js and Redux). The LLM (Large Language Model) predictions are served through a separate FastAPI backend ([repo](https://github.com/Joanna-Khek/rhythmix-model)) and seamlessly integrated into the frontend.

Sound Nest is a natural language song recommender. Users can describe their mood or feelings in everyday language, and the LLM predicts relevant song attributes to recommend the top 5 most similar songs from a vectorized song database. Users can also manually adjust these predicted attributes to fine-tune their recommendations.

## Demo
https://github.com/user-attachments/assets/8db19ead-683e-46b6-8478-c02fc8734cd2

## Features
- **Natural Language Input:** Describe your mood or feelings (e.g., "I’m feeling upbeat and nostalgic"), and the LLM predicts song attributes like tempo, energy, and mood.
- **Song Recommendations:** Retrieves the top 5 songs from a vectorized song database based on predicted attributes.
- **Attribute Customization:** Users can tweak predicted song attributes before generating recommendations for a personalized experience.
- **Save Your Songs:** Save your favorite song recommendations and view them in a separate tab, allowing you to revisit and listen to newly discovered songs at any time.

## Technologies Used
### Backend
- Django
- LangGraph
- Qdrant
- FastAPI

### Frontend
- React
- Redux
- NextJS

## Dataset
- Song dataset sourced from [Kaggle](https://www.kaggle.com/datasets/thedevastator/spotify-tracks-genre-dataset), indexed in a Qdrant vector database.


