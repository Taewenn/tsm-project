import { Card, CardHeader, CardContent } from "../ui/card";

function LoadingCards({ count = 3 }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            <div className="h-3 w-1/2 bg-gray-200 rounded" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 w-full bg-gray-200 rounded" />
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
}

export default LoadingCards;
