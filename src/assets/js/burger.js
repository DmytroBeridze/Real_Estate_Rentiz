const burger = (
  targetSelector,
  contentSelector,
  linksSelector,
  activeClass
) => {
  const button = document.querySelector(targetSelector),
    menu = document.querySelector(contentSelector),
    links = document.querySelectorAll(linksSelector);

  // ----------open fnc
  const open = () => {
    menu.classList.toggle(activeClass);
    button.classList.toggle(activeClass);
    document.body.classList.toggle(activeClass);
  };

  //   --------close fnc
  const close = () => {
    menu.classList.remove(activeClass);
    button.classList.remove(activeClass);
    document.body.classList.remove(activeClass);
  };

  button.addEventListener("click", (e) => {
    open();
  });
  // ------------links
  links.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      close();
    });
  });

  // ------------close to menu click
  menu.addEventListener("click", (e) => {
    if (e.target.classList.contains(contentSelector.substring(1))) {
      close();
    }
  });
  // ----------menu cursor pointer
  menu.addEventListener("mousemove", (e) => {
    e.target == menu
      ? (menu.style.cursor = "pointer")
      : (menu.style.cursor = "auto");
  });
};
export default burger;
