import { useEffect } from 'react';


const useScrollDebouncer = (context, callback) => {
  useEffect(() => {
      let latestKnownScrollY = 0,
          lastScroll = 0,
          ticking = false;

      function onScroll() {
          latestKnownScrollY = window.scrollY;
          requestTick();
      }

      function requestTick() {
          if(!ticking) {
              requestAnimationFrame(update);
          }
          ticking = true;
      }

      function update() {
          // reset the tick so we can
          // capture the next onScroll
          ticking = false;


          var currentScrollY = latestKnownScrollY;

          callback.apply(context, [lastScroll, currentScrollY]);

          lastScroll = currentScrollY;
      }


      window.addEventListener('scroll', onScroll);

      return () => window.removeEventListener('scroll', onScroll);
  })
};

export default useScrollDebouncer;