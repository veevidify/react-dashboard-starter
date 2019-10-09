import React, { ReactChild } from 'react';
import { Layer, Box, Form, Button, Text } from 'grommet';
import { CondensedHeading } from './Headings';
import styled from 'styled-components';
import { ChevronRight } from './Icons';

const FixedBox = styled(Box)`
  position: absolute;
  top: 5px;
  right: 20px;
`;

const Modal: React.FC<{ close: Function }> = ({ close, children }) => (
  <Layer onClickOutside={() => close()} onEsc={() => close()} full="vertical" position="right">
    <Box
      justify="end"
      fill="vertical"
      direction="row"
      pad={{ horizontal: 'medium' }}
      background="light-4"
      overflow="auto"
    >
      <Box background="white" overflow="auto">
        <FixedBox alignContent="end" pad={{ top: 'medium', right: 'medium' }} direction="row">
          <Button
            color="brand"
            alignSelf="center"
            plain
            reverse
            label="Close"
            icon={<ChevronRight />}
            onClick={() => close()}
          />
        </FixedBox>
        {children}
      </Box>
    </Box>
  </Layer>
);

export const SimpleConfirmForm: React.FC<{
  title: string;
  message: string | ReactChild;
  effect: Function;
  closeForm: () => void;
}> = ({ title, message, effect, closeForm }) => (
  <>
    <Box pad="medium">
      <CondensedHeading level="3">{title}</CondensedHeading>
    </Box>
    <Form
      onSubmit={() => {
        effect();
        closeForm();
      }}
    >
      <Box pad="medium">
        {typeof message === 'string' ? <Text>{message}</Text> : message}
        <Box pad="medium" direction="row" justify="evenly" gap="large">
          <Button primary type="submit" label="Confirm" />
          <Button onClick={() => closeForm()} label="Cancel" />
        </Box>
      </Box>
    </Form>
  </>
);

export default Modal;
