import { useEffect, useCallback, useState } from "react";

const ContextMenu = outerRef => {
  const [xPos, setXPos] = useState("10px");
  const [yPos, setYPos] = useState("10px");
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    event => {
      event.preventDefault();
      // console.log('outerRef: ', outerRef)      
      // console.log('event: ', event)      
      if (outerRef && outerRef.current && outerRef.current.contains(event.target)) {
        setXPos(`${event.pageX}px`);
        setYPos(`${event.pageY}px`);
        showMenu(true);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xPos, yPos, menu };
};

export default ContextMenu;