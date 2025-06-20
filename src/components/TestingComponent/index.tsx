import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function TestingComponent() {
  return (
    <HoverCard>
      <HoverCardTrigger className="text-amber-50 text-lg" >Hover</HoverCardTrigger>
      <HoverCardContent >
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  );
}
