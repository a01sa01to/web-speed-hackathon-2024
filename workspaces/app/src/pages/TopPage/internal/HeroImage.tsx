import styled from 'styled-components';

import { IMAGE_SRC } from './ImageSrc';

const _Wrapper = styled.div`
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image alt="Cyber TOON" loading="eager" src={IMAGE_SRC} />
    </_Wrapper>
  );
};
