import { useState } from "react";
import { Button } from "../ui/button";
import { Copy, CopyCheck } from "lucide-react";

type ButtonClipboardProps = {
  value: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
};

export function ButtonClipboard({
  value,
  variant = "ghost",
  className,
}: ButtonClipboardProps) {
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  return (
    <Button
      onClick={handleCopy}
      size={"icon"}
      variant={variant}
      className={className}
    >
      {isCopy ? <CopyCheck /> : <Copy />}
    </Button>
  );
}
