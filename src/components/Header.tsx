
import { MapPin, Camera, Calendar } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-rose-400 h-32 flex items-center justify-center">
        <div className="text-center text-white animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <MapPin className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Travelogue</h1>
          </div>
          <p className="text-lg opacity-90">Your journey, beautifully documented</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background to-transparent"></div>
    </header>
  );
};

export default Header;
