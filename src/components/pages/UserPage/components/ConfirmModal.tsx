export default function  ConfirmModal({ title, content, onCancel, onConfirm }: any) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-72 text-center shadow-lg">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="mb-4 text-sm">{content}</p>
          <div className="flex justify-center gap-4">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
              取消
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-yellow-400 rounded">
              確認
            </button>
          </div>
        </div>
      </div>
    );
  }
  