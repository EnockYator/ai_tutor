import { Outlet } from "react-router-dom";
import CommonHeader from "../common/header";

function AuthLayout() {
    return ( 
        <div className="flex flex-col">
            <CommonHeader />
            <div className=" flex min-h-screen w-full">
                <div className="hidden lg:flex items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-blue-200 opacity-100  w-1/2 px-12">
                    <div className="max-w-md space-y-6 text-center text-primary-foreground">
                        <h1 className="text-4xl font-extrabold tracking-tight">Welcome to AI Tutor</h1>
                        <p className="text-md text-gray-200 tracking-wide">AI Tutor for UoK E-Learning System</p>
                    </div>
                </div>
                <div className="flex flex-1 mt-8 justify-center bg-slate-300 px-6 py-12 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );
}

export default AuthLayout;