import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Wind, 
  Droplets, 
  Thermometer, 
  Calendar, 
  Sunrise, 
  Eye, 
  Gauge, 
  Zap,
  Info,
  Shirt,
  Plane,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, Variants } from 'framer-motion';
import { WeatherIcon } from './components/WeatherIcons';

// Indian Cities
const CITIES = [
  { name: 'New Delhi', district: 'Delhi', region: 'India' },
  { name: 'Mumbai', district: 'Maharashtra', region: 'India' },
  { name: 'Bengaluru', district: 'Karnataka', region: 'India' },
  { name: 'Chennai', district: 'Tamil Nadu', region: 'India' },
  { name: 'Kolkata', district: 'West Bengal', region: 'India' },
  { name: 'Hyderabad', district: 'Telangana', region: 'India' },
  { name: 'Pune', district: 'Maharashtra', region: 'India' },
  { name: 'Ahmedabad', district: 'Gujarat', region: 'India' },
  { name: 'Jaipur', district: 'Rajasthan', region: 'India' },
  { name: 'Lucknow', district: 'Uttar Pradesh', region: 'India' },
  { name: 'Chandigarh', district: 'Punjab/Haryana', region: 'India' },
  { name: 'Kochi', district: 'Kerala', region: 'India' },
  { name: 'Patna', district: 'Bihar', region: 'India' },
  { name: 'Bhopal', district: 'Madhya Pradesh', region: 'India' },
  { name: 'Guwahati', district: 'Assam', region: 'India' },
  { name: 'Srinagar', district: 'Jammu & Kashmir', region: 'India' },
  { name: 'Bhubaneswar', district: 'Odisha', region: 'India' },
  { name: 'Dehradun', district: 'Uttarakhand', region: 'India' },
  { name: 'Shimla', district: 'Himachal Pradesh', region: 'India' },
  { name: 'Ranchi', district: 'Jharkhand', region: 'India' },
  { name: 'Panaji', district: 'Goa', region: 'India' },
  { name: 'Raipur', district: 'Chhattisgarh', region: 'India' },
  { name: 'Agartala', district: 'Tripura', region: 'India' },
  { name: 'Imphal', district: 'Manipur', region: 'India' },
  { name: 'Kohima', district: 'Nagaland', region: 'India' },
  { name: 'Aizawl', district: 'Mizoram', region: 'India' },
  { name: 'Shillong', district: 'Meghalaya', region: 'India' },
  { name: 'Gangtok', district: 'Sikkim', region: 'India' },
  { name: 'Itanagar', district: 'Arunachal Pradesh', region: 'India' },
  { name: 'Thiruvananthapuram', district: 'Kerala', region: 'India' },
];

const WEATHER_TYPES = ['sunny', 'cloudy', 'rainy', 'snowy', 'partly-cloudy', 'stormy'];

const generateWeatherData = (cityName: string) => {
  const hash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  let baseTemp = 20 + (hash % 20);
  
  // Specific adjustments for certain Indian cities
  if (cityName === 'Srinagar' || cityName === 'Shimla' || cityName === 'Gangtok') {
    baseTemp = 5 + (hash % 10);
  } else if (cityName === 'Chennai' || cityName === 'Mumbai' || cityName === 'Kochi') {
    baseTemp = 28 + (hash % 7);
  } else if (cityName === 'New Delhi' || cityName === 'Jaipur' || cityName === 'Ahmedabad') {
    baseTemp = 32 + (hash % 10);
  }

  const weatherType = WEATHER_TYPES[hash % WEATHER_TYPES.length];

  const hourly = Array.from({ length: 24 }).map((_, i) => ({
    time: `${(new Date().getHours() + i) % 24}:00`,
    temp: baseTemp + Math.sin(i / 3) * 5,
    type: WEATHER_TYPES[(hash + i) % WEATHER_TYPES.length],
  }));

  const daily = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      maxTemp: baseTemp + 5 + (hash % 3),
      minTemp: baseTemp - 5 - (hash % 3),
      type: WEATHER_TYPES[(hash + i * 2) % WEATHER_TYPES.length],
      chance: Math.floor(Math.random() * 100),
    };
  });

  const aqi = 50 + (hash % 250);
  let aqiStatus = 'Good';
  let aqiColor = 'text-green-400';
  if (aqi > 50) { aqiStatus = 'Satisfactory'; aqiColor = 'text-emerald-400'; }
  if (aqi > 100) { aqiStatus = 'Moderate'; aqiColor = 'text-yellow-400'; }
  if (aqi > 200) { aqiStatus = 'Poor'; aqiColor = 'text-orange-400'; }
  if (aqi > 300) { aqiStatus = 'Very Poor'; aqiColor = 'text-red-400'; }

  let clothing = "Light cotton clothes";
  if (baseTemp < 15) clothing = "Warm woolens & jacket";
  else if (baseTemp < 22) clothing = "Light sweater or hoodie";
  if (weatherType === 'rainy' || weatherType === 'stormy') clothing += " + Umbrella/Raincoat";

  let travelTips = "Great time to visit local parks.";
  if (weatherType === 'rainy') travelTips = "Expect traffic delays due to waterlogging.";
  if (weatherType === 'sunny' && baseTemp > 35) travelTips = "Avoid travel during peak afternoon hours.";
  if (aqi > 200) travelTips = "Wear an N95 mask if heading outdoors.";

  const alerts = [];
  if (baseTemp > 38) alerts.push({ type: 'Heat Wave', desc: 'Severe heat expected. Stay hydrated.' });
  if (weatherType === 'stormy') alerts.push({ type: 'Thunderstorm', desc: 'Heavy rains and wind likely.' });
  if (aqi > 250) alerts.push({ type: 'Air Quality', desc: 'High pollution levels today.' });

  return {
    city: cityName,
    temp: Math.round(baseTemp),
    condition: weatherType.charAt(0).toUpperCase() + weatherType.slice(1).replace('-', ' '),
    type: weatherType,
    high: Math.round(baseTemp + 5),
    low: Math.round(baseTemp - 5),
    humidity: 40 + (hash % 50),
    wind: 5 + (hash % 25),
    uv: hash % 11,
    visibility: 10 + (hash % 10),
    pressure: 1010 + (hash % 20),
    feelsLike: Math.round(baseTemp + 2),
    sunrise: '06:12 AM',
    sunset: '06:45 PM',
    hourly,
    daily,
    aqi,
    aqiStatus,
    aqiColor,
    clothing,
    travelTips,
    alerts
  };
};

const LOADING_MESSAGES = [
  "Fetching satellite data...",
  "Analyzing atmospheric pressure...",
  "Checking wind patterns over India...",
  "Calculating humidity levels...",
  "Syncing with local weather stations...",
  "Predicting the outlook for you...",
  "Measuring the monsoon intensity...",
  "Decoding the clouds...",
  "Almost there, finalizing forecast..."
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState(CITIES[1]); // Mumbai
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);

  const { scrollYProgress } = useScroll();

  const handleCitySelect = (city: typeof CITIES[0]) => {
    setIsLoading(true);
    setSearch('');
    setShowSearch(false);
    
    const messages = [
      `Fetching satellite data for ${city.name}...`,
      `Analyzing atmospheric pressure in ${city.district}...`,
      `Checking wind patterns over ${city.name}...`,
      "Calculating humidity levels...",
      "Syncing with local weather stations...",
      `Predicting the outlook for ${city.name}...`,
      "Measuring the monsoon intensity...",
      "Decoding the clouds...",
      "Almost there, finalizing forecast..."
    ];

    setLoadingMsg(messages[0]);
    
    // Update message mid-way
    setTimeout(() => {
      setLoadingMsg(messages[Math.floor(Math.random() * (messages.length - 1)) + 1]);
    }, 1250);

    // Finalize after 2.8 seconds
    setTimeout(() => {
      setSelectedCity(city);
      setIsLoading(false);
    }, 2800);
  };
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const weather = useMemo(() => generateWeatherData(selectedCity.name), [selectedCity]);

  // Click outside listener for search results
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.group')) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const convert = (temp: number) => {
    if (unit === 'F') return Math.round((temp * 9) / 5 + 32);
    return Math.round(temp);
  };

  const filteredCities = CITIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.district.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-3xl"
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-4 border-blue-500/20 border-t-blue-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-4 bg-blue-500/10 rounded-full flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
              </motion.div>
            </div>
            <motion.p
              key={loadingMsg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl font-medium text-slate-300 italic px-6 text-center"
            >
              {loadingMsg}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-4xl mx-auto px-4 py-8 md:py-12">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent uppercase tracking-tighter">Bharat Forecast</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time India Weather</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-800 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Server Active</span>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for a city in India..."
                className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSearch(true);
                }}
                onFocus={() => setShowSearch(true)}
              />
              
              <AnimatePresence>
                {showSearch && search && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-2xl overflow-hidden z-50 shadow-2xl"
                  >
                    {filteredCities.map((city, i) => (
                      <button
                        key={i}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors text-left"
                        onClick={() => handleCitySelect(city)}
                      >
                        <div>
                          <p className="font-semibold text-white">{city.name}</p>
                          <p className="text-sm text-slate-400">{city.district}, {city.region}</p>
                        </div>
                        <MapPin className="w-4 h-4 text-slate-500" />
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <div className="px-6 py-4 text-slate-500 italic">No cities found...</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl px-6 py-4 font-bold text-lg hover:bg-slate-800 transition-colors"
            >
              °{unit}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Weather Alerts (Conditional) */}
          {weather.alerts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:col-span-12"
            >
              {weather.alerts.map((alert, i) => (
                <div key={i} className="mb-4 flex items-center gap-4 bg-red-500/10 border border-red-500/20 backdrop-blur-md p-4 rounded-2xl">
                  <div className="bg-red-500/20 p-2 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 text-sm uppercase tracking-wider">{alert.type} Alert</h4>
                    <p className="text-slate-300 text-sm">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Hero Weather Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider border border-orange-500/30">India Live</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{weather.city}</h1>
                <p className="text-xl text-slate-400 font-medium">{weather.condition}</p>
              </div>
              <div className="text-right">
                <p className="text-8xl font-bold tracking-tighter bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
                  {convert(weather.temp)}°
                </p>
                <p className="text-slate-400 mt-2 font-medium">H: {convert(weather.high)}° L: {convert(weather.low)}°</p>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none blur-3xl bg-blue-400 rounded-full" />
            <div className="relative flex justify-center my-8">
              <WeatherIcon type={weather.type} className="w-48 h-48 drop-shadow-[0_0_35px_rgba(59,130,246,0.5)]" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/50">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                  <Wind className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Wind</span>
                </div>
                <p className="text-xl font-bold">{weather.wind} <span className="text-xs text-slate-400">km/h</span></p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Hum</span>
                </div>
                <p className="text-xl font-bold">{weather.humidity}<span className="text-xs text-slate-400">%</span></p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">UV</span>
                </div>
                <p className="text-xl font-bold">{weather.uv}</p>
              </div>
            </div>
          </motion.div>

          {/* Daily Forecast */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-8 text-slate-400">
              <Calendar className="w-5 h-5" />
              <h2 className="text-sm font-bold uppercase tracking-widest">7-Day Forecast</h2>
            </div>
            <div className="space-y-6 flex-1">
              {weather.daily.map((day, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <p className="w-12 font-semibold text-slate-200">{day.day}</p>
                  <WeatherIcon type={day.type} className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 px-4">
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" 
                        style={{ width: `${day.chance}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="font-bold">{convert(day.maxTemp)}°</span>
                    <span className="text-slate-500 ml-2">{convert(day.minTemp)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AQI & Life Hacks Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* AQI Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-2 mb-6 text-slate-400">
                <Info className="w-5 h-5" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Air Quality</h2>
              </div>
              <div className="flex items-end gap-4 mb-4">
                <p className="text-5xl font-bold">{weather.aqi}</p>
                <p className={`text-lg font-bold mb-1 ${weather.aqiColor}`}>{weather.aqiStatus}</p>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (weather.aqi / 350) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The air quality is currently {weather.aqiStatus.toLowerCase()} for most individuals.
              </p>
            </div>

            {/* Clothing Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-2 mb-6 text-slate-400">
                <Shirt className="w-5 h-5" />
                <h2 className="text-sm font-bold uppercase tracking-widest">What to Wear</h2>
              </div>
              <p className="text-xl font-semibold mb-4 text-blue-100">{weather.clothing}</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Based on {weather.temp}°C and {weather.type} conditions in {weather.city}.
              </p>
            </div>

            {/* Travel Tips Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-2 mb-6 text-slate-400">
                <Plane className="w-5 h-5" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Travel Advice</h2>
              </div>
              <p className="text-lg font-medium mb-4 text-slate-200">{weather.travelTips}</p>
              <div className="flex items-center text-blue-400 text-xs font-bold gap-1 cursor-pointer hover:underline">
                View detailed traffic report <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </motion.div>

          {/* Hourly Forecast */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-12 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8"
          >
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <Gauge className="w-5 h-5" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Hourly Forecast</h2>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
              {weather.hourly.map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center min-w-[70px] group"
                >
                  <p className="text-slate-400 font-medium mb-3">{h.time}</p>
                  <WeatherIcon type={h.type} className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-xl font-bold">{convert(h.temp)}°</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Details Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <DetailCard 
              icon={<Thermometer className="w-4 h-4" />} 
              label="Feels Like" 
              value={`${convert(weather.feelsLike)}°`} 
              desc="Humidity is making it feel warmer." 
            />
            <DetailCard 
              icon={<Sunrise className="w-4 h-4" />} 
              label="Sun Schedule" 
              value={weather.sunrise} 
              desc={`Sunset: ${weather.sunset}`} 
            />
            <DetailCard 
              icon={<Eye className="w-4 h-4" />} 
              label="Visibility" 
              value={`${weather.visibility} km`} 
              desc="Haze is affecting visibility." 
            />
            <DetailCard 
              icon={<Gauge className="w-4 h-4" />} 
              label="Pressure" 
              value={`${weather.pressure} hPa`} 
              desc="Stable air pressure." 
            />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© 2024 India Weather App. Accurate forecasts for every corner of India.</p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="hover:text-blue-400 cursor-pointer">Terms</span>
            <span className="hover:text-blue-400 cursor-pointer">Privacy</span>
            <span className="hover:text-blue-400 cursor-pointer">Contact</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value, desc }: { icon: React.ReactNode, label: string, value: string, desc: string }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6">
      <div className="flex items-center gap-2 text-slate-400 mb-4">
        {icon}
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-bold mb-2">{value}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
