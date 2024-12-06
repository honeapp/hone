interface AuthMethodButtonProps {
    method: 'email' | 'phone';
    current: string | null;
    onClick: () => void;
    icon: React.ReactNode;
}

export function AuthMethodButton({ method, current, onClick, icon }: AuthMethodButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`p-4 rounded-xl flex items-center justify-center space-x-2 transition-all
                ${current === method ? 'bg-[#100F0A] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
            {icon}
            <span className="capitalize">{method}</span>
        </button>
    );
}
