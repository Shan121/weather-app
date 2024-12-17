import { SearchSchema } from "@/schemas/weather";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "./ui/input";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Loader, Search } from "lucide-react";
import { WeatherData } from "@/types/weather";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

const SearchBar = ({
  weatherData,
  setWeatherData,
  setIsSubmitting,
}: {
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const getWeather = async (cityName: string) => {
    setIsSubmitting(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherApiKey}`
      );
      //   console.log("Weather Data: ", response.data);
      if (response.status === 200) {
        setWeatherData({
          country: response.data.sys.country,
          location: response.data.name,
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
          temp: Math.floor(response.data.main.temp),
          temp_max: Math.floor(response.data.main.temp_max),
          temp_min: Math.floor(response.data.main.temp_min),
          pressure: response.data.main.pressure,
          humidity: response.data.main.humidity,
          wind_speed: response.data.wind.speed,
        });
        form.reset();
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "City not found");
        setWeatherData(null);
      }
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getWeather("Mirpur");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      city: "",
    },
  });

  function onSubmit(data: z.infer<typeof SearchSchema>) {
    if (!data.city) {
      return toast.error("Please enter a city name");
    }
    getWeather(data.city);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex items-center"
        >
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Search"
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className="rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"outline"}
            className="ml-2 rounded-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search />
            )}
          </Button>
        </form>
      </Form>
      <p className="text-gray-400 font-medium text-center mt-3">
        {form.formState.isSubmitting ? "Loading..." : weatherData?.country}
      </p>
    </div>
  );
};

export default SearchBar;
