import NavLink from "./NavLink/NavLink";

const Links = ({ setMenuOpen, links }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">

        {links.map((link) => (
          <NavLink
            item={link}
            key={link.title}
            setMenuOpen={setMenuOpen}
          />
        ))}

      </div>
    </div>
  );
};

export default Links;