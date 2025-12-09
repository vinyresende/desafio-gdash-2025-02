import parse from "html-react-parser"

import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

interface Props {
    insights: string | null
    insightsError: string | null
}

export default function WeatherInsightsCard({ insights, insightsError }: Props) {
    return (
        <>
            {(!insights && !insightsError) ? (
                <Skeleton className="col-span-2 rounded-lg row-span-1 px-10">
                </Skeleton>
            ) : (
                <Card className="col-span-2 px-10">

                    <CardContent className="flex justify-center">
                        {insightsError && (
                            <Badge variant="destructive" className="px-10">{insightsError}</Badge>
                        )}

                        {insights && (
                            <div className="[&_h3]:font-bold [&_h3]:text-xl *:list-disc [&_li]:ml-4 [&_li]:mb-4 flex flex-col gap-4">
                                {parse(insights)}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </>
    )
}