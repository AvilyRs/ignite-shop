import { styled } from 'src/styles';

export const Container = styled('header', {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',

  padding: '2rem 0',
  width: 'min(100%, 1100px)',
  margin: '0 auto',
});

export const Title = styled('h1', {
  fontSize: '2rem',
  color: '$gray300',
});
