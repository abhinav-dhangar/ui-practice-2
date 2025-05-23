"use client";
import { FiHome } from "react-icons/fi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { IoTerminalOutline } from "react-icons/io5";
import { TbCurrencyDollar } from "react-icons/tb";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
    { icon: FiHome, id: "home" },
    { icon: IoTerminalOutline, id: "terminal" },
    { icon: HiOutlineRocketLaunch, id: "launch" },
    { icon: TbCurrencyDollar, id: "dollar" },
];

export const Navbar = () => {
    const [selected, setSelected] = useState("home");

    return (
        <div className="relative">
            <div className="w-[20vw] h-12 z-[1001] absolute left-1/2 top-[50px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-4 px-1">
                {/* Background with opacity only */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-lg rounded-3xl z-0" />

                {/* Navigation Items */}
                {navItems.map(({ id, icon: Icon }) => (
                    <div key={id} className="relative z-10">
                        {selected === id && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-black rounded-full z-[-1]"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                        <button
                            onClick={() => setSelected(id)}
                            className={`p-2 rounded-full transition-all duration-200 relative ${selected === id ? "text-white" : "text-gray-300 hover:text-white"
                                }`}
                        >
                            <Icon className="text-[24px]" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
