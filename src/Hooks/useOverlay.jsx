import React, { useState } from 'react'

export default function useOverlay() {

    const [isOpen, setIsOpen] = useState(false);

    const showOverlay = () => setIsOpen(true);
    const hideOverlay = () => setIsOpen(false);
  
    return {
      isOpen,
      showOverlay,
      hideOverlay,
    };
}
