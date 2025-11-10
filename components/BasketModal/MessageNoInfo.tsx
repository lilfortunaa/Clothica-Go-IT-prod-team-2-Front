'use client';

type Props = {
  text: string;
  buttonText: string;
  onClick: () => void;
};

export default function MessageNoInfo({
  text,
  buttonText,
  onClick,
}: Props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '16px' }}>{text}</p>
      <button
        onClick={onClick}
        style={{
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
