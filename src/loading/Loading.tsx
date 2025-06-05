import React from 'react';

type LoaderProps = {
  message?: string;
};

const Loading: React.FC<LoaderProps> = ({ message = 'Carregando...' }) => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  spinner: {
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #3498db',
    borderRadius: '50%',
    width: 50,
    height: 50,
    animation: 'spin 1s linear infinite',
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },
};

const styleSheet = `
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = styleSheet;
  document.head.appendChild(style);
}

export default Loading;
