import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
