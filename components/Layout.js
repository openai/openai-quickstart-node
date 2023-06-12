import globalStyles from '../styles/global.js';

function Layout(props) {
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

export default Layout;