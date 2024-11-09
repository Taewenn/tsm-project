import { Calendar } from "lucide-react";

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <Calendar className="h-8 w-8 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
                {message}
            </p>
        </div>
    );
}

export default EmptyState;
