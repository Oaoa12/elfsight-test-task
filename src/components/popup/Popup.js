import styled, { css } from 'styled-components';
import { useEffect, useCallback } from 'react';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  const togglePopup = useCallback(
    (e) => {
      if (e.currentTarget === e.target) {
        setSettings((prev) => ({
          ...prev,
          visible: false
        }));
      }
    },
    [setSettings]
  );

  const closePopup = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      visible: false
    }));
  }, [setSettings]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape' && visible) {
        closePopup();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [visible, closePopup]);

  if (!visible) {
    return null;
  }

  return (
    <PopupContainer visible={visible} onClick={togglePopup}>
      <StyledPopup>
        <CloseIcon onClick={closePopup} />
        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />
        <PopupInfo origin={origin} location={location} />
        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    transform: rotate(-45deg);
  }

  &:after {
    transform: rotate(45deg);
  }
`;
