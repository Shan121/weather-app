import WeatherCard from "./components/WeatherCard";
import bg from "./assets/images/bg.png";

function App() {
  return (
    <div className="relative flex flex-col items-center md:justify-center pt-4 md:pt-0 h-screen gap-y-6">
      <img
        src={bg}
        alt="bg"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-35"
      />
      <p className="static z-10 text-xl md:text-3xl font-bold text-center text-gray-700">
        Weather App
      </p>
      <WeatherCard />
    </div>
  );
}

export default App;
