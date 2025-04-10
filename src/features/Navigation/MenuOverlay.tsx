import { MenuItem } from "../../types/navigation/MenuItems";

interface MenuOverlayProps {
  items: MenuItem[];
}

export const MenuOverlay = ({ items }: MenuOverlayProps) => {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)", //* 0.15 = 15% de transparence 
        backdropFilter: "blur(3px)", //* 5px = 5px de flou
        WebkitBackdropFilter: "blur(3px)", //* 5px = 5px de flou
      }}
    >
      <nav className="w-full max-w-md mx-auto">
        <ul className="flex flex-col space-y-12 p-10">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                className="text-black text-6xl font-bold tracking-tight hover:text-gray-700 border-b-4 border-black pb-2 inline-block transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
