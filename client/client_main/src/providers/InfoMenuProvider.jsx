import infoMenuContext from '../contexts/InfoMenuContext';
import {useState} from 'react';

/**
 * @author @saphalpdyl
 * @component
 *
 *  * @typedef {Object} positions
 *  * @property {string} lastClickedPos - The last clicked position.
 *  * @property {function} setLastClickedPos - The function to set the last clicked position.
 *  * @property {string} menuPos - The menu position.
 *  * @property {function} setMenuPos - The function to set the menu position.
 *
 *  * @typedef {Object} visibility
 *  * @property {boolean} visible - Whether the component is visible.
 *  * @property {function} setVisible - The function to set the component visibility.
 *
 *  * @typedef {Object} email
 *  * @property {string} lastClickedEmailId - The ID of the last clicked email.
 *  * @property {function} setLastClickedEmailId - The function to set the last clicked email ID.
 *
 *  * @typedef {Object} value
 *  * @property {Positions} positions - The positions object.
 *  * @property {Visibility} visibility - The visibility object.
 *  * @property {Email} email - The email object.
 *  * @property {boolean} showInfoMenu - Whether to show the info menu.
 *  * @property {function} handleMouseMove - The function to handle mouse move events.
 *
 * @param {object} props - Component Props
 * @param {React.ReactNode} props.children - The React Node to wrap around
 *
 * @returns {React.ReactNode} - The rendered component
 */

const InfoMenuProvider = (props) => {
  const [lastClickedPos, setLastClickedPos] = useState({x: 0, y: 0});
  const [visible, setVisible] = useState(false);
  const [lastClickedEmailId, setLastClickedEmailId] = useState(null);
  const [menuPos, setMenuPos] = useState({
    posX: 0,
    posY: 0,
  });

  const handleMouseMove = (event) => {
    if (
      Math.abs(lastClickedPos.x - event.clientX) > 100 ||
      Math.abs(lastClickedPos.y - event.clientY) > 100
    ) {
      setVisible(false);
    }
  };

  const showInfoMenu = (event) => {
    setVisible(true);
    setLastClickedPos({x: event.clientX, y: event.clientY});

    const posX = event.clientX + 10;
    const posY = event.clientY - 10;

    setMenuPos({posX, posY});
  };

  return (
    <infoMenuContext.Provider
      value={{
        positions: {
          lastClickedPos,
          setLastClickedPos,
          menuPos,
          setMenuPos,
        },
        visibility: {
          visible,
          setVisible,
        },
        email: {
          lastClickedEmailId,
          setLastClickedEmailId,
        },
        showInfoMenu,
        handleMouseMove,
      }}
    >
      {props.children}
    </infoMenuContext.Provider>
  );
};

export default InfoMenuProvider;
