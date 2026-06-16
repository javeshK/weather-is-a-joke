import { 
  Sun, 
  SunDim, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudSnow, 
  CloudRain, 
  Snowflake, 
  CloudLightning, 
  Zap, 
  HelpCircle,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  Compass,
  Umbrella,
  Search,
  MapPin,
  Calendar,
  Layers,
  Heart,
  GitBranch,
  ArrowRight,
  ChevronRight,
  Info,
  ChevronDown
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function WeatherIcon({ name, className = "w-6 h-6", size }: WeatherIconProps) {
  const props = { className, size };

  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'SunDim':
      return <SunDim {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudSnow':
      return <CloudSnow {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Gauge':
      return <Gauge {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Thermometer':
      return <Thermometer {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Umbrella':
      return <Umbrella {...props} />;
    case 'Search':
      return <Search {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'Calendar':
      return <Calendar {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    case 'Heart':
      return <Heart {...props} />;
    case 'GitBranch':
      return <GitBranch {...props} />;
    case 'ArrowRight':
      return <ArrowRight {...props} />;
    case 'ChevronRight':
      return <ChevronRight {...props} />;
    case 'ChevronDown':
      return <ChevronDown {...props} />;
    case 'Info':
      return <Info {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
}
export {
  Search,
  MapPin,
  Calendar,
  Layers,
  Heart,
  GitBranch,
  ArrowRight,
  ChevronRight,
  Info,
  ChevronDown,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  Compass,
  Umbrella
};
