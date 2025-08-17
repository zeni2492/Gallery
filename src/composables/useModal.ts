import { onMounted, onUnmounted } from 'vue';

export function useModal(emit: (event: 'close', ...args: any[]) => void) {
    const closeOnBackdrop = (event: MouseEvent) => {
        if ((event.target as HTMLElement).classList.contains('modal')) {
            emit('close');
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            emit('close');
        }
    };

    onMounted(() => window.addEventListener('keydown', handleKeydown));
    onUnmounted(() => window.removeEventListener('keydown', handleKeydown));

    return {
        closeOnBackdrop,
        handleKeydown
    };
}