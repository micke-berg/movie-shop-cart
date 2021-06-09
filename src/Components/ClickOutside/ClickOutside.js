import { useEffect, useRef } from 'react'

function useOutsideAlerter(ref) {
  useEffect(() => {

  function handleClickOutside(event) {
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

function ClickOutside(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default ClickOutside;
