import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10 shadow-md">
      <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
        {/* Clickable site title */}
        <h1 className="text-3xl font-bold text-green-500 font-mono tracking-tight">
          <Link to="/" className="hover:text-green-400 transition-colors">
            ThinkBoard
          </Link>
        </h1>

        <Link
          to="/create"
          className="btn btn-success rounded-full gap-2 px-6 text-black hover:text-black"
        >
          <PlusIcon className="size-5" />
          <span>New Note</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
