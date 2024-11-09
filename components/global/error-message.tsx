import { AlertTriangle } from "lucide-react";

function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
            <p className="text-lg font-medium text-red-500">{message}</p>
        </div>
    );
}

export default ErrorMessage;
