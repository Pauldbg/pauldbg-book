interface MenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MenuButton = ({ isOpen, onToggle }: MenuButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white text-black border-2 border-black"
      aria-label={isOpen ? "Close the menu" : "Open the menu"}
    >
      {isOpen ? (
        <span className="text-black text-xl">X</span>
      ) : (
        <span className="text-black text-xl">≡</span>
      )}
    </button>
  );
};
