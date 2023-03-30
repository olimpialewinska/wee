import {
  Category,
  EmojiPicker,
  ModalBg,
  Wrapper,
  Emoji,
  CategoryName,
  EmojiListSearch,
  EmojiSearch,
  EmojiSearchContainer,
  EmojiSearchInput,
} from "./style";
import emoji from "../../../../emoji.json";
import { use, useCallback, useContext, useEffect, useState } from "react";
import { messageContext } from "..";

interface EmojiInterface {
  visible: boolean;
  hide: () => void;
}

type Emoji = {
  emoji: string;
  description: string;
  category: string;
  aliases: string[];
  tags: string[];
  unicode_version: string;
  ios_version: string;
};

type EmojiByCategory = {
  [category: string]: Emoji[];
};

export function EmojiPopUp(props: EmojiInterface) {
  const { setMessageText } = useContext(messageContext);
  const { messageText } = useContext(messageContext);

  const [search, setSearch] = useState<string>("");
  const groupEmojisByCategory = (emojis: Emoji[]): EmojiByCategory => {
    return emojis.reduce((result: EmojiByCategory, emoji: Emoji) => {
      const { category } = emoji;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(emoji);
      return result;
    }, {});
  };
  const [emojiList, setEmojiList] = useState(groupEmojisByCategory(emoji));

  const searchEmoji = useCallback((search: string) => {
    const searchedEmoji = emoji.filter(
      (emoji) =>
        emoji.aliases.includes(search) ||
        emoji.description.includes(search) ||
        emoji.tags.includes(search)
    );

    setEmojiList(groupEmojisByCategory(searchedEmoji));
  }, []);

  return (
    <ModalBg
      style={{
        display: props.visible ? "block" : "none",
        pointerEvents: props.visible ? "inherit" : "none",
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          props.hide();
        }
      }}
    >
      <Wrapper>
        <EmojiSearchContainer>
          <EmojiSearch>
            <EmojiListSearch />
            <EmojiSearchInput
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
                searchEmoji(e.target.value);
              }}
              value={search}
            />
          </EmojiSearch>
        </EmojiSearchContainer>

        {Object.keys(emojiList).map((category) => {
          return (
            <Category key={category}>
              <CategoryName>{category}</CategoryName>
              <EmojiPicker>
                {emojiList[category].map((emoji) => {
                  return (
                    <Emoji
                      key={emoji.emoji}
                      onClick={() => {
                        setMessageText(messageText + emoji.emoji);
                      }}
                    >
                      {emoji.emoji}
                    </Emoji>
                  );
                })}
              </EmojiPicker>
            </Category>
          );
        })}
      </Wrapper>
    </ModalBg>
  );
}
