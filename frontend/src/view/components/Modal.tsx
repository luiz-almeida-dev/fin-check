import * as RdxDialog from '@radix-ui/react-dialog';
import { cn } from '../../app/utils/cn';
import { Cross2Icon } from '@radix-ui/react-icons';


interface ModalProps{
  open: boolean
  title: string
  onClose?(): void
  rightAction?: React.ReactNode
  children: React.ReactNode
}

export function Modal({
  open,
  children,
  rightAction,
  onClose,
  title}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay className={cn(
          'fixed inset-0 z-40 bg-black/80 backdrop-blur-sm',
          'data-[state=open]:animate-overlay-show'
        )} />
        <RdxDialog.Content className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white space-y-10 rounded-2xl z-50 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
          'data-[state=open]:animate-content-show w-full max-w-[400px]'
        )}
        aria-describedby={undefined}
        >
          <RdxDialog.Title>
            <header className='h-12 flex items-center justify-between text-gray-800'>
              <button
                className='w-12 h-12 flex items-center justify-center outline-none'
                onClick={onClose}>
                <Cross2Icon className='w-6 h-6'/>
              </button>
              <span className='text-lg tracking-[-1px] font-bold'>
                {title}
              </span>

              <div className='w-12 h-12 flex items-center justify-center'>
                {rightAction}
              </div>
            </header>
          </RdxDialog.Title>

          <div>
            {children}
          </div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}

