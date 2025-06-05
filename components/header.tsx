import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";
import CreateTask from "./create-task";
export default function Header() {
  return (
    <header className="size-full flex items-center justify-between px-4">
      <Link href={"/"} className="text-blue-700">
        Task Manager
      </Link>

      <div className="flex items-center gap-2">
        <CreateTask />
        <ToggleTheme />
      </div>
    </header>
  );
}
