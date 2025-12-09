import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  Cloudy,
  Sun,
  type LucideProps,
} from "lucide-react"

export const weatherConditionIcons: Record<string, React.FC<LucideProps>> = {
  "Céu limpo": Sun,
  "Principalmente limpo": Sun,
  "Parcialmente nublado": Cloudy,
  "Nublado": Cloud,

  // Neblina
  "Neblina": CloudFog,
  "Neblina com geada": CloudFog,

  // Chuvisco
  "Chuvisco: intensidade leve": CloudDrizzle,
  "Chuvisco: intensidade moderada": CloudDrizzle,
  "Chuvisco: intensidade densa": CloudDrizzle,
  "Chuvisco congelante: intensidade leve": CloudDrizzle,
  "Chuvisco congelante: intensidade densa": CloudDrizzle,

  // Chuva normal
  "Chuva: intensidade leve": CloudRain,
  "Chuva: intensidade moderada": CloudRain,
  "Chuva: intensidade forte": CloudRainWind,

  // Chuva congelante
  "Chuva congelante: intensidade leve": CloudRain,
  "Chuva congelante: intensidade forte": CloudRainWind,

  // Neve
  "Queda de neve: intensidade leve": CloudSnow,
  "Queda de neve: intensidade moderada": CloudSnow,
  "Queda de neve: intensidade forte": CloudSnow,
  "Grãos de neve": CloudSnow,

  // Pancadas de chuva
  "Pancadas de chuva: leves": CloudRain,
  "Pancadas de chuva: moderadas": CloudRainWind,
  "Pancadas de chuva: violentas": CloudRainWind,

  // Pancadas de neve
  "Pancadas de neve: leves": CloudSnow,
  "Pancadas de neve: fortes": CloudSnow,

  // Tempestades
  "Tempestade: leve ou moderada": CloudLightning,
  "Tempestade com granizo leve": CloudHail,
  "Tempestade com granizo forte": CloudHail,
}