import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from './directory-item.styles';
import './directory-item.styles.scss';

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
