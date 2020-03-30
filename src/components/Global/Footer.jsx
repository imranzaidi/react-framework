import React from 'react';

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='footer-legal'>
        <div className='container-fluid'>&copy; My Cool Company, Inc.
          <div className='term-links pull-right'>
            <a href='#'>Privacy policy</a> | <a href='#'>Terms of use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
