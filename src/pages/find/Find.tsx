import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { headerSelectedState } from "../../recoil/atom";
import { useEffect } from "react";

const Find = () => {
  const setHeaderSelected = useSetRecoilState(headerSelectedState);

  useEffect(() => {
    setHeaderSelected("find");
  }, []);
  return <FindLayout>cfinddddd</FindLayout>;
};
export default Find;

const FindLayout = styled.div`
  margin: 0 auto;
  /* max-width: 122.4rem; */
`;
