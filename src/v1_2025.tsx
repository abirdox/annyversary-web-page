import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Clock, Camera, Quote, Sparkles, Gift, Star, Music } from 'lucide-react';
import { supabase } from './supabase'
import SurpriseReveal from './components/SurpriseReveal';


const V12025 = () => {
    const [currentQuote, setCurrentQuote] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState({ years: 0, months: 0, days: 0, hours: 0 });
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayMusic = () => {
        if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.play().catch((err) => {
                console.log("Autoplay blocked:", err);
            });
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            // List all files in the folder "2025"
            const { data, error } = await supabase.storage
                .from('annyversary')
                .list('2025');

            if (error) {
                console.error('Error listing files:', error);
                return;
            }

            if (!data) return;

            // Convert file names to public URLs
            const urls = data.map(file =>
                supabase.storage
                    .from('annyversary')
                    .getPublicUrl(`2025/${file.name}`).data.publicUrl
            );

            setImageUrls(urls);
            // setTimeout(() => {
            //     handlePlayMusic()
            // }, 3000)
            // handlePlayMusic()
        };

        fetchImages();
    }, []);


    const quotes = [
        "You are my sunshine on cloudy days, my anchor in stormy seas. 💕",
        "In your eyes, I found my home. In your heart, I found my love. 💖",
        "Every love story is beautiful, but ours is my favorite. 🌹",
        "You make ordinary moments feel like magic. ✨"
    ];

    const milestones = [
        { title: "First Meeting", date: "A magical day", description: "We first met at Housing Balur Math 💕, a moment that remains unforgettable ✨. That day still lives in our hearts ❤️ as a vivid, cherished memory, filled with joy 😄, excitement 🎉, and the beginning of a beautiful journey together 🌹💖.", icon: "💫" },
        { title: "First Date", date: "Unforgettable", description: "At Jamidrahath Escape Café ☕️, our story began with laughter 😄, little surprises 🎁, and that unique moment ✨ that still lives in every corner of our memories 💖🌹.", icon: "🌹" },
        { title: "💌 The Day We Promised Forever", date: "I said yes!", description: "12 October 2019 – On this special day, we made a heartfelt vow to stand by each other through every joy and challenge ❤️. That promise became the foundation of our love, guiding us ever since 🌹✨, and reminding us that together we can overcome anything and create a lifetime of beautiful memories 💖.", icon: "💍" },
        { title: "Wedding Day", date: "Forever begins", description: "📅 13 August 2021 – The day our hearts became one ❤️, filled with love, laughter 😄, joy 🎉, and memories we will cherish forever ✨🌹.", icon: "👰‍♀️" },
        { title: "Building Dreams", date: "Together", description: "From the beginning of the universe, it feels as if we were destined for each other 💫. Every moment, every laugh, every shared glance has been part of a journey written in the stars ✨. Together, we are creating dreams, weaving memories, and building a love that transcends time and space ❤️🌹. Our souls knew each other long before we met, and every day since has been a celebration of that eternal connection 💖🌟.", icon: "🏡" }
    ];

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 4000);

        // Calculate time elapsed since wedding (example date)
        const startDate = new Date('2021-08-13'); // Change to your actual wedding date
        const updateTime = () => {
            const now = new Date();
            const diff = now.getTime() - startDate.getTime();
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setTimeElapsed({ years, months, days, hours });
        };

        updateTime();
        const timeInterval = setInterval(updateTime, 1000 * 60 * 60); // Update every hour

        return () => {
            clearInterval(quoteInterval);
            clearInterval(timeInterval);
        };
    }, [quotes.length]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden">

            {/* Floating Hearts Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                            fontSize: `${12 + Math.random() * 8}px`,
                        }}
                    >
                        {['💕', '💖', '💝', '🌹', '✨', '💐', '🦋', '🌸'][Math.floor(Math.random() * 8)]}
                    </div>
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center text-center px-4 z-10">
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 max-w-4xl">
                    <div className="animate-fade-in-up">
                        <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-pulse-slow">
                            Happy Anniversary 💕
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-6 animate-slide-in-left">
                            My Dearest <span className="text-pink-600 font-bold">Nigar Sultana Mumu</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 mb-8 animate-slide-in-right">
                            From your loving husband, <span className="font-bold text-purple-600">Abir Hosen Ashik</span>
                        </p>

                        {/* Heart line */}
                        <div className="flex justify-center items-center space-x-4 text-2xl animate-bounce mb-8">
                            <Heart className="text-red-500 fill-current" />
                            <span className="text-pink-600">∞</span>
                            <Heart className="text-red-500 fill-current" />
                        </div>

                        {/* Play Music Button */}
                        <style>{`
                            @keyframes breathing {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.05); }
                            }
                            @keyframes bubbleFloat {
                            0% { transform: translateY(0) scale(1); opacity: 0.6; }
                            50% { opacity: 1; }
                            100% { transform: translateY(-50px) scale(1.2); opacity: 0; }
                            }
                            .breathing {
                            animation: breathing 2s ease-in-out infinite;
                            }
                            .bubble {
                            position: absolute;
                            border-radius: 9999px;
                            background-color: rgba(255, 255, 255, 0.4);
                            animation: bubbleFloat 3s ease-in-out infinite;
                            }
                            `}
                        </style>

                        <button
                            onClick={() => {
                                const audio = document.getElementById(
                                    "anniversary-audio"
                                ) as HTMLAudioElement;
                                if (audio) {
                                    audio.loop = true;
                                    audio.play().catch(() => console.log("Autoplay blocked"));
                                }
                            }}
                            className="breathing relative overflow-hidden inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl"
                        >
                            {/* Floating bubbles */}
                            {[...Array(6)].map((_, i) => (
                                <span
                                    key={i}
                                    className="bubble"
                                    style={{
                                        width: `${Math.random() * 8 + 4}px`,
                                        height: `${Math.random() * 8 + 4}px`,
                                        left: `${Math.random() * 100}%`,
                                        bottom: `0px`,
                                        animationDelay: `${Math.random() * 2}s`,
                                    }}
                                ></span>
                            ))}

                            🎵 Play Music
                        </button>

                        <audio id="anniversary-audio" src="/music.mp3" preload="auto" />


                    </div>
                </div>
            </section>


            {/* Time Together Counter */}
            <section className="py-16 px-4 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12">
                        Our Beautiful Journey Together ✨
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Years', value: timeElapsed.years, icon: '📅' },
                            { label: 'Months', value: timeElapsed.months, icon: '🌙' },
                            { label: 'Days', value: timeElapsed.days, icon: '☀️' },
                            { label: 'Hours', value: timeElapsed.hours, icon: '⏰' }
                        ].map((item, index) => (
                            <div key={index} className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="text-3xl md:text-4xl font-bold mb-2 animate-pulse">
                                    {item.value}
                                </div>
                                <div className="text-sm uppercase tracking-wide">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Love Story Timeline */}
            <section className="py-16 px-4 relative z-10 bg-gradient-to-r from-pink-50/80 to-purple-50/80">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-16">
                        Our Love Story 💕
                    </h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-500 rounded-full"></div>

                        {milestones.map((milestone, index) => (
                            <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-pink-200 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                                        <div className="text-3xl mb-3">{milestone.icon}</div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                                        <p className="text-pink-600 font-semibold mb-2">{milestone.date}</p>
                                        <p className="text-gray-600">{milestone.description}</p>
                                    </div>
                                </div>
                                <div className="relative z-20">
                                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full border-4 border-white shadow-lg"></div>
                                </div>
                                <div className="w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="py-16 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-16">
                        Our Beautiful Memories 📸
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {imageUrls?.map((url, index) => (
                            <div
                                key={index}
                                className="group relative rounded-[2rem] border-[6px] border-pink-300 shadow-[0_0_30px_rgba(255,105,180,0.5)] overflow-hidden transform hover:scale-105 transition-all duration-500"
                                style={{
                                    background:
                                        "linear-gradient(145deg, rgba(255,182,193,0.4), rgba(255,105,180,0.4))",
                                }}
                            >
                                {/* Inner glow frame */}
                                <div className="absolute inset-0 rounded-[1.8rem] border-4 border-white/50 pointer-events-none"></div>

                                {/* Image */}
                                <img
                                    src={url}
                                    alt={`Memory ${index + 1}`}
                                    className="w-full h-64 object-cover rounded-[1.5rem] transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Top overlay with text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end pb-6 text-white">
                                    <p className="text-lg font-semibold drop-shadow-lg">
                                        I Will Love You Forever
                                    </p>
                                    <Heart className="w-8 h-8 mt-2 animate-bounce" />
                                </div>

                                {/* Floating hearts animation */}
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="absolute text-pink-200"
                                        style={{
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            animation: `floatHeart 6s ease-in-out infinite`,
                                            animationDelay: `${i * 1.2}s`,
                                        }}
                                    >
                                        ❤️
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating heart animation */}
                <style>{`
                    @keyframes floatHeart {
                    0% { transform: translateY(0) scale(1); opacity: 0.8; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-50px) scale(1.2); opacity: 0; }
                    }
                `}</style>
            </section>


            {/* Romantic Quotes Carousel */}
            <section className="py-16 px-4 relative z-10 bg-gradient-to-r from-red-50/80 to-pink-50/80">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-12">
                        Words from My Heart 💝
                    </h2>
                    <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 min-h-[200px] flex items-center justify-center">
                        <div className="relative">
                            <Quote className="w-8 h-8 text-pink-400 mb-4 mx-auto" />
                            <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed animate-fade-in">
                                {quotes[currentQuote]}
                            </p>
                            <div className="flex justify-center mt-6 space-x-2">
                                {quotes.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentQuote ? 'bg-pink-500 scale-125' : 'bg-pink-200'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Final CTA Section */}
            <section className="py-16 px-4 text-center relative z-10 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
                <div className="max-w-2xl mx-auto">
                    <div className="text-6xl mb-6 animate-bounce">💖</div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-6">
                        Happy Anniversary, My Love!
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        To many more years of love, laughter, and endless happiness together! 🥂
                    </p>
                    <div className="flex justify-center items-center space-x-4 text-3xl">
                        <Sparkles className="text-yellow-500 animate-spin-slow" />
                        <Heart className="text-red-500 fill-current animate-pulse" />
                        <Gift className="text-purple-500 animate-bounce" />
                        <Heart className="text-pink-500 fill-current animate-pulse" />
                        <Star className="text-yellow-500 animate-ping" />
                    </div>
                </div>
            </section>

            {/* Personal Message */}
            <section className="py-16 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-16">
                        A Special Message for You 💌
                    </h2>
                    <div className="bg-gradient-to-br from-pink-100/80 to-purple-100/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-200">
                        <div className="font-serif text-lg md:text-xl leading-relaxed text-gray-800 space-y-6">
                            <p className="animate-typewriter">
                                My dearest Nigar Sultana Mumu, 💕
                            </p>
                            <p>
                                Every day with you feels like a beautiful dream that I never want to wake up from. You are not just my wife, but my best friend, my partner in all adventures, and the love of my life.
                            </p>
                            <p>
                                Your smile brightens my darkest days, your laughter fills our home with joy, and your love gives me strength to be the best version of myself. I am grateful every single day for the love we share and the life we've built together.
                            </p>
                            <p>
                                Thank you for choosing me, for loving me unconditionally, and for making every ordinary moment extraordinary. Here's to many more years of laughter, love, and beautiful memories together.
                            </p>
                            <div className="text-center mt-8">
                                <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                                    Forever and always yours, ❤️
                                </p>
                                <p className="text-xl font-bold text-purple-600 mt-2">
                                    Abir Hosen Ashik 💕
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Surprise Section */}
            <section className="py-20 bg-gradient-to-r from-pink-200 via-rose-200 to-red-200">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-12">
                        <Heart className="mx-auto text-pink-600 mb-4 animate-pulse" size={48} />
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 font-serif">
                            A Special Surprise
                        </h2>
                    </div>
                    <SurpriseReveal
                        title="Click for a Special Surprise! 💝"
                        content="Every love story is beautiful, but ours is my favorite. Here's to infinite tomorrows together! 🌟✨"
                    />
                </div>
            </section>


            {/* Footer */}
            <footer className="py-8 px-4 text-center relative z-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <p className="text-sm opacity-75">
                    Made with 💕 by Abir Hosen Ashik for his beloved wife Nigar Sultana Mumu
                </p>
                <div className="mt-2 flex justify-center space-x-2">
                    {['💕', '💖', '💝', '🌹', '✨'].map((emoji, index) => (
                        <span key={index} className="animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                            {emoji}
                        </span>
                    ))}
                </div>
            </footer>
            {/* <div className="w-screen h-screen"> */}
            {/* Your page content */}

            {/* Hidden audio element */}
            <audio ref={audioRef} src="/music.mp3" preload="auto" />
            {/* </div> */}
        </div>
    )
}


export default V12025