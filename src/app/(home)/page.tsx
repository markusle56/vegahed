
'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  function gotoDashboard() { 
    router.push('/dashboard ');
  }
  return (
    <>
      <section id="home" className="h-screen pt-30 px-30 text-darkred">
        
      </section>
      <section id="demo" className="h-screen pt-30 px-30 text-darkred">
        
      </section>
      <section id="about">
        <div className="flex flex-wrap justify-center items-center min-h-screen sm:px-10 md:px-20 lg:px-50 ">
          <div className="w-1/3 min-w-70 flex justify-end items-center px-5">
            <img src="/vegapunk.svg" className="w-full"></img>
          </div>
          <div className="w-2/3 flex flex-col justify-center items-center">
            <h1 className="font-rowdies text-4xl items-center">
              What is VegaHed?
            </h1>
            <br></br>
            <p className="sm:w-2/3 text-xl text-center mb-6 max-h-screen">
              VegaHed is a web application inspired by Punk Records, one of the most remarkable inventions by Dr. Vegapunk—a fictional genius scientist from the anime <a className="udnerline hover:text-blue-600" href="https://en.wikipedia.org/wiki/One_Piece">One Piece</a>. In the story, Punk Records is a massive brain-like database that stores all of Vegapunk’s knowledge and thoughts. Similarly, VegaHed allows users to save, organize, and automatically classify bookmarks and links. It’s designed to make information retrieval and revision faster and more intuitive—like having your own personal Punk Records for the web.
            </p>
            {/* <button type="button" className="bg-[#7C0A02] text-white rounded-2xl h-auto hover:bg-white hover:border-[#7C0A02] hover:border-1 hover:text-[#7C0A02] font-rowdies text-3xl py-2 px-4 my-10" onClick={() => gotoDashboard()}> Dashboard </button> */}
          </div>
        </div>
      </section>
      
    </>
  );
}
