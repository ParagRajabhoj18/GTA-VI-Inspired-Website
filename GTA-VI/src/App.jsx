import React, { useState } from 'react'
import { useGSAP } from "@gsap/react" //Installed GSAP REACT
import gsap from "gsap"; //Installed GSAP
import 'remixicon/fonts/remixicon.css'   //remix Icons

function App() {

    //Use State:-
    let [showContent, setShowContent] = useState(false);

    // GSAP:-

    useGSAP(() => {  //same as USEEFFECT-----> takes a CALLBACK Function

        const timeline = gsap.timeline();
        //to-----> ek particular state tak anuimate karo 
        timeline.to(".vi-mask-group", {
            rotate: 10,
            duration: 2,
            ease: "Power4.easeInOut",
            transformOrigin: "50% 50%"
        }).to(".vi-mask-group", {
            scale: 10,
            duration: 2,
            delay: -1.8,  //"-" it means that it will load before only
            ease: "Expo.easeInOut",  //give a smoother effect when it shuts down
            transformOrigin: "50% 50%",
            opacity: 0,
            onUpdate: function () {
                //to stop it before completion of the transitions and effects applied:-
                //1) Need to check how much animation is being completed:-
                if (this.progress() >= 0.9) { //.9 means almost completed
                    document.querySelector(".svg").remove();  //this removes the entire svg element


                    //2) And No we have to show Another Content -----> for thi we will make use state
                    setShowContent(true);
                    this.kill();  // will stop WHOLE ANIMATION
                }

            },
        });
    });

    //Mouse Part
    useGSAP(() => {
        if (!showContent) return;

        gsap.to(".main", {
            scale: 1,
            rotate: 0,
            duration: 2,
            delay: "-1",
            ease: "Expo.easeInOut"
        });
        gsap.to(".sky", {
            scale: 1.1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut"
        });
        gsap.to(".bg", {
            scale: 1.1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut"
        });
        gsap.to(".character", {
            scale: .8,
            x: "-50%",
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut"
        });

        gsap.to(".text", {
            scale: .8,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut"
        });

        const main = document.querySelector(".main")

        main?.addEventListener("mousemove", function (e) {
            const xMove = (e.clientX / window.innerWidth - 0.5) * 40; //e.clientX----->Value(Position) of the pointer on the screen
            //window.innerWidth------> Screen Width
            gsap.to(".imagesdiv .text", {
                x: `${xMove * 0.4}%`
            })
            gsap.to(".sky", {
                x: xMove,
            })
            gsap.to(".bg", {
                x: xMove * 1.7,
            })
        });
    }, [showContent]);

    return (
        <>
            <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
                <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <mask id="viMask">
                            <rect width="100%" height="100%" fill="black" />
                            <g className="vi-mask-group">                        {/* vi-mask-group */}
                                <text
                                    x="50%"
                                    y="50%"
                                    fontSize="250"
                                    textAnchor="middle"
                                    fill="white"
                                    dominantBaseline="middle"
                                    fontFamily="Arial Black"
                                >
                                    VI
                                </text>
                            </g>
                        </mask>
                    </defs>
                    <image
                        href="./bg.png  "
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                        mask="url(#viMask)"
                    />
                </svg>
            </div>

            {/* 2nd Part Content that is appearing After the Site is Loaded */}
            {showContent && (  //the another div will be called only when the value of showContent is TRUE
                <div className='main w-full rotate-[-10deg] scale-[1.7]'>
                    <div className='landing overflow-hidden relative w-full h-screen bg-black'>

                        {/* Navbar DIV */}
                        <div className='navbar absolute -top-5 left-0 w-full py-10 px-10 z-[10]'>
                            <div className='logo flex gap-7'>
                                <div className='lines flex flex-col gap-[5px]'>
                                    <div className='line w-15 h-2 bg-white'></div>
                                    <div className='line w-10 h-2 bg-white'></div>
                                    <div className='line w-5 h-2 bg-white'></div>
                                </div>
                                <h3 className='text-5xl -m-[9px] text-white'>Rockstar</h3>
                            </div>
                        </div>

                        {/* Images DIV */}
                        <div className='imagesdiv relative w-full h-screen overflow-hidden'>
                            <img className='sky absolute scale-[1.6] rotate-[-20deg] top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="" />
                            <img className='bg absolute scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
                            {/* Text Behind Character */}
                            <div className='text absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-3 text-white scale-[1] rotate-[-10deg]'>
                                <h1 className='text-9xl leading-none -ml-20'>grand</h1>
                                <h1 className='text-9xl leading-none ml-20'>theft</h1>
                                <h1 className='text-9xl leading-none -ml-20'>auto</h1>

                            </div>
                            {/* Character Image*/}
                            <img className='character absolute -bottom-[150%] top-0 left-1/2  -translate-x-1/2 scale-[0.9]
                            rotate-[-20deg]' src="./girlbg.png" alt="" />

                        </div>

                        {/* Bottom Bar */}
                        <div className='btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent'>
                            {/* Bottombar Text */}
                            <div className='flex gap-4 items-center'>
                                {/* Arrow Down */}
                                <i className="text-4xl ri-arrow-down-line"></i>
                                <h3 className='text-xl font-[Helvetica_Now_Display]'>Scroll Down</h3>
                            </div>


                            {/* Bottombar Image */}
                            <div>
                                <img className='absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src="./ps5.png" alt="" />
                            </div>

                        </div>
                    </div>


                    {/* About Page */}
                    <div className='w-full h-screen flex items-center justify-center bg-black'>
                        <div className='cntnr flex text-white w-full h-[80%]'>
                            <div className='limg relative w-1/2 h-full'>
                                <img className='absolute scale-[.76] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src="./imag.png" alt="" />
                            </div>
                            <div className='rcontent w-[35%]'>
                                <h1 className='text-7xl'>Stay Grounded</h1>
                                <h1 className='text-7xl'>Run Wild</h1>
                                <p className='mt-5 text-xl font-[Helvetica_Now_Display]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, quo minus numquam enim cupiditate asperiores saepe itaque est recusandae ea quasi ducimus veniam.
                                </p>
                                <p className='mt-10 text-xl font-[Helvetica_Now_Display]'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officia dolore at quam, et dolores labore quis velit deleniti perferendis tempore ducimus repellendus assumenda deserunt cumque! Voluptas omnis ea voluptatibus, ipsum excepturi rem rerum et.
                                </p>
                                <button className="bg-yellow-500 px-10 py-10 text-5xl text-black hover:text-white hover:bg-yellow-600 mt-5 rounded transition-colors duration-500 ease-in-out">
                                    Download Now
                                </button>


                            </div>
                        </div>


                    </div>
                </div>
            )}

        </>
    )
}

export default App
