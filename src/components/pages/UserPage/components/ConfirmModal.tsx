import { Button } from "@/components/ui/button";

export default function ConfirmModal({ title, content, onCancel, onConfirm }: any) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-[var(--color-bg-module)] rounded-xl py-6 px-10 text-center shadow-lg">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="mb-4 text-sm">{content}</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={onCancel}>
                        取消
                    </Button>
                    <Button onClick={onConfirm} >
                        確認
                    </Button>
                </div>
            </div>
        </div>
    );
}
