from decouple import config

from weather.consumer import OpenMeteoConsumer
from rabbitmq.publisher import RabbitMQPublisher

DELAY_SECONDS = int(config('DELAY'))

if __name__ == "__main__":
    publisher = RabbitMQPublisher()

    app = OpenMeteoConsumer(delay=DELAY_SECONDS)
    app.start(publisher.publish_message)
