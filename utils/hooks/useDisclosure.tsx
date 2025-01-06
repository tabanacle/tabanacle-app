import { useEffect, useState } from "react";

const useDisclosure = (initial?: boolean) => {
  const [isOpen, setIsOpen] = useState(initial ?? false);

  // useEffect(() => {
  //   if (isOpen !== initial) {
  //     setIsOpen(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [initial]);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, toggle };
};

export default useDisclosure;
