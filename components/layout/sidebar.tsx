import Link from "next/link";
import CharacterIcon from "./sidebar-icons/character-icon";
import HomeIcon from "./sidebar-icons/home-icon";

const Sidebar = () => {
  return (
    <nav>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-100 rounded-lg lg:hidden hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          aria-hidden
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-slate-800">
          <ul className="space-y-2">
            <li>
              <Link
                className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg hover:bg-slate-700 transition-all"
                href="/"
              >
                <HomeIcon />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/characters"
                className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg hover:bg-slate-700 transition-all"
              >
                <CharacterIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Characters
                </span>
              </Link>
            </li>
          </ul>
          <Link className="absolute bottom-3 text-gray-200 hover:text-cyan-500 transition-all" href="https://www.linkedin.com/in/wnramos/" target="_blank">
            <p className="ml-2 text-sm text-center">Developed by Nicolas Ramos</p>
          </Link>
        </div>

      </aside>
    </nav>
  );
};

export default Sidebar;
