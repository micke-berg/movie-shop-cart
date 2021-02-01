import { useEffect } from 'react'

const useClickOutside = (ref) => {

  useEffect(() => {
  // Alert if clicked on outside of element
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            alert("You clicked outside of me!");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [ref]);
}

export default useClickOutside;
