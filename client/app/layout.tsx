import './globals.css';
import { PokemonProvider } from '../src/context/PokemonContext';

export const metadata = {
  title: 'Pokémon Explorer',
  description: 'Explore the world of Pokémon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}