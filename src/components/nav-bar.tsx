import Image from "next/image";
import icon from '../../public/icon-orbit.svg'
import { NotificationWidget } from './notification-widget';
import { User } from "lucide-react";

export function NavBar () {
    return (
        <main className="bg-zinc-950/40 backdrop-blur-sm bg-opacity-15 inset-0 px-2">
            <header className="flex justify-between items-center max-w-[1000px] mx-auto w-full py-4 ">
                <div className="flex items-center gap-2">
                    <Image
                        src={icon}
                        alt="..."
                    /> 
                    <h1>in.orbit</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-[22px] font-semibold">
                        <h1>Welcome</h1>
                    </div>
                    <div>
                        <NotificationWidget />
                    </div>
                    <div className="bg-gray-700 p-2 border rounded-full">
                        <User size={14} />
                    </div>
                </div>
            </header>
        </main>
    )
}