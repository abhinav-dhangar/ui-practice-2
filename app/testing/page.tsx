import { cn } from "@/lib/utils";
import styles from "./style.module.css";
export default function App() {
  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 ">
      <div className="relative h-[300px]  overflow-hidden rounded-2xl shadow-amber-100">
        <div className="absolute inset-0">
          <img
            src="/whiteBlock.gif"
            className="w-full h-full object-cover"
            alt="background"
          />
          <div
            className={cn(`${styles.blackGradient} backdrop-blur-[4px]`)}
          ></div>
          <div
            className="w-full h-full absolute top-0 z-[11] flex items-center justify-center "
            id="content"
          >
            <div className="w-full h-full px-8 py-10">
              <div className="flex justify-between">
                <div className="space-y-4 max-w-xs">
                <h3>Cult Pro</h3>
                <p className="text-sm text-white/80">Vibe. Ship. Yap.</p>
                <div>
                    <span>twitter</span>
                    <span>insta</span>
                    <span>youtube</span>
                </div>
                </div>
                <div className="flex space-x-16">
                  <div className="space-y-4">
                    <h3 className=" text-xs font-medium text-white/60 uppercase tracking-wide">
                      {" "}
                      Open Source
                    </h3>
                    <ul>
                      <li className="text-gray-200 hover:text-gray-100 transition-colors text-sm inline-flex items-center">
                        logo gpt
                      </li>
                      <li>Travel</li>
                      <li>Dash</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className=" text-xs font-medium text-white/60 uppercase tracking-wide">
                      {" "}
                      Open Source
                    </h3>
                    <ul>
                      <li>logo GPT</li>
                      <li>Travel</li>
                      <li>Dash</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className=" text-xs font-medium text-white/60 uppercase tracking-wide">
                      {" "}
                      Open Source
                    </h3>
                    <ul>
                      <li>logo GPT</li>
                      <li>Travel</li>
                      <li>Dash</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className=" text-xs font-medium text-white/60 uppercase tracking-wide">
                      {" "}
                      Open Source
                    </h3>
                    <ul>
                      <li>logo GPT</li>
                      <li>Travel</li>
                      <li>Dash</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  ` border-t border-whilte/10 justify-between flex text-xs text-white/60 pt-6 mt-10 px-6  `
                )}
              >
                <p>© 2025 pro.cult-ui.com. All rights reserved.</p>
                <div className="flex space-x-6 ">
                  <span>Login</span>
                  <span>Privacy</span>
                  <span>Terms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
