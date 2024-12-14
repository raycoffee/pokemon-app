# 🌟 Pokemon Explorer

A modern, interactive Pokemon web application built with React, Next.js, and TypeScript. Browse, search, and filter through Pokemon with a clean, responsive interface.

[Live Demo](https://raypivot.site)

## ✨ Features

- **Interactive Pokemon Cards**: Beautiful, responsive cards displaying Pokemon info and stats
- **Smart Search**: Real-time search functionality across Pokemon names and types
- **Advanced Filtering**: Filter Pokemon by multiple types simultaneously
- **Flexible Views**: Toggle between grid and list views
- **Smooth Navigation**: Pagination for browsing large datasets
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**:
  - React & Next.js
  - TypeScript
  - Tailwind CSS
  - React Query (for data management)

- **Backend**:
  - Node.js & Express
  - MongoDB (for caching Pokemon data)
  - PokeAPI integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (if running locally)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/raycoffee/pokemon-app.git
cd pokemon-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your app running!

## 🏗️ Project Structure

```
pokemon-app/
├── src/
│   ├── components/
│   │   ├── PokemonCard/
│   │   ├── PokedexGrid/
│   │   └── PokemonTypeFilter/
│   ├── services/
│   │   └── pokemonService.ts
│   ├── types/
│   │   └── pokemon.ts
│   └── app.ts
├── public/
└── package.json
```

## 🌈 Core Components

### PokemonCard
Displays individual Pokemon information in a sleek, responsive card format.

### PokedexGrid
Manages the Pokemon list display with advanced features like search, sort, and view toggles.

### PokemonTypeFilter
Handles type-based filtering with an intuitive, colorful interface.

## 🎨 Design Choices

- Used Tailwind CSS for consistent, responsive styling
- Implemented loading skeletons for better UX
- Added error boundaries for graceful error handling
- Cached Pokemon data in MongoDB to reduce API calls

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Data provided by [PokeAPI](https://pokeapi.co/)
- Icons from [Heroicons](https://heroicons.com/)
- Inspired by the Pokemon community

---

Built with ❤️ by Ray