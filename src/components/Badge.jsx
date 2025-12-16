// Pure presentational component
export const Badge = ({ type, streak }) => {
  if (!type) return null;

  const styles = {
    diamond: { bg: '#9890b7ff', text: '💎' },
    golden: { bg: '#FFD700', text: '🏆' },
    silver: { bg: '#C0C0C0', text: '🥈' },
    bronze: { bg: '#CD7F32', text: '🥉' },
  };

  const style = styles[type];

  return (
    <div
      data-testid="badge"
      style={{
        backgroundColor: style.bg,
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {style.text} {streak} days
    </div>
  );
};
