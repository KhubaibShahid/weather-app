"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Thermometer, Cloudy, MapPin } from "lucide-react";

export default function App() {

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState<undefined | { weather: string, name: string, temperature: string }>();

  async function getWeather() {

    let temp = "";
    let weat = "";
    let loca = "";
    let mess = "";

    if (value) {

      const pro = await fetch(`http://api.weatherapi.com/v1/current.json?key=80eb25d4f88d4209b1e123927240410&q=${value.trim()}`)

      const data = await pro.json();

      if (data.error) {
        setError(true);
      } else {
        temp = data.current.temp_c;
        weat = data.current.condition.text;
        loca = data.location.name;
  
        if (+temp < 0) {
          mess = `It's freezing at ${temp}°C! Bundle up!`;
        } else if (+temp < 10) {
          mess = `It's quite cold at ${temp}°C. Wear warm clothes.`;
        } else if (+temp < 20) {
          mess = `The temperature is ${temp}°C. Comfortable for a light jacket.`;
        } else if (+temp < 30) {
          mess = `It's a pleasant ${temp}°C. Enjoy the nice weather!`;
        } else {
          mess = `It's hot at ${temp}°C. Stay hydrated!`;
        }
  
        setWeather({
          weather: weat,
          temperature: mess,
          name: loca
        })
        setError(false);
      }

    } else {
      setError(true);
    }


  }
  return (
    <div className="main pt-56">
      <div className="box p-5 bg-white border border-gray-300 mx-auto rounded-lg shadow-sm">
        <h1 className="text-center font-semibold text-md">Weather Widget</h1>
        <p className="text-center text-gray-400">Search for the current weather conditions in your city.</p>
        <div className="flex justify-center gap-5 mt-4">
          <Input onChange={(e) => setValue(e.target.value)} placeholder="Enter a city name"></Input>
          <Button onClick={() => getWeather()}>Search</Button>
        </div>
        {error ? <div className="text-md text-red-400 text-center mt-3">Please enter a valid location</div> :

        
        weather ? <div className="flex mt-3 flex-col gap-2">
          <div className="flex gap-3 text-md"><Thermometer />  {weather.temperature}</div>
          <div className="flex gap-3 text-md"><Cloudy /> {weather.weather}</div>
          <div className="flex gap-3 text-md"><MapPin /> {weather.name}</div>
        </div>
          : <div></div>}
      </div>
    </div>
  )
}