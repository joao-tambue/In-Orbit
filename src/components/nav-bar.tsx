import Image from "next/image";
import icon from '../../public/icon-orbit.svg'
import { NotificationWidget } from './notification-widget';
import { Bell } from "lucide-react";

export function NavBar () {
    return (
        <main className="bg-zinc-950/40 backdrop-blur-sm bg-opacity-15 inset-0 px-2">
            <header className="flex justify-between items-center max-w-[1200px] mx-auto w-full py-4 ">
                <div className="flex items-center gap-2">
                    <Image
                        src={icon}
                        alt="..."
                    /> 
                    <h1>in.orbit</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-[22px] font-semibold">
                        <h1>Olá: <span>João</span></h1>
                    </div>
                    <div>
                        <NotificationWidget />
                    </div>
                    <div className="bg-gray-700 py-2 px-2.5 border rounded-full">
                        <h1 className="text-[12px]">JT</h1>
                    </div>
                </div>
            </header>
        </main>
    )
}