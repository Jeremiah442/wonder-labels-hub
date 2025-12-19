import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesignerWorkspaceProps {
  onBack: () => void;
  sidebar: ReactNode;
  canvas: ReactNode;
}

export function DesignerWorkspace({ onBack, sidebar, canvas }: DesignerWorkspaceProps) {
  return (
    <div className="h-[calc(100svh-5rem)] w-full">
      <div className="flex h-full w-full overflow-hidden border-t border-border">
        <div className="flex w-14 flex-col bg-muted/40">
          <div className="p-2">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="w-[20rem] shrink-0 border-r border-border bg-background">
          <div className="h-full overflow-y-auto p-4">{sidebar}</div>
        </div>

        <div className="min-w-0 flex-1 bg-muted/30">
          <div className="flex h-full items-center justify-center p-6">
            <div className="w-full">{canvas}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
