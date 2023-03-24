import {useContext} from 'react';

import EmailListItem from './EmailListItem';
import './styles/EmailList.css';
import './styles/EmailListScrollBar.css';

import emailContext from '@contexts/EmailContext';
import infoMenuContext from '@contexts/InfoMenuContext';
import authContext from '@contexts/authContext';

import InfoMenu from '../InfoMenu/InfoMenu';

const EmailList = ({emails, visible, setVisible}) => {
  const {fetchEmails} = useContext(emailContext);
  const {email, positions, showInfoMenu} = useContext(infoMenuContext);
  const {lastClickedEmailId, setLastClickedEmailId} = email;
  const {menuPos} = positions;
  const {auth} = useContext(authContext);

  /** handleDelete
   * @saphalpdyl
   * @description On click change position to beside user's mouse
   * @param {object} event MouseEvent
   */
  const handleDelete = async () => {
    setVisible(false);
    if (lastClickedEmailId == null) return;

    const response = await fetch(
        `http://localhost:9000/${lastClickedEmailId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
    );

    const data = response.json();

    if (data.hasError) {
      console.log(`Error during deletion with code ${data.code}`);
      return;
    }

    fetchEmails();
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
          setLastClickedEmailId={setLastClickedEmailId}
          key={email.id}
          email={email}
        />
      ))}
    </div>
  );
};

export default EmailList;
