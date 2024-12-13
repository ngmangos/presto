import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logout from './Logout';
import EditTitleModal from './modals/EditTitleModal';
import EditThumbnailModal from './modals/EditThumbnailModal';
import { Button } from '@mui/material';

const Nav = styled.nav`
  background-color: #7D8BE0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Title = styled.h1`
  margin: 0 10px 0 10px;
  display: inline;
`;

const PrestoButton = styled(Button)`
  height: 30px;
  overflow: hidden;
`

const prestoButtonSx = {
  textTransform: 'none',
  color: 'black',
}

const FlexedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`

const FlexedGap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`

const FlexRow = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`

const navButtonSx = {
  textTransform: 'none',
  color: 'white',
  borderColor: 'white',
  marginLeft: '10px',
  marginRight: '10px',
}

const NavBar = ({ navBarState, token, setToken, store, actuallySetStore }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const location = useLocation();

  /* update navbar state everytime the user accesses a new page */
  useEffect(() => {
    if (navBarState === 'presentation') {
      const deckId = location.pathname.split('/')[2];
      const curDeck = store.decks?.find(deck => deck.id === Number(deckId)) || null;
      if (curDeck) {
        setTitle(curDeck.title);
        setThumbnail(curDeck.thumbnail);
      } else {
        setTitle('');
        setThumbnail('');
      }
    }
  }, [navBarState, location.pathname, store]);

  /* preview mode has no navbar as it opens in a new tab */
  if (navBarState === 'preview' ) {
    return <></>;
  }

  return (
    <Nav>
      {navBarState === 'dashboard' ? (
        <>
          <FlexedDiv>
            <FlexedGap>
              <FlexRow>
                <PrestoButton component={Link} to='/dashboard' sx={prestoButtonSx}>
                  <h1>🪄 Presto</h1>
                </PrestoButton>
              </FlexRow>
            </FlexedGap>
            <Logout token={token} setToken={setToken} />
          </FlexedDiv>
        </>
      ) : navBarState === 'entry' ? (
        <>
          <FlexRow>
            <PrestoButton sx={prestoButtonSx}>
              <h1>🪄 Presto</h1>
            </PrestoButton>
            <Button sx={navButtonSx} variant='outlined' size='small' component={Link} to='/register'>
              Register
            </Button>
            <Button sx={navButtonSx} variant='outlined' size='small' component={Link} to='/login'>
              Login
            </Button>
          </FlexRow>
        </>
      ) : navBarState === 'presentation' ? (
        <FlexedDiv>
          <FlexedGap>
            <FlexRow>
              <PrestoButton component={Link} to='/dashboard' sx={prestoButtonSx}>
                <h1>🪄</h1>
              </PrestoButton>
            </FlexRow>
            <FlexRow>
              <EditThumbnailModal thumbnail={thumbnail} store={store} actuallySetStore={actuallySetStore}/>
            </FlexRow>
          </FlexedGap>
          <Title>
            {title}
            <EditTitleModal title={title} setTitle={setTitle} store={store} actuallySetStore={actuallySetStore}></EditTitleModal>
          </Title>
          <Logout token={token} setToken={setToken} />
        </FlexedDiv>
      ) : navBarState === 'versions' ? (
        <FlexedDiv>
          <FlexedGap>
            <FlexRow>
              <PrestoButton component={Link} to='/dashboard' sx={prestoButtonSx}>
                <h1>🪄</h1>
              </PrestoButton>
            </FlexRow>
          </FlexedGap>
          <Title>
            {title}
          </Title>
          <Logout token={token} setToken={setToken} />
        </FlexedDiv>
      ) : (
        <></>
      )}
    </Nav>
  );
}

export default NavBar;