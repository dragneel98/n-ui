import { ReactNode, useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
}

const styles = {
  button: {
    paddingLeft: '18px',
    paddingRight: '18px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'ndot',
  },
  primary: {
    backgroundColor: '#C8102E',
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: '#ccc',
    color: '#000000',
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: '#C8102E',
  },
  text: {
    fontSize: '16px',
    fontWeight: 'bold',
  }
};

export const Button: React.FC<ButtonProps> = ({ children, type = "primary", onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonStyle = {
    ...styles.button,
    ...(type === "primary" ? styles.primary : {}),
    ...(type === "secondary" ? styles.secondary : {}),
    ...(type === "tertiary" ? styles.tertiary : {}),
    transition: 'transform 0.12s ease, box-shadow 0.12s ease',
    transform: isPressed ? 'scale(0.96)' : 'scale(1)',
    boxShadow: isPressed ? 'inset 0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
  };

  return (
    <button 
      style={buttonStyle} 
      onClick={onClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
};
