import { usePageTitleContext } from "@/components/providers/page-title/page-title"
import WeatherSection from "@/components/weather/section"

export default function HomePage() {
    const { setPageTitle } = usePageTitleContext()

    setPageTitle("Weather")

    return (
        <main className="flex flex-col items-center">
            <WeatherSection />
        </main>
    )
}