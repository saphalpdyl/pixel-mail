import './EmailFallback.css';

/**
  * @author @saphalpdyl
  * @component
  *
  * @description The Component is used as the fallback component when there are no emails i.e emails = []
  *
  * @example
  * if( emails.length == 0 )
  *   return <EmailFallback />
  *
  * @return {React.Component}
  *
  */
function EmailFallback() {
  console.log('Falling back');
  return <div className="email_fallback">
    Nothing&apos;s here !
  </div>;
}

export default EmailFallback;
