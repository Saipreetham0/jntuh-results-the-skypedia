import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BacklogSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Student Details Skeleton */}
            <Card className="border-l-4 border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-16 w-32 rounded-xl" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <Skeleton className="h-10 w-full rounded-lg" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                </CardContent>
            </Card>

            {/* Semester Results Skeletons */}
            {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                    <CardHeader className="bg-gray-50/50 dark:bg-gray-800/50 pb-4">
                        <div className="flex justify-between">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="space-y-2 p-4">
                            {[1, 2, 3, 4].map((j) => (
                                <div key={j} className="flex justify-between items-center">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
