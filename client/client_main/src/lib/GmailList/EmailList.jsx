import {useState, useContext} from 'react';

import EmailListItem from './EmailListItem';
import './styles/EmailList.css';
import './styles/EmailListScrollBar.css';
import emailContext from '../../contexts/EmailContext';

import InfoMenu from '../InfoMenu/InfoMenu';

const EmailList = ({emails, setLastClickedPos, visible, setVisible}) => {
  const [menuPos, setMenuPos] = useState({
    posX: 0,
    posY: 0,
  });
  const [lastClickedEmailId, setLastClickedEmailId] = useState(null);

  const {refreshEmails} = useContext(emailContext);

  /** handleDelete
   * @saphalpdyl
   * @description On click change position to beside user's mouse
   * @param {object} event MouseEvent
   */
  const handleInfoClick = (event) => {
    setVisible(true);
    setLastClickedPos({x: event.clientX, y: event.clientY});

    const posX = event.clientX + 10;
    const posY = event.clientY - 10;

    setMenuPos({posX, posY});
  };

  const handleDelete = async () => {
    setVisible(false);
    if (lastClickedEmailId == null) return;

    const response = await fetch(
        `http://localhost:8080/delete/${lastClickedEmailId}`,
        {
          method: 'DELETE',
        },
    );

    const data = response.json();

    if (data.hasError) {
      throw new Error(`Error during deletion with code ${data.code}`);
    }

    refreshEmails();
  };

  return (
    <div className="email-list">
      <InfoMenu
        menuPos={menuPos}
        visible={visible}
        handleDelete={handleDelete}
      />
      {emails.map((email) => (
        <EmailListItem
          emailId={email.id}
          handleInfoClick={handleInfoClick}
          key={email.id}
          email={email}
          setLastClickedEmailId={setLastClickedEmailId}
        />
      ))}
    </div>
  );
};

export default EmailList;
