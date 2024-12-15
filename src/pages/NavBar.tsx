import { ArrowDown, BellRing, Brush, ChevronDown, Settings } from "lucide-react";
import { Button } from "../components/components/ui/button";

const categories = [
    "Populares", 
    "Genêros", 
    "A-Z", 
    "+18"
];

export const NavBar = () => {
    return (
        <nav className="w-screen h-[72px] absolute flex top-0 border-b border-[#E4E7EC]  bg-white">

            <div className="w-full flex mx-14 justify-between items-center">

                {/* Left */}
                <div className="flex items-center gap-6 font-[600]">
                    <h1 className="font-extrabold text-[18px] text-[#101828]">Untitled UI</h1>
                    <ul className="flex gap-5 text-[#475467] text-[16px]">
                        {categories.map((category, index) => (
                            <li key={index} className="hover:text-[#7F56D9] cursor-pointer">
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {/* Botão Publicar */}
                    <Button className="bg-[#7F56D9] hover:bg-[#6941C6] text-white rounded-full px-4 py-2 flex gap-2 items-center font-[600]">
                        <Brush size={18} />
                        Publicar
                    </Button>

                    {/* Ícone de Notificação */}
                    <a href="/" className="text-[#475467] hover:text-[#7F56D9]">
                        <BellRing size={18} />
                    </a>

                    <a href="/" className="text-[#475467] hover:text-[#7F56D9]">
                        <Settings size={18} />
                    </a>

                    {/* Botão Conta */}
                    <Button className="bg-transparent border border-[#D0D5DD] rounded-[8px] text-[#344054] px-4 py-2 flex items-center gap-2 font-[600]">
                        nome.conta
                        <ChevronDown className="text" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};
