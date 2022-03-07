import React, { useRef, useEffect, MutableRefObject, RefObject } from "react";

/**
 * Su dung outsideAlerter de nhan ra ngoai mot element dua tren rè cua no 
 */
function useOutsideAlerter<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    setShow:Function

   
  ):void {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event:MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShow(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
export default useOutsideAlerter;