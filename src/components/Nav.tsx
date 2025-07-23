

export default function Nav() {
  return (
    <nav className="bg-[#7C0A02] justify-between px-6 py-0 flex items-center sm:h-16 h-10 text-white">
      <a href="/" className="block hover:scale-105 transition">
        <img src="/vegahed.png" className="items-stretch h-15 sm:h-20" alt="VegaHed Logo" />
      </a>
      <div className="flex h-full">
        <a
          href="/auth/login"
          className="h-full flex items-center px-6 hover:bg-white hover:text-[#7C0A02] transition"
        >
          Login
        </a>
        <a
          href="/auth/signup"
          className="h-full flex items-center px-6 hover:bg-white hover:text-[#7C0A02] transition"
        >
          Signup
        </a>
      </div>
    </nav>
  );
}