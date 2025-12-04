import time
import schedule
import requests

from decouple import config
from typing import Callable

from weather.utils import WEATHER_CODES

class OpenMeteoConsumer():
    """
    Worker que fará as requisições à API
    
    Methods
    -------
    start(callback): Inicia as requisições
    """

    def __init__(self, delay: int):
        self.delay = delay

        self.url = config("API_URL") or None
        self.city_name = config("CITY_NAME")
        self.latitude = config("LATITUDE")
        self.longitude = config("LONGITUDE")

        self.parameters = {
            "latitude": self.latitude,
            "longitude": self.longitude,
            "timezone": "America/Sao_Paulo",
            "wind_speed_unit": "kmh",
            "temperature_unit": "celsius",
            "current": "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation_probability,weathercode"
        }


    def __request(self, callback: Callable[[dict], None]):
        """(Private) Método responsável pelas requisições"""

        res = requests.get(self.url, params=self.parameters).json()

        payload = {
            "city_name": self.city_name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "current": {
                "time": res["current"]["time"],
                "temperature": res["current"]["temperature_2m"],
                "relative_humidity": res["current"]["relative_humidity_2m"],
                "apparent_temperature": res["current"]["apparent_temperature"],
                "wind_speed": res["current"]["wind_speed_10m"],
                "precipitation_probability": res["current"]["precipitation_probability"],
                "sky_condition": WEATHER_CODES[res["current"]["weathercode"]]
            }
        }

        callback(payload)


    def start(self, callback: Callable[[dict], None]):
        """Método que inicia as requisições em sequência com o delay especificado no construtor da classe"""

        if not self.url: raise Exception("API_URL deve ser definido em .env")

        self.__request(callback)
        schedule.every(self.delay).seconds.do(lambda: self.__request(callback))

        while True:
            schedule.run_pending()
            time.sleep(1)
