

function Loader() {
    return ( 
        <div className=" w-screen flex justify-center items-center h-screen bg-gray-100">
            <div className="flex space-x-[3px]">
                
                <div className="w-[3px] bg-blue-500 animate-bounce h-2 origin-center delay-200 rounded-sm"></div>
                <div className="w-[3px] bg-blue-500 animate-bounce h-3 origin-center delay-0 rounded-sm"></div>
                <div className="w-[3px] bg-blue-500 animate-bounce h-2 origin-center delay-75 rounded-sm"></div>
                <div className="w-[3px] bg-blue-500 animate-bounce h-3 origin-center delay-200 rounded-sm"></div>
                <div className="w-[3px] bg-blue-500 animate-bounce h-2 origin-center delay-200 rounded-sm"></div>
                <div className="w-[3px] bg-blue-500 animate-bounce h-3 origin-center delay-0 rounded-sm"></div>
                <div className="w-[3px] bg-blue-500 animate-bounce h-2 origin-center delay-200 rounded-sm"></div>
            </div>
        </div>
     );
}

export default Loader;