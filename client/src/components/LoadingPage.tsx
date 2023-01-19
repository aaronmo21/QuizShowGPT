import React, { useState } from 'react';
import { Spinner, Box, Text } from 'grommet'

export const LoadingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (  
        <Box className="modal" onClick={() => setShowModal(false)}>
          <Text className="message">Please wait while we generate your game!</Text>
          <Spinner />
        </Box>
      )}
    </>
  );
};
