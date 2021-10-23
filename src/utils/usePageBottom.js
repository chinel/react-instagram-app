import React from "react";

function usePageBottom() {
  const [bottom, setBottom] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;
      setBottom(isBottom);
    }
    window.addEventListener("scroll", handleScroll); //we only want the above function to run when the user scrolls down
    return () => {
      window.removeEventListener("scroll", handleScroll); //Here we have to remove the event listner unmount of the component
    };
  }, []);
  return bottom;
}

export default usePageBottom;
