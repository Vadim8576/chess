import useLoadImage from "../../hooks/useLoadImage"
import styled from 'styled-components';

const Img = styled.img`
  width: 80%;
  height: 80%;
`;

const Figure = ({ src }) => {
    const { isLoading, isError, image } = useLoadImage(src)

    if (isLoading) {
        return <div>.</div>;
    }

    if (isError) {
        return <div>!</div>;
    }
    console.log(src)
    if(!src) return

    return (
        <Img
            src={image.src}
            alt="F"
        />
    )
}

export default Figure