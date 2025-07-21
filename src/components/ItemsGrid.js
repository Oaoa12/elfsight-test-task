import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Popup } from './popup/Popup';
import { useData } from './providers';
import { Card } from './Card';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  console.log('Characters:', characters);

  function handleCardClick(props) {
    console.log('Card props:', props);
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }

  useEffect(() => {
    if (popupSettings.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popupSettings.visible]);

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((props) => (
        <Card
          key={props.id}
          onClickHandler={() => handleCardClick(props)}
          {...props}
        />
      ))}
      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
