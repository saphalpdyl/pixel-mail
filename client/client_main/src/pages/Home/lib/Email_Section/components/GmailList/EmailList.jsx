import {useContext} from 'react';

import EmailListItem from './EmailListItem';
import './styles/EmailList.css';
import './styles/EmailListScrollBar.css';
import emailContext from '@contexts/EmailContext';
import infoMenuContext from '@contexts/InfoMenuContext';

import InfoMenu from '../InfoMenu/InfoMenu';

const EmailList = ({emails, setLastClickedPos, visible, setVisible}) => {
  const {refreshEmails} = useContext(emailContext);
  const {email, positions, showInfoMenu} = useContext(infoMenuContext);
  const {lastClickedEmailId, setLastClickedEmailId} = email;
  const {menuPos} = positions;

  /** handleDelete
   * @saphalpdyl
   * @description On click change position to beside user's mouse
   * @param {object} event MouseEvent
   */
  const handleDelete = async () => {
    setVisible(false);
    if (lastClickedEmailId == null) return;

    const response = await fetch(
        `http://localhost:8080/${lastClickedEmailId}`,
        {method: 'DELETE'},
    );

    const data = response.json();

    if (data.hasError) {
      console.log(`Error during deletion with code ${data.code}`);
      return;
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
          handleInfoClick={showInfoMenu}
          key={email.id}
          email={email}
          setLastClickedEmailId={setLastClickedEmailId}
        />
      ))}
    </div>
  );
};

export default EmailList;
