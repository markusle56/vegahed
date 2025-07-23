import Image from "next/image";


export default function Home() {
  return (
    <>
      <h1 className="text-5xl">Log In</h1>
      <div>
        {/* Third party auth  */}
      </div>
      <hr className="my-6 border-t-[2px] opacity-50 border-[#7C0A02] w-1/2" />
      <form className="flex flex-col gap-1 justify-start w-1/2">
        <label>
          Email
        </label>
        <input placeholder="Enter your email" className="h-10 px-3 rounded-2xl focus:outline-none border-[#7C0A02] ring"></input>
        <br></br>
        <label>
          Password
        </label>
        <input placeholder="Enter your password" className="h-10 rounded-2xl focus:outline-none border-[#7C0A02] ring px-3"></input>
        <br></br>
        <button className="bg-[#7C0A02] text-white rounded-2xl h-10">Log In</button>
      </form>
    </>
  );
}