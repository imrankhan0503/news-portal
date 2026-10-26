import AccountLinks from "./accountLinks";
import SearchBar from "./searchBox";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <a className="text-2xl font-extrabold" href="/">
            I-NEWS
          </a>
          <AccountLinks />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Header;
