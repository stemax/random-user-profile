import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export const CopyButton = ({ text, label }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        description: `${label || 'Text'} copied to clipboard`,
        duration: 2000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy to clipboard",
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-button ${copied ? 'copied' : ''}`}
      title={`Copy ${label || 'text'}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
};